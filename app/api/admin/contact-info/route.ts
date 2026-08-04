import { prisma } from "@/lib/prisma";
import { singletonHandlers } from "@/lib/crud";
export const { GET, PATCH } = singletonHandlers(
  (id) => prisma.contactInfo.findUnique({ where: { id } }),
  (id, data) => prisma.contactInfo.update({ where: { id }, data }),
  "contact"
);
