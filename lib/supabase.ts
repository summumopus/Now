import { createClient } from "@supabase/supabase-js"

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // We don't need auth sessions
      },
      realtime: {
        params: {
          eventsPerSecond: 2, // Reduce realtime events for better performance
        },
      },
      global: {
        headers: {
          "x-application-name": "trusted-care-abroad",
        },
      },
    })
  }
  return supabaseClient
}

// Server-side client for API routes and server components
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    },
  })
}

// Types for our database tables
export type Facility = {
  id: number
  name: string
  location: string
  country: string
  region: string
  specialty: string
  rating: number
  review_count: number
  accreditation: string[]
  price_range: string
  estimated_cost: number
  languages: string[]
  wait_time: string
  description: string
  contact_phone: string
  contact_email: string
  contact_website: string
  address: string
  established: string
  beds: string
  departments: string[]
  image_urls: string[]
  created_at: string
  updated_at: string
}

export type Treatment = {
  id: number
  facility_id: number
  name: string
  price_range: string
  duration: string
  recovery: string
  description: string
  created_at: string
  updated_at: string
}

export type Doctor = {
  id: number
  facility_id: number
  name: string
  specialty: string
  experience: string
  education: string
  languages: string[]
  image_url: string
  created_at: string
  updated_at: string
}

// Optimized database functions with caching and error handling
export const getFacilities = async (filters?: {
  treatment?: string
  budget?: number
  region?: string[]
  country?: string
  limit?: number
  offset?: number
}): Promise<Facility[]> => {
  try {
    const supabase = getSupabaseClient()
    let query = supabase.from("facilities").select("*").order("rating", { ascending: false })

    if (filters?.budget) {
      query = query.lte("estimated_cost", filters.budget * 1.2)
    }

    if (filters?.region && filters.region.length > 0) {
      query = query.in("region", filters.region)
    }

    if (filters?.country) {
      query = query.eq("country", filters.country)
    }

    if (filters?.treatment) {
      query = query.or(
        `name.ilike.%${filters.treatment}%,specialty.ilike.%${filters.treatment}%,description.ilike.%${filters.treatment}%`,
      )
    }

    // Pagination
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching facilities:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching facilities:", error)
    return []
  }
}

export const getFacilityById = async (id: number): Promise<Facility | null> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("facilities").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching facility:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error fetching facility:", error)
    return null
  }
}

export const getTreatmentsByFacility = async (facilityId: number): Promise<Treatment[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("treatments").select("*").eq("facility_id", facilityId).order("name")

    if (error) {
      console.error("Error fetching treatments:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching treatments:", error)
    return []
  }
}

export const getDoctorsByFacility = async (facilityId: number): Promise<Doctor[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("doctors").select("*").eq("facility_id", facilityId).order("name")

    if (error) {
      console.error("Error fetching doctors:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching doctors:", error)
    return []
  }
}

export const searchFacilities = async (searchTerm: string, limit = 20): Promise<Facility[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .or(`name.ilike.%${searchTerm}%,specialty.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order("rating", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error searching facilities:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error searching facilities:", error)
    return []
  }
}

// Cache popular searches and regions for better performance
export const getPopularTreatments = async (): Promise<string[]> => {
  // This could be cached in Redis or stored in a separate table
  return [
    "Heart Surgery",
    "Hip Replacement",
    "Dental Implants",
    "Cosmetic Surgery",
    "Cancer Treatment",
    "Fertility Treatment",
    "Eye Surgery",
    "Spine Surgery",
  ]
}

export const getAvailableRegions = async (): Promise<Array<{ value: string; label: string }>> => {
  // This could be cached or computed from facilities table
  return [
    { value: "asia", label: "Asia (Thailand, India, Singapore, South Korea)" },
    { value: "europe", label: "Europe (Germany, Turkey, Czech Republic)" },
    { value: "americas", label: "Americas (Mexico, Costa Rica, Colombia)" },
    { value: "middle-east", label: "Middle East (UAE, Jordan, Israel)" },
  ]
}
