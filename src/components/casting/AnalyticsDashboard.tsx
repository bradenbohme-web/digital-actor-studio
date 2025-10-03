import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Image, Brain, Zap } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
            <TrendingUp className="w-3 h-3" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground mt-2">Monitor character creation metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Characters" value="127" change="+12%" trend="up" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="AI Generations" value="543" change="+23%" trend="up" icon={<Brain className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Images Created" value="1,234" change="+18%" trend="up" icon={<Image className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Active Projects" value="8" change="+2" trend="up" icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Distribution</CardTitle>
            <CardDescription>Character quality scores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exceptional (9-10)</span>
                <span className="font-medium">34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Excellent (7-8)</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Good (5-6)</span>
                <span className="font-medium">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>AI generation performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Successful</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Retry Required</span>
                <span className="font-medium">5%</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
            <div className="pt-4 border-t text-sm text-muted-foreground">
              Average time: <span className="text-foreground font-medium">12.3s</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Types</CardTitle>
          <CardDescription>Most created categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Heroes', count: 45, percentage: 35 },
              { type: 'Villains', count: 28, percentage: 22 },
              { type: 'Supporting', count: 32, percentage: 25 },
              { type: 'NPCs', count: 22, percentage: 18 },
            ].map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.type}</span>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
