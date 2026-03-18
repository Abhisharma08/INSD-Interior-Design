"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { submitToHubSpot } from "@/app/actions/hubspot"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Enter a valid 10-digit phone number." }).max(12),
  email: z.string().email({ message: "Please enter a valid email address." }),
  courseInterest: z.string({ required_error: "Please select a course." }),
})

export default function LeadForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      courseInterest: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      // Attempt to sync with CRM
      const result = await submitToHubSpot(values);
      
      if (result.success) {
        // Success: Redirect immediately
        router.push("/thank-you")
      } else {
        // Partial error (e.g. CRM sync failed but data was otherwise valid)
        // We still redirect to thank you for a better user experience
        console.warn("CRM Sync Issue:", result.error);
        router.push("/thank-you")
      }
    } catch (error) {
      // Network error or unexpected exception
      console.error("Submission Exception:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "We encountered a problem. Please try again or contact us directly.",
      })
      // Even on failure, if the user sees this multiple times, we might want to redirect anyway
      // to avoid them getting stuck, but here we let them try again.
    } finally {
      // If we've successfully called router.push, the page will change soon.
      // We only stop the loader if we stay on the page.
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-muted ${className}`}>
      <h3 className="text-2xl font-headline text-primary mb-2">Book Your Free Seat</h3>
      <p className="text-sm text-muted-foreground mb-6">Our counsellor will contact you shortly. No spam, only career guidance.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="courseInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interested Course</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="undergraduate">Under Graduate Program</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate Program</SelectItem>
                    <SelectItem value="advanced-diploma">Advanced Diploma</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="short-term">Short Term Course</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Secure My Spot Now"
            )}
          </Button>
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider">
            Limited Seats for the Next Batch
          </p>
        </form>
      </Form>
    </div>
  )
}
