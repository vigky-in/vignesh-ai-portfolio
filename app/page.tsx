import { prisma } from "@/lib/prisma";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import About from "@/components/site/About";
import ProjectsSection from "@/components/site/ProjectsSection";
import JourneyTimeline from "@/components/site/JourneyTimeline";
import SkillsSection from "@/components/site/SkillsSection";
import GithubSection from "@/components/site/GithubSection";
import Testimonials from "@/components/site/Testimonials";
import Faq from "@/components/site/Faq";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [hero, projects, journey, skills, testimonials, faqs, github, contact, socials] =
    await Promise.all([
      prisma.heroContent.findUnique({ where: { id: "hero" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.journeyItem.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
      prisma.githubStats.findUnique({ where: { id: "github" } }),
      prisma.contactInfo.findUnique({ where: { id: "contact" } }),
      prisma.socialLink.findMany(),
    ]);

  return (
    <>
      <Nav resumeUrl={hero?.secondaryCtaUrl || "/resume.pdf"} />
      <main className="relative">
        <Hero
          headline={hero?.headline ?? ""}
          subheadline={hero?.subheadline ?? ""}
          primaryCta={hero?.primaryCta ?? "View Projects"}
          primaryCtaUrl={hero?.primaryCtaUrl ?? "#projects"}
          secondaryCta={hero?.secondaryCta ?? "Download Resume"}
          secondaryCtaUrl={hero?.secondaryCtaUrl ?? "/resume.pdf"}
          statProjects={hero?.statProjects ?? 0}
          statTech={hero?.statTech ?? 0}
          statRepos={hero?.statRepos ?? 0}
          statTagline={hero?.statTagline ?? ""}
        />
        <Marquee />
        <About />
        <ProjectsSection projects={projects} />
        <JourneyTimeline items={journey} />
        <SkillsSection skills={skills} />
        <GithubSection
          username={github?.username ?? ""}
          totalRepos={github?.totalRepos ?? 0}
          totalCommits={github?.totalCommits ?? 0}
          followers={github?.followers ?? 0}
          topLanguages={github?.topLanguages ?? ""}
        />
        <Testimonials items={testimonials} />
        <Faq items={faqs} />
        <ContactSection email={contact?.email ?? ""} />
      </main>
      <Footer socials={socials} />
    </>
  );
}
