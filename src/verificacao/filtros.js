const knex = require('../bancodeDados/conexao')
const jwt = require('jsonwebtoken')
const senhaSegura = require('../senhaSegura')

const verificacao = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    try {
        const token = authorization.replace('Bearer ', '').trim()

        const { id } = jwt.verify(token, senhaSegura)


        const usuarioEncontrado = await knex('usuarios').where({ id }).first()


        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' })
        }

        const { senha: _, ...usuario } = usuarioEncontrado;


        req.usuario = usuario



        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = verificacao;