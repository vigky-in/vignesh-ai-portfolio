import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin login ---
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const hash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash },
  });

  // --- Hero (edit freely from /admin/hero) ---
  await prisma.heroContent.upsert({
    where: { id: "hero" },
    update: {},
    create: {
      id: "hero",
      headline: "Building Intelligent Systems That Solve Real-World Problems.",
      subheadline:
        "AI & Machine Learning Engineer specializing in Machine Learning, Computer Vision, Data Science, Python, Backend Development, and scalable AI-powered software.",
      statProjects: 0,
      statTech: 0,
      statRepos: 0,
      statTagline: "Final Year AI Engineer",
    },
  });

  // --- Contact ---
  await prisma.contactInfo.upsert({
    where: { id: "contact" },
    update: {},
    create: { id: "contact", email: "ADD_YOUR_EMAIL@example.com" },
  });

  // --- GitHub stats block (fill with your real numbers in /admin/github) ---
  await prisma.githubStats.upsert({
    where: { id: "github" },
    update: {},
    create: { id: "github", username: "vigky-in" },
  });

  // --- Social links (edit URLs in /admin/social) ---
  const socials = [
    { platform: "github", url: "https://github.com/vigky-in" },
    { platform: "linkedin", url: "https://linkedin.com/in/ADD_YOUR_HANDLE" },
    { platform: "x", url: "" },
    { platform: "leetcode", url: "" },
    { platform: "kaggle", url: "" },
    { platform: "email", url: "mailto:ADD_YOUR_EMAIL@example.com" },
  ];
  for (const s of socials) {
    await prisma.socialLink.upsert({
      where: { platform: s.platform },
      update: {},
      create: s,
    });
  }

  // --- Skills: real tech from your stack, edit freely in /admin/skills ---
  const skills = [
    ["Python", "Programming", 90],
    ["Java", "Programming", 70],
    ["C++", "Programming", 65],
    ["JavaScript", "Programming", 75],
    ["TensorFlow", "AI", 75],
    ["PyTorch", "AI", 70],
    ["OpenCV", "AI", 70],
    ["Scikit-Learn", "AI", 80],
    ["Flask", "Backend", 75],
    ["FastAPI", "Backend", 65],
    ["Node.js", "Backend", 70],
    ["React", "Frontend", 80],
    ["Next.js", "Frontend", 75],
    ["Docker", "Cloud", 55],
    ["AWS", "Cloud", 50],
    ["Git", "Tools", 85],
  ].map(([name, category, level], i) => ({
    name: name as string,
    category: category as string,
    level: level as number,
    order: i,
  }));
  for (const s of skills) {
    await prisma.skill.deleteMany({ where: { name: s.name } });
    await prisma.skill.create({ data: s });
  }

  // --- Sample project placeholder — replace/add real projects in /admin/projects ---
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.create({
      data: {
        title: "ADD_YOUR_PROJECT_TITLE",
        description:
          "Replace this with a real project description, tech stack, and results from /admin/projects.",
        category: "AI/ML",
        techStack: "Python,TensorFlow",
        featured: true,
        order: 0,
      },
    });
  }

  // --- Journey timeline placeholder — add your real milestones in /admin/journey ---
  const existingJourney = await prisma.journeyItem.count();
  if (existingJourney === 0) {
    await prisma.journeyItem.create({
      data: {
        title: "Started my AI & ML journey",
        description: "Add the real story of this milestone from the admin dashboard.",
        date: "2023",
        category: "Milestone",
        tags: "AI,ML",
        order: 0,
      },
    });
  }

  // --- FAQ ---
  const faqs = [
    ["Are you available for internships?", "Yes — add your real availability here from /admin/faq."],
    ["Do you build production AI systems?", "Describe the kind of systems you actually build."],
    ["Do you work on freelance AI projects?", "Add your real freelance availability and scope."],
    ["Which technologies do you specialize in?", "List the stack you're genuinely strongest in."],
    ["Can I view your GitHub projects?", "Yes — link is in the footer and GitHub section."],
  ].map(([question, answer], i) => ({ question, answer, order: i }));
  const existingFaq = await prisma.faqItem.count();
  if (existingFaq === 0) {
    for (const f of faqs) await prisma.faqItem.create({ data: f });
  }

  console.log("Seed complete.");
  console.log(`Admin login -> ${email} / ${password}`);
  console.log("IMPORTANT: everything marked ADD_YOUR_* is a placeholder.");
  console.log("Edit it all from /admin before you publish — no fabricated");
  console.log("testimonials, milestones, or projects were added for you.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
