function AppSchema(mongoose){

	var Schema = mongoose.Schema;
	
	var produto = {
	
		descricao: String,
		precoProduto:Number,
		quantidadeEstoque: Number,
		createdOn:{type: Date, default: Date.now},
		qntdEscolhida: Number

	};

	var venda = {
		quantidadeVenda:Number,
		valorVenda:Number,// por kg
		status:String,			
		createdOn:{type: Date, default: Date.now},
		produtos:[produto]
	};	
	
	var compra = {
			
		quantidadeCompra:Number,
		valorCompra:Number,// por kg
		status:String,
		createdOn:{type: Date, default: Date.now},	
		produtos:[produto]
		
	};
	
	this.usuarioSchema = new Schema({
		// dados do usuario
		nomeUsuario: String,
		login: String,
		tipo:String,// se é pessoa fisica pf- cpf ou juridica pj- cnpj e se o
					// usuario é um ADIMINISTRADOR - adm
		senha:String,
		endereco:{cidade:String, estado:String, cep:String, complemento:String},
		telefone: {celular: String,  residencial: String},

		vendas:[venda],

		compras:[compra],

		createdOn:{type: Date, default: Date.now}

	});

	this.produtoSchema = new Schema(


		produto

	);



// var Usuario = mongoose.model("Usuario", estoqueSchema);
// var Estoque = mongoose.model("Estoque", estoqueSchema);
// var Venda = mongoose.model("Venda", vendaSchema);
// var Compra mongoose.model("Estoque", compraSchema);

}

module.exports.AppSchema = AppSchema;