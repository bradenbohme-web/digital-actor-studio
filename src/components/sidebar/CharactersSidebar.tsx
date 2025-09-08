import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Wand2,
  Camera,
  Users,
  Brain,
  BookOpen,
  ShoppingCart,
  BarChart3,
  Plus,
  Search,
  Heart,
  Clock,
  Database,
  Mic,
  User,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const characterCreationItems = [
  { title: 'AI Character Generator', icon: Wand2, action: 'ai-generator' },
  { title: 'Character Templates', icon: BookOpen, action: 'templates' },
  { title: 'Personality Builder', icon: Brain, action: 'personality' },
  { title: 'Backstory Generator', icon: BookOpen, action: 'backstory' },
  { title: 'Visual Design Tools', icon: Camera, action: 'visual-design' },
  { title: 'Character Consistency', icon: Target, action: 'consistency' },
];

const castingStudioItems = [
  { title: 'Casting Database', icon: Database, action: 'casting-db' },
  { title: 'Character Matching', icon: Users, action: 'matching' },
  { title: 'Performance Capture', icon: Camera, action: 'performance' },
  { title: 'Voice Cloning', icon: Mic, action: 'voice-cloning' },
  { title: 'Actor Database', icon: User, action: 'actors' },
  { title: 'Casting Suggestions', icon: Target, action: 'suggestions' },
];

const characterLibraryItems = [
  { title: 'Project Characters', icon: Users, action: 'project' },
  { title: 'Community Characters', icon: Users, action: 'community' },
  { title: 'Character Templates', icon: BookOpen, action: 'templates' },
  { title: 'Search & Filter', icon: Search, action: 'search' },
  { title: 'Favorites', icon: Heart, action: 'favorites' },
  { title: 'Recent Characters', icon: Clock, action: 'recent' },
];

const marketplaceItems = [
  { title: 'Browse Characters', icon: ShoppingCart, action: 'browse' },
  { title: 'Quality Ratings', icon: BarChart3, action: 'ratings' },
  { title: 'NFT Locking', icon: Target, action: 'nft' },
  { title: 'Famous Actor Avatars', icon: User, action: 'actors' },
  { title: 'Community Reviews', icon: Users, action: 'reviews' },
  { title: 'Usage Analytics', icon: BarChart3, action: 'analytics' },
];

const digitalSoulItems = [
  { title: 'Psychology Builder', icon: Brain, action: 'psychology' },
  { title: 'Behavior Patterns', icon: Target, action: 'behavior' },
  { title: 'Emotional Depth', icon: Heart, action: 'emotions' },
  { title: 'Relationship Mapping', icon: Users, action: 'relationships' },
  { title: 'Character Arcs', icon: BarChart3, action: 'arcs' },
  { title: 'Growth Development', icon: Plus, action: 'growth' },
];

interface CharactersSidebarProps {
  onAction?: (action: string) => void;
}

export function CharactersSidebar({ onAction }: CharactersSidebarProps) {
  const sidebar = useSidebar();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('creation');

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };

  const renderMenuItems = (items: typeof characterCreationItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.action}>
          <SidebarMenuButton 
            onClick={() => handleAction(item.action)}
            className="hover:bg-primary/10 transition-smooth"
          >
            <item.icon className="w-4 h-4 text-primary" />
            {sidebar.open && <span className="text-sm">{item.title}</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className={`${!sidebar.open ? 'w-14' : 'w-72'} border-r border-border/50 bg-background/95 backdrop-blur-sm`}>
      <SidebarContent className="space-y-1">
        {/* Character Creation */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-primary font-semibold">
            <Wand2 className="w-4 h-4 mr-2" />
            {sidebar.open && 'Character Creation'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">6</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(characterCreationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Casting Studio */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-accent font-semibold">
            <Camera className="w-4 h-4 mr-2" />
            {sidebar.open && 'Casting Studio'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">6</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(castingStudioItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Character Library */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-foreground font-semibold">
            <BookOpen className="w-4 h-4 mr-2" />
            {sidebar.open && 'Character Library'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">9</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(characterLibraryItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Character Marketplace */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-orange-500 font-semibold">
            <ShoppingCart className="w-4 h-4 mr-2" />
            {sidebar.open && 'Marketplace'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">New</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(marketplaceItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Digital Soul */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-purple-500 font-semibold">
            <Brain className="w-4 h-4 mr-2" />
            {sidebar.open && 'Digital Soul'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">AI</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(digitalSoulItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active Character Nodes */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-blue-500 font-semibold">
            <BarChart3 className="w-4 h-4 mr-2" />
            {sidebar.open && 'Active Nodes'}
            {sidebar.open && <Badge variant="secondary" className="ml-auto">3</Badge>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {sidebar.open && (
              <div className="px-2 py-1 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center justify-between">
                  <span>Current Project:</span>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Node Properties:</span>
                  <Badge variant="outline" className="text-xs">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Connection Status:</span>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Generation:</span>
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500">Running</Badge>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}