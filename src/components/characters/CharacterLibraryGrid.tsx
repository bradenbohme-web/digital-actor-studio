import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Search,
  Filter,
  BarChart3,
  Plus,
  Edit,
  Copy,
  Mic,
  Eye,
  Star,
  Users,
  Target,
  Wand2,
  Brain,
  Heart,
  Calendar,
  TrendingUp
} from 'lucide-react';

// Import character images
import annaRef from '@/assets/characters/anna-reference.jpg';
import businessmanRef from '@/assets/characters/businessman-reference.jpg';
import elenaVasquez from '@/assets/characters/elena-vasquez.jpg';
import davidRodriguez from '@/assets/characters/david-rodriguez.jpg';
import sarahChen from '@/assets/characters/sarah-chen.jpg';

const mockCharacters = [
  {
    id: '1',
    name: 'Anna Williams',
    role: 'Protagonist',
    type: 'main',
    image: annaRef,
    development: 95,
    voiceCloned: true,
    performanceCapture: true,
    aiGenerated: true,
    rating: 5,
    description: 'Strong female lead with complex emotional depth'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Antagonist',
    type: 'main',
    image: businessmanRef,
    development: 88,
    voiceCloned: true,
    performanceCapture: false,
    aiGenerated: true,
    rating: 4,
    description: 'Corporate villain with hidden vulnerabilities'
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    role: 'Supporting',
    type: 'supporting',
    image: elenaVasquez,
    development: 76,
    voiceCloned: true,
    performanceCapture: true,
    aiGenerated: true,
    rating: 4,
    description: 'Tech expert and loyal friend'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Love Interest',
    type: 'supporting',
    image: davidRodriguez,
    development: 82,
    voiceCloned: false,
    performanceCapture: false,
    aiGenerated: true,
    rating: 4,
    description: 'Charming artist with mysterious past'
  },
  {
    id: '5',
    name: 'Sarah Chen',
    role: 'Mentor',
    type: 'supporting',
    image: sarahChen,
    development: 91,
    voiceCloned: true,
    performanceCapture: true,
    aiGenerated: false,
    rating: 5,
    description: 'Wise mentor with powerful connections'
  },
  {
    id: '6',
    name: 'Alex Storm',
    role: 'Hero',
    type: 'main',
    image: annaRef,
    development: 73,
    voiceCloned: false,
    performanceCapture: false,
    aiGenerated: true,
    rating: 3,
    description: 'Reluctant hero discovering hidden powers'
  },
  {
    id: '7',
    name: 'Shadow Master',
    role: 'Antagonist',
    type: 'antagonist',
    image: businessmanRef,
    development: 67,
    voiceCloned: true,
    performanceCapture: false,
    aiGenerated: true,
    rating: 4,
    description: 'Mysterious dark force manipulating events'
  },
  {
    id: '8',
    name: 'Light Bringer',
    role: 'Protagonist',
    type: 'main',
    image: elenaVasquez,
    development: 89,
    voiceCloned: true,
    performanceCapture: true,
    aiGenerated: false,
    rating: 5,
    description: 'Beacon of hope in dark times'
  },
  {
    id: '9',
    name: 'Buddy',
    role: 'Sidekick',
    type: 'supporting',
    image: davidRodriguez,
    development: 58,
    voiceCloned: false,
    performanceCapture: false,
    aiGenerated: true,
    rating: 3,
    description: 'Loyal companion with comic relief'
  }
];

const quickActions = [
  { title: 'Create New Character', icon: Wand2, color: 'text-primary', action: 'create' },
  { title: 'Cast Existing Character', icon: Users, color: 'text-accent', action: 'cast' },
  { title: 'Develop Character Psychology', icon: Brain, color: 'text-purple-500', action: 'psychology' },
  { title: 'Clone Character Voice', icon: Mic, color: 'text-blue-500', action: 'voice' },
  { title: 'Generate Character Backstory', icon: Edit, color: 'text-green-500', action: 'backstory' },
  { title: 'Create Character Relationships', icon: Heart, color: 'text-pink-500', action: 'relationships' },
  { title: 'Analyze Character Arc', icon: BarChart3, color: 'text-orange-500', action: 'analyze' },
  { title: 'Character Consistency Check', icon: Target, color: 'text-red-500', action: 'consistency' }
];

