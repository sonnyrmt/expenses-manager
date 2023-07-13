import prisma from "@/services/database";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const { new_balance } = req.body;

    if (req.method === "PUT") {
      const user = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          wallet_balance: {
            increment: new_balance,
          },
        },
      });

      delete user.password;

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
