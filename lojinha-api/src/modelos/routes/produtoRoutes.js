const ProdutoController = require('../controllers/produto.controller');

function setupProdutoRoutes(server) {
    server.get("/produtos", ProdutoController.listarProdutos);
    server.get("/produtos/:idProd", ProdutoController.obterProdutoPorId);
    server.post("/produtos", ProdutoController.criarProduto);
    server.put("/produtos/:idProd", ProdutoController.atualizarProduto);
    server.del("/produtos/:idProd", ProdutoController.deletarProduto);
}

module.exports = setupProdutoRoutes;