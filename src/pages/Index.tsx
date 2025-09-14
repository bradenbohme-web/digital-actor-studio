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
  Zap,
  Menu
} from 'lucide-react';
import { CharacterGallery } from '@/components/casting/CharacterGallery';
import { AdvancedCharacterCreator } from '@/components/casting/AdvancedCharacterCreator';
import { CastingSheets } from '@/components/casting/CastingSheets';
import { AnalyticsDashboard } from '@/components/casting/AnalyticsDashboard';
import { CharacterMarketplace } from '@/components/casting/CharacterMarketplace';
import { AICharacterAssistant } from '@/components/casting/AICharacterAssistant';
import { NFTLockingSystem } from '@/components/casting/NFTLockingSystem';
import { VerticalToolbar } from '@/components/sidebar/VerticalToolbar';
import { CharacterLibraryGrid } from '@/components/characters/CharacterLibraryGrid';

const Index = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  const handleSidebarAction = (action: string) => {
    console.log('Sidebar action:', action);
    // Handle sidebar actions here
    switch (action) {
      case 'ai-generator':
        setActiveTab('ai-assistant');
        break;
      case 'browse':
        setActiveTab('marketplace');
        break;
      case 'nft':
        setActiveTab('nft-system');
        break;
      case 'analytics':
        setActiveTab('analytics');
        break;
      default:
        // Default to gallery for most actions
        setActiveTab('gallery');
    }
  };

  const handleCharacterAction = (action: string, characterId?: string) => {
    console.log('Character action:', action, characterId);
    // Handle character actions here
    switch (action) {
      case 'edit':
        setActiveTab('creator');
        break;
      case 'voice':
        // Handle voice cloning
        break;
      case 'clone':
        // Handle character cloning
        break;
    }
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions here
    switch (action) {
      case 'create':
        setActiveTab('creator');
        break;
      case 'cast':
        setActiveTab('casting');
        break;
      case 'psychology':
        setActiveTab('ai-assistant');
        break;
      case 'voice':
        // Handle voice cloning
        break;
      case 'backstory':
        setActiveTab('ai-assistant');
        break;
      case 'relationships':
        // Handle relationship creation
        break;
      case 'analyze':
        setActiveTab('analytics');
        break;
      case 'consistency':
        // Handle consistency check
        break;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <VerticalToolbar onAction={handleSidebarAction} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border gradient-dark sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center cinematic-glow">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                      LUCID Characters Studio
                    </h1>
                    <p className="text-muted-foreground text-sm">Complete Character Creation & Management Hub</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary hidden md:flex">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary hidden md:flex">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button className="gradient-primary cinematic-glow" onClick={() => setActiveTab('creator')}>
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">New Character</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="glass-card transition-smooth hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    Total Characters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">9</div>
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
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <p className="text-xs text-muted-foreground">2 in production</p>
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
                  <div className="text-2xl font-bold text-foreground">4.2</div>
                  <p className="text-xs text-muted-foreground">+0.3 improvement</p>
                </CardContent>
              </Card>

              <Card className="glass-card transition-smooth hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-orange-500" />
                    AI Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <p className="text-xs text-muted-foreground">completion rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 glass-card">
                <TabsTrigger value="gallery" className="flex items-center space-x-1 text-xs">
                  <Users className="w-3 h-3" />
                  <span className="hidden sm:inline">Gallery</span>
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="flex items-center space-x-1 text-xs">
                  <Star className="w-3 h-3" />
                  <span className="hidden sm:inline">Market</span>
                </TabsTrigger>
                <TabsTrigger value="ai-assistant" className="flex items-center space-x-1 text-xs">
                  <Zap className="w-3 h-3" />
                  <span className="hidden sm:inline">AI</span>
                </TabsTrigger>
                <TabsTrigger value="creator" className="flex items-center space-x-1 text-xs">
                  <Plus className="w-3 h-3" />
                  <span className="hidden sm:inline">Creator</span>
                </TabsTrigger>
                <TabsTrigger value="nft-system" className="flex items-center space-x-1 text-xs">
                  <Filter className="w-3 h-3" />
                  <span className="hidden sm:inline">NFT</span>
                </TabsTrigger>
                <TabsTrigger value="casting" className="flex items-center space-x-1 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span className="hidden sm:inline">Casting</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-1 text-xs">
                  <BarChart3 className="w-3 h-3" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gallery" className="space-y-6">
                <CharacterLibraryGrid 
                  onCharacterAction={handleCharacterAction}
                  onQuickAction={handleQuickAction}
                />
              </TabsContent>

              <TabsContent value="marketplace" className="space-y-6">
                <CharacterMarketplace />
              </TabsContent>

              <TabsContent value="ai-assistant" className="space-y-6">
                <AICharacterAssistant />
              </TabsContent>

              <TabsContent value="creator" className="space-y-6">
                <AdvancedCharacterCreator />
              </TabsContent>

              <TabsContent value="nft-system" className="space-y-6">
                <NFTLockingSystem />
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
    </div>
  );
};

export default Index;