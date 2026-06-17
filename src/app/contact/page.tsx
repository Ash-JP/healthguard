"use client";

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { sendEmailAction } from '@/app/actions/sendEmail';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const requestedProduct = searchParams.get('product') || '';
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const result = await sendEmailAction(formData);
      if (result.status === "success") {
        setStatus("success");
      } else {
        setErrorMessage(result.message || "Please check your inputs and try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Request Integration Quote</h2>
      
      {status === "success" ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Request Received</h3>
          <p>Our integration specialists will contact you within 24 hours regarding {requestedProduct ? <strong>{requestedProduct}</strong> : 'your inquiry'}.</p>
          <Button className="mt-6 w-full" onClick={() => setStatus("idle")}>Submit Another Request</Button>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm border border-red-200">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <input type="text" id="name" name="name" required className="w-full p-3 rounded-md border bg-background" placeholder="Dr. Jane Doe" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Work Email</label>
            <input type="email" id="email" name="email" required className="w-full p-3 rounded-md border bg-background" placeholder="jane@hospital.org" />
          </div>

          <div className="space-y-2">
            <label htmlFor="facility" className="text-sm font-medium">Hospital / Facility Name</label>
            <input type="text" id="facility" name="facility" required className="w-full p-3 rounded-md border bg-background" placeholder="Mercy General Hospital" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="inquiry" className="text-sm font-medium">Ecosystem Requirements</label>
            <textarea 
              id="inquiry" 
              name="inquiry" 
              required 
              rows={4}
              className="w-full p-3 rounded-md border bg-background"
              defaultValue={requestedProduct ? `I am interested in integrating the ${requestedProduct} into our workflow.` : ''}
              placeholder="Describe your department's workflow needs..."
            />
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg" disabled={status === "loading"}>
            {status === "loading" ? "Submitting Request..." : "Submit Integration Request"}
          </Button>
        </form>
      )}
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-secondary/50 py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Enterprise Partnerships</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with our ecosystem specialists to build your department&apos;s exact requirements.
          </p>
        </div>
      </section>

      <section className="container py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Global Headquarters</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl"><MapPin /></div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-muted-foreground">100 Healthcare Boulevard<br />Medical District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl"><Phone /></div>
                <div>
                  <h3 className="font-semibold text-lg">Direct Line</h3>
                  <p className="text-muted-foreground">+1 (800) 555-MEDS</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl"><Mail /></div>
                <div>
                  <h3 className="font-semibold text-lg">Procurement</h3>
                  <p className="text-muted-foreground">enterprise@healthguard.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 relative h-64 rounded-2xl overflow-hidden border">
              <Image 
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800"
                alt="Headquarters"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8">
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactFormContent />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
