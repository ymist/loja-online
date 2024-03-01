import { Router } from "express";


//CONTROLLERS
import { CreateUserController } from "./controllers/users/CreateUserController.js";
import { DetailUserController } from "./controllers/users/DetailUserController.js";
import { AuthUserController } from "./controllers/users/AuthUserController.js";

const routes = Router();

//USERS
routes.post("/signup", new CreateUserController().handle)
routes.get("/perfil", new DetailUserController().handle)
routes.post("/login", new AuthUserController().handle)


export {routes}
