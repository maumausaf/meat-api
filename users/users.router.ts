import {Router} from '../common/router'
import * as restify from 'restify'
import {NotFoundError} from "restify-errors";
import {User} from './users.model'

//import construct = Reflect.construct;

class UsersRouter extends Router{

    constructor() {
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRoutes(application: restify.Server){

     //retorna todos os documentos
        application.get('/users',(req, resp, next)=>{
            User.find()
                .then(this.render(resp,next))
                .catch(next)
        })

        //retorna documento
        application.get('/users/:id',(req,resp,next)=>{
            User.findById(req.params.id)
                .then(this.render(resp,next))
                .catch(next)
        })

        //insere documento
        application.post('/users',(req, resp, next)=>{
            let user = new User(req.body)
            user.save()
                .then(this.render(resp,next))
                .catch(next)
        })

        //atualiza documento
        application.put('/users/:id',(req,resp,next)=>{
                const options = {overwrite: true} //para reescrever todo o arquivo
                User.update({_id:req.params.id}, req.body, options)
                    .exec().then(result=>{
                        if(result.n){
                            return User.findById(req.params.id)
                        }else{
                           throw new NotFoundError('Documento não encontrado')
                        }
                })
                .then(this.render(resp,next))
                    .catch(next)
        })

        //alterando parte do documento
        application.patch('/users/:id',(req,resp,next)=>{
            const options = {new: true}
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next)
        })

        //deletando documento
        application.del('/users/:id',(req, resp, next)=> {
            User.remove({_id: req.params.id}).exec()
                .then((cmdResult: any) => {
                if (cmdResult.result.n) {
                    resp.send(204)
                } else {
                    throw new NotFoundError('Documento não encontrado')
                }
                return next()
            }).catch(next)
        })
    }
}

export const usersRouter = new UsersRouter()