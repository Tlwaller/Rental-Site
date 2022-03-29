const express = require("express");
const rentalRoutes = require("./src/rental/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/rentals", rentalRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
