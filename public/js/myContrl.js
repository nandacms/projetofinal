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
			

			}, function errorCallback(response) {
				alert(response.data);
			});
		}

	};

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