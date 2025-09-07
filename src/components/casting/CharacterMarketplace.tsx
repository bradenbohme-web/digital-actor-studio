import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  Star, 
  Crown, 
  Heart, 
  Download, 
  Lock, 
  Unlock,
  Eye,
  ShoppingCart,
  Wallet,
  Users,
  Flame,
  Clock,
  Award,
  Bot,
  Mic,
  Palette,
  DollarSign,
  Zap,
  Loader2,
  Edit,
  Plus
} from 'lucide-react';

// Import character images for marketplace
import annaRef from '@/assets/characters/anna-reference.jpg';
import businessmanRef from '@/assets/characters/businessman-reference.jpg';
import elenaVasquez from '@/assets/characters/elena-vasquez.jpg';
import davidRodriguez from '@/assets/characters/david-rodriguez.jpg';
import sarahChen from '@/assets/characters/sarah-chen.jpg';

interface MarketplaceCharacter {
  id: string;
  name: string;
  category: string;
  creator: string;
  image: string;
  description: string;
  rating: number;
  downloads: number;
  price: number;
  isNFT: boolean;
  license: 'free' | 'premium' | 'nft-locked' | 'actor-avatar';
  tags: string[];
  quality: 1 | 2 | 3 | 4 | 5;
  voiceIncluded: boolean;
  animationsIncluded: boolean;
  backstoryIncluded: boolean;
  assets: {
    portraits: number;
    fullBody: number;
    poses: number;
    emotions: number;
    outfits: number;
  };
  usage: {
    commercial: boolean;
    modifications: boolean;
    resale: boolean;
  };
  trending: boolean;
  featured: boolean;
  createdAt: string;
}

const mockMarketplaceCharacters: MarketplaceCharacter[] = [
  {
    id: '1',
    name: 'Detective Marcus Kane',
    category: 'Detective/Investigator',
    creator: 'AI Studio',
    image: businessmanRef,
    description: 'Cyberpunk detective with cybernetic eye enhancement. Complete with tragic backstory and AI-powered behavioral patterns.',
    rating: 4.9,
    downloads: 1247,
    price: 150,
    isNFT: true,
    license: 'nft-locked',
    tags: ['Detective', 'Cyberpunk', 'AI-Enhanced', 'Premium'],
    quality: 5,
    voiceIncluded: true,
    animationsIncluded: true,
    backstoryIncluded: true,
    assets: { portraits: 12, fullBody: 8, poses: 15, emotions: 10, outfits: 6 },
    usage: { commercial: true, modifications: false, resale: false },
    trending: true,
    featured: true,
    createdAt: '2025-01-05'
  },
  {
    id: '2',
    name: 'Anna Williams - Professional',
    category: 'Business/Professional',
    creator: 'Community',
    image: annaRef,
    description: 'Versatile professional character perfect for corporate storytelling. Multiple outfits and emotions included.',
    rating: 4.7,
    downloads: 892,
    price: 0,
    isNFT: false,
    license: 'free',
    tags: ['Professional', 'Versatile', 'Community', 'Open Source'],
    quality: 4,
    voiceIncluded: true,
    animationsIncluded: false,
    backstoryIncluded: true,
    assets: { portraits: 8, fullBody: 6, poses: 10, emotions: 8, outfits: 4 },
    usage: { commercial: true, modifications: true, resale: true },
    trending: false,
    featured: false,
    createdAt: '2025-01-03'
  },
  {
    id: '3',
    name: 'Tom Hanks Avatar',
    category: 'Actor Avatars',
    creator: 'Tom Hanks Official',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
    description: 'Official Tom Hanks digital avatar with AI-trained voice and authentic performance style.',
    rating: 5.0,
    downloads: 423,
    price: 1000,
    isNFT: true,
    license: 'actor-avatar',
    tags: ['Celebrity', 'Official', 'Premium', 'Hollywood'],
    quality: 5,
    voiceIncluded: true,
    animationsIncluded: true,
    backstoryIncluded: false,
    assets: { portraits: 20, fullBody: 15, poses: 25, emotions: 15, outfits: 10 },
    usage: { commercial: true, modifications: false, resale: false },
    trending: true,
    featured: true,
    createdAt: '2025-01-01'
  },
  {
    id: '4',
    name: 'Elena Executive',
    category: 'Business/Professional',
    creator: 'ProChar Studios',
    image: elenaVasquez,
    description: 'Confident executive character with leadership qualities. Perfect for corporate and business scenarios.',
    rating: 4.6,
    downloads: 567,
    price: 75,
    isNFT: false,
    license: 'premium',
    tags: ['Executive', 'Leadership', 'Professional', 'Premium'],
    quality: 4,
    voiceIncluded: true,
    animationsIncluded: true,
    backstoryIncluded: true,
    assets: { portraits: 10, fullBody: 8, poses: 12, emotions: 8, outfits: 5 },
    usage: { commercial: true, modifications: true, resale: false },
    trending: false,
    featured: false,
    createdAt: '2025-01-02'
  },
  {
    id: '5',
    name: 'Aria Lightbringer',
    category: 'Fantasy/Medieval',
    creator: 'FantasyForge',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop&crop=face',
    description: 'Elven warrior with magical abilities. Complete fantasy character with spells and combat animations.',
    rating: 4.8,
    downloads: 1156,
    price: 200,
    isNFT: true,
    license: 'nft-locked',
    tags: ['Fantasy', 'Elf', 'Warrior', 'Magic'],
    quality: 5,
    voiceIncluded: true,
    animationsIncluded: true,
    backstoryIncluded: true,
    assets: { portraits: 15, fullBody: 12, poses: 20, emotions: 12, outfits: 8 },
    usage: { commercial: true, modifications: false, resale: false },
    trending: true,
    featured: true,
    createdAt: '2024-12-28'
  },
  {
    id: '6',
    name: 'David Rodriguez - Mentor',
    category: 'Supporting Characters',
    creator: 'Community',
    image: davidRodriguez,
    description: 'Wise mentor character with supportive personality. Great for guidance and teaching roles.',
    rating: 4.5,
    downloads: 334,
    price: 0,
    isNFT: false,
    license: 'free',
    tags: ['Mentor', 'Wise', 'Supportive', 'Community'],
    quality: 3,
    voiceIncluded: false,
    animationsIncluded: false,
    backstoryIncluded: true,
    assets: { portraits: 6, fullBody: 4, poses: 8, emotions: 6, outfits: 3 },
    usage: { commercial: true, modifications: true, resale: true },
    trending: false,
    featured: false,
    createdAt: '2025-01-04'
  }
];

