const conn = require('../../db');

class ClienteModel {
    static getAll() {
        return conn("cliente").select('*');
    }

    static getById(id) {
        return conn("cliente").where("id", id).first();
    }

    static create(dadosCliente) {
        return conn("cliente").insert(dadosCliente);
    }

    static update(id, dadosCliente) {
        return conn("cliente").where("id", id).update(dadosCliente);
    }

    static delete(id) {
        return conn("cliente").where("id", id).delete();
    }
}

module.exports = ClienteModel;