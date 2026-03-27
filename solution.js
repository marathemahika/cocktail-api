import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

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