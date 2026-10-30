import { Router } from "express";
import { listerProduits } from "../controllers/produits.controller.js";

const router = Router();

router.get("/", listerProduits);

export default router;