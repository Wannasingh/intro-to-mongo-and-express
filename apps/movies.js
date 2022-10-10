import { Router } from "express";

const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
  return res.json({
    message: "Movie data",
  });
});

export default movieRouter;
