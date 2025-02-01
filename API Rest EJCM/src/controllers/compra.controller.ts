import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";

const prisma = new PrismaClient();

class CompraController{
    async createCompra(request:Request, response:Response){
        try{
            const { dataCompra, valorCompra, usuarioId, produtos } = request.body
            const compra = await prisma.compra.create({
                data: {
                    dataCompra,
                    valorCompra,
                    usuarioId,
                    produtos: {
                        connect: produtos
                    }
                }
            })
            response.status(201).json({message: "Compra criada com sucesso!", compra})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

    async readCompra(srequest:Request, response:Response){
        try{
            const compras = await prisma.compra.findMany()
            if(compras == null){
                throw new Error("Compra não existe")
            }
            response.status(200).json({message: "Compra(s) lida(s) com sucesso!", compras})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }   

    async updateCompra(request:Request, response:Response){
        const {id} = request.params
        try{
            const compra = await prisma.compra.upsert({
                where: {id: Number(id)},
                update: request.body.update,
                create: request.body.create
            })
            response.status(200).json({message: "Compra atualizada com sucesso!", compra})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

    async destroyCompra(request:Request, response:Response){
        const {id} = request.params
        try{
            const compra = await prisma.compra.delete({
                where: {id: Number(id)}
            })
            response.status(204).json({message: "Compra excluída com sucesso!", compra})
        }
        catch(error){
            response.status(500).json({error:error})
        }
    }

}

export default CompraController;