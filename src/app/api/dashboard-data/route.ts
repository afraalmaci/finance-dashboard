import { NextResponse } from "next/server";
import { mockDashboardData } from "@/src/lib/mock-data";

// GET /api/dashboard-data
// Returns the full mock portfolio dashboard data
export async function GET() {
  // Simulate a small network delay, like a real backend call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockDashboardData);
}