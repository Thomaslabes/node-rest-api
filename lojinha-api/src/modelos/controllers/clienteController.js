const ClienteModel = require('../models/cliente.model');
const errors = require('restify-errors');

class ClienteController {
    static async listarClientes(req, res, next) {
        try {
            const dados = await ClienteModel.getAll();
            res.send(dados);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async obterClientePorId(req, res, next) {
        try {
            const id = req.params.idCliente; 
            const dados = await ClienteModel.getById(id);
            if (!dados) {
                return next(new errors.NotFoundError('Cliente não encontrado'));
            }
            res.send(dados);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async criarCliente(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                 return next(new errors.BadRequestError('Corpo da requisição não pode ser vazio.'));
            }
            const [idInserido] = await ClienteModel.create(req.body);
            if (!idInserido) {
                return next(new errors.BadRequestError('Não foi possível inserir o cliente.'));
            }
            const clienteCriado = await ClienteModel.getById(idInserido);
            res.send(201, clienteCriado);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async atualizarCliente(req, res, next) {
        try {
            const id = req.params.idCliente;
             if (!req.body || Object.keys(req.body).length === 0) {
                 return next(new errors.BadRequestError('Corpo da requisição não pode ser vazio para atualização.'));
            }
            const atualizados = await ClienteModel.update(id, req.body);
            if (atualizados === 0) {
                return next(new errors.NotFoundError('Cliente não encontrado para atualização ou nenhum dado foi alterado.'));
            }
            const clienteAtualizado = await ClienteModel.getById(id);
            res.send(200, clienteAtualizado);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }

    static async deletarCliente(req, res, next) {
        try {
            const id = req.params.idCliente;
            const deletados = await ClienteModel.delete(id);
            if (deletados === 0) {
                return next(new errors.NotFoundError('Cliente não encontrado para exclusão.'));
            }
            res.send(204);
            return next();
        } catch (err) {
            return next(new errors.InternalServerError(err.message));
        }
    }
}

module.exports = ClienteController;