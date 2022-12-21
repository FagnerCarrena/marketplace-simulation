const joi = require('joi')

const schemaUsuario = joi.object({
    nome_loja: joi.string().required().messages({
        'any.required': 'O campo nome_loja é obrigatório',
        'string.empty': 'O campo nome_loja é obrigatório',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
    }),

    senha: joi.string().min(3).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'A senha precisa conter, no mínimo, 3 caracteres',

    }),

})




module.exports = schemaUsuario