import { prisma } from "@/lib/prisma";
import { singletonHandlers } from "@/lib/crud";
export const { GET, PATCH } = singletonHandlers(
  (id) => prisma.githubStats.findUnique({ where: { id } }),
  (id, data) => prisma.githubStats.update({ where: { id }, data }),
  "github"
);
