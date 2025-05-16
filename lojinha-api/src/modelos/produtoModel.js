const conn = require('../../db');

class ProdutoModel {
    static getAll() {
        return conn("produto").select('*');
    }

    static getById(id) {
        return conn("produto").where("id", id).first();
    }

    static create(dadosProduto) {
        return conn("produto").insert(dadosProduto);  
    }

    static update(id, dadosProduto) {
        return conn("produto").where("id", id).update(dadosProduto);
    }

    static delete(id) {
        return conn("produto").where("id", id).delete();
    }
}

module.exports = ProdutoModel;