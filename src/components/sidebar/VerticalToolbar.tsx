import { useState } from 'react';
import {
  Wand2,
  Camera,
  BookOpen,
  ShoppingCart,
  Brain,
  BarChart3,
  Plus,
  Search,
  Heart,
  Clock,
  Database,
  Mic,
  User,
  Target,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ToolbarSection {
  id: string;
  icon: any;
  title: string;
  color: string;
  badge?: string;
  items: {
    title: string;
    icon: any;
    action: string;
  }[];
}

const toolbarSections: ToolbarSection[] = [
  {
    id: 'creation',
    icon: Wand2,
    title: 'Character Creation',
    color: 'text-primary',
    badge: '6',
    items: [
      { title: 'AI Character Generator', icon: Wand2, action: 'ai-generator' },
      { title: 'Character Templates', icon: BookOpen, action: 'templates' },
      { title: 'Personality Builder', icon: Brain, action: 'personality' },
      { title: 'Backstory Generator', icon: BookOpen, action: 'backstory' },
      { title: 'Visual Design Tools', icon: Camera, action: 'visual-design' },
      { title: 'Character Consistency', icon: Target, action: 'consistency' },
    ]
  },
  {
    id: 'casting',
    icon: Camera,
    title: 'Casting Studio',
    color: 'text-accent',
    badge: '6',
    items: [
      { title: 'Casting Database', icon: Database, action: 'casting-db' },
      { title: 'Character Matching', icon: Users, action: 'matching' },
      { title: 'Performance Capture', icon: Camera, action: 'performance' },
      { title: 'Voice Cloning', icon: Mic, action: 'voice-cloning' },
      { title: 'Actor Database', icon: User, action: 'actors' },
      { title: 'Casting Suggestions', icon: Target, action: 'suggestions' },
    ]
  },
  {
    id: 'library',
    icon: BookOpen,
    title: 'Character Library',
    color: 'text-foreground',
    badge: '9',
    items: [
      { title: 'Project Characters', icon: Users, action: 'project' },
      { title: 'Community Characters', icon: Users, action: 'community' },
      { title: 'Character Templates', icon: BookOpen, action: 'templates' },
      { title: 'Search & Filter', icon: Search, action: 'search' },
      { title: 'Favorites', icon: Heart, action: 'favorites' },
      { title: 'Recent Characters', icon: Clock, action: 'recent' },
    ]
  },
  {
    id: 'marketplace',
    icon: ShoppingCart,
    title: 'Marketplace',
    color: 'text-orange-500',
    badge: 'New',
    items: [
      { title: 'Browse Characters', icon: ShoppingCart, action: 'browse' },
      { title: 'Quality Ratings', icon: BarChart3, action: 'ratings' },
      { title: 'NFT Locking', icon: Target, action: 'nft' },
      { title: 'Famous Actor Avatars', icon: User, action: 'actors' },
      { title: 'Community Reviews', icon: Users, action: 'reviews' },
      { title: 'Usage Analytics', icon: BarChart3, action: 'analytics' },
    ]
  },
  {
    id: 'soul',
    icon: Brain,
    title: 'Digital Soul',
    color: 'text-purple-500',
    badge: 'AI',
    items: [
      { title: 'Psychology Builder', icon: Brain, action: 'psychology' },
      { title: 'Behavior Patterns', icon: Target, action: 'behavior' },
      { title: 'Emotional Depth', icon: Heart, action: 'emotions' },
      { title: 'Relationship Mapping', icon: Users, action: 'relationships' },
      { title: 'Character Arcs', icon: BarChart3, action: 'arcs' },
      { title: 'Growth Development', icon: Plus, action: 'growth' },
    ]
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Active Nodes',
    color: 'text-blue-500',
    badge: '3',
    items: [
      { title: 'Current Project', icon: BarChart3, action: 'current-project' },
      { title: 'Node Properties', icon: Target, action: 'node-properties' },
      { title: 'Connection Status', icon: Users, action: 'connection-status' },
      { title: 'Performance Metrics', icon: BarChart3, action: 'performance-metrics' },
      { title: 'AI Generation Status', icon: Brain, action: 'ai-status' },
      { title: 'Quality Assessment', icon: Target, action: 'quality-assessment' },
    ]
  }
];

interface VerticalToolbarProps {
  onAction?: (action: string) => void;
}

export function VerticalToolbar({ onAction }: VerticalToolbarProps) {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const handleMainAction = (sectionId: string) => {
    if (onAction) {
      onAction(sectionId);
    }
  };

  const handleSubmenuAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
    setActiveDrawer(null);
  };

  const toggleDrawer = (sectionId: string) => {
    setActiveDrawer(activeDrawer === sectionId ? null : sectionId);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative flex">
        {/* Main Vertical Toolbar */}
        <div className="w-16 bg-card/95 backdrop-blur-sm border-r border-border/50 flex flex-col items-center py-4 space-y-2">
          {toolbarSections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeDrawer === section.id;
            
            return (
              <div key={section.id} className="relative">
                <div className="flex items-center space-x-1">
                  {/* Expand Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "w-8 h-8 p-0 hover:bg-muted/50 transition-smooth",
                      isActive && "bg-muted"
                    )}
                    onClick={() => toggleDrawer(section.id)}
                  >
                    <Plus className={cn(
                      "w-3 h-3 transition-transform",
                      isActive && "rotate-45"
                    )} />
                  </Button>

                  {/* Main Icon Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "w-10 h-10 relative hover:bg-muted/50 transition-smooth group",
                          section.color
                        )}
                        onClick={() => handleMainAction(section.id)}
                      >
                        <IconComponent className="w-5 h-5" />
                        {section.badge && (
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-1 -right-1 h-4 px-1 text-xs scale-75"
                          >
                            {section.badge}
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="glass-card">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {section.items.length} tools available
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submenu Drawer */}
        {activeDrawer && (
          <div className="absolute left-16 top-0 z-50 w-64 h-full bg-card/95 backdrop-blur-sm border-r border-border/50 animate-slide-in-right">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                  {toolbarSections.find(s => s.id === activeDrawer)?.title}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => setActiveDrawer(null)}
                >
                  <Plus className="w-4 h-4 rotate-45" />
                </Button>
              </div>
              
              <div className="space-y-1">
                {toolbarSections
                  .find(s => s.id === activeDrawer)
                  ?.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Button
                        key={item.action}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3 hover:bg-muted/50 transition-smooth"
                        onClick={() => handleSubmenuAction(item.action)}
                      >
                        <ItemIcon className="w-4 h-4 mr-3 text-primary" />
                        <span className="text-sm">{item.title}</span>
                      </Button>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Overlay to close drawer */}
        {activeDrawer && (
          <div 
            className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40"
            onClick={() => setActiveDrawer(null)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}