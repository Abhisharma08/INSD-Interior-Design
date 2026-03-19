"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Palette, 
  Smartphone, 
  Type, 
  Layout, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Users, 
  Monitor, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react"
import LeadForm from "@/components/LeadForm"
import SectionHeader from "@/components/SectionHeader"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const LOGO_URL = "https://res.cloudinary.com/ddqqlfsjp/image/upload/v1773820493/Final-Logo_exeo3n.png";
const DEFAULT_PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/600";

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-workspace");
  const studentImg = PlaceHolderImages.find(img => img.id === "student-work");
  const brandingImg = PlaceHolderImages.find(img => img.id === "branding-mockup");
  const uiImg = PlaceHolderImages.find(img => img.id === "ui-ux-design");

  const scrollToLeadForm = () => {
    // We render separate LeadForm blocks for desktop vs mobile layouts.
    // Use the visible one as the scroll target.
    const candidates = [
      document.getElementById("top-form-desktop"),
      document.getElementById("top-form-mobile"),
    ].filter(Boolean) as HTMLElement[];

    const target =
      candidates.find((el) => el.getClientRects().length > 0) ?? candidates[0];

    if (!target) return;

    // Ensure layout has settled (especially after click handlers / route changes)
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b shadow-sm overflow-x-hidden">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src={LOGO_URL} 
              alt="INSD PixelForge Logo" 
              width={200} 
              height={50} 
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="hidden md:block text-primary font-semibold"
              onClick={() => {
                scrollToLeadForm();
              }}
            >
              Book Counselling
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6"
              onClick={() => {
                scrollToLeadForm();
              }}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-24 lg:pb-0 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 lg:py-32 w-full">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src={heroImg?.imageUrl || DEFAULT_PLACEHOLDER} 
              alt="Design Workspace" 
              fill 
              className="object-cover"
              priority
              data-ai-hint="graphic design workspace"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <div className="text-white space-y-6 w-full">
                <Badge className="bg-secondary text-white border-none px-4 py-1 text-sm mb-4 animate-pulse">
                  Admissions Open 2026-27
                </Badge>
                <h1 className="text-4xl md:text-6xl font-headline leading-tight text-white">
                  Turn Your Creativity Into a Career in <span className="text-secondary">Graphic Design</span>
                </h1>
                <p className="text-xl text-white/90 max-w-xl">
                  Master branding, digital design, and visual storytelling at INSD Delhi. Gain industry-ready skills and build a world-class portfolio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 h-14 w-full sm:w-auto"
                    onClick={() => {
                      scrollToLeadForm();
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
                <p className="text-sm italic text-white/70">
                  * Limited Seats Available. Next batch starts soon.
                </p>
              </div>
              <div className="hidden lg:block" id="top-form-desktop">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Lead Form Trigger (Visible on small screens) */}
        <section className="lg:hidden p-4 pb-24 bg-muted border-b" id="top-form-mobile">
          <LeadForm />
        </section>

        {/* Value Section */}
        <section className="py-20 bg-white w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={studentImg?.imageUrl || DEFAULT_PLACEHOLDER} 
                  alt="Student at Work" 
                  fill 
                  className="object-cover"
                  data-ai-hint="designer working"
                />
              </div>
              <div className="space-y-6">
                <SectionHeader 
                  title="Design is Not Just Art. It’s Impact." 
                  subtitle="In a world driven by visuals, your ability to communicate through design determines your career success."
                  centered={false}
                />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Graphic design isn't just about making things look pretty—it's about branding, advertising, and capturing attention in a split second. Our curriculum is designed to transform you into an industry-ready professional who understands the 'why' behind every pixel.
                </p>
                <ul className="space-y-4">
                  {[
                    "Practical-first learning approach",
                    "Industry-standard tools and techniques",
                    "Real-world client project simulations",
                    "Mentorship from experienced design leaders"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary font-medium">
                      <ShieldCheck className="text-secondary h-6 w-6" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What You Will Learn */}
        <section className="py-20 bg-muted w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionHeader 
              title="What You Will Learn" 
              subtitle="Learn to communicate visually with purpose through our comprehensive modules."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Palette className="h-8 w-8" />, title: "Branding & Visual Identity", desc: "Create logos, color palettes, and brand guidelines that resonate." },
                { icon: <Monitor className="h-8 w-8" />, title: "Social Media & Digital Design", desc: "Design high-converting visuals for Instagram, Facebook, and Web." },
                { icon: <Type className="h-8 w-8" />, title: "Typography & Layout", desc: "Master the art of arranging text and images for maximum impact." },
                { icon: <Layout className="h-8 w-8" />, title: "Adobe Design Tools", desc: "Expert training in Photoshop, Illustrator, and InDesign." },
                { icon: <Smartphone className="h-8 w-8" />, title: "UI/UX Basics", desc: "Understand user experience and interface design fundamentals." },
                { icon: <Briefcase className="h-8 w-8" />, title: "Portfolio Development", desc: "Build a professional portfolio that lands you high-paying jobs." },
              ].map((item, i) => (
                <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none">
                  <CardContent className="p-8 space-y-4">
                    <div className="text-secondary group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-headline text-primary">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose INSD */}
        <section className="py-20 bg-white w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionHeader 
              title="Why Choose INSD" 
              subtitle="We don't just teach design; we build careers."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <GraduationCap />, title: "Industry-Oriented Curriculum", desc: "Stay ahead with tools and trends actually used in the industry today." },
                { icon: <Lightbulb />, title: "Hands-on Practical Training", desc: "No boring lectures. Just creation, iteration, and improvement." },
                { icon: <Users />, title: "Experienced Mentors", desc: "Learn directly from professionals who work with top brands." },
                { icon: <Star />, title: "Real-world Projects", desc: "Work on live briefs to understand the client-designer dynamic." },
                { icon: <Layout />, title: "Modern Learning Environment", desc: "State-of-the-art labs and collaborative design studios." },
                { icon: <ShieldCheck />, title: "100% Placement Focus", desc: "Our dedicated team works tirelessly to get you placed in top agencies." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-muted hover:border-secondary/30 hover:bg-muted/30 transition-all flex gap-4">
                  <div className="bg-primary/5 p-3 rounded-lg h-fit text-primary">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-lg text-primary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Options */}
        <section className="py-20 bg-primary text-white w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionHeader 
              title="Explore Our Programs" 
              subtitle="Find the perfect path for your design journey, regardless of your current experience level."
              light
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                { title: "Under Graduate", duration: "3-4 Years", eligibility: "10+2", desc: "Comprehensive foundation for beginners." },
                { title: "Post Graduate", duration: "2 Years", eligibility: "Any 3 year Design Graduation", desc: "Advanced specialisation for graduates." },
                { title: "Advanced Diploma", duration: "1-2 Years", eligibility: "Any 10+2", desc: "Intensive industry-focused training." },
                { title: "Diploma", duration: "1 Year", eligibility: "Any 10+2", desc: "Quick start into the design industry." },
                { title: "Short Term", duration: "3-6 Months", eligibility: "Short Term Fashion Design Course", desc: "Skill-specific certification courses." },
              ].map((item, i) => (
                <Card key={i} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all group">
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <div className="space-y-3 flex-grow">
                      <h4 className="text-xl font-headline text-white">{item.title}</h4>
                      <Badge variant="secondary" className="bg-secondary text-white">{item.duration}</Badge>
                      <div className="text-xs text-white/60 bg-white/5 p-2 rounded border border-white/10">
                        <span className="font-bold text-secondary mr-1">Eligibility:</span>
                        {item.eligibility}
                      </div>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Button 
                        variant="outline"
                        className="w-full border-white/60 text-white font-bold text-sm bg-transparent hover:bg-white/10 hover:text-white"
                        onClick={() => {
                          scrollToLeadForm();
                        }}
                      >
                        Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-white overflow-hidden w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <SectionHeader 
                  title="Future-Proof Your Career" 
                  subtitle="Designers are in high demand across every digital-first industry."
                  centered={false}
                />
                <p className="text-lg text-muted-foreground">
                  Our graduates don't just find jobs; they build influential careers in top creative fields.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Graphic Designer", "UI/UX Designer", 
                    "Brand Consultant", "Art Director", 
                    "Web Designer", "Creative Lead", 
                    "Motion Designer", "Freelance Artist"
                  ].map((job, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-medium text-primary">{job}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image src={brandingImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Branding" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image src={uiImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="UI Design" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image src={heroImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Portfolio" fill className="object-cover" />
                  </div>
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image src={studentImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Placement" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Section */}
        <section className="py-20 bg-muted w-full">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <SectionHeader 
              title="Placement & Career Support" 
              subtitle="We bridge the gap between your education and your first professional paycheck."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "100% Support", desc: "Dedicated placement assistance until you get hired." },
                { title: "Portfolio Building", desc: "Review sessions to ensure your work stands out." },
                { title: "Mock Interviews", desc: "Build confidence with professional interview prep." },
                { title: "Industry Exposure", desc: "Regular visits to top agencies and design studios." },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl font-headline text-secondary mb-2">{item.title}</div>
                  <div className="text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 bg-white rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
              <div className="text-left space-y-2">
                <h4 className="text-xl font-headline text-primary">Want to see our students' work?</h4>
                <p className="text-muted-foreground">Download our brochure and portfolio highlights.</p>
              </div>
              <Link href="#lead-form">
                <Button 
                  className="bg-primary text-white hover:bg-primary/90 px-8 h-12"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToLeadForm();
                  }}
                >
                  Download Brochure
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white relative overflow-hidden w-full">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline text-primary">Start Designing Your Future Today</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the community of next-generation designers at INSD Delhi. The next batch starts soon—don't miss out!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-10 text-lg w-full sm:w-auto"
                onClick={() => {
                  scrollToLeadForm();
                }}
              >
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary/5 h-14 px-10 text-lg w-full sm:w-auto"
                onClick={() => {
                  scrollToLeadForm();
                }}
              >
                Get Course Details
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-primary font-semibold h-14 px-10 text-lg w-full sm:w-auto"
                onClick={() => {
                  scrollToLeadForm();
                }}
              >
                Talk to a Counsellor
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No spam. Only professional career guidance.</p>
          </div>
        </section>

        {/* Lead Form Section (Final Lead Capture) */}
        <section id="lead-form" className="py-10 bg-muted w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-headline text-primary">Connect With Us</h2>
                  <p className="text-lg text-muted-foreground">
                    Have questions? Our experts are ready to guide you towards the right creative path.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-8 pb-28 lg:py-8 w-full">
        <div className="container mx-auto px-4 max-w-7xl text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} International School of Design (INSD) Delhi. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-4 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex gap-2 w-screen">
        <div className="w-full flex gap-2 max-w-7xl mx-auto px-4">
          <Button 
            className="flex-1 bg-secondary text-white font-bold h-12"
            onClick={() => {
              scrollToLeadForm();
            }}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}
