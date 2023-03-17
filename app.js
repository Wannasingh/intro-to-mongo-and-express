import express from "express";
import movieRouter from "./apps/movies.js";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 4000;

  await client.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/movies", movieRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

init();
