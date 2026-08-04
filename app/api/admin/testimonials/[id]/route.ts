import { prisma } from "@/lib/prisma";
import { itemHandlers } from "@/lib/crud";
export const { PATCH, DELETE } = itemHandlers(prisma.testimonial);
