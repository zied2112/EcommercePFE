const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const shortid = require("shortid");

router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addCategory);

router.route("/categories").get(getCategories);

router
  .route("/admin/category/update")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateCategories);

router
  .route("/admin/category/delete")
  .post(isAuthenticatedUser, authorizeRoles("admin"), deleteCategories);

module.exports = router;
