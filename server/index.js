import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors('*'));
app.use(express.json());


app.get("/api/transactions", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 5;
  const type = req.query.type;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? true : false; // 🔹 По умолчанию `desc`

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase.from("transactions").select("*", { count: "exact" });

  if (type) {
    query = query.eq("type", type);
  }

  if (startDate && endDate) {
    query = query.gte("date", startDate).lte("date", endDate);
  }

  if (sortBy) {
    query = query.order(sortBy, { ascending: order });
  } else {
    query = query.order("date", { ascending: false }); // 🔹 Сортировка по убыванию даты по умолчанию
  }

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) return res.status(500).json({ error: error.message });

  res.json({ transactions: data, total: count });
});



app.post("/api/transactions", async (req, res) => {
  const { amount, description, type, date } = req.body;

  if (!amount || !description || !type || !date) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ error: "Неверный тип транзакции" });
  }

  const { data, error } = await supabase.from("transactions").insert([
    { amount, description, type, date },
  ]);

  if (error) {
    console.error("Ошибка при создании транзакции:", error.message);
    return res.status(500).json({ error: "Ошибка при добавлении транзакции" });
  }

  res.status(201).json({ message: "Транзакция добавлена", data });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
