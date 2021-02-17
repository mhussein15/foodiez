const { Recipe, Ingredient } = require("../db/models");

exports.fetchIngredient = async (ingredientID, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientID, {
      include: {
        model: Recipe,
        through: {
          attributes: [],
        },
        as: "recipes",
        attributes: ["id"],
      },
    });
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Recipe,
        through: {
          attributes: [],
        },
        as: "recipes",
        attributes: ["id"],
      },
    });
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.ingredientDetail = (req, res) => {
  res.json(req.ingredient);
};

exports.ingredientCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.ingredientUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.ingredient.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.ingredientDelete = async (req, res) => {
  try {
    await req.ingredient.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// //Product Create

// exports.add_product = async (req, res) => {
//   try {
//     const foundShop = await Shop.findByPk(+req.params.shopID);

//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     req.body.shopId = foundShop.id;
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
