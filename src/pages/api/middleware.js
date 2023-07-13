import jwt from "jsonwebtoken";
import prisma from "@/services/database";

export default function middleware(handler) {
  return async function (req, res) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      const decoded = jwt.verify(token, "secretKey");

      const user = await prisma.users.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) return res.status(401).end();
      delete user.password;
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(400).send(error);
    }
  };
}
