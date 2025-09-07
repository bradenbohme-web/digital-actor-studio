import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Lock, 
  Unlock, 
  Crown, 
  DollarSign, 
  Calendar, 
  Shield, 
  Key,
  Wallet,
  Star,
  Award,
  FileText,
  Eye,
  Edit,
  Share,
  Download,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Globe,
  Users,
  Settings
} from 'lucide-react';

interface LicenseModel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  features: string[];
  restrictions: string[];
  color: string;
}

const licenseModels: LicenseModel[] = [
  {
    id: 'free',
    name: 'Creative Commons',
    description: 'Open source, unlimited use with attribution',
    icon: <Unlock className="w-5 h-5" />,
    basePrice: 0,
    features: [
      'Unlimited usage',
      'Remixable content', 
      'Commercial use allowed',
      'All assets included',
      'Community support'
    ],
    restrictions: [
      'Attribution required',
      'No exclusive rights',
      'Cannot prevent others from using'
    ],
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  },
  {
    id: 'premium-per-film',
    name: 'Per-Film License',
    description: 'Licensed for specific film production',
    icon: <FileText className="w-5 h-5" />,
    basePrice: 100,
    features: [
      'Single film/project usage',
      'Full asset access',
      'Limited modifications',
      'Commercial use included',
      'Producer support'
    ],
    restrictions: [
      'Single project only',
      'No resale rights',
      'Limited to specified timeframe'
    ],
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'premium-forever',
    name: 'Forever Access',
    description: 'Permanent usage rights for all projects',
    icon: <Crown className="w-5 h-5" />,
    basePrice: 1000,
    features: [
      'Unlimited projects',
      'Permanent access',
      'Full modifications allowed',
      'Commercial use included',
      'Priority support',
      'Future updates included'
    ],
    restrictions: [
      'No resale rights',
      'Cannot redistribute raw assets'
    ],
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'backstory-protected',
    name: 'Backstory Protected',
    description: 'Visual assets only, backstory remains private',
    icon: <Shield className="w-5 h-5" />,
    basePrice: 300,
    features: [
      'Visual assets included',
      'Voice samples included',
      'Animation sequences',
      'Commercial use allowed'
    ],
    restrictions: [
      'No backstory access',
      'Limited character depth',
      'Cannot modify core personality'
    ],
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    id: 'exclusive',
    name: 'Exclusive Rights',
    description: 'Full exclusive ownership and control',
    icon: <Star className="w-5 h-5" />,
    basePrice: 10000,
    features: [
      'Exclusive ownership',
      'Full control over usage',
      'Prevent others from using',
      'All future derivatives',
      'White-glove support',
      'Custom modifications'
    ],
    restrictions: [
      'High cost investment',
      'Responsibility for character development'
    ],
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }
];

interface NFTCharacter {
  id: string;
  name: string;
  image: string;
  owner: string;
  creator: string;
  currentLicense: string;
  nftValue: number;
  totalEarnings: number;
  usageCount: number;
  qualityRating: number;
  blockchainId: string;
}

