import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Camera, 
  Mic, 
  Eye, 
  Star,
  Filter,
  Search,
  Play,
  Edit,
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';
import { CharacterGallery } from '@/components/casting/CharacterGallery';
import { CharacterCreator } from '@/components/casting/CharacterCreator';
import { CastingSheets } from '@/components/casting/CastingSheets';
import { AnalyticsDashboard } from '@/components/casting/AnalyticsDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border gradient-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center cinematic-glow">
                <Camera className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  Casting Studio
                </h1>
                <p className="text-muted-foreground">Revolutionary Digital Persona Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button className="gradient-primary cinematic-glow">
                <Plus className="w-4 h-4 mr-2" />
                New Character
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card transition-smooth hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Total Characters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="glass-card transition-smooth hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Eye className="w-4 h-4 mr-2 text-accent" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">6 in production</p>
            </CardContent>
          </Card>

          <Card className="glass-card transition-smooth hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Avg Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">9.2</div>
              <p className="text-xs text-muted-foreground">+0.3 improvement</p>
            </CardContent>
          </Card>

          <Card className="glass-card transition-smooth hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2 text-orange-500" />
                Generation Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2.3s</div>
              <p className="text-xs text-muted-foreground">avg per asset</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-card">
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Character Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="creator" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Character</span>
            </TabsTrigger>
            <TabsTrigger value="casting" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Casting Sheets</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <CharacterGallery />
          </TabsContent>

          <TabsContent value="creator" className="space-y-6">
            <CharacterCreator />
          </TabsContent>

          <TabsContent value="casting" className="space-y-6">
            <CastingSheets />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;