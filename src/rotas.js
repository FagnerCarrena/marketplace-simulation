const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');
const verificacao = require('./verificacao/filtros');
const validarCorpoRequisicao = require('./intermediarios/validarcorpo');
const schemaUsuario = require('./schema/schemaUsuario');
const schemaLogin = require('./schema/schemaLogin');
const schemaProduto = require('./schema/schemaProduto');


const rotas = express();




rotas.post('/usuarios', validarCorpoRequisicao(schemaUsuario), usuarios.cadastrarUsuario);
rotas.get('/produtos1', produtos.allProduct);


rotas.post('/login', validarCorpoRequisicao(schemaLogin), login.login);


rotas.use(verificacao);


rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil/:id', validarCorpoRequisicao(schemaUsuario), usuarios.atualizarPerfil);


rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', validarCorpoRequisicao(schemaProduto), produtos.cadastrarProduto);
rotas.put('/produtos/:id', validarCorpoRequisicao(schemaProduto), produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);



module.exports = rotas;