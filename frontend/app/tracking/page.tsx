import type { Metadata } from "next"
import { SatelliteTrackingDashboard } from "@/components/satellite-tracking/dashboard"

export const metadata: Metadata = {
  title: "Satellite Tracking | AstroShield",
  description: "Real-time satellite tracking and monitoring",
}

export default function SatelliteTrackingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Satellite Tracking</h2>
      </div>
      <SatelliteTrackingDashboard />
    </div>
  )
}

