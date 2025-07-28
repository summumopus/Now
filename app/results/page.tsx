"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Clock, Heart, Phone, Mail, Globe, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { getFacilities, type Facility } from "@/lib/supabase"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Get quiz answers from URL params
  const quizData = useMemo(
    () => ({
      treatment: searchParams.get("treatment") || "",
      urgency: searchParams.get("urgency") || "",
      budget: Number.parseInt(searchParams.get("budget") || "10000"),
      location: searchParams.get("location")?.split(",").filter(Boolean) || [],
      priorities: searchParams.get("priorities")?.split(",").filter(Boolean) || [],
      age: searchParams.get("age") || "",
      insurance: searchParams.get("insurance") || "",
      travelReady: searchParams.get("travelReady") || "",
    }),
    [searchParams],
  )

  const fetchFacilities = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const filters = {
        treatment: quizData.treatment,
        budget: quizData.budget,
        region: quizData.location,
        limit: 20,
      }

      const data = await getFacilities(filters)
      setFacilities(data)
    } catch (err) {
      console.error("Error fetching facilities:", err)
      setError("Failed to load facilities. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [quizData])

  useEffect(() => {
    fetchFacilities()
  }, [fetchFacilities])

  const sortedFacilities = useMemo(() => {
    return [...facilities].sort((a, b) => {
      // Prioritize facilities within budget
      const aInBudget = a.estimated_cost <= quizData.budget * 1.2
      const bInBudget = b.estimated_cost <= quizData.budget * 1.2

      if (aInBudget && !bInBudget) return -1
      if (!aInBudget && bInBudget) return 1

      // Then sort by rating
      return b.rating - a.rating
    })
  }, [facilities, quizData.budget])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading treatment information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchFacilities}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/quiz" className="text-gray-600 hover:text-gray-900 transition-colors">
                Retake Quiz
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                New Search
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Results Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Treatment Information for: {quizData.treatment}</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">Based on your preferences:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Budget:</span> ${quizData.budget.toLocaleString()}
              </div>
              <div>
                <span className="text-blue-700">Urgency:</span> {quizData.urgency}
              </div>
              <div>
                <span className="text-blue-700">Regions:</span> {quizData.location.join(", ") || "Any"}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input placeholder="Refine your search..." className="w-full" />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Found {sortedFacilities.length} facilities matching your criteria</p>
            <Select defaultValue="match">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {sortedFacilities.map((facility) => (
            <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-80 relative">
                  <Image
                    src={facility.image_urls?.[0] || "/placeholder.svg?height=240&width=320"}
                    alt={facility.name}
                    width={320}
                    height={240}
                    className="w-full h-60 md:h-full object-cover"
                    priority={false}
                    loading="lazy"
                  />
                  {facility.estimated_cost <= quizData.budget && (
                    <Badge className="absolute top-3 left-3 bg-green-600">Within Budget</Badge>
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{facility.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{facility.location}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{facility.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({facility.review_count} reviews)</span>
                        </div>
                        <Badge variant="secondary">{facility.specialty}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{facility.price_range}</div>
                      <div className="text-sm text-gray-500">Estimated cost</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{facility.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <div>
                        <div className="font-medium">Wait Time</div>
                        <div className="text-gray-500">{facility.wait_time}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <div className="font-medium">Languages</div>
                        <div className="text-gray-500">{facility.languages.slice(0, 2).join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      <div>
                        <div className="font-medium">Accreditation</div>
                        <div className="text-gray-500">{facility.accreditation.join(", ")}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/facility/${facility.id}`} className="flex-1">
                      <Button className="w-full">View Details</Button>
                    </Link>
                    <Button variant="outline" size="icon" title="Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Email">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedFacilities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No facilities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your criteria or budget range to see more options.</p>
              <Link href="/quiz">
                <Button>Retake Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Important Notice */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">
              The information provided is for reference only. Prices are estimates and may vary. Please contact
              facilities directly to verify current pricing, availability, and treatment details. Always consult with
              qualified healthcare professionals before making medical decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
