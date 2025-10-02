import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Heart, Users, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const personalityTraits = [
  { name: 'Openness', value: 75, color: 'bg-blue-500' },
  { name: 'Conscientiousness', value: 85, color: 'bg-green-500' },
  { name: 'Extraversion', value: 60, color: 'bg-yellow-500' },
  { name: 'Agreeableness', value: 70, color: 'bg-purple-500' },
  { name: 'Neuroticism', value: 40, color: 'bg-red-500' },
];

export function DigitalSoul() {
  const [traits, setTraits] = useState(personalityTraits);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Digital Soul Framework</h1>
        <p className="text-muted-foreground mt-2">Build deep psychological profiles for your characters</p>
      </div>

      <Tabs defaultValue="psychology" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="psychology">
            <Brain className="w-4 h-4 mr-2" />
            Psychology
          </TabsTrigger>
          <TabsTrigger value="emotions">
            <Heart className="w-4 h-4 mr-2" />
            Emotions
          </TabsTrigger>
          <TabsTrigger value="relationships">
            <Users className="w-4 h-4 mr-2" />
            Relationships
          </TabsTrigger>
          <TabsTrigger value="arcs">
            <TrendingUp className="w-4 h-4 mr-2" />
            Character Arcs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="psychology" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Big Five Personality Traits</CardTitle>
                <CardDescription>Adjust the core personality dimensions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {traits.map((trait, index) => (
                  <div key={trait.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{trait.name}</Label>
                      <span className="text-sm font-medium">{trait.value}%</span>
                    </div>
                    <Slider
                      value={[trait.value]}
                      onValueChange={(value) => {
                        const newTraits = [...traits];
                        newTraits[index] = { ...trait, value: value[0] };
                        setTraits(newTraits);
                      }}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personality Visualization</CardTitle>
                <CardDescription>Visual representation of personality traits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {traits.map((trait) => (
                    <div key={trait.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{trait.name}</span>
                        <span className="font-medium">{trait.value}%</span>
                      </div>
                      <Progress value={trait.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Behavior Patterns</CardTitle>
              <CardDescription>Define how the character reacts in different situations</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Under Stress</h4>
                <p className="text-sm text-muted-foreground">Becomes highly analytical and withdrawn</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">In Conflict</h4>
                <p className="text-sm text-muted-foreground">Seeks diplomatic solutions first</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">When Happy</h4>
                <p className="text-sm text-muted-foreground">Expressive and socially engaging</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emotions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Emotional Range & Depth</CardTitle>
              <CardDescription>Define the emotional spectrum and responses</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Joy', 'Anger', 'Sadness', 'Fear', 'Surprise', 'Disgust', 'Trust', 'Anticipation'].map((emotion) => (
                <div key={emotion} className="p-4 border rounded-lg text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">{emotion}</h4>
                  <Progress value={Math.random() * 100} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relationship Mapping</CardTitle>
              <CardDescription>Define connections with other characters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Relationships Yet</h3>
                <p className="text-muted-foreground mb-4">Start building character connections</p>
                <Button>Add Relationship</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arcs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Character Development Arc</CardTitle>
              <CardDescription>Plan character growth throughout the story</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <Label>Beginning State</Label>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">Cynical and isolated detective, distrusting of others</p>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div className="flex-1 space-y-2">
                    <Label>End State</Label>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">Learns to trust and work with a team, finds redemption</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Key Development Milestones</Label>
                  <div className="space-y-2">
                    {['Act 1: Refuses help', 'Act 2: Forced to collaborate', 'Act 3: Embraces teamwork'].map((milestone, i) => (
                      <div key={i} className="p-3 border rounded-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {i + 1}
                        </div>
                        <span className="text-sm">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
