import express from "express";
import { 
    getAllEvents,
    createEvent,
    getEventById,
    updateEventById,
    deleteEventById,
} from "../controllers/eventController.js";


const router = express.Router();

router.get("/", getAllEvents); 
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);


export default router;