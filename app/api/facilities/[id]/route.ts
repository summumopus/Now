import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export const runtime = "edge"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const facilityId = Number.parseInt(params.id)

    if (isNaN(facilityId)) {
      return NextResponse.json({ error: "Invalid facility ID" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Fetch facility, treatments, and doctors in parallel
    const [facilityResult, treatmentsResult, doctorsResult] = await Promise.all([
      supabase.from("facilities").select("*").eq("id", facilityId).single(),
      supabase.from("treatments").select("*").eq("facility_id", facilityId).order("name"),
      supabase.from("doctors").select("*").eq("facility_id", facilityId).order("name"),
    ])

    if (facilityResult.error) {
      if (facilityResult.error.code === "PGRST116") {
        return NextResponse.json({ error: "Facility not found" }, { status: 404 })
      }
      console.error("Error fetching facility:", facilityResult.error)
      return NextResponse.json({ error: "Failed to fetch facility" }, { status: 500 })
    }

    const response = {
      facility: facilityResult.data,
      treatments: treatmentsResult.data || [],
      doctors: doctorsResult.data || [],
    }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200", // Cache for 10 minutes
      },
    })
  } catch (error) {
    console.error("Unexpected API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
