const express = require("express");
const rentalRoutes = require("./routes");

const app = express();
const port = 4808;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", rentalRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
