const ProdutoModel = require('../models/produto.model');
const errors = require('restify-errors');

class ProdutoController {
    static async listarProdutos(req, res, next) {
        try {
            const dados = await ProdutoModel.getAll();
            res.send(dados);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async obterProdutoPorId(req, res, next) {
        try {
            const id = req.params.idProd;
            const dados = await ProdutoModel.getById(id);
            if (!dados) {
                return next(new errors.NotFoundError('Produto não encontrado'));
            }
            res.send(dados);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async criarProduto(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                 return next(new errors.BadRequestError('Corpo da requisição não pode ser vazio.'));
            }
            const [idInserido] = await ProdutoModel.create(req.body); // Knex retorna um array com o ID
            if (!idInserido) {
                return next(new errors.BadRequestError('Não foi possível inserir o produto. Verifique os dados enviados.'));
            }
            const produtoCriado = await ProdutoModel.getById(idInserido);
            res.send(201, produtoCriado); // 201 Created
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async atualizarProduto(req, res, next) {
        try {
            const id = req.params.idProd;
            // Adicionar validação do req.body aqui
             if (!req.body || Object.keys(req.body).length === 0) {
                 return next(new errors.BadRequestError('Corpo da requisição não pode ser vazio para atualização.'));
            }
            const atualizados = await ProdutoModel.update(id, req.body);
            if (atualizados === 0) { 
                return next(new errors.NotFoundError('Produto não encontrado para atualização ou nenhum dado foi alterado.'));
            }
            const produtoAtualizado = await ProdutoModel.getById(id);
            res.send(200, produtoAtualizado);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async deletarProduto(req, res, next) {
        try {
            const id = req.params.idProd;
            const deletados = await ProdutoModel.delete(id);
            if (deletados === 0) { // Knex delete retorna o número de linhas afetadas
                return next(new errors.NotFoundError('Produto não encontrado para exclusão.'));
            }
            res.send(204); 
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }
}

module.exports = ProdutoController;