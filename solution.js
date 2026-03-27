import express from "express";
import axios from "axios";
import path from "path";

const app = express();

// Fix path for Vercel
const __dirname = new URL('.', import.meta.url).pathname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    const response = await axios.get(url);
    const drink = response.data.drinks[0];

    res.render("index", {
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      instructions: drink.strInstructions
    });

  } catch (err) {
    console.log(err);
    res.send("Error fetching cocktail");
  }
});

export default app;