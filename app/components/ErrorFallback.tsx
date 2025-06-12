"use client";

export default function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We're sorry, but an unexpected error occurred.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
