const joi = require('joi')

const schemaProduto = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    }),

    estoque: joi.number().required().messages({
        'any.required': 'O campo estoque é obrigatório',
        'string.empty': 'O campo estoque é obrigatório',
        'number.base': 'o campo estoque precisa ser enviado em formato numerico'
    }),
    preco: joi.number().required().messages({
        'any.required': 'O campo preco é obrigatório',
        'string.empty': 'O campo preco é obrigatório',
        'number.base': 'o campo preco precisa ser enviado em formato numerico'
    }),
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório'
    }),

    imagem: joi.string().required().messages({
        'any.required': 'O campo imagem é obrigatório',
        'string.empty': 'O campo imagem é obrigatório'


    }),

})

module.exports = schemaProduto

