const knex = require('../bancodeDados/conexao')
const bcrypt = require('bcrypt')




const cadastrarUsuario = async (req, res) => {
    const { nome_loja, email, senha } = req.body
    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'O email já existe' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = await knex('usuarios')
            .insert({
                nome_loja,
                email,
                senha: senhaCriptografada
            })
            .returning('*')

        if (!usuario[0]) {
            return res.status(400).json({ mensagem: 'O usuário não foi cadastrado.' })
        }

        const { senha: _, ...cadastroUsuario } = usuario[0]


        return res.status(200).json(cadastroUsuario)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}

const obterPerfil = async (req, res) => {

    return res.status(200).json(req.usuario)
}

const atualizarPerfil = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    const { email, senha, nome_loja } = req.body



    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste && emailExiste !== usuario.email) {
            return res.status(400).json({ mensagem: 'O email já existe' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioAtualizado = await knex('usuarios')
            .where({ id: id })
            .update({

                nome_loja,
                email,
                senha: senhaCriptografada,

            })

        if (!usuarioAtualizado) {
            return res.status(400).json({ mensagem: 'O usuario não foi atualizado' })
        }

        return res.status(200).json({ mensagem: 'Usuario foi atualizado com sucesso.' })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}



module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}