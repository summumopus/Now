"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const treatment = searchParams.get("treatment") || ""

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    treatment: treatment,
    urgency: "",
    budget: [10000],
    location: [],
    priorities: [],
    age: "",
    insurance: "",
    travelReady: "",
  })

  const questions = [
    {
      id: "urgency",
      title: "How urgent is your treatment?",
      description: "This helps us understand your timeline requirements",
      type: "radio",
      options: [
        { value: "emergency", label: "Emergency (within 1 month)" },
        { value: "urgent", label: "Urgent (1-3 months)" },
        { value: "planned", label: "Planned (3-6 months)" },
        { value: "flexible", label: "Flexible (6+ months)" },
      ],
    },
    {
      id: "budget",
      title: "What is your estimated budget?",
      description: "This helps us show relevant options within your range",
      type: "slider",
      min: 1000,
      max: 100000,
      step: 1000,
    },
    {
      id: "location",
      title: "Which regions are you considering?",
      description: "Select all regions you would consider for treatment",
      type: "checkbox",
      options: [
        { value: "asia", label: "Asia (Thailand, India, Singapore, South Korea)" },
        { value: "europe", label: "Europe (Germany, Turkey, Czech Republic)" },
        { value: "americas", label: "Americas (Mexico, Costa Rica, Colombia)" },
        { value: "middle-east", label: "Middle East (UAE, Jordan, Israel)" },
      ],
    },
    {
      id: "priorities",
      title: "What are your main priorities?",
      description: "Select your top priorities for choosing a facility",
      type: "checkbox",
      options: [
        { value: "cost", label: "Cost-effectiveness" },
        { value: "quality", label: "Highest quality care" },
        { value: "speed", label: "Quick treatment availability" },
        { value: "language", label: "English-speaking staff" },
        { value: "accreditation", label: "International accreditation" },
        { value: "technology", label: "Latest medical technology" },
      ],
    },
    {
      id: "age",
      title: "What is your age range?",
      description: "This helps us provide age-appropriate information",
      type: "radio",
      options: [
        { value: "under-30", label: "Under 30" },
        { value: "30-50", label: "30-50" },
        { value: "50-70", label: "50-70" },
        { value: "over-70", label: "Over 70" },
      ],
    },
    {
      id: "insurance",
      title: "Do you have international health insurance?",
      description: "This affects payment and reimbursement options",
      type: "radio",
      options: [
        { value: "yes", label: "Yes, with international coverage" },
        { value: "domestic", label: "Yes, but domestic only" },
        { value: "no", label: "No insurance coverage" },
        { value: "unsure", label: "Not sure about coverage" },
      ],
    },
    {
      id: "travelReady",
      title: "Are you ready to travel for treatment?",
      description: "This helps us understand your travel considerations",
      type: "radio",
      options: [
        { value: "yes", label: "Yes, ready to travel anywhere" },
        { value: "nearby", label: "Only to nearby countries" },
        { value: "concerns", label: "Have concerns about traveling" },
        { value: "companion", label: "Need to travel with companion" },
      ],
    },
  ]

  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Quiz completed, redirect to results
      const queryParams = new URLSearchParams({
        treatment: answers.treatment,
        urgency: answers.urgency,
        budget: answers.budget[0].toString(),
        location: Array.isArray(answers.location) ? answers.location.join(",") : "",
        priorities: Array.isArray(answers.priorities) ? answers.priorities.join(",") : "",
        age: answers.age,
        insurance: answers.insurance,
        travelReady: answers.travelReady,
      })
      router.push(`/results?${queryParams.toString()}`)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id as keyof typeof answers]

  const isAnswered = () => {
    if (currentQuestion.type === "checkbox") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    if (currentQuestion.type === "slider") {
      return true // Slider always has a value
    }
    return currentAnswer && currentAnswer !== ""
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
            </Link>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Treatment: {treatment}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
              <CardDescription className="text-base">{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestion.type === "radio" && (
                <RadioGroup
                  value={currentAnswer as string}
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                >
                  {currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-base cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "checkbox" && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.value}
                        checked={Array.isArray(currentAnswer) && currentAnswer.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const current = Array.isArray(currentAnswer) ? currentAnswer : []
                          if (checked) {
                            handleAnswer(currentQuestion.id, [...current, option.value])
                          } else {
                            handleAnswer(
                              currentQuestion.id,
                              current.filter((v) => v !== option.value),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={option.value} className="text-base cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === "slider" && (
                <div className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={Array.isArray(currentAnswer) ? currentAnswer : [10000]}
                      onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                      max={currentQuestion.max}
                      min={currentQuestion.min}
                      step={currentQuestion.step}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>${currentQuestion.min?.toLocaleString()}</span>
                      <span className="font-medium text-blue-600">
                        ${Array.isArray(currentAnswer) ? currentAnswer[0].toLocaleString() : "10,000"}
                      </span>
                      <span>${currentQuestion.max?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <Button onClick={handleNext} disabled={!isAnswered()} className="bg-blue-600 hover:bg-blue-700">
                  {currentStep === questions.length - 1 ? "Get Results" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
