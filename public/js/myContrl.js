app.controller("myController", function($scope, $http) {

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
						url : '/sessaoAdicionar/'+ usuario._id + "/" + $scope.login + "/" + $scope.senha

					}).then(function successCallback(response) {

						alert("Sessão estabelecida Usuario Logado");
						//redirecionar para a pagina do usuario
						$scope.resgatarSessao();
						$scope.editarDadosUsuario();
						//window.location.href = "Inicial.html";

					}, function errorCallback(response) {
						alert(response.data);
					});
		}else{

			alert("Login ou senha invalido");

		}

	};

	$scope.resgatarSessao = function() {

		$http(
				{
					method : 'GET',
					url : '/sessaoConsultar' 

				}).then(function successCallback(response) {

					$scope.sessaoUsuario = response.data;
					$scope.verificarStatusLogin();

				}, function errorCallback(response) {
					alert(response.data);
				});


	}


	$scope.verificarStatusLogin = function() {

		$scope.usuarioLogado  = new Object($scope.sessaoUsuario);
		$scope.listarUsuarioId();
		alert($scope.usuarioLogado._id);

	}

	$scope.criarNovaConta = function() {
		var usuario = new Object();


		if($scope.login_usuario.length == 14){
			usuario.tipo="pj"; // pessoa fisica

		}else{

			usuario.tipo="pf"; // pessoa jusridica
		}


		usuario.nomeUsuario=$scope.nomeUsuario;
		usuario.login=$scope.login_usuario; 		
		usuario.senha=$scope.senha_usuario;
		usuario.telefone = new Object();
		usuario.telefone.residencial = $scope.residencial;
		usuario.telefone.celular=$scope.celular;
		usuario.endereco = new Object();
		usuario.endereco.estado=$scope.estado ;
		usuario.endereco.cidade=$scope.cidade ;
		usuario.endereco.cep=$scope.cep ;
		usuario.endereco.complemento=$scope.complemento ;



		$http.post("/adicionarUsuario", usuario,{
			headers:{'content-Type':'application/json'}
		//minetypes http pesquisar depois
		})
		.then(
				function(response){
					//$scope.listaContatos = response.data;
					// retornar para a tela de login
					window.location.href = "LoginUsuario.html";

				}, function(response) {
					alert(response.data);
				});

	}

	$scope.editarDadosUsuario = function() {
		var usuario = new Object();

		if($scope.objUsuarioLogado !=null ||  $scope.objUsuarioLogado != ""  ){

			usuario = $scope.objUsuarioLogado;


			$scope._id = usuario._id;
			$scope.nomeUsuario = usuario.nomeUsuario;
			$scope.login_usuario = usuario.login; 		
			$scope.senha_usuario = usuario.senha;

			$scope.residencial=usuario.telefone.residencial;
			$scope.celulausuario.telefone.celular;

			$scope.estado=usuario.endereco.estado ;
			$scope.cidade =usuario.endereco.cidade;
			$scope.cep=usuario.endereco.cep ;
			$scope.complemento = usuario.endereco.complemento ;
		}else{
			
			window.location.href = "LoginUsuario.html";

		}

	}

	$scope.concluirEdicaoDadosUsuario = function() {
		var usuario = new Object();


		if($scope.login_usuario.length == 14){
			usuario.tipo="pj"; // pessoa fisica

		}else{

			usuario.tipo="pf"; // pessoa jusridica
		}


		usuario.nomeUsuario=$scope.nomeUsuario;
		usuario.login=$scope.login_usuario; 		
		usuario.senha=$scope.senha_usuario;
		usuario.telefone = new Object();
		usuario.telefone.residencial = $scope.residencial;
		usuario.telefone.celular=$scope.celular;
		usuario.endereco = new Object();
		usuario.endereco.estado=$scope.estado ;
		usuario.endereco.cidade=$scope.cidade ;
		usuario.endereco.cep=$scope.cep ;
		usuario.endereco.complemento=$scope.complemento ;



		$http.post("/adicionarUsuario", usuario,{
			headers:{'content-Type':'application/json'}
		//minetypes http pesquisar depois
		})
		.then(
				function(response){
					//$scope.listaContatos = response.data;
					// retornar para a tela de login
					window.location.href = "LoginUsuario.html";

				}, function(response) {
					alert(response.data);
				});

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