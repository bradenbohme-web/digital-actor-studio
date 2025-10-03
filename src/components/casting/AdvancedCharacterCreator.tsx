import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Wand2, Camera, Palette, Lightbulb } from 'lucide-react';

interface AdvancedSettings {
  angle: string;
  background: string;
  outfit: string;
  emotion: string;
  lighting: string;
  artStyle: string;
}

export function AdvancedCharacterCreator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterData, setCharacterData] = useState({
    name: '',
    description: '',
    gender: 'neutral',
    ageRange: 'adult',
    ethnicity: '',
    personality: [] as string[],
    voiceType: 'neutral',
    style: 'realistic',
  });

  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    angle: 'front',
    background: 'neutral',
    outfit: 'casual',
    emotion: 'neutral',
    lighting: 'natural',
    artStyle: 'photorealistic',
  });

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateCharacter = async () => {
    if (!characterData.name || !characterData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide character name and description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.functions.invoke('generate-character-advanced', {
        body: {
          characterData: {
            ...characterData,
            advancedSettings,
          },
          userId: user?.id,
        },
      });

      if (error) throw error;

      if (data.success) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Character Generated!",
          description: "Your character has been created successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const personalities = ['creative', 'analytical', 'empathetic', 'ambitious', 'cautious', 'adventurous', 'introverted', 'extroverted'];

  const togglePersonality = (trait: string) => {
    setCharacterData(prev => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter(p => p !== trait)
        : [...prev.personality, trait]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Character Details
              </CardTitle>
              <CardDescription>Define core attributes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={characterData.name}
                    onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={characterData.gender} onValueChange={(v) => setCharacterData({ ...characterData, gender: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={characterData.description}
                  onChange={(e) => setCharacterData({ ...characterData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Personality Traits</Label>
                <div className="flex flex-wrap gap-2">
                  {personalities.map((trait) => (
                    <Badge
                      key={trait}
                      variant={characterData.personality.includes(trait) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => togglePersonality(trait)}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Visual Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pose">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pose">Pose</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                </TabsList>

                <TabsContent value="pose" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Camera Angle</Label>
                    <Select value={advancedSettings.angle} onValueChange={(v) => setAdvancedSettings({ ...advancedSettings, angle: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front">Front</SelectItem>
                        <SelectItem value="profile">Profile</SelectItem>
                        <SelectItem value="3/4">3/4</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Art Style</Label>
                    <Select value={advancedSettings.artStyle} onValueChange={(v) => setAdvancedSettings({ ...advancedSettings, artStyle: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photorealistic">Photorealistic</SelectItem>
                        <SelectItem value="cinematic">Cinematic</SelectItem>
                        <SelectItem value="anime">Anime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="environment" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <Select value={advancedSettings.background} onValueChange={(v) => setAdvancedSettings({ ...advancedSettings, background: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Button onClick={handleGenerateCharacter} disabled={isGenerating} size="lg" className="w-full">
            {isGenerating ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                {generatedImage ? (
                  <img src={generatedImage} alt="Character" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Camera className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>💡 Add personality traits for depth</p>
              <p>🎨 Try different art styles</p>
              <p>📸 Generate multiple angles</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
