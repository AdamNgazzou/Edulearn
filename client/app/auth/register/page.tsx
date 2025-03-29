"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Github,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [role, setRole] = useState("student")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [expertise, setExpertise] = useState<string[]>([])
  const [newExpertise, setNewExpertise] = useState("")
  const [education, setEducation] = useState<Array<{ degree: string; institution: string; year: string }>>([])
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Form data
  const [formData, setFormData] = useState({
    // Basic info
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",

    // Professional info (for teachers)
    bio: "",
    department: "",

    // Student info
    program: "",
    interests: [],
  })

  // Add state for student achievements
  const [achievements, setAchievements] = useState<Array<{ title: string; date: string; description: string }>>([])
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData({
      ...formData,
      password: newPassword,
    })

    // Clear error for password when user types
    if (formErrors.password) {
      setFormErrors({
        ...formErrors,
        password: "",
      })
    }

    // Simple password strength calculation
    let strength = 0
    if (newPassword.length >= 8) strength += 1
    if (/[A-Z]/.test(newPassword)) strength += 1
    if (/[0-9]/.test(newPassword)) strength += 1
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1

    setPasswordStrength(strength)
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Very weak"
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Medium"
    if (passwordStrength === 3) return "Strong"
    return "Very strong"
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-red-500"
    if (passwordStrength === 1) return "bg-orange-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-green-500"
    return "bg-green-600"
  }

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !expertise.includes(newExpertise.trim())) {
      setExpertise([...expertise, newExpertise.trim()])
      setNewExpertise("")
    }
  }

  const handleRemoveExpertise = (item: string) => {
    setExpertise(expertise.filter((exp) => exp !== item))
  }

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }])
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setEducation(updatedEducation)
  }

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {}

    if (currentStep === 1) {
      // Validate basic information
      if (!formData.name.trim()) {
        errors.name = "Name is required"
      }

      if (!formData.email.trim()) {
        errors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address"
      }

      if (!formData.password.trim()) {
        errors.password = "Password is required"
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
      }
    }

    if (currentStep === 3) {
      if (role === "student" && !formData.program.trim()) {
        errors.program = "Program is required"
      }

      if (role === "teacher" && !formData.department.trim()) {
        errors.department = "Department is required"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1)
    } else {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((interest) => interest !== item))
  }

  const handleAddAchievement = () => {
    setAchievements([...achievements, { title: "", date: "", description: "" }])
  }

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...achievements]
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value }
    setAchievements(updatedAchievements)
  }

  const handleRemoveAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    // Final validation of all required fields
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.password.trim()) errors.password = "Password is required"

    if (role === "student" && !formData.program.trim()) {
      errors.program = "Program is required"
    }

    if (role === "teacher" && !formData.department.trim()) {
      errors.department = "Department is required"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Combine all form data
    const completeFormData = {
      ...formData,
      role,
      // Teacher-specific data
      expertise: role === "teacher" ? expertise : [],
      education: role === "teacher" ? education : [],
      // Student-specific data
      interests: role === "student" ? interests : [],
      achievements: role === "student" ? achievements : [],
      avatar: avatarPreview,
    }

    console.log("Form submitted with data:", completeFormData)

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false)
      // Redirect based on role
      window.location.href = role === "teacher" ? "/teacher" : "/student"
    }, 1500)
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
          <Button size="sm" variant="outline" asChild>
            <Link href="/auth/register">Sign in</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Enter your basic information to create an account"}
              {currentStep === 2 && "Tell us more about yourself"}
              {currentStep === 3 && role === "teacher" && "Add your professional details"}
              {currentStep === 3 && role === "student" && "Add your academic details"}
              {currentStep === 4 && "Review your information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step indicators */}
              <div className="flex justify-between mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step
                          ? "bg-primary text-primary-foreground"
                          : currentStep > step
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">
                      {step === 1 && "Basic"}
                      {step === 2 && "Role"}
                      {step === 3 && "Details"}
                      {step === 4 && "Review"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className={`pl-10 ${formErrors.name ? "border-red-500" : ""}`}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`pl-10 pr-10 ${formErrors.password ? "border-red-500" : ""}`}
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    {formErrors.password && <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>}

                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`${getStrengthColor()} h-full`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password strength: <span className="font-medium">{getStrengthText()}</span>
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                          <li className="flex items-center gap-1">
                            <CheckCircle
                              className={`h-3 w-3 ${formData.password.length >= 8 ? "text-green-500" : "text-muted-foreground"}`}
                            />
                            <span>At least 8 characters</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle
                              className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}
                            />
                            <span>At least one uppercase letter</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle
                              className={`h-3 w-3 ${/[0-9]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}
                            />
                            <span>At least one number</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle
                              className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}
                            />
                            <span>At least one special character</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="City, State/Province, Country"
                        className="pl-10"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Role Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} />
                        <AvatarFallback>
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
                        <p className="text-xs text-muted-foreground mt-1">Upload a profile picture (optional)</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>I am a...</Label>
                    <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <RadioGroupItem value="student" id="student" className="peer sr-only" />
                        <Label
                          htmlFor="student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <GraduationCap className="mb-3 h-6 w-6" />
                          <span className="text-lg font-medium">Student</span>
                          <span className="text-xs text-muted-foreground text-center mt-1">
                            I want to take courses and learn new skills
                          </span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                        <Label
                          htmlFor="teacher"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Briefcase className="mb-3 h-6 w-6" />
                          <span className="text-lg font-medium">Teacher</span>
                          <span className="text-xs text-muted-foreground text-center mt-1">
                            I want to create courses and teach students
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 3: Role-specific Details */}
              {currentStep === 3 && role === "teacher" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about your professional background and teaching experience..."
                      className="min-h-[100px]"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="department"
                        name="department"
                        type="text"
                        placeholder="Computer Science, Mathematics, etc."
                        className={`pl-10 ${formErrors.department ? "border-red-500" : ""}`}
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {formErrors.department && <p className="text-xs text-red-500 mt-1">{formErrors.department}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Areas of Expertise</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {expertise.map((item, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {item}
                          <button
                            type="button"
                            className="ml-2 text-muted-foreground hover:text-foreground"
                            onClick={() => handleRemoveExpertise(item)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an area of expertise"
                        value={newExpertise}
                        onChange={(e) => setNewExpertise(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddExpertise()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddExpertise} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Education History</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddEducation}>
                        Add Education
                      </Button>
                    </div>

                    {education.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">
                        No education history added yet. Click "Add Education" to begin.
                      </p>
                    )}

                    {education.map((edu, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Education #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEducation(index)}
                            className="h-8 w-8 p-0 text-muted-foreground"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            placeholder="Ph.D. in Computer Science"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${index}`}>Institution</Label>
                          <Input
                            id={`institution-${index}`}
                            placeholder="Stanford University"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`year-${index}`}>Year</Label>
                          <Input
                            id={`year-${index}`}
                            placeholder="2015"
                            value={edu.year}
                            onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Student-specific Details */}
              {currentStep === 3 && role === "student" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">
                      Program <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="program"
                        name="program"
                        type="text"
                        placeholder="Bachelor of Science in Computer Science"
                        className={`pl-10 ${formErrors.program ? "border-red-500" : ""}`}
                        value={formData.program}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {formErrors.program && <p className="text-xs text-red-500 mt-1">{formErrors.program}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {interests.map((item, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {item}
                          <button
                            type="button"
                            className="ml-2 text-muted-foreground hover:text-foreground"
                            onClick={() => handleRemoveInterest(item)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an interest"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddInterest()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddInterest} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Achievements</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddAchievement}>
                        Add Achievement
                      </Button>
                    </div>

                    {achievements.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">
                        No achievements added yet. Click "Add Achievement" to begin.
                      </p>
                    )}

                    {achievements.map((achievement, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Achievement #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAchievement(index)}
                            className="h-8 w-8 p-0 text-muted-foreground"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`achievement-title-${index}`}>Title</Label>
                          <Input
                            id={`achievement-title-${index}`}
                            placeholder="Dean's List"
                            value={achievement.title}
                            onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`achievement-date-${index}`}>Date</Label>
                          <Input
                            id={`achievement-date-${index}`}
                            placeholder="Fall 2023"
                            value={achievement.date}
                            onChange={(e) => handleAchievementChange(index, "date", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`achievement-description-${index}`}>Description</Label>
                          <Textarea
                            id={`achievement-description-${index}`}
                            placeholder="Achieved a GPA of 3.8 or higher for the semester"
                            value={achievement.description}
                            onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us a bit about yourself, your learning goals, and interests..."
                      className="min-h-[100px]"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={avatarPreview || "/placeholder.svg?height=64&width=64"} />
                      <AvatarFallback>
                        {formData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{formData.name}</h3>
                      <p className="text-sm text-muted-foreground">{formData.email}</p>
                      <Badge className="mt-1">{role === "teacher" ? "Teacher" : "Student"}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Phone</h4>
                      <p className="text-sm">{formData.phone || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Location</h4>
                      <p className="text-sm">{formData.location || "Not provided"}</p>
                    </div>

                    {role === "teacher" && (
                      <>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Department</h4>
                          <p className="text-sm">{formData.department || "Not provided"}</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <h4 className="text-sm font-medium">Areas of Expertise</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {expertise.length > 0 ? (
                              expertise.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">None provided</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {role === "student" && (
                      <>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Program</h4>
                          <p className="text-sm">{formData.program || "Not provided"}</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <h4 className="text-sm font-medium">Interests</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {interests.length > 0 ? (
                              interests.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">None provided</p>
                            )}
                          </div>
                        </div>
                        {achievements.length > 0 && (
                          <div className="space-y-2 col-span-2">
                            <h4 className="text-sm font-medium">Achievements</h4>
                            {achievements.map((achievement, index) => (
                              <div key={index} className="text-sm border-l-2 border-muted pl-3 py-1">
                                <p className="font-medium">{achievement.title || "Title not specified"}</p>
                                <p className="text-muted-foreground">{achievement.date || "Date not specified"}</p>
                                <p className="text-sm">{achievement.description || "No description"}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-1 col-span-2">
                      <h4 className="text-sm font-medium">{role === "teacher" ? "Professional Bio" : "About Me"}</h4>
                      <p className="text-sm">{formData.bio || "Not provided"}</p>
                    </div>

                    {role === "teacher" && education.length > 0 && (
                      <div className="space-y-2 col-span-2">
                        <h4 className="text-sm font-medium">Education</h4>
                        {education.map((edu, index) => (
                          <div key={index} className="text-sm border-l-2 border-muted pl-3 py-1">
                            <p className="font-medium">{edu.degree || "Degree not specified"}</p>
                            <p className="text-muted-foreground">
                              {edu.institution}
                              {edu.year ? `, ${edu.year}` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div> // Empty div to maintain layout
                )}

                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading || !agreeTerms}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <div className="mt-4 grid gap-2">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign up with Google
              </Button>
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="w-full border-t py-6">
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

