import express from "express";
import {
    getAllPembicara,
    createPembicara,
    getPembicaraById,
    updatePembicaraById,
    deletePembicaraById,
} from "../controllers/pembicaraController.js";

const router = express.Router();

router.get("/", getAllPembicara); 
router.get("/:id", getPembicaraById);
router.post("/", createPembicara);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;