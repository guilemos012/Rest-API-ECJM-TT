import {PrismaClient} from "@prisma/client";  //faz conexao entre as Models e as tabelas do banco
import {Request, Response} from "express";

const prisma = new PrismaClient();

class UsuarioController{
    async createUsuario(request:Request, response:Response) {
        try{
            const { cpf, email, nome, senha, rua, numero } = request.body
            const user = await prisma.usuario.create(
                {data: {
                    cpf,
                    email,
                    nome,
                    senha,
                    rua,
                    numero
                }
            })
            response.status(201).json({message: "Usuário criado com sucesso!", user})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

    async readUsuario(request:Request, response:Response){
        const {id} = request.params
        
        try{
            const user = await prisma.usuario.findUnique({
                where: {id: Number(id)}
            })
            if(user == null){
                throw new Error("Usuário não existe")
            }
            response.status(200).json({message: "Usuário lido com sucesso!", user});
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

    async updateUsuario(request:Request, response:Response){
        const {id} = request.params

        try{
            const user = await prisma.usuario.update({
                data: request.body,
                where: {id: Number(id)}
            })
            response.status(200).json({message: "Atualização feita com sucesso!", user})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

    async destroyUsuario(request:Request, response:Response){
        const {id} = request.params

        try{
            const user = await prisma.usuario.delete({
                where: {id: Number(id)}
            })
            response.status(204).json({menssage: "Usuário deletado com sucesso!", user})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }  
}

export default UsuarioController;