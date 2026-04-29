"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitToHubSpot } from "@/app/actions/hubspot"

type FormValues = {
  name: string
  email: string
  phone: string
  city: string
  lead_source: string
  courseInterest: string
  consulation_date: string
  consulation_time: string
}

type FormErrors = Partial<Record<keyof FormValues, string>> & {
  submit?: string
}

const defaultValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  lead_source: "Interior Landing Page",
  courseInterest: "",
  consulation_date: "",
  consulation_time: "",
}

function validateForm(values: FormValues) {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters."
  }

  const phoneDigits = values.phone.replace(/\D/g, "")
  if (phoneDigits.length < 10 || phoneDigits.length > 12) {
    errors.phone = "Enter a valid 10-digit phone number."
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address."
  }

  if (values.city.trim().length < 2) {
    errors.city = "Please enter your city."
  }

  if (!values.courseInterest) {
    errors.courseInterest = "Please select a course."
  }

  if (!values.consulation_date) {
    errors.consulation_date = "Please select a consultation date."
  }

  if (!values.consulation_time) {
    errors.consulation_time = "Please select a consultation time."
  }

  return errors
}

export default function LeadForm({ className }: { className?: string }) {
  const [values, setValues] = useState<FormValues>(defaultValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name as keyof FormErrors] && !current.submit) {
        return current
      }

      return {
        ...current,
        [name]: undefined,
        submit: undefined,
      }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const result = await submitToHubSpot(values)

      if (!result.success) {
        console.warn("CRM Sync Issue:", result.error)
      }

      router.push("/thank-you")
    } catch (error) {
      console.error("Submission Exception:", error)
      setErrors({
        submit: "We encountered a problem. Please try again or contact us directly.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`rounded-xl border border-muted bg-white p-6 shadow-2xl md:p-8 ${className}`}>
      <h3 className="mb-2 text-2xl font-headline text-primary">BOOK A FREE CONSULTATION</h3>
      <p className="mb-6 text-sm text-muted-foreground">Our counsellor will reach out shortly. No spam, only career guidance.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input type="hidden" name="lead_source" value={values.lead_source} />

        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your Name"
            autoComplete="name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your Email"
              autoComplete="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              autoComplete="tel"
              inputMode="numeric"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="city" className="text-sm font-medium text-foreground">City</label>
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="Your City"
              autoComplete="address-level2"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {errors.city ? <p className="text-sm text-destructive">{errors.city}</p> : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="courseInterest" className="text-sm font-medium text-foreground">Interested Interior Design Program</label>
          <select
            id="courseInterest"
            name="courseInterest"
            value={values.courseInterest}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select a program</option>
            <option value="undergraduate">Under Graduate Program</option>
            <option value="postgraduate">Post Graduate Program</option>
            <option value="advanced-diploma">Advanced Diploma</option>
            <option value="diploma">Diploma</option>
            <option value="short-term">Short Term Course</option>
          </select>
          {errors.courseInterest ? <p className="text-sm text-destructive">{errors.courseInterest}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="consulation_date" className="text-sm font-medium text-foreground">Consultation Date</label>
            <input
              id="consulation_date"
              name="consulation_date"
              type="date"
              value={values.consulation_date}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {errors.consulation_date ? <p className="text-sm text-destructive">{errors.consulation_date}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="consulation_time" className="text-sm font-medium text-foreground">Consultation Time</label>
            <input
              id="consulation_time"
              name="consulation_time"
              type="time"
              value={values.consulation_time}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {errors.consulation_time ? <p className="text-sm text-destructive">{errors.consulation_time}</p> : null}
          </div>
        </div>

        {errors.submit ? (
          <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {errors.submit}
          </p>
        ) : null}

        <Button
          type="submit"
          className="min-h-14 h-14 w-full bg-secondary text-lg font-bold text-white hover:bg-secondary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </Button>

        <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground">
          Limited Seats for the Next Batch
        </p>
      </form>
    </div>
  )
}
