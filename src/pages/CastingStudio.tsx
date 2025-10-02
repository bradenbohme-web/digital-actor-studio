import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Mic, Users, Search, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockActors = [
  { id: 1, name: 'Sarah Chen', role: 'Detective', image: '/placeholder.svg', rating: 4.8, projects: 23 },
  { id: 2, name: 'Marcus Black', role: 'Villain', image: '/placeholder.svg', rating: 4.9, projects: 31 },
  { id: 3, name: 'Alex Storm', role: 'Hero', image: '/placeholder.svg', rating: 4.7, projects: 19 },
  { id: 4, name: 'Jenny Smith', role: 'Support', image: '/placeholder.svg', rating: 4.6, projects: 15 },
  { id: 5, name: 'Dr. Wise', role: 'Mentor', image: '/placeholder.svg', rating: 4.9, projects: 28 },
  { id: 6, name: 'Bob', role: 'Comic Relief', image: '/placeholder.svg', rating: 4.5, projects: 12 },
];

export function CastingStudio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActor, setSelectedActor] = useState<number | null>(null);

  const filteredActors = mockActors.filter(actor =>
    actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    actor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Casting Studio</h1>
        <p className="text-muted-foreground mt-2">Find and match the perfect actors for your characters</p>
      </div>

      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="database">
            <Users className="w-4 h-4 mr-2" />
            Actor Database
          </TabsTrigger>
          <TabsTrigger value="matching">
            <Target className="w-4 h-4 mr-2" />
            Character Matching
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Camera className="w-4 h-4 mr-2" />
            Performance Capture
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Mic className="w-4 h-4 mr-2" />
            Voice Cloning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="mt-6 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search actors by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActors.map((actor) => (
              <Card
                key={actor.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedActor === actor.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedActor(actor.id)}
              >
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <CardTitle>{actor.name}</CardTitle>
                  <CardDescription>{actor.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating:</span>
                    <Badge variant="secondary">⭐ {actor.rating}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Projects:</span>
                    <span>{actor.projects}</span>
                  </div>
                  <Button className="w-full mt-4">View Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matching" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Character Matching</CardTitle>
              <CardDescription>Let AI suggest the best actors for your characters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Character</h3>
                <p className="text-muted-foreground mb-4">Choose a character to get AI-powered actor recommendations</p>
                <Button>Browse Characters</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Capture</CardTitle>
              <CardDescription>Record and capture actor performances for your characters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Performance Capture</h3>
                <p className="text-muted-foreground mb-4">Record motion and performance data</p>
                <Button>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Cloning</CardTitle>
              <CardDescription>Clone actor voices for your characters using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Mic className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Clone a Voice</h3>
                <p className="text-muted-foreground mb-4">Upload voice samples to create an AI voice clone</p>
                <Button>
                  <Mic className="w-4 h-4 mr-2" />
                  Upload Voice Sample
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
