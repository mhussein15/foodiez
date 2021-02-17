const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  fetchIngredient,
  ingredientList,
  ingredientDetail,
  ingredientUpdate,
  ingredientDelete,
  ingredientCreate,
} = require("../controllers/ingredient");

router.param("ingredientID", async (req, res, next, ingredientID) => {
  const foundIngredient = await fetchIngredient(ingredientID, next);
  if (ingredientID) {
    req.ingredient = foundIngredient;
    next();
  } else {
    next({
      status: 404,
      message: "Ingredient Not Found",
    });
  }
});

router.get("/", ingredientList);
//GET DETAIL
router.get("/:ingredientID", ingredientDetail);
//ADD PRODUCT

//UPDATE PRODUCT
router.put("/:ingredientID", upload.single("image"), ingredientUpdate);
//DELETE PRODUCT
router.delete("/:ingredientID", ingredientDelete);

module.exports = router;
