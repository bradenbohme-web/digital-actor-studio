import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Bot, 
  Send, 
  Wand2, 
  Brain, 
  Palette, 
  Mic, 
  Zap,
  User,
  Heart,
  Settings,
  FileText,
  Image as ImageIcon,
  Play,
  Download,
  RefreshCw,
  Sparkles,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ConversationMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'asset-generation' | 'character-creation';
  data?: any;
}

interface CharacterDevelopmentStage {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  progress: number;
  icon: React.ReactNode;
}

const developmentStages: CharacterDevelopmentStage[] = [
  {
    id: 'concept',
    name: 'Concept Development',
    description: 'Basic character idea and vision',
    completed: false,
    progress: 0,
    icon: <Brain className="w-4 h-4" />
  },
  {
    id: 'personality',
    name: 'Personality Design',
    description: 'OCEAN profile and behavioral patterns',
    completed: false,
    progress: 0,
    icon: <Heart className="w-4 h-4" />
  },
  {
    id: 'backstory',
    name: 'Backstory Creation',
    description: 'Complete character history and development',
    completed: false,
    progress: 0,
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: 'visual',
    name: 'Visual Assets',
    description: 'Character portraits and full-body renders',
    completed: false,
    progress: 0,
    icon: <ImageIcon className="w-4 h-4" />
  },
  {
    id: 'voice',
    name: 'Voice Identity',
    description: 'Voice samples and speech patterns',
    completed: false,
    progress: 0,
    icon: <Mic className="w-4 h-4" />
  },
  {
    id: 'animation',
    name: 'Animation Sequences',
    description: 'Movement and expression animations',
    completed: false,
    progress: 0,
    icon: <Zap className="w-4 h-4" />
  }
];

const aiSuggestions = [
  "I want to create a detective character",
  "Help me design a fantasy warrior",
  "Create a modern professional character",
  "I need a mentor character with wisdom",
  "Design a cyberpunk hacker",
  "Make a romantic lead character"
];

