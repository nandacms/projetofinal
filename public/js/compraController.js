app.controller("compraController", function($scope,$http) {
	
	$scope.qntdEscolhida = "";
	$scope.listaProdutos = [];
	$scope.produtosEscolhidos = [];
	$scope.id;
	$scope.soma = 0;
	
	
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
	
	$scope.adicionarProdutos = function(id, produtos){
		$scope.produtosEscolhidos.push(produtos);
		var obj = id;
		for(var x=0; x < $scope.produtosEscolhidos.length; x++){
			if($scope.produtosEscolhidos[x].qntdEscolhida <= $scope.produtosEscolhidos[x].quantidadeEstoque){
				if($scope.produtosEscolhidos[x]._id == obj){
					$scope.produtosEscolhidos[x].valorTotal = $scope.produtosEscolhidos[x].precoProduto * $scope.produtosEscolhidos[x].qntdEscolhida;
					$scope.soma = $scope.soma + $scope.produtosEscolhidos[x].valorTotal;
				}
			}else{
				$scope.produtosEscolhidos.splice(x,1);
				alert("Quantidade escolhida maior do que a quantidade em estoque.");
			}
		}
	};
	
	$scope.adicionarCompra = function(){
		var listacompras = Object();
		listacompras._id = "5746feb4d78b68fc02ee28dc";
		listacompras.compra = new Object();
		listacompras.compra.valorCompra = $scope.soma;
		listacompras.compra.status = "comprado";
		listacompras.compra.produtos = $scope.produtosEscolhidos;
		$http.put("/adicionarCompra", listacompras, {
			headers: {'Content-Type': 'application/json'}
		})
		.then(
			function(response){
				/*$scope.listarContato();
				$scope.limpar();
				$scope.listaTelefones = response.data;*/
				
			},
			function(response){
				alert(response.data);
			}
		);
	};
	
});