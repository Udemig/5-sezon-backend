import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";
import controlId from "../middleware/controlId.js";
import express from "express";

const router = express.Router();

router
  .route("/api/v1/recipes") //
  .get(getAllRecipes)
  .post(createRecipe);

router
  .route("/api/v1/recipes/:id")
  .get(controlId, getRecipe)
  .delete(controlId, deleteRecipe)
  .patch(controlId, updateRecipe);

export default router;
