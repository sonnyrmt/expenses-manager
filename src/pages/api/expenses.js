import thousandSeparator from "@/utils/thousandSeparator";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { values } = req.body;

    if (req.method === "GET") {
      const expenses = await prisma.expenses.findMany({
        where: {
          status: true,
        },
        include: {
          methods: true,
          categories: true,
        },
      });

      const expensesFormatted = expenses.map((curr) => {
        return {
          ...curr,
          method: curr.methods.description,
          category: curr.categories.description,
          amount: `- ${thousandSeparator(curr.amount)}`,
          date: dayjs(curr.date).add(1, "day").format("DD/MM/YYYY"),
        };
      });

      return res.status(200).json(expensesFormatted);
    } else if (req.method === "POST") {
      const expense = await prisma.expenses.create({
        data: {
          description: values.description,
          category: values.category,
          method: values.method,
          amount: parseInt(values.amount.replaceAll(".", "")),
          date: new Date(),
          status: true,
        },
        include: {
          methods: true,
          categories: true,
        },
      });

      const expenseFormatted = {
        ...expense,
        method: expense.methods.description,
        category: expense.categories.description,
        amount: `- ${thousandSeparator(expense.amount)}`,
        date: dayjs(expense.date).add(1, "day").format("DD/MM/YYYY"),
      };

      return res.status(200).json(expenseFormatted);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
