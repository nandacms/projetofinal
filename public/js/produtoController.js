app.controller("produtoController", function($scope,$http) {
		$scope.id="";
		$scope.descricao = "";
		$scope.precoProduto = "";
		$scope.quantidadeEstoque = "";
		$scope.listaProdutos= [];
		
		$scope.adicionarProduto = function(){

			//um objeto produto com as caracteristicas descricao...
			var produto = {descricao: $scope.descricao,
							precoProduto:$scope.quantidadeEstoque};
			//adicionarUsuario e a url existente no JSON, contato e o nome da minha variavel
			$http.post("/salvarProduto",produto,{
				headers:{'contente-Type':'application/json'}
			})
			.then(
					function(response){
						$scope.listaProduto();
					},
					function(response){
						alert(response.data);
					}
			);
		}
		
		
		
		$scope.editarProduto = function(produto){
			//criar uma variavel global para referenciar o objeto
			//variavel do meu controller $scope.quantidadeEstoque,nome que esta no banco depois do (produto.) produto.quantidadeEstoque
			$scope.objEditar=produto;
			$scope.id = null;
			$scope.descricao=produto.descricao;
			$scope.quantidadeEstoque=produto.quantidadeEstoque;
			$scope.precoProduto=produto.precoProduto;			
		},function(){
			//e usado $scope.objEditar.id para pegar o id que foi alterado.
			var editarProduto = {id: $scope.objEditar._id, descricao:$scope.descricao ,precoProduto:$scope.precoProduto, quantidadeEstoque:$scope.quantidadeEstoque};
										
			$http.put("/editarProduto",editarProduto,{
				headers: {'contente-Type':'application/json'}
			})
			.then(
				function(respose){
					$scope.listaProduto();
					
					$scope.descricao = "";
					$scope.id = null;
					$scope.precoProduto="";
				},
					function(response){
						alert(response.data);
					}
			);	
			
		}
		
		
		$scope.deletarProduto = function(id){
			$http.delete("/excluirProduto/"+id)
			
			.then(
					function(response){
						$scope.carregarListaContatos();
					},
					function(response){
						alert(response.data);
					}
			);
		
		}
		
		
		
		
		
		
		
		$scope.listaProduto = function(){
			$http({
				method:'GET',
				url:'/getProdutos'
			})
			.then(function successCallback(response){
				$scope.listaProdutos= response.data;
			} , function erroCallback(response){
				alert(response.data);

			});
		}

		$scope.listaProduto();
		
		
		
		
		
		

	
	
	
	
	
	
	
	
	
	
	
});

