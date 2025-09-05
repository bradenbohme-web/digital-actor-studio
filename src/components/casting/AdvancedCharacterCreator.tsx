import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Wand2, 
  Camera,
  Palette,
  User,
  Heart,
  Brain,
  Volume2,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  Shirt,
  Smile,
  Settings
} from 'lucide-react';

interface CharacterAsset {
  id: string;
  type: 'full-body' | 'portrait' | 'pose';
  angle: string;
  background: string;
  outfit?: string;
  emotion?: string;
  imageUrl: string;
}

export const AdvancedCharacterCreator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedAngle, setSelectedAngle] = useState('front');
  const [selectedBackground, setSelectedBackground] = useState('white-studio');
  const [selectedOutfit, setSelectedOutfit] = useState('default');
  const [selectedEmotion, setSelectedEmotion] = useState('neutral');
  const [generatedAssets, setGeneratedAssets] = useState<CharacterAsset[]>([]);
  
  const [characterData, setCharacterData] = useState({
    name: '',
    role: '',
    description: '',
    personality: [],
    voiceType: '',
    ageRange: '',
    gender: '',
    ethnicity: '',
    style: 'realistic'
  });

  const angles = [
    { id: 'front', name: 'Front View', icon: '⬆️' },
    { id: '3quarter-left', name: '3/4 Left', icon: '↖️' },
    { id: 'left', name: 'Left Profile', icon: '⬅️' },
    { id: '3quarter-right', name: '3/4 Right', icon: '↗️' },
    { id: 'right', name: 'Right Profile', icon: '➡️' },
    { id: 'back', name: 'Back View', icon: '⬇️' }
  ];

  const backgrounds = [
    { id: 'white-studio', name: 'White Studio', preview: '#ffffff' },
    { id: 'photography-studio', name: 'Photography Studio', preview: '#f5f5f5' },
    { id: 'gradient-studio', name: 'Gradient Studio', preview: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' },
    { id: 'dark-studio', name: 'Dark Studio', preview: '#2a2a2a' },
    { id: 'colored-backdrop', name: 'Colored Backdrop', preview: '#e6f3ff' },
    { id: 'natural-light', name: 'Natural Light', preview: '#f8f9fa' }
  ];

  const outfits = [
    { id: 'default', name: 'Default Outfit' },
    { id: 'formal', name: 'Formal Wear' },
    { id: 'casual', name: 'Casual Wear' },
    { id: 'business', name: 'Business Attire' },
    { id: 'fantasy', name: 'Fantasy Costume' },
    { id: 'historical', name: 'Historical Clothing' },
    { id: 'modern', name: 'Modern Fashion' }
  ];

  const emotions = [
    { id: 'neutral', name: 'Neutral', emoji: '😐' },
    { id: 'happy', name: 'Happy', emoji: '😊' },
    { id: 'serious', name: 'Serious', emoji: '😤' },
    { id: 'confident', name: 'Confident', emoji: '😎' },
    { id: 'thoughtful', name: 'Thoughtful', emoji: '🤔' },
    { id: 'determined', name: 'Determined', emoji: '😤' },
    { id: 'friendly', name: 'Friendly', emoji: '😄' },
    { id: 'mysterious', name: 'Mysterious', emoji: '😏' }
  ];

  const poses = [
    { id: 'standing-neutral', name: 'Standing Neutral' },
    { id: 'confident-stance', name: 'Confident Stance' },
    { id: 'action-pose', name: 'Action Pose' },
    { id: 'casual-pose', name: 'Casual Pose' },
    { id: 'heroic-pose', name: 'Heroic Pose' },
    { id: 'thinking-pose', name: 'Thinking Pose' }
  ];

  const personalityTraits = [
    'Brave', 'Intelligent', 'Compassionate', 'Humorous', 'Mysterious',
    'Determined', 'Charismatic', 'Loyal', 'Impulsive', 'Wise',
    'Calculating', 'Optimistic', 'Protective', 'Artistic', 'Tech-Savvy'
  ];

  const handleGenerateAdvanced = async (type: 'single' | 'all-angles' | 'portrait-emotions' | 'outfit-change') => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to generate characters');
        return;
      }

      let requests = [];
      
      switch (type) {
        case 'single':
          requests = [{
            angle: selectedAngle,
            background: selectedBackground,
            outfit: selectedOutfit,
            emotion: selectedEmotion,
            type: 'full-body'
          }];
          break;
          
        case 'all-angles':
          requests = angles.map(angle => ({
            angle: angle.id,
            background: selectedBackground,
            outfit: selectedOutfit,
            emotion: selectedEmotion,
            type: 'full-body'
          }));
          break;
          
        case 'portrait-emotions':
          requests = emotions.map(emotion => ({
            angle: 'front',
            background: selectedBackground,
            outfit: selectedOutfit,
            emotion: emotion.id,
            type: 'portrait'
          }));
          break;
          
        case 'outfit-change':
          requests = outfits.map(outfit => ({
            angle: selectedAngle,
            background: selectedBackground,
            outfit: outfit.id,
            emotion: selectedEmotion,
            type: 'full-body'
          }));
          break;
      }

      const progressStep = 90 / requests.length;
      const newAssets: CharacterAsset[] = [];

      for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        
        toast.info(`Generating ${request.type} - ${request.angle} view...`);

        const { data, error } = await supabase.functions.invoke('generate-character-advanced', {
          body: {
            characterData: {
              ...characterData,
              advancedSettings: request
            },
            userId: user.id
          }
        });

        if (error) {
          console.error('Generation error:', error);
          throw new Error(error.message || 'Failed to generate character asset');
        }

        if (data.success) {
          const asset: CharacterAsset = {
            id: data.asset.id,
            type: request.type as 'full-body' | 'portrait' | 'pose',
            angle: request.angle,
            background: request.background,
            outfit: request.outfit,
            emotion: request.emotion,
            imageUrl: data.imageUrl
          };
          newAssets.push(asset);
        }

        setGenerationProgress((i + 1) * progressStep);
      }

      setGeneratedAssets(prev => [...prev, ...newAssets]);
      setGenerationProgress(100);
      
      toast.success(`Generated ${newAssets.length} character assets!`);

    } catch (error) {
      console.error('Advanced generation error:', error);
      toast.error('Failed to generate character assets');
    } finally {
      setIsGenerating(false);
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Character Creator</h2>
          <p className="text-muted-foreground">Create multi-angle, multi-outfit characters with advanced AI</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="assets">Assets Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Character Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Character Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Elena Vasquez"
                    value={characterData.name}
                    onChange={(e) => setCharacterData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Character Role</Label>
                  <Select value={characterData.role} onValueChange={(value) => setCharacterData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="protagonist">Lead Protagonist</SelectItem>
                      <SelectItem value="antagonist">Antagonist</SelectItem>
                      <SelectItem value="supporting">Supporting Character</SelectItem>
                      <SelectItem value="comic">Comic Relief</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="love-interest">Love Interest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <Select value={characterData.ageRange} onValueChange={(value) => setCharacterData(prev => ({ ...prev, ageRange: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child (5-12)</SelectItem>
                      <SelectItem value="teen">Teen (13-19)</SelectItem>
                      <SelectItem value="young-adult">Young Adult (20-35)</SelectItem>
                      <SelectItem value="adult">Adult (36-55)</SelectItem>
                      <SelectItem value="senior">Senior (55+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={characterData.gender} onValueChange={(value) => setCharacterData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="non-binary">Non-Binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ethnicity</Label>
                  <Select value={characterData.ethnicity} onValueChange={(value) => setCharacterData(prev => ({ ...prev, ethnicity: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ethnicity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caucasian">Caucasian</SelectItem>
                      <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                      <SelectItem value="african">African American</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                      <SelectItem value="mixed">Mixed Heritage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Character Description</Label>
                <Textarea
                  placeholder="Describe your character's appearance, background, and key characteristics..."
                  rows={4}
                  value={characterData.description}
                  onChange={(e) => setCharacterData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Personality Traits</Label>
                <div className="flex flex-wrap gap-2">
                  {personalityTraits.map((trait) => (
                    <Badge
                      key={trait}
                      variant={characterData.personality.includes(trait) ? "default" : "outline"}
                      className={`cursor-pointer transition-smooth ${
                        characterData.personality.includes(trait) 
                          ? 'gradient-primary cinematic-glow' 
                          : 'hover:border-primary'
                      }`}
                      onClick={() => togglePersonality(trait)}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-500" />
                  Camera Angles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {angles.map((angle) => (
                    <Button
                      key={angle.id}
                      variant={selectedAngle === angle.id ? "default" : "outline"}
                      className={`flex items-center justify-center p-3 h-auto ${
                        selectedAngle === angle.id ? 'gradient-primary' : ''
                      }`}
                      onClick={() => setSelectedAngle(angle.id)}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{angle.icon}</div>
                        <div className="text-xs">{angle.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-green-500" />
                  Backgrounds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {backgrounds.map((bg) => (
                    <Button
                      key={bg.id}
                      variant={selectedBackground === bg.id ? "default" : "outline"}
                      className={`flex flex-col items-center p-3 h-auto ${
                        selectedBackground === bg.id ? 'gradient-primary' : ''
                      }`}
                      onClick={() => setSelectedBackground(bg.id)}
                    >
                      <div 
                        className="w-8 h-8 rounded mb-1 border"
                        style={{ background: bg.preview }}
                      />
                      <div className="text-xs">{bg.name}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shirt className="w-5 h-5 mr-2 text-purple-500" />
                  Outfits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedOutfit} onValueChange={setSelectedOutfit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outfit" />
                  </SelectTrigger>
                  <SelectContent>
                    {outfits.map((outfit) => (
                      <SelectItem key={outfit.id} value={outfit.id}>
                        {outfit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smile className="w-5 h-5 mr-2 text-yellow-500" />
                  Emotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {emotions.map((emotion) => (
                    <Button
                      key={emotion.id}
                      variant={selectedEmotion === emotion.id ? "default" : "outline"}
                      className={`flex items-center justify-start p-3 ${
                        selectedEmotion === emotion.id ? 'gradient-primary' : ''
                      }`}
                      onClick={() => setSelectedEmotion(emotion.id)}
                    >
                      <span className="mr-2">{emotion.emoji}</span>
                      <span className="text-xs">{emotion.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full gradient-primary" 
                  onClick={() => handleGenerateAdvanced('single')}
                  disabled={isGenerating || !characterData.name}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Single View
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleGenerateAdvanced('all-angles')}
                  disabled={isGenerating || !characterData.name}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Generate All Angles
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Advanced Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleGenerateAdvanced('portrait-emotions')}
                  disabled={isGenerating || !characterData.name}
                >
                  <Smile className="w-4 h-4 mr-2" />
                  Generate All Emotions
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleGenerateAdvanced('outfit-change')}
                  disabled={isGenerating || !characterData.name}
                >
                  <Shirt className="w-4 h-4 mr-2" />
                  Generate Outfit Variations
                </Button>
              </CardContent>
            </Card>
          </div>

          {isGenerating && (
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
                    <span>Generating advanced character assets...</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-xs text-center text-muted-foreground">
                    {generationProgress}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Generated Assets ({generatedAssets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedAssets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No assets generated yet. Go to Generation tab to create character assets.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {generatedAssets.map((asset) => (
                    <div key={asset.id} className="space-y-2">
                      <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={asset.imageUrl} 
                          alt={`${asset.type} - ${asset.angle}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-medium">{asset.type}</p>
                        <p className="text-muted-foreground">{asset.angle}</p>
                        {asset.outfit && <p className="text-muted-foreground">Outfit: {asset.outfit}</p>}
                        {asset.emotion && <p className="text-muted-foreground">Emotion: {asset.emotion}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};