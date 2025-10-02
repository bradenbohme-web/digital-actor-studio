import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Sparkles, Save, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CharacterCreator() {
  const { toast } = useToast();
  const [characterName, setCharacterName] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [backstory, setBackstory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = async () => {
    if (!description) {
      toast({
        title: "Description Required",
        description: "Please provide a character description to generate with AI.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setPersonality(`Based on the description, this character exhibits traits of determination, creativity, and resilience. They approach challenges with analytical thinking while maintaining emotional intelligence.`);
      setBackstory(`Born into a world of ${description.toLowerCase()}, this character developed unique skills and perspectives that would shape their journey. Their early experiences forged a strong sense of purpose and unwavering dedication to their goals.`);
      setIsGenerating(false);
      
      toast({
        title: "Character Generated",
        description: "AI has generated personality and backstory for your character.",
      });
    }, 2000);
  };

  const handleSave = () => {
    if (!characterName) {
      toast({
        title: "Name Required",
        description: "Please provide a character name before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Character Saved",
      description: `${characterName} has been added to your character library.`,
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">AI Character Generator</h1>
          <p className="text-muted-foreground mt-2">Create unique characters with AI-powered tools</p>
        </div>
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Character
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Define the core details of your character</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Character Name</Label>
                <Input
                  id="name"
                  placeholder="Enter character name..."
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your character's appearance, role, and key traits..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button onClick={handleGenerateAI} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="personality" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="backstory">Backstory</TabsTrigger>
              <TabsTrigger value="visual">Visual Design</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personality" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personality Traits</CardTitle>
                  <CardDescription>Define your character's personality and behavior patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Character personality traits..."
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    rows={8}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="backstory" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Character Backstory</CardTitle>
                  <CardDescription>Create a compelling history for your character</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Character backstory..."
                    value={backstory}
                    onChange={(e) => setBackstory(e.target.value)}
                    rows={8}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="visual" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Design</CardTitle>
                  <CardDescription>Generate visual representations of your character</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Generate character images with AI</p>
                    <Button>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Character Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Character Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{characterName || 'Unnamed Character'}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{description || 'No description provided'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Personality:</span>
                <span>{personality ? 'Defined' : 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Backstory:</span>
                <span>{backstory ? 'Defined' : 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visual Design:</span>
                <span>Not generated</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
