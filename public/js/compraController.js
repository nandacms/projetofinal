app.controller("compraController", function($scope,$http) {
	
	$scope.listaProdutos = [];
	$scope.produtosEscolhidos = [];
	
	
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
	
	
	
});