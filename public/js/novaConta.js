app.controller("myControllerNovaConta", function($scope, $http) {

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