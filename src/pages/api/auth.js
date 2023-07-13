import middleware from "./middleware";

const handler = async (req, res) => {
  try {
    const { wallet_balance, id } = req.user;
    return res.status(200).send({ wallet_balance, id });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export default middleware(handler);
