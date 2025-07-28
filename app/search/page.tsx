"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Star, Shield, Clock, Heart, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([5000, 25000])
  const [showFilters, setShowFilters] = useState(false)

  const facilities = [
    {
      id: 1,
      name: "Bangkok International Hospital",
      location: "Bangkok, Thailand",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 1247,
      accreditation: ["JCI", "ISO"],
      priceRange: "$8,000 - $15,000",
      savings: "Save 65%",
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Thai", "Japanese"],
      waitTime: "2-3 weeks",
      successRate: "98.5%",
      description:
        "Leading cardiac care facility with state-of-the-art equipment and internationally trained surgeons.",
    },
    {
      id: 2,
      name: "Apollo Hospitals Chennai",
      location: "Chennai, India",
      specialty: "Orthopedics",
      rating: 4.7,
      reviews: 892,
      accreditation: ["JCI", "NABH"],
      priceRange: "$6,000 - $12,000",
      savings: "Save 75%",
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Hindi", "Tamil"],
      waitTime: "1-2 weeks",
      successRate: "97.2%",
      description: "Renowned orthopedic center with robotic surgery capabilities and comprehensive rehabilitation.",
    },
    {
      id: 3,
      name: "Acibadem Healthcare Group",
      location: "Istanbul, Turkey",
      specialty: "Oncology",
      rating: 4.6,
      reviews: 654,
      accreditation: ["JCI", "TÜV"],
      priceRange: "$12,000 - $28,000",
      savings: "Save 60%",
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Turkish", "Arabic"],
      waitTime: "1-3 weeks",
      successRate: "94.8%",
      description: "Comprehensive cancer treatment center with advanced radiation therapy and immunotherapy options.",
    },
    {
      id: 4,
      name: "Hospital Angeles Tijuana",
      location: "Tijuana, Mexico",
      specialty: "Bariatric Surgery",
      rating: 4.5,
      reviews: 423,
      accreditation: ["JCI", "MBSAQIP"],
      priceRange: "$4,500 - $8,000",
      savings: "Save 70%",
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Spanish"],
      waitTime: "1-2 weeks",
      successRate: "96.1%",
      description:
        "Specialized bariatric surgery center with minimally invasive techniques and comprehensive aftercare.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">MedTravel</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                How it works
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? "Hide" : "Show"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Treatment Type */}
                <div className="space-y-3">
                  <h3 className="font-medium">Treatment Type</h3>
                  <div className="space-y-2">
                    {["Cardiology", "Orthopedics", "Oncology", "Cosmetic Surgery", "Dental Care", "Fertility"].map(
                      (treatment) => (
                        <div key={treatment} className="flex items-center space-x-2">
                          <Checkbox id={treatment} />
                          <label htmlFor={treatment} className="text-sm">
                            {treatment}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <h3 className="font-medium">Country</h3>
                  <div className="space-y-2">
                    {["Thailand", "India", "Turkey", "Mexico", "Singapore", "Germany"].map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox id={country} />
                        <label htmlFor={country} className="text-sm">
                          {country}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accreditation */}
                <div className="space-y-3">
                  <h3 className="font-medium">Accreditation</h3>
                  <div className="space-y-2">
                    {["JCI", "ISO", "NABH", "MBSAQIP"].map((accred) => (
                      <div key={accred} className="flex items-center space-x-2">
                        <Checkbox id={accred} />
                        <label htmlFor={accred} className="text-sm">
                          {accred}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <h3 className="font-medium">Minimum Rating</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input placeholder="Search facilities, treatments, or locations..." className="w-full" />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-600">Found {facilities.length} facilities matching your criteria</p>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Nearest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {facilities.map((facility) => (
                <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-80 relative">
                      <Image
                        src={facility.image || "/placeholder.svg"}
                        alt={facility.name}
                        width={320}
                        height={240}
                        className="w-full h-60 md:h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600">{facility.savings}</Badge>
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
                              <span className="text-gray-500 text-sm ml-1">({facility.reviews} reviews)</span>
                            </div>
                            <Badge variant="secondary">{facility.specialty}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{facility.priceRange}</div>
                          <div className="text-sm text-gray-500">Treatment cost</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{facility.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Shield className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <div className="font-medium">Accredited</div>
                            <div className="text-gray-500">{facility.accreditation.join(", ")}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-blue-600 mr-2" />
                          <div>
                            <div className="font-medium">Wait Time</div>
                            <div className="text-gray-500">{facility.waitTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-yellow-500 mr-2" />
                          <div>
                            <div className="font-medium">Success Rate</div>
                            <div className="text-gray-500">{facility.successRate}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 text-purple-600 mr-2" />
                          <div>
                            <div className="font-medium">Languages</div>
                            <div className="text-gray-500">{facility.languages.slice(0, 2).join(", ")}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/facility/${facility.id}`} className="flex-1">
                          <Button className="w-full">View Details</Button>
                        </Link>
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
