import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Star,
  Clock,
  Heart,
  Phone,
  Mail,
  Globe,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  Plane,
  Hotel,
  Car,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getFacilityById, getTreatmentsByFacility, getDoctorsByFacility } from "@/lib/supabase"

// Generate static params for better performance
export async function generateStaticParams() {
  // In production, you might want to generate params for popular facilities
  return [{ id: "1" }, { id: "2" }, { id: "3" }]
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour

async function FacilityContent({ id }: { id: string }) {
  const facilityId = Number.parseInt(id)

  if (isNaN(facilityId)) {
    notFound()
  }

  // Fetch all data in parallel for better performance
  const [facility, treatments, doctors] = await Promise.all([
    getFacilityById(facilityId),
    getTreatmentsByFacility(facilityId),
    getDoctorsByFacility(facilityId),
  ])

  if (!facility) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Image
              src={facility.image_urls?.[0] || "/placeholder.svg?height=400&width=800"}
              alt={facility.name}
              width={800}
              height={400}
              className="w-full h-80 object-cover rounded-lg"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(facility.image_urls?.slice(1, 5) || []).map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg?height=150&width=200"}
                alt={`${facility.name} ${index + 2}`}
                width={200}
                height={150}
                className="w-full h-36 object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{facility.name}</h1>

            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{facility.location}</span>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-semibold text-lg">{facility.rating}</span>
                <span className="text-gray-500 ml-1">({facility.review_count} reviews)</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {facility.specialty}
              </Badge>
              <div className="flex gap-1">
                {facility.accreditation.map((accred) => (
                  <Badge key={accred} variant="outline" className="text-xs">
                    {accred}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-4">{facility.description}</p>
          </div>

          <Card className="w-full lg:w-80">
            <CardHeader>
              <CardTitle className="text-center">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{facility.price_range}</div>
                <div className="text-sm text-gray-500">Estimated treatment cost</div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-gray-600">{facility.contact_phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-600">{facility.contact_email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-sm text-gray-600">{facility.contact_website}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Facility
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="travel">Travel Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Accreditations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {facility.accreditation.map((accred) => (
                    <div key={accred} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">{accred}</div>
                        <div className="text-sm text-gray-500">
                          {accred === "JCI" && "Joint Commission International"}
                          {accred === "ISO 9001" && "Quality Management System"}
                          {accred === "HA" && "Hospital Accreditation"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {facility.departments.map((dept) => (
                    <div key={dept} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{dept}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Facility Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium">Established</div>
                  <div className="text-gray-600">{facility.established}</div>
                </div>
                <div>
                  <div className="font-medium">Hospital Beds</div>
                  <div className="text-gray-600">{facility.beds}</div>
                </div>
                <div>
                  <div className="font-medium">Wait Time</div>
                  <div className="text-gray-600">{facility.wait_time}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-6">
          <div className="grid gap-6">
            {treatments.map((treatment) => (
              <Card key={treatment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{treatment.name}</CardTitle>
                      <CardDescription>{treatment.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{treatment.price_range}</div>
                      <div className="text-sm text-gray-500">Estimated cost</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Duration: {treatment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Recovery: {treatment.recovery}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={doctor.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={doctor.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-gray-600 mb-2">{doctor.experience} experience</p>
                      <p className="text-sm text-gray-600 mb-3">Education: {doctor.education}</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Main Phone</div>
                    <div className="text-gray-600">{facility.contact_phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">{facility.contact_email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-gray-600">{facility.contact_website}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium mb-2">{facility.name}</div>
                    <div className="text-gray-600">{facility.address}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="travel" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Airport Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">International airport access available</p>
                <ul className="text-sm space-y-1">
                  <li>• Taxi services available</li>
                  <li>• Public transportation</li>
                  <li>• Airport shuttle on request</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5" />
                  Nearby Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Multiple accommodation options</p>
                <ul className="text-sm space-y-1">
                  <li>• Hotels within walking distance</li>
                  <li>• Patient-friendly accommodations</li>
                  <li>• Family rooms available</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Local Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Easy city access</p>
                <ul className="text-sm space-y-1">
                  <li>• Public transportation nearby</li>
                  <li>• Taxi and ride-sharing</li>
                  <li>• Hospital shuttle service</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Important Disclaimer */}
      <Card className="mt-8 bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Important Information Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700">
            This information is provided for reference purposes only. Trusted Care Abroad curates data about medical
            facilities but does not provide medical advice or guarantee treatment outcomes. Prices are estimates and may
            vary based on individual cases. Please verify all information directly with the medical facility before
            making any decisions. Always consult with qualified healthcare professionals for medical advice and
            treatment recommendations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading facility information...</p>
    </div>
  )
}

export default function FacilityPage({ params }: { params: { id: string } }) {
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
              <Link href="/results" className="text-gray-600 hover:text-gray-900 transition-colors">
                Back to Results
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                New Search
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <Suspense fallback={<LoadingFallback />}>
        <FacilityContent id={params.id} />
      </Suspense>
    </div>
  )
}
