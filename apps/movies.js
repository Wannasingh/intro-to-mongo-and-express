import { Router } from "express";

// 1) Import ตัว Database ที่สร้างไว้มาใช้งาน
import { db } from "../utils/db.js";

const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `movies`
  const collection = db.collection("movies");

  // 3) เริ่ม Query โดยใช้ `collection.find(query)`
  const movies = await collection
    .find({ year: 2008 })
    .limit(10) // limit the result documents by 10
    .toArray(); // convert documents into an array

  // 4) Return ตัว Response กลับไปหา Client
  return res.json({ data: movies });
});

movieRouter.post("/", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `movies`
  const collection = db.collection("movies");

  // 3) เริ่ม Insert ข้อมูลลงใน Database โดยใช้ `collection.insertOne(query)`
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `movieData`
  const movieData = { ...req.body };
  const movies = await collection.insertOne(movieData);
  // 4) Return ตัว Response กลับไปหา Client
  return res.json({
    message: `Movie record (${movies.insertedId}) has been created successfully`,
  });
});

export default movieRouter;
