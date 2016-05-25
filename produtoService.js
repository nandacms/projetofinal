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
		Produto.update({_id: obj_produto.id},
				{$set: {nome_produto: obj_produto.nome_produto, 
						descricao: obj_produto.descricao,
						preco_produto: obj_produto.preco_produto ,
						quantidade_estoque: obj_produto.quantidade_estoque}},
						function(err,data){
							if (err) errorCallback(err);
							else successCallback(data);
						});		
	}	
		
}

module.exports.ProdutoService = ProdutoService;