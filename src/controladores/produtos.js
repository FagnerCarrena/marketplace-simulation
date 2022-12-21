const knex = require('../bancodeDados/conexao')

const allProduct = async (req, res) => {
    try {
        const produtos = await knex('produtos')

        return res.status(200).json(produtos)
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

const listarProdutos = async (req, res) => {
    const { usuario } = req

    try {
        const produtos = await knex('produtos')
            .where({ usuario_id: usuario.id })
        return res.status(200).json(produtos)


    } catch (error) {
        return res.status(400).json(error.message)
    }

}
const obterProduto = async (req, res) => {
    const { usuario } = req
    const { id } = req.params

    try {
        const produto = await knex('produtos')
            .where({
                id,
                usuario_id: usuario.id,
            })
            .first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        return res.status(200).json(produto)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarProduto = async (req, res) => {
    const { usuario } = req
    const { nome, estoque, preco, descricao, imagem } = req.body;

    try {
        const produto = await knex('produtos').insert({
            usuario_id: usuario.id,
            nome,
            estoque,
            preco,
            descricao,
            imagem,
        }).returning('*')


        if (!produto[0]) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado' })
        }

        return res.status(200).json(produto[0])
    } catch (error) {
        return res.status(400).json(error)
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req
    const { id } = req.params
    const { nome, estoque, preco, descricao, imagem, usuario_id } = req.body


    try {
        const produto = await knex('produtos')
            .where({
                id,
                usuario_id: usuario.id,
            })
            .first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        const produtoAtualizado = await knex('produtos')
            .where({
                id: produto.id,
                usuario_id: usuario.id,
            })
            .update({
                nome,
                estoque,
                preco,
                descricao,
                imagem,
                usuario_id
            })

        if (!produtoAtualizado) {
            return res.status(400).json({ mensagem: 'O produto não foi atualizado' })
        }

        return res.status(200).json({ mensagem: 'produto foi atualizado com sucesso.' })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req
    const { id } = req.params

    try {
        const produto = await knex('produtos')
            .where({
                id,
                usuario_id: usuario.id,
            })
            .first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        const produtoExcluido = await knex('produtos')
            .where({
                id,
                usuario_id: usuario.id,
            })
            .del()

        if (!produtoExcluido) {
            return res.status(400).json({ mensagem: 'O produto não foi excluido' })
        }

        return res.status(200).json({ mensagem: 'Produto excluido com sucesso' })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto,
    allProduct
}