const workflowSteps = [
  '1. Create/Select Character',
  '2. Develop Personality & Backstory',
  '3. Design Visual Appearance',
  '4. Clone Voice & Performance',
  '5. Drag to Diagram Characters Column',
  '6. Connect to Storyboard & Video Nodes'
];

interface CharacterLibraryGridProps {
  onCharacterAction?: (action: string, characterId?: string) => void;
  onQuickAction?: (action: string) => void;
}

export function CharacterLibraryGrid({ onCharacterAction, onQuickAction }: CharacterLibraryGridProps) {
  const totalCharacters = mockCharacters.length;
  const mainCharacters = mockCharacters.filter(c => c.type === 'main').length;
  const supportingCharacters = mockCharacters.filter(c => c.type === 'supporting').length;
  const antagonists = mockCharacters.filter(c => c.type === 'antagonist').length;
  const voiceClonedCount = mockCharacters.filter(c => c.voiceCloned).length;
  const performanceCaptureCount = mockCharacters.filter(c => c.performanceCapture).length;
  const aiGeneratedCount = mockCharacters.filter(c => c.aiGenerated).length;
  const avgDevelopment = Math.round(mockCharacters.reduce((sum, c) => sum + c.development, 0) / totalCharacters);

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Character Library & Asset Hub
          </h2>
          <p className="text-muted-foreground">Manage your character collection and create new digital souls</p>
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search characters..." 
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>
          <Select>
            <SelectTrigger className="w-24 bg-background/50 border-border/50">
              <Filter className="w-4 h-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="main">Main</SelectItem>
              <SelectItem value="supporting">Supporting</SelectItem>
              <SelectItem value="antagonist">Antagonist</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24 bg-background/50 border-border/50">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {mockCharacters.map((character) => (
          <Card key={character.id} className="glass-card hover:border-primary/50 transition-smooth group">
            <CardHeader className="pb-2">
              <div className="relative mb-2">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {character.voiceCloned && (
                    <Badge variant="secondary" className="text-xs">
                      <Mic className="w-3 h-3" />
                    </Badge>
                  )}
                  {character.performanceCapture && (
                    <Badge variant="secondary" className="text-xs">
                      <Eye className="w-3 h-3" />
                    </Badge>
                  )}
                  {character.aiGenerated && (
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      AI
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < character.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <CardTitle className="text-sm font-medium">{character.name}</CardTitle>
              <Badge variant="outline" className="text-xs w-fit">{character.role}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground line-clamp-2">{character.description}</p>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Development</span>
                  <span>{character.development}%</span>
                </div>
                <Progress value={character.development} className="h-1" />
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 text-xs h-7"
                  onClick={() => onCharacterAction?.('edit', character.id)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 text-xs h-7"
                  onClick={() => onCharacterAction?.('clone', character.id)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Clone
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 text-xs h-7"
                  onClick={() => onCharacterAction?.('voice', character.id)}
                >
                  <Mic className="w-3 h-3 mr-1" />
                  Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Character Card */}
        <Card className="glass-card border-dashed border-primary/50 hover:border-primary transition-smooth cursor-pointer group">
          <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground">Create New Character</h3>
            <p className="text-xs text-muted-foreground">Use AI to generate a new character</p>
            <Button 
              size="sm" 
              className="mt-2"
              onClick={() => onQuickAction?.('create')}
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Create
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Character Statistics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Character Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalCharacters}</div>
              <div className="text-xs text-muted-foreground">Total Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{mainCharacters}</div>
              <div className="text-xs text-muted-foreground">Main Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{supportingCharacters}</div>
              <div className="text-xs text-muted-foreground">Supporting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{antagonists}</div>
              <div className="text-xs text-muted-foreground">Antagonists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">{avgDevelopment}%</div>
              <div className="text-xs text-muted-foreground">Avg Development</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{voiceClonedCount}</div>
              <div className="text-xs text-muted-foreground">Voice Cloned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-500">{performanceCaptureCount}</div>
              <div className="text-xs text-muted-foreground">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-500">{aiGeneratedCount}</div>
              <div className="text-xs text-muted-foreground">AI Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                className="justify-start h-auto p-3 transition-smooth hover:border-primary/50"
                onClick={() => onQuickAction?.(action.action)}
              >
                <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Workflow */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Character Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50 transition-smooth hover:bg-muted/70">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mr-3 font-medium">
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}