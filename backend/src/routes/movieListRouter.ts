import { Router } from "express";
import {
  addMovieToList,
  removeMovieFromList,
  getUserList,
} from "../controllers/movieListController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/", getUserList);
router.post("/", addMovieToList);
router.delete("/:movieId", removeMovieFromList);

export default router;
