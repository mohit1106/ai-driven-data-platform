import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.data.gov.in/resource";
const API_KEY =
  process.env.NEXT_PUBLIC_DATA_GOV_API_KEY ||
  "579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const datasetId = searchParams.get("datasetId");

  if (!datasetId) {
    return NextResponse.json(
      { error: "datasetId is required" },
      { status: 400 }
    );
  }

  // Remove datasetId from params and forward the rest
  const forwardParams = new URLSearchParams();
  forwardParams.set("api-key", API_KEY);
  forwardParams.set("format", searchParams.get("format") || "json");

  if (searchParams.get("limit")) {
    forwardParams.set("limit", searchParams.get("limit")!);
  }
  if (searchParams.get("offset")) {
    forwardParams.set("offset", searchParams.get("offset")!);
  }

  // Forward filter params
  searchParams.forEach((value, key) => {
    if (key.startsWith("filters[")) {
      forwardParams.set(key, value);
    }
  });

  const url = `${API_BASE}/${datasetId}?${forwardParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from data.gov.in", details: String(error) },
      { status: 502 }
    );
  }
}
