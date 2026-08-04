import { prisma } from "@/lib/prisma";
import { listCreateHandlers } from "@/lib/crud";
export const { GET } = listCreateHandlers(prisma.contactMessage, { createdAt: "desc" });
