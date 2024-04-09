/****************************************************************************************************************************************************
* Objetivo: Criar a interação com o Banco de Dados MySQL para fazer CRUD de diretores
* Data: 30/01/2024
* Autor: Ryan Alves
* Versão: 1.0
****************************************************************************************************************************************************/

// Import da Biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// Instanciando o objeto prisma com as características do Prisma Cliente
const prisma = new PrismaClient()

// Inserir um novo diretor
const insertDiretor = async (dadosDiretor) => {

    try {

        let sql = `insert into tbl_diretor (nome) values ('${dadosDiretor.nome}')`
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        
        if(resultStatus)
            return true
        else
            return false

    } catch (error) {
        
        return false

    }

}

// Atualizar um diretor existente filtrando pelo ID
const updateDiretor = async (dadosDiretor, idDiretor) => {

    try {

        let sql = `update tbl_diretor set nome = '${dadosDiretor.nome}' where id = ${idDiretor}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        
        if(resultStatus)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Deletar um diretor existente filtrando pelo ID
const deleteDiretor = async (id) => {

    try {
        let sql = `delete from tbl_diretor where id = ${id}`
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }

}

// Listar todos os diretor existentes na tabela
const selectAllDiretores = async () => {   

    try {
        let sql = 'select * from tbl_diretor order by id desc'
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }

}

// Buscar um diretor existente filtrando pelo ID
const selectByIdDiretor = async (id) => {

    try {

        let sql = `select * from tbl_diretor where id = ${id}`
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor

    } catch (error) {

        return false

    }

}

// Buscar o id do último item da tabela
const selectLastId = async () => {
   
    try {
        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_diretor limit 1'
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }

}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectLastId
}