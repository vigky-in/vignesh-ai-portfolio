import { prisma } from "@/lib/prisma";
import { listCreateHandlers } from "@/lib/crud";
export const { GET, POST } = listCreateHandlers(prisma.faqItem, { order: "asc" });
