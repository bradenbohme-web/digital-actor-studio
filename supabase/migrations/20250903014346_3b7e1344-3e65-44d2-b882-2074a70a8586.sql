-- Create characters table
CREATE TABLE public.characters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  personality_traits TEXT[],
  voice_type TEXT,
  age_range TEXT,
  gender TEXT,
  ethnicity TEXT,
  style TEXT DEFAULT 'realistic',
  visual_dna JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create character assets table
CREATE TABLE public.character_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  character_id UUID REFERENCES public.characters(id) ON DELETE CASCADE NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('image', 'voice', 'metadata')),
  asset_url TEXT,
  asset_data JSONB,
  quality_score FLOAT,
  generation_parameters JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for character assets
INSERT INTO storage.buckets (id, name, public) VALUES ('character-assets', 'character-assets', true);

-- Enable RLS
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_assets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for characters
CREATE POLICY "Users can view their own characters" 
ON public.characters 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own characters" 
ON public.characters 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters" 
ON public.characters 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own characters" 
ON public.characters 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for character assets
CREATE POLICY "Users can view assets of their characters" 
ON public.character_assets 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.characters 
  WHERE characters.id = character_assets.character_id 
  AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can create assets for their characters" 
ON public.character_assets 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.characters 
  WHERE characters.id = character_assets.character_id 
  AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can update assets of their characters" 
ON public.character_assets 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.characters 
  WHERE characters.id = character_assets.character_id 
  AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can delete assets of their characters" 
ON public.character_assets 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.characters 
  WHERE characters.id = character_assets.character_id 
  AND characters.user_id = auth.uid()
));

-- Create storage policies
CREATE POLICY "Character assets are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'character-assets');

CREATE POLICY "Users can upload character assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'character-assets' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their character assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'character-assets' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their character assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'character-assets' AND auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_characters_updated_at
BEFORE UPDATE ON public.characters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();