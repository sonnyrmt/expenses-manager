import prisma from "@/services/database";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const categories = await prisma.categories.findMany({
        where: {
          status: true,
        },
      });
      const methods = await prisma.methods.findMany({
        where: {
          status: true,
        },
      });

      return res.status(200).json({ categories, methods });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
