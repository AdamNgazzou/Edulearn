"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, BookMarked, BarChart3, Settings, Search, Download, MoreHorizontal, Plus, Trash, Edit, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Import the EditUserModal component
import { EditUserModal } from "./edit-user-modal"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-10-01",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 3,
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.g@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-10-02",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 2,
  },
  {
    id: 3,
    name: "Dr. John Smith",
    email: "john.smith@example.com",
    role: "teacher",
    status: "active",
    joinDate: "2024-09-28",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 4,
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.d@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-09-30",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 1,
  },
  {
    id: 5,
    name: "Prof. Sarah Johnson",
    email: "sarah.j@example.com",
    role: "teacher",
    status: "active",
    joinDate: "2024-09-25",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 3,
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.w@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-09-15",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 0,
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.w@example.com",
    role: "teacher",
    status: "active",
    joinDate: "2024-09-20",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 2,
  },
  {
    id: 8,
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-09-18",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 4,
  },
  {
    id: 9,
    name: "William Taylor",
    email: "william.t@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-09-22",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 2,
  },
  {
    id: 10,
    name: "Olivia Anderson",
    email: "olivia.a@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-09-10",
    avatar: "/placeholder.svg?height=40&width=40",
    courses: 3,
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Add state for the edit modal inside the AdminUsersPage component
  const [selectedUser, setSelectedUser] = useState<typeof usersData[0] | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Apply filters
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Stats
  const totalUsers = usersData.length
  const activeUsers = usersData.filter((user) => user.status === "active").length
  const inactiveUsers = usersData.filter((user) => user.status === "inactive").length
  const teacherCount = usersData.filter((user) => user.role === "teacher").length
  const studentCount = usersData.filter((user) => user.role === "student").length

  // Add a function to handle saving edited user
  const handleSaveUser = (updatedUser: typeof usersData[0]) => {
    // In a real app, this would make an API call
    // For now, we'll update the local state
    const updatedUsers = usersData.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    )
    
    // Show success message
    alert(`User ${updatedUser.name} updated successfully!`)
  }

  // Add a function to handle deleting a user
  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      // In a real app, this would make an API call
      // For now, we'll just show an alert
      alert(`User with ID ${userId} would be deleted in a real application.`)
    }
  }

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
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
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
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
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
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">Manage users, roles, and permissions</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeUsers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Teachers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{teacherCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{studentCount}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="teacher">Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === "teacher" ? "outline" : "secondary"}>
                              {user.role === "teacher" ? "Teacher" : "Student"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>
                              {user.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.courses}</TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedUser(user)
                                  setIsEditModalOpen(true)
                                }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <EditUserModal
              user={selectedUser}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSaveUser}
            />
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