export const NFTLockingSystem = () => {
  const [selectedLicense, setSelectedLicense] = useState<string>('premium-per-film');
  const [customPrice, setCustomPrice] = useState<number>(100);
  const [duration, setDuration] = useState<number>(12);
  const [exclusivityRadius, setExclusivityRadius] = useState<number>(0);
  const [revenueSplit, setRevenueSplit] = useState<number>(70);
  
  const [nftSettings, setNftSettings] = useState({
    enableNFT: true,
    royaltyPercentage: 10,
    transferable: true,
    burnable: false,
    upgradeable: true,
    fractionalOwnership: false
  });

  const selectedModel = licenseModels.find(model => model.id === selectedLicense);

  const calculateFinalPrice = () => {
    let price = selectedModel?.basePrice || customPrice;
    
    // Duration multiplier
    if (selectedLicense === 'premium-per-film') {
      price *= Math.max(1, duration / 6); // Base 6 months
    }
    
    // Exclusivity premium
    if (exclusivityRadius > 0) {
      price *= (1 + exclusivityRadius / 100);
    }
    
    return Math.round(price);
  };

  const handleCreateNFT = async () => {
    toast.info('Creating NFT with smart contract...');
    
    // Simulate NFT creation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success(`NFT created successfully! License: ${selectedModel?.name}, Price: $${calculateFinalPrice()}`);
  };

  const handlePreviewLicense = () => {
    toast.info('Opening license preview...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">NFT Locking System</h2>
          <p className="text-muted-foreground">Create blockchain-secured character licenses</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            <Zap className="w-3 h-3 mr-1" />
            Blockchain Secured
          </Badge>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Smart Contracts
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* License Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                License Model Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {licenseModels.map((model) => (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer transition-all duration-200 border-2 ${
                      selectedLicense === model.id 
                        ? model.color 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedLicense(model.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {model.icon}
                          <span className="ml-2 font-semibold">{model.name}</span>
                        </div>
                        {selectedLicense === model.id && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                      
                      <div className="text-lg font-bold">
                        {model.basePrice === 0 ? 'Free' : `$${model.basePrice}+`}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-green-400">Features:</p>
                        {model.features.slice(0, 3).map((feature, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {feature}</p>
                        ))}
                      </div>
                      
                      {model.restrictions.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-orange-400">Restrictions:</p>
                          {model.restrictions.slice(0, 2).map((restriction, index) => (
                            <p key={index} className="text-xs text-muted-foreground">• {restriction}</p>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* License Configuration */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                License Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedLicense === 'premium-per-film' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Duration (months)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min="1"
                      max="60"
                    />
                    <p className="text-xs text-muted-foreground">Typical film production: 6-12 months</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Exclusivity Radius (%)</Label>
                    <div className="px-3">
                      <Slider
                        value={[exclusivityRadius]}
                        onValueChange={(value) => setExclusivityRadius(value[0])}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {exclusivityRadius === 0 ? 'No exclusivity' : `${exclusivityRadius}% exclusivity premium`}
                    </p>
                  </div>
                </div>
              )}

              {selectedLicense === 'exclusive' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Exclusivity Period (months)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min="12"
                      max="240"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Revenue Split (%)</Label>
                    <div className="px-3">
                      <Slider
                        value={[revenueSplit]}
                        onValueChange={(value) => setRevenueSplit(value[0])}
                        min={50}
                        max={90}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You get {revenueSplit}%, creator gets {100 - revenueSplit}%
                    </p>
                  </div>
                </div>
              )}

              {selectedLicense !== 'free' && (
                <div className="space-y-2">
                  <Label>Custom Pricing Adjustment</Label>
                  <Input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    min={selectedModel?.basePrice || 0}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum: ${selectedModel?.basePrice || 0}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* NFT Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2 text-primary" />
                NFT Smart Contract Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-nft">Enable NFT Minting</Label>
                    <Switch
                      id="enable-nft"
                      checked={nftSettings.enableNFT}
                      onCheckedChange={(checked) => 
                        setNftSettings(prev => ({ ...prev, enableNFT: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transferable">Transferable</Label>
                    <Switch
                      id="transferable"
                      checked={nftSettings.transferable}
                      onCheckedChange={(checked) => 
                        setNftSettings(prev => ({ ...prev, transferable: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="upgradeable">Upgradeable</Label>
                    <Switch
                      id="upgradeable"
                      checked={nftSettings.upgradeable}
                      onCheckedChange={(checked) => 
                        setNftSettings(prev => ({ ...prev, upgradeable: checked }))
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="burnable">Burnable</Label>
                    <Switch
                      id="burnable"
                      checked={nftSettings.burnable}
                      onCheckedChange={(checked) => 
                        setNftSettings(prev => ({ ...prev, burnable: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fractional">Fractional Ownership</Label>
                    <Switch
                      id="fractional"
                      checked={nftSettings.fractionalOwnership}
                      onCheckedChange={(checked) => 
                        setNftSettings(prev => ({ ...prev, fractionalOwnership: checked }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Royalty Percentage</Label>
                    <div className="px-3">
                      <Slider
                        value={[nftSettings.royaltyPercentage]}
                        onValueChange={(value) => 
                          setNftSettings(prev => ({ ...prev, royaltyPercentage: value[0] }))
                        }
                        max={20}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {nftSettings.royaltyPercentage}% royalty on secondary sales
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Actions */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                License Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">License Type:</span>
                  <Badge className={selectedModel?.color}>
                    {selectedModel?.name}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base Price:</span>
                  <span className="font-medium">${selectedModel?.basePrice || customPrice}</span>
                </div>
                
                {selectedLicense === 'premium-per-film' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="font-medium">{duration} months</span>
                  </div>
                )}
                
                {exclusivityRadius > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Exclusivity:</span>
                    <span className="font-medium">+{exclusivityRadius}%</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Final Price:</span>
                    <span className="text-primary">${calculateFinalPrice()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full gradient-primary"
                  onClick={handleCreateNFT}
                  disabled={!nftSettings.enableNFT}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Create NFT License
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handlePreviewLicense}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview License
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" />
                Blockchain Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span>Ethereum Mainnet</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Fee:</span>
                  <span>~$12-25</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confirmation:</span>
                  <span>2-5 minutes</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Royalties:</span>
                  <span>{nftSettings.royaltyPercentage}%</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Shield className="w-3 h-3 mr-1" />
                  Secured by smart contracts
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-400" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground">
                • NFT licenses are blockchain-enforced and cannot be reversed
              </p>
              <p className="text-xs text-muted-foreground">
                • Royalties are automatically distributed to creators
              </p>
              <p className="text-xs text-muted-foreground">
                • License terms are immutable once minted
              </p>
              <p className="text-xs text-muted-foreground">
                • Gas fees apply for all blockchain transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};