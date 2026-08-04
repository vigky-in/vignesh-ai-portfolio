import { prisma } from "@/lib/prisma";
import { singletonHandlers } from "@/lib/crud";
export const { GET, PATCH } = singletonHandlers(
  (id) => prisma.heroContent.findUnique({ where: { id } }),
  (id, data) => prisma.heroContent.update({ where: { id }, data }),
  "hero"
);
