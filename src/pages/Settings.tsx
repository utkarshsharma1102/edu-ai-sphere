
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="appearance">
            <TabsList className="mb-6">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how University AI looks on your device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Theme</h3>
                      <p className="text-sm text-muted-foreground">Select the theme for the dashboard</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="gap-1"
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="gap-1"
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Compact Mode</h3>
                      <p className="text-sm text-muted-foreground">Decrease the size of UI elements</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Animations</h3>
                      <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground mb-4">Update your personal information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <input 
                          type="text" 
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" 
                          defaultValue="Alex Kumar" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input 
                          type="email" 
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" 
                          defaultValue="alex@example.com" 
                        />
                      </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium">Subscription Plan</h3>
                    <p className="text-sm text-muted-foreground mb-2">You are currently on the Pro plan at ₹999/month</p>
                    <div className="flex gap-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline" className="text-destructive hover:bg-destructive/10">Cancel Subscription</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Course Updates</h3>
                      <p className="text-sm text-muted-foreground">Get notified when courses are updated</p>
                    </div>
                    <Switch id="course-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Assignment Reminders</h3>
                      <p className="text-sm text-muted-foreground">Receive reminders about upcoming assignments</p>
                    </div>
                    <Switch id="assignment-reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">AI Tutor Responses</h3>
                      <p className="text-sm text-muted-foreground">Get notified when AI tutor responds to your questions</p>
                    </div>
                    <Switch id="ai-tutor-responses" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive promotions and newsletter emails</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Settings</CardTitle>
                  <CardDescription>Customize your experience for better accessibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium">Voice Speed</h3>
                    <p className="text-sm text-muted-foreground mb-2">Adjust the speed of voice responses</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Slow", "Normal", "Fast"].map((speed) => (
                        <Button 
                          key={speed} 
                          variant={speed === "Normal" ? "default" : "outline"}
                        >
                          {speed}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Screen Reader Optimization</h3>
                      <p className="text-sm text-muted-foreground">Optimize the interface for screen readers</p>
                    </div>
                    <Switch id="screen-reader" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Reduced Motion</h3>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Text Size</h3>
                    <p className="text-sm text-muted-foreground mb-2">Adjust the size of text throughout the application</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Small", "Medium", "Large"].map((size) => (
                        <Button 
                          key={size} 
                          variant={size === "Medium" ? "default" : "outline"}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
