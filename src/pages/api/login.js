import prisma from "@/services/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const { user, password } = req.body;

    if (req.method === "POST") {
      const user_db = await prisma.users.findUnique({ where: { user } });
      if (!user_db) {
        return res.status(404).json({ erorr: "User do not exist" });
      }

      const passwordMatch = await bcrypt.compare(password, user_db.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }

      const token = jwt.sign({ id: user_db.id }, "secretKey");
      return res.status(200).json({ token });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
