app.controller("compraController", function($scope,$http) {
	
	$scope.qntdEscolhida = "";
	$scope.listaProdutos = [];
	$scope.produtosEscolhidos = [];
	$scope.id;
	$scope.soma = 0;
	
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
	
	$scope.adicionarProdutos = function(id, produtos){
		$scope.produtosEscolhidos.push(produtos);
		var obj = id;
		//$scope.soma = 0;
		for(var x=0; x < $scope.produtosEscolhidos.length; x++){
			if($scope.produtosEscolhidos[x].qntdEscolhida <= $scope.produtosEscolhidos[x].quantidadeEstoque){
				if($scope.produtosEscolhidos[x]._id == obj){
					$scope.produtosEscolhidos[x].valorTotal = $scope.produtosEscolhidos[x].precoProduto * $scope.produtosEscolhidos[x].qntdEscolhida;
					$scope.soma = $scope.soma + $scope.produtosEscolhidos[x].valorTotal;
					
				}
			}else{
				$scope.produtosEscolhidos.splice(x,1);
				alert("Quantidade escolhida maior do que a quantidade em estoque.");
				//$scope.soma = $scope.soma - $scope.produtosEscolhidos[x].valorTotal;
			}
		}
	};
	
	$scope.adicionarCompra = function(){
		//$scope.resgatarSessao(0);
		console.log($scope.sessaoUsuario._id);
		var listacompras = Object();
		listacompras._id = $scope.sessaoUsuario._id;
		listacompras.compra = new Object();
		listacompras.compra.valorCompra = $scope.soma;
		listacompras.compra.status = "comprado";
		listacompras.compra.produtos = $scope.produtosEscolhidos;
		$http.put("/adicionarCompra", listacompras, {
			headers: {'Content-Type': 'application/json'}
		})
		.then(
			function(response){
				window.location.reload();
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

	
});