import { ObjectId } from "mongodb";
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

  // 3) เริ่ม Insert ข้อมูลลงใน Database โดยใช้ `collection.insertMany(query)`
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `movieData`
  const movieData = req.body; // Ensure this is an array of movie objects
  const result = await collection.insertMany(movieData);
  // 4) Return ตัว Response กลับไปหา Client
  return res.json({
    message: `${result.insertedCount} movie records have been created successfully`,
    insertedIds: result.insertedIds,
  });
});

movieRouter.post("/", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `movies`
  const collection = db.collection("movies");

  // 3) เริ่ม Insert ข้อมูลลงใน Database โดยใช้ `collection.insertOne(query)`
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `movieData`
  const movieData = { ...req.body };
  const movies = await collection.insertMany(movieData);
  // 4) Return ตัว Response กลับไปหา Client
  return res.json({
    message: `Movie record (${movies.insertedId}) has been created successfully`,
  });
});

movieRouter.put("/:movieId", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `movies`
  const collection = db.collection("movies");

  // 3) Update ข้อมูลใน Database โดยใช้ `collection.updateOne(query)` โดยการ
  // นำ movieId จาก Endpoint parameter มา Assign ลงใน Variable `movieId` โดยที่ใช้ ObjectId ในการ Convert Type ก่อน
  const movieId = ObjectId(req.params.movieId);
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `newMovieData`
  const newMovieData = { ...req.body };

  await collection.updateOne(
    {
      _id: movieId,
    },
    {
      $set: newMovieData,
    }
  );

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: `Movie record (${movieId}) has been updated successfully`,
  });
});

movieRouter.delete("/:movieId", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `movies`
  const collection = db.collection("movies");

  // 3) Delete ข้อมูลออกจากใน Database โดยใช้ `collection.deleteOne(query)`
  // นำ movieId จาก Endpoint parameter มา Assign ลงใน Variable `movieId`
  const movieId = ObjectId(req.params.movieId);

  await collection.deleteOne({
    _id: movieId,
  });

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: `Movie record (${movieId}) has been deleted successfully`,
  });
});

export default movieRouter;
