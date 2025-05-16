const ClienteController = require('../controllers/cliente.controller');

function setupClienteRoutes(server) {
    server.get("/clientes", ClienteController.listarClientes);
    server.get("/clientes/:idCliente", ClienteController.obterClientePorId);
    server.post("/clientes", ClienteController.criarCliente);
    server.put("/clientes/:idCliente", ClienteController.atualizarCliente);
    server.del("/clientes/:idCliente", ClienteController.deletarCliente);
}

module.exports = setupClienteRoutes;