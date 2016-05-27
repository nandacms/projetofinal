app.controller("myControllerLogado", function($scope, $http) {

	// Codigo do controlador aqui
	

	$scope.listarTodosUsuarios = function() {
		// pode receber parametros que nem o deletar
		$http({
			method : 'GET',
			url : '/getUsuarios'

		}).then(function successCallback(response) {

			$scope.listaTabelaUsuarios = response.data;

		}, function errorCallback(response) {
			alert(response.data);
		});

	};

	$scope.listarUsuarioId = function() {
		// pode receber parametros que nem o deletar
		$http({
			method : 'GET',
			url : '/getUsuariosId/'+ $scope.usuarioLogado._id 

		}).then(function successCallback(response) {

			$scope.dadosUsuarioLogado = response.data;
			$scope.objUsuarioLogado = new Object();
			$scope.objUsuarioLogado = $scope.dadosUsuarioLogado[0]
			//$scope.editarDadosUsuario();

			var usuario = new Object();

			if($scope.objUsuarioLogado !=null ||  $scope.objUsuarioLogado != ""  ){

				usuario = $scope.objUsuarioLogado;


				$scope._id = usuario._id;
				$scope.nomeUsuarioEdit = usuario.nomeUsuario;
				//$scope.login_usuario = usuario.login; 		
				$scope.senha_usuarioEdit = usuario.senha;

				$scope.residencialEdit=usuario.telefone.residencial;
				$scope.celularEdit = usuario.telefone.celular;

				$scope.estadoEdit=usuario.endereco.estado ;
				$scope.cidadeEdit =usuario.endereco.cidade;
				$scope.cepEdit=usuario.endereco.cep ;
				$scope.complementoEdit = usuario.endereco.complemento ;
			}else{

				window.location.href = "LoginUsuario.html";

			}

		}, function errorCallback(response) {
			alert(response.data);
		});

	};

	$scope.validarLoginUsuario = function() {
		// pode receber parametros que nem o deletar



		$http(
				{
					method : 'GET',
					url : '/verificarLoginUsuario/' + $scope.login + "/" + $scope.senha

				}).then(function successCallback(response) {

					$scope.usuarioDados = response.data;
					$scope.loginUsuario();

				}, function errorCallback(response) {
					alert(response.data);
				});

	};



	$scope.loginUsuario = function() {



		if ($scope.usuarioDados.length > 0) {
			var usuario = $scope.usuarioDados[0];


			$http(
					{
						method : 'GET',
						url : '/sessaoAdicionar/'+ usuario._id + '/' + usuario.tipo
						//+ "/" + $scope.login + "/" + $scope.senha

					}).then(function successCallback(response) {

						//redirecionar para a pagina do usuario
						$scope.resgatarSessao(0);
						if(usuario.tipo == "pf" ||  usuario.tipo == "pj"){
						window.location.href = "Inicial.html";
						}else{
							window.location.href = "InicialAdmin.html";
						}

					}, function errorCallback(response) {
						alert(response.data);
					});
		}else{

			alert("Login ou senha invalido");

		}

	};

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


	
	$scope.editarDadosUsuario = function() {
		$scope.resgatarSessao(5);


	}

	$scope.concluirEdicaoDadosUsuario = function() {
		var usuario = new Object();

		if($scope.objUsuarioLogado !=null ||  $scope.objUsuarioLogado != ""  ){
			usuario = $scope.objUsuarioLogado;


			usuario.nomeUsuario=$scope.nomeUsuarioEdit;
			//usuario.login=$scope.login_usuario; 		
			usuario.senha=$scope.senha_usuarioEdit;
			usuario.telefone = new Object();
			usuario.telefone.residencial = $scope.residencialEdit;
			usuario.telefone.celular=$scope.celularEdit;
			usuario.endereco = new Object();
			usuario.endereco.estado=$scope.estadoEdit ;
			usuario.endereco.cidade=$scope.cidadeEdit ;
			usuario.endereco.cep=$scope.cepEdit ;
			usuario.endereco.complemento = $scope.complementoEdit ;



			$http.put("/alterarUsuario", usuario,{
				headers:{'content-Type':'application/json'}
			//minetypes http pesquisar depois
			})
			.then(
					function(response){
						alert("Dados Alterados com Sucesso");


					}, function(response) {
						alert(response.data);
					});
		}else{

			window.location.href = "LoginUsuario.html";

		}

	}
	
	$scope.deletarConta = function() {


		$scope.resgatarSessao(7);

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

function SomenteNumero(e) {
	var tecla = (window.event) ? event.keyCode : e.which;
	if ((tecla > 47 && tecla < 58))
		return true;
	else {
		if (tecla == 8 || tecla == 0)
			return true;
		else
			return false;
	}
}

