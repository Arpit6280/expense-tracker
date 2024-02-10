const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extendedurl: false }));
const sequelize = require("./database");
const Expense = require("./models/expense");

app.post("/add-expense", (req, res, next) => {
  const { amount, description, category } = req.body;
  console.log(amount, category, description);
  Expense.create({
    amount: amount,
    description: description,
    category: category,
  })
    .then((result) => {
      res.status(201).json({ expense: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/get-expenses", (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.status(201).json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete-expense/:id", (req, res, next) => {
  const expenseId = req.params.id;
  console.log(expenseId);
  Expense.findByPk(expenseId)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/edit-expense/:id", (req, res, next) => {
  const expenseId = req.params.id;
  console.log(expenseId);
  Expense.findByPk(expenseId)
    .then((expense) => {
      res.status(200).json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/update-expense/:id", (req, res, next) => {
  const { amount, description, category } = req.body;
  const expenseId = req.params.id;
  console.log(expenseId);
  Expense.findByPk(expenseId)
    .then((expense) => {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      return expense.save();
    })
    .then((result) => {
      res.status(201).json({ expense: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
