const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  fetchRecipe,
  recipeList,
  recipeDetail,
  recipeUpdate,
  recipeDelete,
  recipeCreate,
} = require("../controllers/recipe");

router.param("recipeID", async (req, res, next, recipeID) => {
  const foundRecipe = await fetchRecipe(recipeID, next);
  if (foundRecipe) {
    req.recipe = foundRecipe;
    next();
  } else {
    next({
      status: 404,
      message: "Recipe Not Found",
    });
  }
});
//GET RECIPE LIST`
router.get("/", recipeList);
//GET DETAIL
router.get("/:recipeID", recipeDetail);
//ADD PRODUCT
router.post("/", upload.single("image"), recipeCreate);
//UPDATE PRODUCT
router.put("/:recipeID", upload.single("image"), recipeUpdate);
//DELETE PRODUCT
router.delete("/:recipeID", recipeDelete);

module.exports = router;
