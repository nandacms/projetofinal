app.controller("vendaController", function($scope, $http) {
	
	$scope.listaProdutos = [];
	$scope.produtosEscolhidos = [];
	
	
	/*$scope.descricao = "";
	$scope.precoProduto = 0 ;
	$scope.quantidadeEstoque = 0;*/
	$scope.valorVenda = 0;
	
	
	$scope.listarProdutos = function(){
		$http({
			method:'GET',
			url:'/getProdutos'
		})
		.then(function successCallback(response){
			$scope.listaProdutos = response.data;
		},
		function errorCallback(response){
			alert(response.data);
		});
	};
	
	$scope.listarProdutos();
	
	$scope.adicionarProdutosEscolhidos = function (produtos){
		var produto ={ descricao: produtos.descricao,
				precoProduto:produtos.precoProduto,
				quantidadeEstoque: produtos.quantidadeEstoque
		}
		
		$scope.valorVenda = produtos.precoProduto;
		$scope.produtosEscolhidos.push(produtos);
		
		
		
	}
	
	
	$scope.deletarProdutoEscolhido = function(index){
		$scope.produtosEscolhidos.splice(index,1);
	}
	
	$scope.adicionarVenda = function (){
		
	}
	
/*$scope.inserirEmpresa= function(){
		
		Para que pegue as propriedades que já estão na tela em relação ao interesse
			
		var empresa = {nomeFantasia: $scope.nomeFantasia, 
						razaoSocial: $scope.razaoSocial, 
						cnpj: $scope.cnpj, 
						cidade: $scope.cidade };
						
		$scope.empresas.push(empresa);
		
		$scope.limpar();
		
	}*/
	
	
});