import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Users, 
  Plus, 
  Edit, 
  Eye,
  Clock,
  Star,
  MapPin,
  Camera,
  FileText,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

// Mock casting sheets data
const mockCastingSheets = [
  {
    id: 1,
    title: "Epic Fantasy Adventure - Season 1",
    status: "Active",
    director: "Alex Rodriguez",
    totalScenes: 12,
    charactersNeeded: 8,
    castMembers: 6,
    deadline: "2024-01-15",
    priority: "High",
    location: "Studio A, B",
    description: "Epic fantasy series focusing on magical realism and character-driven storytelling.",
    characters: [
      { name: "Elena Vasquez", role: "Protagonist", status: "Cast", availability: "Full" },
      { name: "Marcus Chen", role: "Supporting", status: "Cast", availability: "Limited" },
      { name: "Dr. Sarah Mitchell", role: "Antagonist", status: "Pending", availability: "Full" },
      { name: "Tommy Rodriguez", role: "Comic Relief", status: "Cast", availability: "Full" }
    ],
    sceneList: [
      { id: 1, name: "Opening Sequence", duration: "3:30", characterCount: 3, status: "Planned" },
      { id: 2, name: "First Encounter", duration: "2:15", characterCount: 2, status: "In Progress" },
      { id: 3, name: "Training Montage", duration: "4:00", characterCount: 4, status: "Planned" }
    ]
  },
  {
    id: 2,
    title: "Corporate Thriller - Pilot Episode",
    status: "Pre-Production",
    director: "Maria Santos",
    totalScenes: 8,
    charactersNeeded: 5,
    castMembers: 5,
    deadline: "2024-01-20",
    priority: "Medium",
    location: "Location Shoot",
    description: "Modern corporate thriller with psychological elements.",
    characters: [
      { name: "Jake Morrison", role: "CEO", status: "Cast", availability: "Full" },
      { name: "Zara Al-Rashid", role: "Investigator", status: "Cast", availability: "Full" },
      { name: "Elena Vasquez", role: "Whistleblower", status: "Cast", availability: "Limited" }
    ],
    sceneList: [
      { id: 1, name: "Boardroom Meeting", duration: "5:00", characterCount: 5, status: "Planned" },
      { id: 2, name: "Phone Call", duration: "1:30", characterCount: 1, status: "Ready" }
    ]
  },
  {
    id: 3,
    title: "Romantic Comedy - Holiday Special",
    status: "Completed",
    director: "Sophie Chen",
    totalScenes: 6,
    charactersNeeded: 4,
    castMembers: 4,
    deadline: "2023-12-20",
    priority: "Low",
    location: "Various",
    description: "Light-hearted holiday romance with ensemble cast.",
    characters: [
      { name: "Tommy Rodriguez", role: "Male Lead", status: "Cast", availability: "Full" },
      { name: "Zara Al-Rashid", role: "Female Lead", status: "Cast", availability: "Full" }
    ],
    sceneList: [
      { id: 1, name: "Meet Cute", duration: "3:00", characterCount: 2, status: "Complete" },
      { id: 2, name: "Christmas Market", duration: "4:30", characterCount: 4, status: "Complete" }
    ]
  }
];

const CastingSheetDetail = ({ sheet }: { sheet: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{sheet.title}</h3>
          <p className="text-muted-foreground">{sheet.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Director</p>
            <p className="text-muted-foreground">{sheet.director}</p>
          </div>
          <div>
            <p className="font-medium">Location</p>
            <p className="text-muted-foreground">{sheet.location}</p>
          </div>
          <div>
            <p className="font-medium">Deadline</p>
            <p className="text-muted-foreground">{sheet.deadline}</p>
          </div>
          <div>
            <p className="font-medium">Priority</p>
            <Badge variant={sheet.priority === 'High' ? 'destructive' : sheet.priority === 'Medium' ? 'default' : 'secondary'}>
              {sheet.priority}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="glass-card p-3 rounded-lg">
            <div className="text-lg font-bold text-primary">{sheet.totalScenes}</div>
            <div className="text-xs text-muted-foreground">Scenes</div>
          </div>
          <div className="glass-card p-3 rounded-lg">
            <div className="text-lg font-bold text-accent">{sheet.castMembers}</div>
            <div className="text-xs text-muted-foreground">Cast</div>
          </div>
          <div className="glass-card p-3 rounded-lg">
            <div className="text-lg font-bold text-yellow-500">{sheet.charactersNeeded}</div>
            <div className="text-xs text-muted-foreground">Needed</div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h4 className="font-semibold">Cast Members</h4>
      <div className="space-y-2">
        {sheet.characters.map((character: any, index: number) => (
          <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">{character.name}</p>
                <p className="text-sm text-muted-foreground">{character.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={character.status === 'Cast' ? 'default' : character.status === 'Pending' ? 'secondary' : 'outline'}>
                {character.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {character.availability}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="flex space-x-3">
      <Button className="gradient-primary">
        <Play className="w-4 h-4 mr-2" />
        Start Production
      </Button>
      <Button variant="outline">
        <Edit className="w-4 h-4 mr-2" />
        Edit Sheet
      </Button>
      <Button variant="outline">
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  </div>
);

export const CastingSheets = () => {
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pre-Production':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Completed':
        return <Star className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Casting Sheets</h2>
          <p className="text-muted-foreground">Manage production schedules and character assignments</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button 
            className="gradient-primary cinematic-glow"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Casting Sheet
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">26</p>
                <p className="text-sm text-muted-foreground">Total Scenes</p>
              </div>
              <Camera className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">Cast Members</p>
              </div>
              <Users className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Casting Sheets List */}
      <div className="space-y-4">
        {mockCastingSheets.map((sheet) => (
          <Card key={sheet.id} className="glass-card transition-smooth hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center space-x-2">
                    {getStatusIcon(sheet.status)}
                    <span>{sheet.title}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Directed by {sheet.director} • {sheet.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(sheet.priority)}>
                    {sheet.priority} Priority
                  </Badge>
                  <Badge variant="outline">{sheet.status}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{sheet.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Due: {sheet.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-muted-foreground" />
                  <span>{sheet.totalScenes} scenes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{sheet.castMembers}/{sheet.charactersNeeded} cast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{sheet.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {sheet.characters.slice(0, 4).map((character: any, index: number) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-medium text-primary-foreground border-2 border-background"
                      title={character.name}
                    >
                      {character.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  ))}
                  {sheet.characters.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground border-2 border-background">
                      +{sheet.characters.length - 4}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSheet(sheet)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl glass-card">
                      <DialogHeader>
                        <DialogTitle>Casting Sheet Details</DialogTitle>
                      </DialogHeader>
                      {selectedSheet && <CastingSheetDetail sheet={selectedSheet} />}
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  
                  {sheet.status === 'Active' && (
                    <Button size="sm" className="gradient-primary">
                      <Play className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};