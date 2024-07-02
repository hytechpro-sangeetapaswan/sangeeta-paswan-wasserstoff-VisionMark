const express = require("express");
const app = express();
const dbConnection = require('./config/dbConnection');
const itemRoute = require("./routes/item.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/items',itemRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
