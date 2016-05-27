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
				//	$scope.verificarStatusLogin();
				
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



					}else if(tela == 0){

						if($scope.sessaoUsuario._id != null || $scope.sessaoUsuario._id != "" ){

							if($scope.sessaoUsuario.tipo == "pf" || $scope.sessaoUsuario.tipo == "pj"  ){
								window.location.href = "Inicial.html";
							} else if ($scope.sessaoUsuario.tipo == "adm"){
								window.location.href = "InicialAdmin.html";
							}
						}


					}


				}, function errorCallback(response) {
					alert(response.data);
				});

	}

	$scope.resgatarSessao(0);
	
});