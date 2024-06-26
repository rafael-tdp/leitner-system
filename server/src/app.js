const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const cardRoutes = require("./interfaces/routes/cardRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/cards", cardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
