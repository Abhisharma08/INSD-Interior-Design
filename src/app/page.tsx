import Image from "next/image";
import { ArrowRight, GraduationCap, Layout, Lightbulb, ShieldCheck, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import ScrollToLeadButton from "@/components/ScrollToLeadButton";
import SectionHeader from "@/components/SectionHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const LOGO_URL = "https://res.cloudinary.com/ddqqlfsjp/image/upload/v1773820493/Final-Logo_exeo3n.png";
const HERO_BG_URL = "https://res.cloudinary.com/ddqqlfsjp/image/upload/v1774679097/P1510960_1_1_1_wrknkg.jpg";
const DEFAULT_PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/600";

export default function LandingPage() {
  const studentImg = PlaceHolderImages.find((img) => img.id === "student-work");
  const brandingImg = PlaceHolderImages.find((img) => img.id === "branding-mockup");
  const deferredSectionStyle = {
    contentVisibility: "auto",
    containIntrinsicSize: "900px",
  } as const

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <nav className="fixed top-0 z-50 w-full overflow-x-hidden border-b bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2" aria-label="INSD Logo">
            <Image
              src={LOGO_URL}
              alt="INSD Logo"
              width={200}
              height={50}
              className="h-10 w-auto object-contain"
              priority
              quality={60}
            />
          </div>
          <div className="flex items-center gap-4">
            <ScrollToLeadButton
              variant="ghost"
              className="hidden font-semibold text-primary md:inline-flex"
            >
              Book Counselling
            </ScrollToLeadButton>
            <ScrollToLeadButton className="bg-secondary px-6 font-bold text-white hover:bg-secondary/90">
              Apply Now
            </ScrollToLeadButton>
          </div>
        </div>
      </nav>

      <main className="w-full pb-24 pt-20 lg:pb-0">
        <section className="relative w-full overflow-hidden bg-primary py-20 lg:py-20">
          <div className="absolute inset-0">
            <Image
              src={HERO_BG_URL}
              alt="Design Workspace"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              quality={60}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              data-ai-hint="graphic design workspace"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
          <div className="container relative z-10 mx-auto max-w-7xl px-4">
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="w-full space-y-6 text-white">
                <Badge className="mb-4 border-none bg-secondary px-4 py-1 text-sm text-white shadow-[0_0_18px_rgba(219,52,54,0.55)] animate-pulse">
                  Admissions Open 2026-27
                </Badge>
                <h1 className="font-headline text-4xl leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] md:text-6xl">
                  We Don&apos;t Just Teach Design. We Build Careers
                </h1>
                <p className="max-w-xl text-xl text-white">
                  Join INSD - India&apos;s Skill School and build job-ready graphic design skills for a billion-dollar industry.
                </p>
                <div className="flex max-w-2xl flex-wrap gap-2">
                  {[
                    "15 Years of Creative Excellence",
                    "75+ Campuses",
                    "23 States",
                    "30,000 Students",
                    "300+ Industry Partners",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-3 py-1.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.2)]"
                    >
                      <Star className="h-3.5 w-3.5 shrink-0 text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex max-w-2xl flex-wrap gap-3">
                  {[
                    "100% Lifetime Placement Support",
                    "2000+ Placements Last Year",
                    "Packages upto Rs18 LPA",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-secondary bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(219,52,54,0.35)]"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm italic text-white/70">
                  * Limited Seats Available. Next batch starts soon.
                </p>
              </div>
              <div id="lead-form-top">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-20" style={deferredSectionStyle}>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={studentImg?.imageUrl || DEFAULT_PLACEHOLDER}
                  alt="Student at Work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="designer working"
                />
              </div>
              <div className="space-y-6">
                <SectionHeader
                  title="Skills. Careers. Placements. Come First."
                  subtitle="At INSD, we focus on what truly matters: skills, careers, and placements."
                  centered={false}
                />

                <ul className="space-y-4">
                  {[
                    "Skills over degrees",
                    "Careers over courses",
                    "Industry readiness over theory",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-medium text-primary">
                      <ShieldCheck className="h-6 w-6 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-lg font-semibold text-primary">
                  We build professionals, not just designers.
                </p>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                  From day one, your learning is focused on making you job-ready and helping you earn.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted py-20" style={deferredSectionStyle}>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <SectionHeader
                  title="Graphic Design is Powering India&apos;s Digital Growth"
                  subtitle="India&apos;s digital and e-commerce sector is rapidly expanding."
                  centered={false}
                />
                <ul className="list-inside list-disc space-y-2 text-lg text-muted-foreground">
                  <li>India&apos;s digital and e-commerce sector is rapidly expanding</li>
                  <li>Businesses are increasing investment in branding and digital marketing</li>
                  <li>Designers are in demand across startups, agencies, content platforms, and global brands</li>
                </ul>
                <p className="text-xl font-semibold text-primary">Graphic Design = Career-Ready Skill</p>
                <p className="text-lg text-muted-foreground">With the right skills, you can work, grow, and earn.</p>
              </div>
              <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={brandingImg?.imageUrl || DEFAULT_PLACEHOLDER}
                  alt="Graphic design showcase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-20" style={deferredSectionStyle}>
          <div className="container mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Build Job-Ready Skills for Real Industry Roles"
              subtitle="This program is designed to make you a professional graphic designer, not just someone who knows tools."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <GraduationCap />, title: "Branding & Visual Identity", desc: "Build strong brand thinking and visual language skills." },
                { icon: <Lightbulb />, title: "Social Media & Digital Design", desc: "Create engaging digital creatives for modern platforms." },
                { icon: <Users />, title: "Typography & Layout Systems", desc: "Master structure, hierarchy, readability, and composition." },
                { icon: <Star />, title: "Adobe Photoshop, Illustrator & InDesign", desc: "Gain practical command over industry-standard tools." },
                { icon: <Layout />, title: "UI/UX Fundamentals", desc: "Understand user-centric interface and experience basics." },
                { icon: <ShieldCheck />, title: "Portfolio & Live Projects", desc: "Job-ready learning starts from Day 1." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-muted bg-white p-6 transition-all hover:border-secondary/30 hover:bg-muted/30"
                >
                  <div className="h-fit rounded-lg bg-primary/5 p-3 text-primary">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-lg text-primary">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-primary py-20 text-white" style={deferredSectionStyle}>
          <div className="container mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Choose Your Path. Build Your Career."
              subtitle="No matter where you start - the outcome is the same: Industry-ready skills. Career opportunities. Placement support."
              light
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[
                { title: "Under Graduate Programs", duration: "3-4 Years", eligibility: "10+2", desc: "Comprehensive foundation for beginners." },
                { title: "Post Graduate Programs", duration: "2 Years", eligibility: "Any 3 year Design Graduation", desc: "Advanced specialization for graduates." },
                { title: "Advanced Diploma", duration: "1-2 Years", eligibility: "Any 10+2", desc: "Intensive industry-focused training." },
                { title: "Diploma", duration: "1 Year", eligibility: "Any 10+2", desc: "Quick start into the design industry." },
                { title: "Short Term Courses", duration: "3-6 Months", eligibility: "Any 10+2", desc: "Skill-specific certification courses." },
              ].map((item) => (
                <Card key={item.title} className="group border-white/20 bg-white/10 transition-all hover:bg-white/20">
                  <CardContent className="flex h-full flex-col p-6 text-center">
                    <div className="flex-grow space-y-3">
                      <h4 className="font-headline text-xl text-white">{item.title}</h4>
                      <Badge variant="secondary" className="bg-secondary text-white">{item.duration}</Badge>
                      <div className="rounded border border-white/10 bg-white/5 p-2 text-xs text-white/60">
                        <span className="mr-1 font-bold text-secondary">Eligibility:</span>
                        {item.eligibility}
                      </div>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <ScrollToLeadButton
                        variant="outline"
                        className="w-full border-white/60 bg-transparent text-sm font-bold text-white hover:bg-white/10 hover:text-white"
                      >
                        Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                      </ScrollToLeadButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-white py-24" style={deferredSectionStyle}>
          <div className="container relative z-10 mx-auto max-w-7xl space-y-8 px-4 text-center">
            <h2 className="font-headline text-4xl text-primary md:text-5xl">Your Future Won&apos;t Wait</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              The right skills can help you start earning.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ScrollToLeadButton
                size="lg"
                className="h-14 w-full bg-secondary px-10 text-lg font-bold text-white hover:bg-secondary/90 sm:w-auto"
              >
                Start Your Career in Design Today
              </ScrollToLeadButton>
              <ScrollToLeadButton
                variant="outline"
                size="lg"
                className="h-14 w-full border-primary px-10 text-lg text-primary hover:bg-primary/5 sm:w-auto"
              >
                Learn More
              </ScrollToLeadButton>
              <ScrollToLeadButton
                variant="ghost"
                size="lg"
                className="h-14 w-full px-10 text-lg font-semibold text-primary sm:w-auto"
              >
                Enquire Now
              </ScrollToLeadButton>
            </div>
            <p className="text-sm text-muted-foreground">Don&apos;t wait to transform your creativity into a career.</p>
          </div>
        </section>

        <section id="lead-form" className="w-full bg-muted py-10" style={deferredSectionStyle}>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="font-headline text-3xl text-primary">Are you ready to start learning job-ready skills?</h2>
                  <p className="text-lg text-muted-foreground">
                    Get industry-focused training, career support, and placement assistance. Fill in your details and take the first step towards your future.
                  </p>
                  <p className="text-base font-semibold text-primary">
                    Launch Your Career. Not Just a Course.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-primary pb-28 pt-8 text-white lg:py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} International School of Design (INSD) Delhi. All Rights Reserved.</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex w-screen gap-2 border-t bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-2 px-4">
          <ScrollToLeadButton className="h-12 flex-1 bg-secondary font-bold text-white">
            Apply Now
          </ScrollToLeadButton>
        </div>
      </div>
    </div>
  );
}
