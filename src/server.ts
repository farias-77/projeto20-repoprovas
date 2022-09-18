import dotenv from "dotenv";
import app from "./index";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});