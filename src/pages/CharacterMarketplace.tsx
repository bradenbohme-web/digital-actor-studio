import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ShoppingCart, Eye } from 'lucide-react';

const mockMarketplaceCharacters = [
  { id: 1, name: 'Detective Sarah Chen', creator: 'StudioPro', price: 49.99, rating: 5, reviews: 234, image: '/placeholder.svg', category: 'Detective' },
  { id: 2, name: 'Marcus Black - Villain', creator: 'CharacterMaster', price: 59.99, rating: 4, reviews: 189, image: '/placeholder.svg', category: 'Villain' },
  { id: 3, name: 'Alex Storm - Hero', creator: 'HeroDesigns', price: 54.99, rating: 5, reviews: 312, image: '/placeholder.svg', category: 'Hero' },
  { id: 4, name: 'Tom Hanks Avatar', creator: 'FamousActors', price: 199.99, rating: 5, reviews: 523, image: '/placeholder.svg', category: 'Famous Actor', featured: true },
  { id: 5, name: 'Meryl Streep Avatar', creator: 'FamousActors', price: 199.99, rating: 5, reviews: 487, image: '/placeholder.svg', category: 'Famous Actor', featured: true },
  { id: 6, name: 'Denzel Washington Avatar', creator: 'FamousActors', price: 199.99, rating: 5, reviews: 456, image: '/placeholder.svg', category: 'Famous Actor', featured: true },
  { id: 7, name: 'Jenny Smith - Support', creator: 'SupportingCast', price: 34.99, rating: 3, reviews: 87, image: '/placeholder.svg', category: 'Supporting' },
  { id: 8, name: 'Dr. Wise - Mentor', creator: 'MentorFigures', price: 44.99, rating: 4, reviews: 156, image: '/placeholder.svg', category: 'Mentor' },
  { id: 9, name: 'Bob - Comic Relief', creator: 'ComedyExperts', price: 39.99, rating: 4, reviews: 198, image: '/placeholder.svg', category: 'Comedy' },
];

export function CharacterMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCharacters = mockMarketplaceCharacters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || char.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockMarketplaceCharacters.map(c => c.category)));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Character Marketplace</h1>
        <p className="text-muted-foreground mt-2">Browse and purchase premium characters from the community</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Characters</CardTitle>
          <CardDescription>Top-rated characters and famous actor avatars</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockMarketplaceCharacters.filter(c => c.featured).slice(0, 3).map((char) => (
              <Card key={char.id} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2">Featured</Badge>
                  <h3 className="font-semibold text-lg mb-1">{char.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {char.creator}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(char.rating)}
                    <span className="text-sm text-muted-foreground ml-2">({char.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${char.price}</span>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCharacters.map((char) => (
          <Card key={char.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-1">{char.name}</h3>
                <p className="text-xs text-muted-foreground">by {char.creator}</p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(char.rating)}
                <span className="text-xs text-muted-foreground ml-1">({char.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">${char.price}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
