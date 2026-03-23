'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Save, RotateCcw } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardLayout currentPage="settings">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SYSTEM SETTINGS</h1>
          <p className="text-sm text-neutral-400 mt-1">Configure application and system parameters</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-neutral-900 border border-neutral-700">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="activation">Activation</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">Admin Users</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">APPLICATION SETTINGS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Application Name</Label>
                  <Input placeholder="Telegram Mini App" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Maintenance Mode</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Maintenance Message</Label>
                  <Input placeholder="System is under maintenance..." className="bg-neutral-800 border-neutral-700 text-white" disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-4">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PAYMENT CONFIGURATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Payment Provider</Label>
                  <Select defaultValue="stripe">
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">API Key (Masked)</Label>
                  <Input placeholder="sk_live_••••••••••••••••" className="bg-neutral-800 border-neutral-700 text-white" disabled />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Enable Sandbox Mode</Label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Webhook Secret</Label>
                  <Input placeholder="whsec_••••••••••••••••" className="bg-neutral-800 border-neutral-700 text-white" disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activation Settings */}
          <TabsContent value="activation" className="space-y-4">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ACTIVATION SETTINGS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Max Retry Attempts</Label>
                  <Input type="number" defaultValue="3" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Retry Delay (seconds)</Label>
                  <Input type="number" defaultValue="300" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Enable Auto-Activation</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Manual Review for High-Value Orders</Label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Allowed Domains (comma-separated)</Label>
                  <Input placeholder="example.com, api.example.com" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SECURITY SETTINGS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Enable 2FA</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Enable Audit Logging</Label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-neutral-300">Require Password Change on First Login</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-sm text-neutral-300 mb-2 block">Password Expiry (days)</Label>
                  <Input type="number" defaultValue="90" className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Users */}
          <TabsContent value="users" className="space-y-4">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ADMIN USER ROLES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { role: 'super_admin', description: 'Full system access', permissions: 'All' },
                    { role: 'admin', description: 'Almost full access', permissions: 'All except system settings' },
                    { role: 'operator', description: 'Manage orders and jobs', permissions: 'Orders, Jobs' },
                    { role: 'support', description: 'Support staff', permissions: 'Users, Orders' },
                    { role: 'finance', description: 'Financial reports', permissions: 'Payments, Reports' },
                  ].map((item) => (
                    <div key={item.role} className="p-3 bg-neutral-800 rounded border border-neutral-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white capitalize">{item.role.replace('_', ' ')}</p>
                          <p className="text-xs text-neutral-400 mt-1">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 mb-2">{item.permissions}</p>
                          <Button variant="ghost" size="sm" className="text-xs text-orange-500 hover:text-orange-400">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