export const AICharacterAssistant = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: "Welcome to LUCID Character Creator! I'm here to help you build an amazing character. Let's start with the basics - what kind of character are you envisioning?",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [characterData, setCharacterData] = useState({
    name: '',
    concept: '',
    personality: {},
    backstory: '',
    traits: [] as string[]
  });

  const sendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): ConversationMessage => {
    const lowerInput = userInput.toLowerCase();
    
    // Detect character type mentions
    if (lowerInput.includes('detective')) {
      return {
        id: Date.now().toString(),
        role: 'ai',
        content: "Excellent! A detective character. Let me ask you some questions to help build this character:\n\n1. What's their background? Are they a police detective, private investigator, or something else?\n2. What's their personality like? Are they methodical, intuitive, or a mix of both?\n3. What's their greatest strength and weakness?\n4. Do they have any unique traits or abilities?\n5. What's their motivation for being a detective?",
        timestamp: new Date(),
        type: 'suggestion',
        data: {
          suggestions: [
            "He's a cyberpunk detective with a cybernetic eye",
            "She's a small-town detective with intuitive skills",
            "They're a retired FBI agent turned private investigator",
            "A supernatural detective who solves paranormal cases"
          ]
        }
      };
    }

    if (lowerInput.includes('cyberpunk') || lowerInput.includes('cybernetic')) {
      return {
        id: Date.now().toString(),
        role: 'ai',
        content: "Fascinating! A cyberpunk detective with cybernetic enhancements. This opens up so many possibilities:\n\n- How did he get the cybernetic eye? Was it an injury, choice, or enhancement?\n- What can the cybernetic eye do? Enhanced vision, data analysis, recording?\n- How does it affect his relationships with others?\n- What's the technology level in your world?\n\nLet me start building the character profile...",
        timestamp: new Date(),
        type: 'character-creation',
        data: {
          characterType: 'cyberpunk-detective',
          traits: ['Analytical', 'Tech-Enhanced', 'Determined', 'Haunted'],
          backstory: 'Former military with experimental cybernetic procedures'
        }
      };
    }

    if (lowerInput.includes('fantasy') || lowerInput.includes('warrior')) {
      return {
        id: Date.now().toString(),
        role: 'ai',
        content: "A fantasy warrior! Perfect choice. Let's explore this character:\n\n1. What's their weapon of choice? Sword, bow, magic, or something unique?\n2. Are they part of an order, army, or lone wanderer?\n3. What drives them to fight? Justice, revenge, protection, or glory?\n4. Do they have magical abilities or rely on skill alone?\n5. What's their greatest fear or weakness?\n\nI can create everything from an elven archer to a dwarven berserker!",
        timestamp: new Date(),
        type: 'suggestion',
        data: {
          suggestions: [
            "An elven archer with nature magic",
            "A dwarven warrior with ancient weapons",
            "A human paladin seeking justice",
            "A half-orc barbarian with a noble heart"
          ]
        }
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'ai',
      content: "I understand you want to explore that direction. Let me help you develop this character further. Can you tell me more about:\n\n1. Their background and history\n2. Their personality traits\n3. Their goals and motivations\n4. Any unique abilities or characteristics\n\nThe more details you provide, the better I can help create an amazing character!",
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const startCharacterGeneration = async () => {
    setIsTyping(true);
    toast.info('Starting character generation...');
    
    // Simulate character generation process
    const stages = ['concept', 'personality', 'backstory', 'visual', 'voice', 'animation'];
    
    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiMessage: ConversationMessage = {
        id: Date.now().toString(),
        role: 'ai',
        content: `Generating ${stages[i]} assets... This will create professional-quality ${stages[i]} materials for your character.`,
        timestamp: new Date(),
        type: 'asset-generation',
        data: { stage: stages[i] }
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setCurrentStage(i + 1);
    }
    
    setIsTyping(false);
    toast.success('Character generation completed!');
  };

  const MessageBubble = ({ message }: { message: ConversationMessage }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {message.role === 'ai' && (
        <Avatar className="w-8 h-8 mr-2 mt-1">
          <AvatarFallback className="gradient-primary">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : ''}`}>
        <div className={`p-3 rounded-lg ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground ml-2' 
            : 'bg-muted mr-2'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {message.type === 'suggestion' && message.data?.suggestions && (
            <div className="mt-3 space-y-2">
              {message.data.suggestions.map((suggestion: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          
          {message.type === 'character-creation' && message.data && (
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-1">
                {message.data.traits?.map((trait: string) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
              <Button
                size="sm"
                className="gradient-primary w-full"
                onClick={startCharacterGeneration}
              >
                <Wand2 className="w-3 h-3 mr-2" />
                Generate Character Assets
              </Button>
            </div>
          )}
          
          {message.type === 'asset-generation' && (
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              Generating...
            </div>
          )}
        </div>
        
        <div className={`text-xs text-muted-foreground mt-1 ${
          message.role === 'user' ? 'text-right mr-2' : 'ml-2'
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      {message.role === 'user' && (
        <Avatar className="w-8 h-8 ml-2 mt-1">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="glass-card h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2 text-primary" />
              AI Character Assistant
              <Badge variant="secondary" className="ml-2">Beta</Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback className="gradient-primary">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg mr-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Describe your character idea..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={() => sendMessage()} className="gradient-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Development Progress */}
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Development Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {developmentStages.map((stage, index) => (
              <div key={stage.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-1 rounded ${
                      index < currentStage ? 'bg-green-500/20 text-green-400' :
                      index === currentStage ? 'bg-primary/20 text-primary' :
                      'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {index < currentStage ? <CheckCircle className="w-4 h-4" /> : stage.icon}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{stage.name}</p>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                </div>
                <Progress 
                  value={index < currentStage ? 100 : index === currentStage ? 50 : 0} 
                  className="h-1"
                />
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              AI Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Creativity Level</label>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">Controls how creative vs realistic the AI responses are</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Detail Level</label>
              <Progress value={60} className="h-2" />
              <p className="text-xs text-muted-foreground">How detailed character descriptions should be</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Generation Speed</label>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">Balance between speed and quality</p>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};