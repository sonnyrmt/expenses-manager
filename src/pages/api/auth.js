import middleware from "./middleware";

const handler = async (req, res) => {
  try {
    return res.status(200).send({ token: "OK" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export default middleware(handler);
