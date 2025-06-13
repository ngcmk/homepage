import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-lg shadow-lg p-6 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Thank You!</h1>

          <p className="text-xl mb-8">
            Your project consultation request has been successfully submitted.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8 w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-3">What happens next?</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Our team will carefully review your project details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>You'll receive a response within 24-48 business hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>We'll schedule an initial consultation to discuss your needs in detail</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>You'll receive a detailed proposal tailored to your requirements</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-x-4 sm:space-y-0 flex flex-col sm:flex-row w-full max-w-md justify-center">
            <Button asChild className="w-full">
              <Link href="/">
                Return to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
