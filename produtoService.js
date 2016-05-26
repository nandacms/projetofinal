function ProdutoService(mongoose, appSchema){
	
	var Produto = mongoose.model("Produto", appSchema.produtoSchema);	
	
	
	
	this.adicionarProduto = function(obj_produto, successCallback, errorCallback){
		var produtoSave = new Produto(obj_produto);
		
		produtoSave.save(function (err, data){
			if (err) errorCallback(err);
			
			else successCallback(data);
		});	
	}
	
	
	//listando todos os produtos do produto
	this.listarProdutos = function (obj_produto, successCallback, errorCallback){
		Produto.find({}, function(err,data){
			if (err) errorCallback(err);
			else successCallback(data);
		});
	}
	
	
	this.excluirProduto = function (produto_id, successCallback, errorCallback){
		var query = {_id: produto_id};
		Produto.remove(query,function(err,data){
			if (err) errorCallback(err);
			else successCallback(data);
		});		
	}
	
	this.alterarProduto = function (obj_produto, successCallback, errorCallback){
		console.log(obj_produto);
		Produto.update({_id: obj_produto._id},
				{$set: {descricao: obj_produto.descricao,
					precoProduto: obj_produto.precoProduto ,
					quantidadeEstoque: obj_produto.quantidadeEstoque}},
						function(err,data){
						
							if (err) errorCallback(err);
							else successCallback(data);
						});		
	}	
}		



		

module.exports.ProdutoService = ProdutoService;