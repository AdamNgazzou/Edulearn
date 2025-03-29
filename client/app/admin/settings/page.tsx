"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, BookMarked, BarChart3, Settings, Save, Globe, Bell, Lock, CreditCard, Mail, Palette } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge"
export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <Link href="/" className="text-xl font-bold">
              EduLearn
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex flex-col gap-2 p-4">
            <Link 
              href="/admin" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/admin/users" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link 
              href="/admin/courses" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <BookMarked className="h-4 w-4" />
              Courses
            </Link>
            <Link 
              href="/admin/analytics" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-8">
            <div className="flex flex-col space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage platform settings and configurations</p>
              </div>
              
              <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 md:w-auto">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Information</CardTitle>
                      <CardDescription>
                        Update your platform details and information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="EduLearn" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="platform-description">Platform Description</Label>
                        <Textarea 
                          id="platform-description" 
                          defaultValue="A modern learning management system for students and teachers"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="support@edulearn.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website-url">Website URL</Label>
                        <Input id="website-url" type="url" defaultValue="https://edulearn.com" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Settings</CardTitle>
                      <CardDescription>
                        Configure timezone and localization preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                            <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                            <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                            <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="enable-multilingual" />
                        <Label htmlFor="enable-multilingual">Enable multilingual support</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Globe className="mr-2 h-4 w-4" />
                        Save Regional Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Theme Settings</CardTitle>
                      <CardDescription>
                        Customize the look and feel of your platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Color Theme</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-full rounded-md bg-primary"></div>
                            <span className="text-xs">Primary</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-full rounded-md bg-secondary"></div>
                            <span className="text-xs">Secondary</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-full rounded-md bg-accent"></div>
                            <span className="text-xs">Accent</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Theme Mode</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="light-mode" name="theme-mode" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="light-mode">Light</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="dark-mode" name="theme-mode" className="h-4 w-4" />
                            <Label htmlFor="dark-mode">Dark</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="system-mode" name="theme-mode" className="h-4 w-4" />
                            <Label htmlFor="system-mode">System</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="logo-upload">Platform Logo</Label>
                        <Input id="logo-upload" type="file" />
                        <p className="text-xs text-muted-foreground">Recommended size: 200x50px. Max file size: 2MB.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="favicon-upload">Favicon</Label>
                        <Input id="favicon-upload" type="file" />
                        <p className="text-xs text-muted-foreground">Recommended size: 32x32px. Max file size: 1MB.</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Palette className="mr-2 h-4 w-4" />
                        Save Appearance
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Configure email and in-app notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Email Notifications</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-new-user">New User Registration</Label>
                            <p className="text-xs text-muted-foreground">Receive notifications when new users register</p>
                          </div>
                          <Switch id="email-new-user" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-course-enrollment">Course Enrollments</Label>
                            <p className="text-xs text-muted-foreground">Receive notifications for new course enrollments</p>
                          </div>
                          <Switch id="email-course-enrollment" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-course-completion">Course Completions</Label>
                            <p className="text-xs text-muted-foreground">Receive notifications when users complete courses</p>
                          </div>
                          <Switch id="email-course-completion" />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">System Notifications</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-updates">System Updates</Label>
                            <p className="text-xs text-muted-foreground">Receive notifications about platform updates</p>
                          </div>
                          <Switch id="system-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="security-alerts">Security Alerts</Label>
                            <p className="text-xs text-muted-foreground">Receive notifications about security issues</p>
                          </div>
                          <Switch id="security-alerts" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-sender">Email Sender Name</Label>
                        <Input id="email-sender" defaultValue="EduLearn Support" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-from">From Email Address</Label>
                        <Input id="email-from" type="email" defaultValue="noreply@edulearn.com" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Bell className="mr-2 h-4 w-4" />
                        Save Notification Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Configure security and authentication options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                            <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                          </div>
                          <Switch id="two-factor" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="social-login">Social Login</Label>
                            <p className="text-xs text-muted-foreground">Allow users to sign in with social accounts</p>
                          </div>
                          <Switch id="social-login" defaultChecked />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />

                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Password Policy</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="min-length">Minimum Password Length</Label>
                            <p className="text-xs text-muted-foreground">Minimum number of characters required</p>
                          </div>
                          <Select defaultValue="8">
                            <SelectTrigger id="min-length" className="w-20">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">6</SelectItem>
                              <SelectItem value="8">8</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="12">12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="require-special">Require Special Characters</Label>
                            <p className="text-xs text-muted-foreground">Require at least one special character</p>
                          </div>
                          <Switch id="require-special" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="password-expiry">Password Expiry</Label>
                            <p className="text-xs text-muted-foreground">Force password reset after period</p>
                          </div>
                          <Select defaultValue="90">
                            <SelectTrigger id="password-expiry" className="w-28">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="60">60 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Lock className="mr-2 h-4 w-4" />
                        Save Security Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Settings</CardTitle>
                      <CardDescription>
                        Manage payment methods and subscription details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Current Plan</Label>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Enterprise Plan</h3>
                              <p className="text-sm text-muted-foreground">$499/month, billed annually</p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                          <div className="mt-4 text-sm">
                            <p>Next billing date: November 15, 2024</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-5 w-5" />
                              <div>
                                <h3 className="font-medium">Visa ending in 4242</h3>
                                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Billing Address</Label>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">EduLearn Inc.</h3>
                              <p className="text-sm text-muted-foreground">
                                123 Education St.<br />
                                San Francisco, CA 94103<br />
                                United States
                              </p>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Billing History</Label>
                        <div className="rounded-md border">
                          <div className="flex items-center justify-between border-b p-4">
                            <div>
                              <h3 className="font-medium">Invoice #INV-2024-001</h3>
                              <p className="text-sm text-muted-foreground">October 15, 2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">$499.00</Badge>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b p-4">
                            <div>
                              <h3 className="font-medium">Invoice #INV-2024-000</h3>
                              <p className="text-sm text-muted-foreground">September 15, 2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">$499.00</Badge>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Billing Information
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="w-full border-t py-4">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduLearn</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 EduLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
