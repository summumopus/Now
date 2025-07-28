import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const treatment = searchParams.get("treatment")
    const budget = searchParams.get("budget")
    const region = searchParams.get("region")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = createServerClient()
    let query = supabase.from("facilities").select("*").order("rating", { ascending: false })

    if (budget) {
      query = query.lte("estimated_cost", Number.parseInt(budget) * 1.2)
    }

    if (region) {
      const regions = region.split(",")
      query = query.in("region", regions)
    }

    if (treatment) {
      query = query.or(`name.ilike.%${treatment}%,specialty.ilike.%${treatment}%,description.ilike.%${treatment}%`)
    }

    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query

    if (error) {
      console.error("API Error fetching facilities:", error)
      return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 })
    }

    return NextResponse.json(
      { facilities: data || [], count: data?.length || 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
        },
      },
    )
  } catch (error) {
    console.error("Unexpected API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
