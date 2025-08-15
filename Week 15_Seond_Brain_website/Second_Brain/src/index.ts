import express from "express"

const app = express();

app.use(express.json());

// Register routes
app.use("/api/v1/signup", (req, res) => {
  

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
