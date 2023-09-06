const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./database/db");
const morgan = require("morgan");
const fetchuser = require("./middleware/fetchuser");
const allowRoles = require("./middleware/checkrole");
db();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/api/auth", require("./routes/userAuth"));

app.get("/hy", fetchuser, allowRoles(["user", "superadmin"]), (req, res) => {
  res.json({ message: "onlyAdmin" });
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
