const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  fetchCategory,
  categoryList,
  categoryDetail,
  categoryUpdate,
  categoryDelete,
  categoryCreate,
} = require("../controllers/category");

router.param("categoryID", async (req, res, next, categoryID) => {
  const foundCategory = await fetchCategory(categoryID, next);
  if (categoryID) {
    req.category = foundCategory;
    next();
  } else {
    next({
      status: 404,
      message: "Category Not Found",
    });
  }
});

router.get("/", categoryList);
//GET DETAIL
router.get("/:categoryID", categoryDetail);
//ADD PRODUCT
router.post("/", upload.single("image"), categoryCreate);
//UPDATE PRODUCT
router.put("/:categoryID", upload.single("image"), categoryUpdate);
//DELETE PRODUCT
router.delete("/:categoryID", categoryDelete);

module.exports = router;
