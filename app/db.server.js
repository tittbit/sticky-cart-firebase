import { PrismaClient } from "@prisma/client";

const prisma = global.__db__ ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.__db__ = prisma;
}

export default prisma;