const categories = [
  'All Categories',
  'Detective/Investigator', 
  'Fantasy/Medieval', 
  'Sci-Fi/Futuristic',
  'Business/Professional',
  'Actor Avatars',
  'Supporting Characters',
  'Custom Creations'
];

const licenses = [
  'All Licenses',
  'Free',
  'Premium', 
  'NFT Locked',
  'Actor Avatar'
];

const sortOptions = [
  'Trending',
  'Most Downloaded',
  'Highest Rated',
  'Recently Added',
  'Price: Low to High',
  'Price: High to Low'
];

export const CharacterMarketplace = () => {
  const [characters, setCharacters] = useState<MarketplaceCharacter[]>(mockMarketplaceCharacters);
  const [filteredCharacters, setFilteredCharacters] = useState<MarketplaceCharacter[]>(mockMarketplaceCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<MarketplaceCharacter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLicense, setSelectedLicense] = useState('All Licenses');
  const [sortBy, setSortBy] = useState('Trending');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedLicense, sortBy, characters]);

  const applyFilters = () => {
    let filtered = [...characters];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(char => char.category === selectedCategory);
    }

    // License filter
    if (selectedLicense !== 'All Licenses') {
      const licenseMap = {
        'Free': 'free',
        'Premium': 'premium',
        'NFT Locked': 'nft-locked',
        'Actor Avatar': 'actor-avatar'
      };
      filtered = filtered.filter(char => char.license === licenseMap[selectedLicense]);
    }

    // Sort
    switch (sortBy) {
      case 'Trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.downloads - a.downloads);
        break;
      case 'Most Downloaded':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'Highest Rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Recently Added':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredCharacters(filtered);
  };

  const handlePurchase = async (character: MarketplaceCharacter) => {
    setLoading(true);
    try {
      // Simulate purchase/licensing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (character.price === 0) {
        toast.success(`${character.name} added to your library!`);
      } else {
        toast.success(`Successfully licensed ${character.name} for $${character.price}`);
      }
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const CharacterCard = ({ character }: { character: MarketplaceCharacter }) => (
    <Card className="glass-card transition-smooth hover:scale-105 overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {character.featured && (
              <Badge className="gradient-primary">
                <Crown className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {character.trending && (
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                <Flame className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {character.isNFT && (
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                <Lock className="w-3 h-3 mr-1" />
                NFT
              </Badge>
            )}
          </div>

          {/* Quality Stars */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              <span className="text-xs text-white">{character.rating}</span>
            </div>
          </div>

          {/* Character Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold text-white">{character.name}</h3>
            <p className="text-sm text-gray-200">{character.category}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Download className="w-4 h-4 mr-1" />
            {character.downloads.toLocaleString()}
          </div>
          <div className="flex items-center">
            {Array.from({ length: character.quality }).map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {character.description}
        </p>

        {/* Asset Summary */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            {character.voiceIncluded && <Mic className="w-3 h-3 text-green-400" />}
            {character.animationsIncluded && <Zap className="w-3 h-3 text-blue-400" />}
            {character.backstoryIncluded && <Bot className="w-3 h-3 text-purple-400" />}
          </div>
          <span>{character.assets.portraits + character.assets.fullBody} assets</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {character.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            {character.price === 0 ? (
              <span className="text-green-400">Free</span>
            ) : (
              <span className="text-foreground">${character.price}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl glass-card">
                <DialogHeader>
                  <DialogTitle>Character Details</DialogTitle>
                </DialogHeader>
                {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
              </DialogContent>
            </Dialog>
            
            <Button 
              size="sm" 
              className="gradient-primary"
              onClick={() => handlePurchase(character)}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : character.price === 0 ? (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  Get
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Buy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CharacterDetail = ({ character }: { character: MarketplaceCharacter }) => (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-40 h-48 object-cover rounded-lg"
          />
          {character.isNFT && (
            <Badge className="absolute -top-2 -right-2 gradient-primary">
              <Lock className="w-3 h-3 mr-1" />
              NFT
            </Badge>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{character.name}</h3>
            <p className="text-lg text-muted-foreground">{character.category}</p>
            <p className="text-sm text-muted-foreground">by {character.creator}</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {character.rating}/5
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              {character.downloads.toLocaleString()} downloads
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {character.createdAt}
            </div>
          </div>
          
          <p className="text-muted-foreground">{character.description}</p>
          
          <div>
            <h4 className="font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Asset Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Palette className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{character.assets.portraits}</div>
            <p className="text-sm text-muted-foreground">Portraits</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold">{character.assets.fullBody}</div>
            <p className="text-sm text-muted-foreground">Full Body</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{character.assets.poses}</div>
            <p className="text-sm text-muted-foreground">Poses</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            <div className="text-2xl font-bold">{character.assets.emotions}</div>
            <p className="text-sm text-muted-foreground">Emotions</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{character.assets.outfits}</div>
            <p className="text-sm text-muted-foreground">Outfits</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Bot className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-lg font-bold">
              {character.quality}
              <Star className="w-4 h-4 inline ml-1 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h4 className="font-semibold">Included Features</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className={`flex items-center p-2 rounded ${character.voiceIncluded ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
            <Mic className="w-4 h-4 mr-2" />
            Voice Samples
          </div>
          <div className={`flex items-center p-2 rounded ${character.animationsIncluded ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-500'}`}>
            <Zap className="w-4 h-4 mr-2" />
            Animations
          </div>
          <div className={`flex items-center p-2 rounded ${character.backstoryIncluded ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-500'}`}>
            <Bot className="w-4 h-4 mr-2" />
            AI Backstory
          </div>
        </div>
      </div>

      {/* License & Usage */}
      <div className="space-y-3">
        <h4 className="font-semibold">License & Usage Rights</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className={`flex items-center p-2 rounded ${character.usage.commercial ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <DollarSign className="w-4 h-4 mr-2" />
            Commercial Use
          </div>
          <div className={`flex items-center p-2 rounded ${character.usage.modifications ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <Edit className="w-4 h-4 mr-2" />
            Modifications
          </div>
          <div className={`flex items-center p-2 rounded ${character.usage.resale ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <Wallet className="w-4 h-4 mr-2" />
            Resale Rights
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4 border-t border-border">
        <Button 
          className="flex-1 gradient-primary"
          onClick={() => handlePurchase(character)}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : character.price === 0 ? (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Free
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              License for ${character.price}
            </>
          )}
        </Button>
        <Button variant="outline">
          <Heart className="w-4 h-4 mr-2" />
          Favorite
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Character Marketplace</h2>
          <p className="text-muted-foreground">Discover, license, and download amazing characters</p>
        </div>
        
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Submit Character
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my-licenses">My Licenses</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters and Search */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search characters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedLicense} onValueChange={setSelectedLicense}>
                  <SelectTrigger>
                    <SelectValue placeholder="License" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenses.map((license) => (
                      <SelectItem key={license} value={license}>{license}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {filteredCharacters.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">No characters found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.filter(char => char.featured).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.filter(char => char.trending).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-licenses" className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">No Licensed Characters</h3>
              <p className="text-muted-foreground mb-4">Browse the marketplace to license amazing characters</p>
              <Button className="gradient-primary" onClick={() => setActiveTab('browse')}>
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};