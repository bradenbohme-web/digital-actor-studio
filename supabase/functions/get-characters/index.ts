import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    console.log('Fetching characters for user:', userId);

    // Create the Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch characters with their assets
    const { data: characters, error: charactersError } = await supabase
      .from('characters')
      .select(`
        *,
        character_assets (
          asset_type,
          asset_url,
          quality_score
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (charactersError) {
      console.error('Database error:', charactersError);
      throw new Error('Failed to fetch characters');
    }

    console.log(`Found ${characters?.length || 0} characters`);

    // Transform the data to include image URLs directly
    const transformedCharacters = characters?.map(character => ({
      ...character,
      imageUrl: character.character_assets?.find(asset => asset.asset_type === 'image')?.asset_url || null,
      voiceUrl: character.character_assets?.find(asset => asset.asset_type === 'voice')?.asset_url || null
    })) || [];

    return new Response(JSON.stringify({
      success: true,
      characters: transformedCharacters
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in get-characters function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});