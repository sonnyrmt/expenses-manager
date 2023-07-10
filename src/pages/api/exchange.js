import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const usdtToArs = await axios.get("https://criptoya.com/api/usdt/ars/0.1");
      const exchanges = await prisma.change.findMany();
      const expenses = await prisma.expenses.findMany({
        where: {
          status: true,
        },
      });

      const totalExpenses = expenses.reduce(
        (acc, curr) => {
          return {
            total: acc.total + curr.amount,
          };
        },
        { total: 0 }
      );

      const total = exchanges.reduce(
        (acc, curr) => {
          return {
            usdt: acc.usdt + curr.amount_usdt,
            ars: acc.ars + curr.amount_ars,
          };
        },
        { usdt: 0, ars: 0 }
      );

      return res.status(200).json({ total, totalExpenses, exchangeData: Math.round(usdtToArs.data.binance.bid) });
    } else if (req.method === "POST") {
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
