import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Play, 
  Edit, 
  Star, 
  Eye, 
  Mic, 
  Users,
  Calendar,
  Heart,
  Zap,
  MoreVertical,
  Loader2
} from 'lucide-react';

// Mock character data
const mockCharacters = [
  {
    id: 1,
    name: "Elena Vasquez",
    role: "Lead Protagonist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop&crop=face",
    personality: ["Determined", "Compassionate", "Leader"],
    voiceType: "Warm Contralto",
    projects: 3,
    lastUsed: "2 days ago",
    qualityScore: 9.8,
    status: "Active"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Supporting Character",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    personality: ["Witty", "Loyal", "Tech-Savvy"],
    voiceType: "Tenor",
    projects: 2,
    lastUsed: "1 week ago",
    qualityScore: 9.2,
    status: "Available"
  },
  {
    id: 3,
    name: "Dr. Sarah Mitchell",
    role: "Antagonist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
    personality: ["Calculating", "Intelligent", "Ruthless"],
    voiceType: "Alto",
    projects: 1,
    lastUsed: "3 days ago",
    qualityScore: 9.6,
    status: "In Production"
  },
  {
    id: 4,
    name: "Tommy Rodriguez",
    role: "Comic Relief",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    personality: ["Humorous", "Optimistic", "Energetic"],
    voiceType: "Baritone",
    projects: 4,
    lastUsed: "5 hours ago",
    qualityScore: 8.9,
    status: "Active"
  },
  {
    id: 5,
    name: "Zara Al-Rashid",
    role: "Mentor",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=400&fit=crop&crop=face",
    personality: ["Wise", "Patient", "Mysterious"],
    voiceType: "Mezzo-Soprano",
    projects: 2,
    lastUsed: "1 day ago",
    qualityScore: 9.4,
    status: "Available"
  },
  {
    id: 6,
    name: "Jake Morrison",
    role: "Action Hero",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face",
    personality: ["Brave", "Impulsive", "Protective"],
    voiceType: "Bass",
    projects: 3,
    lastUsed: "4 hours ago",
    qualityScore: 9.1,
    status: "Active"
  }
];

const CharacterDetail = ({ character }: { character: any }) => (
  <div className="space-y-6">
    <div className="flex items-start space-x-6">
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-32 h-40 object-cover rounded-lg"
        />
        <Badge className="absolute -top-2 -right-2 gradient-primary">{character.status}</Badge>
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{character.name}</h3>
          <p className="text-lg text-muted-foreground">{character.role}</p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {character.qualityScore}/10
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {character.projects} projects
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {character.lastUsed}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Personality Traits</h4>
          <div className="flex flex-wrap gap-2">
            {character.personality.map((trait: string) => (
              <Badge key={trait} variant="secondary">{trait}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-1">Voice Profile</h4>
          <p className="text-muted-foreground">{character.voiceType}</p>
        </div>
      </div>
    </div>
    
    <div className="flex space-x-3">
      <Button className="gradient-primary">
        <Play className="w-4 h-4 mr-2" />
        Generate Scene
      </Button>
      <Button variant="outline">
        <Edit className="w-4 h-4 mr-2" />
        Edit Character
      </Button>
      <Button variant="outline">
        <Mic className="w-4 h-4 mr-2" />
        Test Voice
      </Button>
    </div>
  </div>
);

export const CharacterGallery = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCharacters(mockCharacters); // Fallback to mock data for demo
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('get-characters', {
        body: { userId: user.id }
      });

      if (error) {
        console.error('Error loading characters:', error);
        toast.error('Failed to load characters');
        setCharacters(mockCharacters); // Fallback to mock data
      } else {
        // Combine real characters with mock characters for demo
        const realCharacters = data.characters.map(char => ({
          id: char.id,
          name: char.name,
          role: char.role || 'Custom Character',
          image: char.imageUrl || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop&crop=face',
          personality: char.personality_traits || [],
          voiceType: char.voice_type || 'Not set',
          projects: 0,
          lastUsed: 'Recently',
          qualityScore: 9.5,
          status: 'Generated'
        }));
        setCharacters([...realCharacters, ...mockCharacters]);
      }
    } catch (error) {
      console.error('Error:', error);
      setCharacters(mockCharacters); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Character Gallery</h2>
          <p className="text-muted-foreground">Manage your digital personas and their assets</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadCharacters}>
            <Users className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="glass-card transition-smooth hover:scale-105 overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white">{character.name}</h3>
                  <p className="text-sm text-gray-200">{character.role}</p>
                </div>
                <Badge className="absolute top-3 right-3 gradient-primary">{character.status}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {character.qualityScore}/10
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Eye className="w-4 h-4 mr-1" />
                  {character.projects} projects
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Personality</p>
                <div className="flex flex-wrap gap-1">
                  {character.personality.slice(0, 2).map((trait: string) => (
                    <Badge key={trait} variant="secondary" className="text-xs">{trait}</Badge>
                  ))}
                  {character.personality.length > 2 && (
                    <Badge variant="secondary" className="text-xs">+{character.personality.length - 2}</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="flex-1 gradient-primary"
                      onClick={() => setSelectedCharacter(character)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl glass-card">
                    <DialogHeader>
                      <DialogTitle>Character Details</DialogTitle>
                    </DialogHeader>
                    {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};