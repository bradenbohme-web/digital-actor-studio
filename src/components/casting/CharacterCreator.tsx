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
  Upload, 
  Mic, 
  Eye, 
  Sparkles,
  Camera,
  Palette,
  User,
  Heart,
  Brain,
  Volume2,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

export const CharacterCreator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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

  const personalityTraits = [
    'Brave', 'Intelligent', 'Compassionate', 'Humorous', 'Mysterious',
    'Determined', 'Charismatic', 'Loyal', 'Impulsive', 'Wise',
    'Calculating', 'Optimistic', 'Protective', 'Artistic', 'Tech-Savvy'
  ];

  const voiceTypes = [
    'Soprano', 'Mezzo-Soprano', 'Alto', 'Tenor', 'Baritone', 'Bass',
    'Warm Contralto', 'Bright Tenor', 'Deep Bass', 'Youthful Voice', 'Mature Voice'
  ];

  const handleGenerateCharacter = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedImage(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to generate characters');
        return;
      }

      // Progress simulation while generating
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 10, 90));
      }, 800);

      toast.info('Generating your character...', {
        description: 'This may take a few moments'
      });

      // Call the character generation function
      const { data, error } = await supabase.functions.invoke('generate-character', {
        body: {
          characterData,
          userId: user.id
        }
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (error) {
        console.error('Generation error:', error);
        throw new Error(error.message || 'Failed to generate character');
      }

      if (data.success) {
        setGeneratedImage(data.imageUrl);
        toast.success('Character generated successfully!', {
          description: `${characterData.name} has been brought to life`
        });
      } else {
        throw new Error(data.error || 'Generation failed');
      }

    } catch (error) {
      console.error('Character generation error:', error);
      toast.error('Failed to generate character', {
        description: error.message || 'Please try again'
      });
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
          <h2 className="text-2xl font-bold text-foreground">Character Creator</h2>
          <p className="text-muted-foreground">Design and generate your next digital persona</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Reference
          </Button>
          <Button variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Random Character
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Basic Information
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
                  <Label htmlFor="age">Age Range</Label>
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
                  <Label htmlFor="gender">Gender</Label>
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
                  <Label htmlFor="ethnicity">Ethnicity</Label>
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
                <Label htmlFor="description">Character Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your character's appearance, background, and key characteristics..."
                  rows={4}
                  value={characterData.description}
                  onChange={(e) => setCharacterData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-accent" />
                Personality & Voice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-xs text-muted-foreground">
                  Selected: {characterData.personality.length}/5 traits
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice">Voice Type</Label>
                <Select value={characterData.voiceType} onValueChange={(value) => setCharacterData(prev => ({ ...prev, voiceType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceTypes.map((voice) => (
                      <SelectItem key={voice} value={voice.toLowerCase().replace(/\s+/g, '-')}>
                        {voice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-yellow-500" />
                Visual Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {['Realistic', 'Artistic', 'Anime'].map((style) => (
                  <Card
                    key={style}
                    className={`cursor-pointer transition-smooth border-2 ${
                      characterData.style === style.toLowerCase()
                        ? 'border-primary cinematic-glow'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setCharacterData(prev => ({ ...prev, style: style.toLowerCase() }))}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-20 bg-muted rounded mb-2 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="font-medium">{style}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Generation */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-500" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                  <div className="text-center space-y-2">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground">Generating...</p>
                  </div>
                ) : generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt={characterData.name || 'Generated Character'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Character preview will appear here</p>
                  </div>
                )}
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-xs text-center text-muted-foreground">
                    {generationProgress}% complete
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Character Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Name:</strong> {characterData.name || 'Not set'}</p>
                  <p><strong>Role:</strong> {characterData.role || 'Not set'}</p>
                  <p><strong>Traits:</strong> {characterData.personality.length} selected</p>
                  <p><strong>Voice:</strong> {characterData.voiceType || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              className="w-full gradient-primary cinematic-glow" 
              size="lg"
              onClick={handleGenerateCharacter}
              disabled={isGenerating || !characterData.name || !characterData.description}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Character
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full" disabled={isGenerating}>
              <Volume2 className="w-4 h-4 mr-2" />
              Generate Voice Sample
            </Button>

            <Button variant="outline" className="w-full" disabled={isGenerating}>
              <Heart className="w-4 h-4 mr-2" />
              Save as Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};