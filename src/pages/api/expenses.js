import thousandSeparator from "@/utils/thousandSeparator";
import prisma from "@/services/database";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");

  try {
    const { values } = req.body;
    const { id } = req.query;

    if (req.method === "GET") {
      const expenses = await prisma.expenses.findMany({
        where: {
          status: true,
          date: {
            gte: startOfMonth.toDate(),
            lte: endOfMonth.toDate(),
          },
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
        rawAmount: expense.amount,
        date: dayjs(expense.date).add(1, "day").format("DD/MM/YYYY"),
      };

      return res.status(200).json(expenseFormatted);
    } else if (req.method === "PUT") {
      await prisma.expenses.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: false,
        },
      });

      return res.status(200).json({ removed: id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
