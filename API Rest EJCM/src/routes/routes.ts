// Importações
import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";
import CompraController from "../controllers/compra.controller";
import ProdutoController from "../controllers/produto.controller";
// const UsuarioController = require("../controllers/usuario.controller")
// const CompraController = require("../controllers/compra.controller")
// const ProdutoController = require("../controllers/produto.controller")

const router = Router()

const usuarioController = new UsuarioController();
const compraController = new CompraController();
const produtoController = new ProdutoController();

// Definição das rotas para Usuário
router.post("/usuarios", usuarioController.createUsuario)
router.get("/usuarios/:id", usuarioController.readUsuario)
router.put("/usuarios/:id", usuarioController.updateUsuario)
router.delete("/usuarios/:id", usuarioController.destroyUsuario)

// Definição das rotas para Compra
router.post("/compras", compraController.createCompra)
router.get("/compras", compraController.readCompra)
router.put("/compras/:id", compraController.updateCompra)
router.delete("/compras/:id", compraController.destroyCompra)

// Definição das rotas para Produto
router.post("/produtos", produtoController.createProduto)
router.get("/produtos", produtoController.readProduto)
router.put("/produtos/:id", produtoController.updateProduto)
router.delete("/produtos/:id", produtoController.destroyProduto)

export default router;