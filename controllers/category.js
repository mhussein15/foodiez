const { Category } = require("../db/models");

exports.fetchCategory = async (categoryID, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryID);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.categoryDetail = (req, res) => res.json(req.category);

exports.categoryCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.categoryUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.category.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.categoryDelete = async (req, res) => {
  try {
    await req.category.destroy();
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
