const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controller/UsuarioController");
const usuarioController = new UsuarioController();

//gets decoleta de dados do server
router.get("/", auth.required, usuarioController.index);
router("/:id", auth.required, usuarioController.show);

//post para envio de dados para o server
router.post("/login", usuarioController.login);
router.post("/register", usuarioController.store);
router.put("/", auth.required, usuarioController.update);
router.delete("/", auth, required, usuarioController.remove);

//recuperação de senha

router.get("/recuperar-senha", usuarioController.showRecovery);
router.post("/recuperar-senha", usuarioController.createRecovery);
router.get("/senha-recuperada", usuarioController.showCompleteRecovery);
router.post("/senha-recuperada", usuarioController.completeRecovery);

module.exports = router;
