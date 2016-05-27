app.controller("vendaController", function($scope, $http) {
	
	$scope.listaProdutos = [];
	$scope.produtosEscolhidos = [];
	
	
	$scope.descricao = "";
	$scope.precoProduto = 0 ;
	$scope.quantidadeEstoque = 0;
	
	$scope.valorVenda = 0;
	$scope.qntdEscolhida = "";
	
	$scope.soma=0;
	
	$scope.resgatarSessao = function(tela) {

		$http(
				{
					method : 'GET',
					url : '/sessaoConsultar' 

				}).then(function successCallback(response) {

					$scope.sessaoUsuario = response.data;
					$scope.verificarStatusLogin();
					// $scope.listarUsuarioId();
					if(tela == 1){
						if($scope.sessaoUsuario ==null){
							window.location.href = "LoginUsuario.html";
						}else{

							window.location.href = "Compra.html";
						}
					}else if(tela == 2){
						if($scope.sessaoUsuario ==null){
							window.location.href = "LoginUsuario.html";
						}else{

							window.location.href = "Venda.html";
						}
					}else if(tela == 3){
						if($scope.sessaoUsuario ==null){
							window.location.href = "LoginUsuario.html";
						}else{

							window.location.href = "Consulta.html";
						}
					}else if(tela == 4){

						if($scope.sessaoUsuario ==null){
							window.location.href = "LoginUsuario.html";
						}else{

							window.location.href = "AlterarDadosUsuario.html";

						}

					}else if(tela == 5){
						$scope.listarUsuarioId();

					}else if(tela == 6){
												 
						if($scope.sessaoUsuario.tipo == "pf" || $scope.sessaoUsuario.tipo == "pj"  ){
						window.location.href = "Inicial.html";
						} else{
							window.location.href = "InicialAdmin.html";
						}
					}else if(tela == 7){
						
						$http.delete("/deletarUsuario/"+$scope.sessaoUsuario._id)

						.then(
								function(response){
									$scope.logOff();
									window.location.href = "LoginUsuario.html";
								}, function(response){
									alert(response.data);
								});
						
						 
						
					}


				}, function errorCallback(response) {
					alert(response.data);
				});

	}
	
	$scope.resgatarSessao(0);
	
	$scope.verificarStatusLogin = function() {

		$scope.usuarioLogado  =  $scope.sessaoUsuario;

	}
	
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
	produtos ={ _id: produtos._id,
				descricao: produtos.descricao,
				precoProduto:produtos.precoProduto,
				quantidadeEstoque: produtos.quantidadeEstoque,
				qntdEscolhida: produtos.qntdEscolhida
		}
		
		if(produtos.qntdEscolhida>0){
			$scope.produtosEscolhidos.push(produtos);
			$scope.calcularValorVenda();
		}
		
	}
	
	
	$scope.deletarProdutoEscolhido = function(index){
		
		$scope.produtosEscolhidos.splice(index,1);
		$scope.calcularValorVenda();
	}
	
	$scope.calcularValorVenda = function (){
		$scope.soma=0;
		for(var x=0; x < $scope.produtosEscolhidos.length; x++){
			if ($scope.produtosEscolhidos[x].qntdEscolhida>0){
				$scope.soma = $scope.soma + $scope.produtosEscolhidos[x].precoProduto * $scope.produtosEscolhidos[x].qntdEscolhida;
			}
			//$scope.soma = $scope.soma + $scope.produtosEscolhidos[x].precoProduto * $scope.produtosEscolhidos[x].qntdEscolhida;			
		}
	}

	
	
	$scope.adicionarVenda = function(){
		var listavendas = Object();
		listavendas._id = $scope.sessaoUsuario._id;
		listavendas.venda = new Object();
		listavendas.venda.valorVenda = $scope.soma;
		listavendas.venda.status = "vendido";
		listavendas.venda.produtos = $scope.produtosEscolhidos;
		
		$http.put("/adicionarVenda", listavendas, {
			headers: {'Content-Type': 'application/json'}
		})
		.then(
			function(response){
								
			},
			function(response){
				alert(response.data);
			}
		);
	};
	


	$scope.compra = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			$scope.resgatarSessao(1);
		}


	}

	$scope.venda = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			$scope.resgatarSessao(2);
		}
	}

	$scope.consulta = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			if($scope.sessaoUsuario.tipo == "pj" || $scope.sessaoUsuario.tipo == "pf"){

				window.location.href = "Consulta.html";
			}else if($scope.sessaoUsuario.tipo == "adm"){
				window.location.href = "GerencimanentoAdministrador.html";
			}
			$scope.resgatarSessao(3);
		}

	}
	$scope.alterarDadosUsuario = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			$scope.resgatarSessao(4);
		}
	}

	$scope.paginaInicial = function() {


		$scope.resgatarSessao(6);

	}

	
	
	/*
	
	$scope.$watchCollection('produtosEscolhidos',function() {
		  // Função disparada sempre que o objeto $scope.items sofrer alterações
		  //$scope.total = 0;  
		  angular.forEach($scope.produtosEscolhidos, function(value, key) {
		    $scope.valorVenda += value.quantidadeVenda*value.precoProduto;
		  })
	});*/

	/*$scope.$watchCollection('items',function() {
		  // Função disparada sempre que o objeto $scope.items sofrer alterações
		  $scope.total = 0;  
		  angular.forEach($scope.items, function(value, key) {
		    $scope.total += value.quantidade * value.potencia;
		  })
	});*/
	
	
});