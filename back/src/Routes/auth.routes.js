import { Router } from "express";
import { login, logout, register, profile } from "../Controllers/auth.controller.js"
import { authRequired } from "../Middlerwares/ValidateToken.js"

const router = Router();

router.post('/registro', register)
router.post('/ingreso', login)
router.post('/salir', logout)
router.get('/perfil', authRequired, profile)

export default router;



