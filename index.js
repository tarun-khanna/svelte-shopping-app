const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// middlewares
app.use(express.json({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "assets")));

mongoose.connect(
  "mongodb+srv://tarunraj95:e0Rb5BuERpjk8ij5@cluster0.5ki0z.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/payment", require("./routes/payment"));
app.use("/image", require("./routes/image"));

app.listen(port, () => console.log(`server started on port ${port}`));
