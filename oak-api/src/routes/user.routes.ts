import { Router } from "../../../deps.ts";
import {
  findAll,
  findProd,
  createProd,
  updateProd,
  deleteProd,
  raiz,
} from "../handlers/users.handlers.ts";

export const router = new Router()
  .get("/api/productos", findAll)
  .get("/api/productos/:prodId", findProd)
  .post("/api/productos", createProd)
  .put("/api/productos/:prodId", updateProd)
  .delete("/api/productos/:prodId", deleteProd)
  .get("/", raiz);
