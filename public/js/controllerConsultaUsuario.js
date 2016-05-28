app.controller("controllerConsultaTransacoes", function($scope, $http) {

	$scope.resgatarSessao = function(tela) {

		$http(
				{
					method : 'GET',
					url : '/sessaoConsultar' 

				}).then(function successCallback(response) {

					$scope.sessaoUsuario = response.data;
					if ($scope.sessaoUsuario._id != null || $scope.sessaoUsuario._id != "" || $scope.sessaoUsuario != "") {
						$scope.listarUsuarioId2();
					}else{

						window.location.href = "LoginUsuario.html";

					}


				}, function errorCallback(response) {
					alert(response.data);
				});

	}

	$scope.resgatarSessao(0);


	$scope.listarUsuarioId2 = function(index) {
		// pode receber parametros que nem o deletar
		$http({
			method : 'GET',
			url : '/getUsuariosId/'+ $scope.sessaoUsuario._id 

		}).then(function successCallback(response) {

			$scope.dadosUsuarioLogado = response.data;
			$scope.objUsuarioLogado = new Object();
			$scope.objUsuarioLogado = $scope.dadosUsuarioLogado[0]
			var usuario = new Object();

			if($scope.objUsuarioLogado !=null ||  $scope.objUsuarioLogado != ""  ){

				var usuario = $scope.objUsuarioLogado;
				$scope.ListaComprasFeitas = usuario.compras;
				$scope.ListaVendasFeitas = usuario.vendas;
				if($scope.vp ==1){
					if(index == -1 ){


					}else{
						$scope.ListaComprasProdutos =$scope.ListaComprasFeitas[index].produtos;

					}

				}else if($scope.vp ==2){
					if(index == -1 ){


					}else{
						$scope.ListaVendasProdutos =$scope.ListaVendasFeitas[index].produtos;

					}



				}




			}else{

				window.location.href = "LoginUsuario.html";

			}

		}, function errorCallback(response) {
			alert(response.data);
		});

	};


	$scope.controladorReq = function(tela) {


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
			$scope.controladorReq(1);
		}


	}

	$scope.venda = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			$scope.controladorReq(2);
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
			$scope.controladorReq(3);
		}

	}
	$scope.alterarDadosUsuario = function() {

		if($scope.sessaoUsuario._id == null || $scope.sessaoUsuario._id == "" ){
			window.location.href = "LoginUsuario.html";
		}else{
			$scope.controladorReq(4);
		}
	}

	$scope.paginaInicial = function() {


		$scope.controladorReq(6);

	}


	$scope.verProdutos = function(index) {
		$scope.vp = 1;
		$scope.listarUsuarioId2(index) ;
	}
	$scope.verProdutosVenda = function(index) {
		$scope.vp = 2;
		$scope.listarUsuarioId2(index) ;
	}


	$scope.show = function(index) {

		$scope.mostrarCompra = true;
		$scope.mostrarVenda = false;
	}
	$scope.hide = function(index) {

		$scope.mostrarCompra = false;
		$scope.mostrarVenda = true;

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