const express = require("express");
const app = express();
const cvsRouter = require("./routes/cvs.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", cvsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



