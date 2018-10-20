"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("./users.model");
//import construct = Reflect.construct;
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        //retorna todos os documentos
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        //retorna documento
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        //insere documento
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        //atualiza documento
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true }; //para reescrever todo o arquivo
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            })
                .then(this.render(resp, next))
                .catch(next);
        });
        //alterando parte do documento
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        //deletando documento
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id }).exec()
                .then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
