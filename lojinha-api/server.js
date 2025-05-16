const restify = require("restify");
const errors = require("restify-errors");

const setupProdutoRoutes = require('./routes/produto.routes');
const setupClienteRoutes = require('./routes/cliente.routes');

const server = restify.createServer({
    name: "LojinhaAPI-MVC",
    version: "1.0.0"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

setupProdutoRoutes(server);
setupClienteRoutes(server);

server.get("/", (req, res, next) => {
    res.send({ "mensagem": "Bem-vindos à API da Lojinha (MVC com Restify)" });
    return next();
});

server.on('NotFound', (req, res, err, cb) => {
    res.send(new errors.NotFoundError(`Endpoint '${req.path()}' não encontrado.`));
    return cb();
});

server.on('restifyError', (req, res, err, cb) => {
    console.error({
        message: err.message,
        stack: err.stack,
        context: err.context, 
        statusCode: err.statusCode
    });

    if (!res.headersSent) { 
        res.send(err.statusCode || 500, {
            code: err.code || 'InternalError',
            message: err.message || 'Ocorreu um erro interno.'
        });
    }
    return cb();
});


const PORT = process.env.PORT || 8001;
server.listen(PORT, function () {
    console.log("%s executando em: %s", server.name, server.url);
    console.log(`Endpoints de Produtos em: http://localhost:${PORT}/produtos`);
    console.log(`Endpoints de Clientes em: http://localhost:${PORT}/clientes`);

    const conn = require('./models/db');
    conn.raw('select 1+1 as result').then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
    }).catch((err) => {
        console.error('Falha ao conectar com o banco de dados:', err.message);
    });
});