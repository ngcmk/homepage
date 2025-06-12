'use client'

import { Button } from "./button"

export function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-background rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-medium mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          We're sorry, but an unexpected error occurred.
        </p>
        <Button 
          onClick={() => window.location.reload()}
          variant="default"
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}
