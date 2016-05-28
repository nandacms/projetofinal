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

	$scope.validarLoginUsuario = function() {
		// pode receber parametros que nem o deletar



		$http(
				{
					method : 'GET',
					url : '/verificarLoginUsuario/' + $scope.login + "/" + $scope.senha

				}).then(function successCallback(response) {

					$scope.usuarioDados = response.data;
					if ($scope.usuarioDados.length>=1) {
						$scope.loginUsuario();
					}else{

						alert("Login ou senha invalido");

					}

				}, function errorCallback(response) {
					alert(response.data);
				});

	};

	$scope.loginUsuario = function() {

		var usuario = $scope.usuarioDados[0];


		$http(
				{
					method : 'GET',
					url : '/sessaoAdicionar/'+ usuario._id + '/' + usuario.tipo
					//+ "/" + $scope.login + "/" + $scope.senha

				}).then(function successCallback(response) {

					if(usuario.tipo == "pf" ||  usuario.tipo == "pj"){
						window.location.href = "Inicial.html";
					}else{
						window.location.href = "InicialAdmin.html";
					}

				}, function errorCallback(response) {
					alert(response.data);
				});


	};







	$scope.resgatarSessao = function(tela) {

		$http(
				{
					method : 'GET',
					url : '/sessaoConsultar' 

				}).then(function successCallback(response) {

					$scope.sessaoUsuario = response.data;
					if ($scope.sessaoUsuario.length >=1) {
						if($scope.sessaoUsuario.tipo == "pf" ||  $scope.sessaoUsuario.tipo == "pj"){
							window.location.href = "Inicial.html";
						}else{
							window.location.href = "InicialAdmin.html";
						}
					}


				}, function errorCallback(response) {
					alert(response.data);
				});

	}

	$scope.resgatarSessao(0);





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

