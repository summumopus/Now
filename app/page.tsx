"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Heart, MapPin, Clock, Shield, Users, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/quiz?treatment=${encodeURIComponent(searchQuery)}`)
    }
  }

  const popularSearches = useMemo(
    () => [
      "Heart Surgery",
      "Hip Replacement",
      "Dental Implants",
      "Cosmetic Surgery",
      "Cancer Treatment",
      "Fertility Treatment",
      "Eye Surgery",
      "Spine Surgery",
    ],
    [],
  )

  const features = useMemo(
    () => [
      {
        icon: Shield,
        title: "Facility Information",
        description: "Details about medical facilities, their specialties, and accreditations",
        color: "text-blue-600",
      },
      {
        icon: Clock,
        title: "Treatment Details",
        description: "Information about procedures, recovery times, and what to expect",
        color: "text-green-600",
      },
      {
        icon: Globe,
        title: "Cost Estimates",
        description: "Price ranges to help you budget and compare different options",
        color: "text-purple-600",
      },
      {
        icon: Users,
        title: "Contact Details",
        description: "Direct contact information so you can reach out to facilities yourself",
        color: "text-orange-600",
      },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How it works
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Medical Care Information Worldwide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get comprehensive information about medical facilities, treatments, and estimated costs from around the
              world. We curate data to help you make informed healthcare decisions.
            </p>

            {/* Search Form */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="treatment" className="text-sm font-medium text-gray-700">
                      What medical treatment are you looking for?
                    </label>
                    <Input
                      id="treatment"
                      type="text"
                      placeholder="e.g., Heart surgery, Hip replacement, Dental implants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-lg py-3"
                      autoComplete="off"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" size="lg">
                    <Search className="mr-2 h-5 w-5" />
                    Find Treatment Information
                  </Button>
                </form>

                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setSearchQuery(search)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to find medical treatment information worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search Treatment</h3>
              <p className="text-gray-600">Enter the medical treatment you're looking for in our search bar</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Answer Questions</h3>
              <p className="text-gray-600">Complete a brief questionnaire to personalize your results</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Information</h3>
              <p className="text-gray-600">Receive curated information about facilities and estimated costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Provide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive data to help you understand your medical treatment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-2`} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-semibold text-yellow-800 mb-4">Important Information</h3>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>
                <strong>Trusted Care Abroad</strong> is an information platform that curates and presents data about
                medical facilities worldwide. We do not provide medical advice, recommendations, or guarantees about
                treatment outcomes.
              </p>
              <p>
                All information should be independently verified with the medical facilities. Prices are estimates and
                subject to change. Always consult with qualified healthcare professionals before making medical
                decisions.
              </p>
              <p>
                We are not affiliated with any medical facilities and do not receive commissions from treatments or
                referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Trusted Care Abroad</span>
              </div>
              <p className="text-gray-400 text-sm">
                Providing curated information about medical facilities worldwide to help you make informed healthcare
                decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Treatment guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cost information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facility database
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 Trusted Care Abroad. All rights reserved. This platform provides information only and does not
              constitute medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
