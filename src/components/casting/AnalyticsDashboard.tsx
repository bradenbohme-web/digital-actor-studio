import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Star,
  Clock,
  Zap,
  Download,
  Filter,
  Calendar,
  Award,
  Target,
  Activity
} from 'lucide-react';

// Mock analytics data
const characterPerformanceData = [
  { name: "Elena Vasquez", usage: 85, quality: 9.8, projects: 3, trending: "up" },
  { name: "Jake Morrison", usage: 72, quality: 9.1, projects: 3, trending: "up" },
  { name: "Zara Al-Rashid", usage: 68, quality: 9.4, projects: 2, trending: "stable" },
  { name: "Tommy Rodriguez", usage: 61, quality: 8.9, projects: 4, trending: "down" },
  { name: "Marcus Chen", usage: 45, quality: 9.2, projects: 2, trending: "up" },
  { name: "Dr. Sarah Mitchell", usage: 38, quality: 9.6, projects: 1, trending: "stable" }
];

const projectStats = [
  { project: "Epic Fantasy Adventure", characters: 6, scenes: 12, completion: 75, status: "Active" },
  { project: "Corporate Thriller", characters: 5, scenes: 8, completion: 45, status: "Pre-Production" },
  { project: "Romantic Comedy", characters: 4, scenes: 6, completion: 100, status: "Completed" }
];

const qualityMetrics = [
  { metric: "Visual Consistency", score: 94, trend: +3 },
  { metric: "Voice Quality", score: 91, trend: +2 },
  { metric: "Emotional Range", score: 88, trend: +5 },
  { metric: "Generation Speed", score: 92, trend: -1 }
];

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Performance insights and character usage analytics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter Period
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2 text-primary" />
              Active Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Avg Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">9.2</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +0.3 improvement
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2 text-orange-500" />
              Generation Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2.3s</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
              -0.5s faster
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="w-4 h-4 mr-2 text-blue-500" />
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +28% this week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Character Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Character Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {characterPerformanceData.map((character, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {character.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{character.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {character.projects} projects • Quality: {character.quality}/10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{character.usage}%</span>
                    {character.trending === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {character.trending === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {character.trending === 'stable' && <Activity className="w-4 h-4 text-gray-500" />}
                  </div>
                </div>
                <Progress value={character.usage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Project Statistics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-accent" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectStats.map((project, index) => (
              <div key={index} className="glass-card p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{project.project}</h4>
                    <p className="text-xs text-muted-foreground">
                      {project.characters} characters • {project.scenes} scenes
                    </p>
                  </div>
                  <Badge variant={
                    project.status === 'Active' ? 'default' : 
                    project.status === 'Completed' ? 'secondary' : 'outline'
                  }>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{metric.score}%</div>
                <div className="text-sm text-muted-foreground mb-2">{metric.metric}</div>
                <div className={`flex items-center justify-center text-xs ${
                  metric.trend > 0 ? 'text-green-500' : metric.trend < 0 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {metric.trend > 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : metric.trend < 0 ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : (
                    <Activity className="w-3 h-3 mr-1" />
                  )}
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm">Most Used Characters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {characterPerformanceData.slice(0, 3).map((character, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs text-primary-foreground">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{character.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{character.usage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm">Highest Quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...characterPerformanceData]
              .sort((a, b) => b.quality - a.quality)
              .slice(0, 3)
              .map((character, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{character.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{character.quality}/10</span>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">2 hours ago</div>
              <div className="text-sm">Elena Vasquez generated for Scene 3</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">5 hours ago</div>
              <div className="text-sm">New character "Alex Chen" created</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">1 day ago</div>
              <div className="text-sm">Quality improvement: +0.2 average</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};