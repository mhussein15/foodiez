const { INTEGER } = require("sequelize");
const { Recipe, Ingredient } = require("../db/models");

exports.fetchRecipe = async (recipeID, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeID, {
      include: [
        {
          model: Ingredient,
          through: {
            attributes: [],
          },
          as: "ingredients",
          attributes: ["id"],
        },
      ],
    });
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res) => {
  try {
    const recipe = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Ingredient,
        through: {
          attributes: [],
        },
        as: "ingredients",
        attributes: ["id"],
      },
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recipeDetail = (req, res) => {
  res.json(req.recipe);
};

exports.recipeCreate = async (req, res) => {
  try {
    console.log(req.body)
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    await newRecipe.addIngredients(req.body.ingredients.split(',').map(Number));
    const recipe = await Recipe.findByPk(newRecipe.id, {
      include: [
        {
          model: Ingredient,
          through: {
            attributes: [],
          },
          as: "ingredients",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json({ newRecipe:recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recipeUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.recipe.update(req.body);
    await req.recipe.setIngredients(req.body.ingredients);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recipeDelete = async (req, res) => {
  try {
    await req.recipe.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
