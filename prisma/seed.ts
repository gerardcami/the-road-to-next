import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Fix login issue",
    content: "Users cannot log in using Google OAuth.",
    status: "OPEN" as const,
    deadline: "2025-03-15",
    bounty: 750,
  },
  {
    title: "Improve database performance",
    content: "Optimize queries for faster response times.",
    status: "IN_PROGRESS" as const,
    deadline: "2025-03-20",
    bounty: 1200,
  },
  {
    title: "Add dark mode",
    content: "Implement dark mode for better user experience.",
    status: "DONE" as const,
    deadline: "2025-02-28",
    bounty: 500,
  },
  {
    title: "Refactor API endpoints",
    content: "Cleanup and document API endpoints for better maintainability.",
    status: "OPEN" as const,
    deadline: "2025-03-18",
    bounty: 800,
  },
  {
    title: "Fix payment gateway bug",
    content: "Some users report failed transactions.",
    status: "IN_PROGRESS" as const,
    deadline: "2025-03-22",
    bounty: 950,
  },
  {
    title: "Improve accessibility",
    content: "Ensure the site is WCAG compliant.",
    status: "DONE" as const,
    deadline: "2025-02-25",
    bounty: 600,
  },
  {
    title: "Implement real-time notifications",
    content: "Users should get instant notifications.",
    status: "OPEN" as const,
    deadline: "2025-03-30",
    bounty: 1100,
  },
  {
    title: "Fix CSS glitches",
    content: "Mobile layout is broken on some devices.",
    status: "DONE" as const,
    deadline: "2025-02-27",
    bounty: 450,
  },
  {
    title: "Upgrade server dependencies",
    content: "Update outdated packages for security fixes.",
    status: "IN_PROGRESS" as const,
    deadline: "2025-03-10",
    bounty: 700,
  },
  {
    title: "Enhance search functionality",
    content: "Implement filters and sorting options.",
    status: "OPEN" as const,
    deadline: "2025-03-25",
    bounty: 900,
  },
];

const users = [
  { username: "admin", email: "admin@admin.com" },
  { username: "gcami", email: "gerardcamigay@gmail.com" },
  { username: "alice_dev", email: "alice@example.com" },
  { username: "bob_builder", email: "bob@example.com" },
  { username: "charlie_coder", email: "charlie@example.com" },
  { username: "dave_admin", email: "dave@example.com" },
  { username: "eve_tester", email: "eve@example.com" },
  { username: "frank_manager", email: "frank@example.com" },
  { username: "grace_reviewer", email: "grace@example.com" },
  { username: "henry_support", email: "henry@example.com" },
  { username: "irene_designer", email: "irene@example.com" },
  { username: "jack_marketer", email: "jack@example.com" },
  { username: "karen_sales", email: "karen@example.com" },
  { username: "leo_hr", email: "leo@example.com" },
  { username: "mike_engineer", email: "mike@example.com" },
  { username: "nancy_writer", email: "nancy@example.com" },
  { username: "oliver_research", email: "oliver@example.com" },
  { username: "peter_trainer", email: "peter@example.com" },
  { username: "quincy_devops", email: "quincy@example.com" },
  { username: "rachel_security", email: "rachel@example.com" },
  { username: "steve_architect", email: "steve@example.com" },
  { username: "tina_consultant", email: "tina@example.com" },
  { username: "ursula_pm", email: "ursula@example.com" },
  { username: "victor_data", email: "victor@example.com" },
  { username: "wendy_ai", email: "wendy@example.com" },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started...");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash("geheimnis");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[1].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0})`);
};

seed();
