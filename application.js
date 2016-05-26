//importar biblioteca do express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//config o mongoose npm install mongoose
var mongoose = require('mongoose');
var options = {
		db:{native_parser:true},
		server:{poolSize: 5}

}

mongoose.connect('mongodb://10.42.3.233/test', options);


app.use(bodyParser.json());
app.use(session({ secret: 'mypass', 
	saveUninitialized: false,
	resave: false,				
	cookie: { maxAge: 1000 * 60 * 60 }}));
app.use(express.static('public'));




var AppSchema = require('./schema.js').AppSchema;
var appSchemaInstance = new AppSchema(mongoose);

var UsuarioService = require('./usuarioService.js').UsuarioService;
var usuarioServiceInstance = 
					new UsuarioService(mongoose, appSchemaInstance);

var ProdutoService = require('./produtoService.js').ProdutoService;
var produtoServiceInstance = 
					new ProdutoService(mongoose, appSchemaInstance);



//Chamar os metodos aqui em baixo

//metodos da sessao
app.get('/sessaoAdicionar/:id/:login/:senha', function (req, res) {

	req.session.usuario = {_id: req.params.id, login:req.params.login, senha:req.params.senha};
	
	res.send(req.session.usuario);
});

app.get('/sessaoConsultar', function (req, res) {
	res.send(req.session.usuario);
});


//metodos do usuario aqui dentro inicio
app.post('/adicionarUsuario', function (req, res) {
	usuarioServiceInstance.salvarUsuario(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

app.put('/alterarUsuario', function (req, res) {
	usuarioServiceInstance.alterarUsuario(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});
app.delete('/deletarUsuario/:id_usuario', function (req, res) {
	usuarioServiceInstance.excluirUsuario(req.params.id_usuario, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});
app.get('/getUsuarios', function (req, res) {
	usuarioServiceInstance.listarUsuarios(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

app.get('/getUsuariosId/:id_usuario', function (req, res) {
	usuarioServiceInstance.listarUsuarioId(req.params.id_usuario, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});
app.get('/verificarLoginUsuario/:login/:senha', function (req, res) {
	usuarioServiceInstance.verificarLoginUsuario(req.params.login, req.params.senha, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});


//metodos do usuario aqui dentro  fim

//metodos do produto aqui dentro inicio
app.post('/salvarProduto', function (req, res) {
	produtoServiceInstance.adicionarProduto(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

app.get('/getProdutos', function (req, res) {
	produtoServiceInstance.listarProdutos(req.body, function (response){
		res.send(response);
	}, function(err){
		res.send(err);
	});	
});

app.delete('/excluirProduto', function(req, res){
	produtoServiceInstance.excluirProduto(req.body, function (response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

app.put('/editarProduto', function(req,res){
	produtoServiceInstance.alterarProduto(req.body, function (response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});





//metodos do produto aqui dentro fim

//metodos da venda aqui dentro inicio

app.put('/adicionarVenda', function (req, res) {
	usuarioServiceInstance.salvarVenda(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

//metodos da venda aqui dentro fim

//metodos da compra aqui dentro inicio

app.put('/adicionarCompra', function (req, res) {
	usuarioServiceInstance.salvarCompra(req.body, function(response){
		res.send(response);
	}, function(err){
		res.send(err);
	});
});

//metodos da compra aqui dentro fim


app.listen(3000,function (){
	console.log('Servidor rodando na porta 3000!');
});
