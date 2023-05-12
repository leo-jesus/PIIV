const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controller/UsuarioController");
const usuarioController = new UsuarioController();

//post para envio de dados para o server
router.post("/login", usuarioController.login);
router.post("/register", usuarioController.store);
router.put("/", auth.required, usuarioController.update);
router.delete("/", auth.required, usuarioController.remove);

//recuperação de senha

router.get("/recuperar-senha", usuarioController.showRecovery);
router.post("/recuperar-senha", usuarioController.createRecovery);
router.get("/senha-recuperada", usuarioController.showCompleteRecovery);
router.post("/senha-recuperada", usuarioController.completeRecovery);

//gets decoleta de dados do server
router.get("/", auth.required, usuarioController.index);
router.get("/:id", auth.required, usuarioController.show);

module.exports = router;
