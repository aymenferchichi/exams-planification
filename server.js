const express = require("express");
const ConnectDB = require("./config/db");

const app = express();
// connect database
ConnectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));
//Define Routes
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/classroom", require("./routes/api/classroom"));
app.use("/api/exams", require("./routes/api/exams"));
app.use("/api/group", require("./routes/api/group"));
app.use("/api/supervisor", require("./routes/api/supervisor"));
app.use("/api/calendar", require("./routes/api/calendar"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
