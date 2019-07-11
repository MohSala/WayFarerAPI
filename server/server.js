import express from "express";
import bodyParser from "body-parser";
import users from "./routers/users";
import middleware from "./middleware";
import trips from "./routers/trips";
import buses from "./routers/buses";

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3001;
// when a random route is inputed
app.get("/", middleware.checkToken, (req, res) =>
  res.status(200).send({
    message: "Welcome to this API."
  })
);

app.use("/api/v1/auth/", users);
app.use("/api/v1/trips/", middleware.checkToken, trips);
app.use("/api/v1/", middleware.checkToken, buses);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;
