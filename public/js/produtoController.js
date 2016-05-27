app.controller("produtoController", function($scope,$http) {
	$scope.id="";
	$scope.descricao = "";
	$scope.precoProduto = "";
	$scope.quantidadeEstoque = "";
	$scope.listaProdutos= [];
	$scope.habilitar=true;
	$scope.adicionarProduto = function(){

		//um objeto produto com as caracteristicas descricao...
		var produto = {descricao: $scope.descricao,
				precoProduto:$scope.precoProduto,
				quantidadeEstoque:$scope.quantidadeEstoque};
		//adicionarUsuario e a url existente no JSON, contato e o nome da minha variavel
		$http.post("/salvarProduto",produto,{
			headers:{'contente-Type':'application/json'}
		})
		.then(
				function(response){
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



	$scope.editarProduto = function(produto){
		//criar uma variavel global para referenciar o objeto
		//variavel do meu controller $scope.quantidadeEstoque,nome que esta no banco depois do (produto.) produto.quantidadeEstoque
		$scope.objEditar=produto;
		$scope.id = null;
		$scope.descricao=produto.descricao;
		$scope.quantidadeEstoque=produto.quantidadeEstoque;
		$scope.precoProduto=produto.precoProduto;	
		$scope.habilitar=false;
	}

	$scope.confirmarEdicao = function(){
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
					$scope.quantidadeEstoque="";
					$scope.habilitar=true;
				},
				function(response){
					alert(response.data);
				}
		);	

	}
	$scope.cancelarEditarProduto = function(){

		$scope.descricao = "";
		$scope.id = null;
		$scope.precoProduto="";
		$scope.quantidadeEstoque="";


	}



	$scope.deletarProduto = function(id){

		$http.delete("/excluirProduto/"+id)

		.then(
				function(response){
					$scope.listaProduto();
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

	$scope.verificarDuplicidadeDescricaoProduto = function () {
		var existe = false;
		for (var i = 0 ; i < $scope.listaProdutos.length; i++) {
			if ($scope.listaProdutos[i].descricao == $scope.descricao) {

				existe = true;




			}
		}

		if(existe==false){

			$scope.adicionarProduto();
		}else{alert("Produto já existe");}
	}


	$scope.resgatarSessao = function(tela) {

		$http(
				{
					method : 'GET',
					url : '/sessaoConsultar' 

				}).then(function successCallback(response) {

					$scope.sessaoUsuario = response.data;
					$scope.verificarStatusLogin();
					//$scope.listarUsuarioId();
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

	$scope.logOff = function() {

		$http({
			method : 'GET',
			url : '/sessaoDestruir'

		}).then(function successCallback(response) {

			if(response.date == null || response.date == "" ){
				window.location.href = "LoginUsuario.html";
			}

		}, function errorCallback(response) {
			alert(response.data);
		});

	}
	


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

