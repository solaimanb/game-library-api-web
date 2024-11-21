import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader size="40" className="animate-spin mb-4" />
      </div>
    </div>
  )
}