function UsuarioService(mongoose, appSchema){

	var Usuario = mongoose.model("Usuario", appSchema.usuarioSchema);	

	this.listarUsuarios = function(obj_usuario, successCallback, errorCallback){

		Usuario.find({},function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
	}
	
	this.verificarLoginUsuario = function(login,senha, successCallback, errorCallback){
			
		if(login.length == 14){
			
		Usuario.find({cnpj:login,senha:senha},function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
		}else{
			Usuario.find({cpf:login,senha:senha },function (err, data){
				if (err) errorCallback(err);

				else successCallback(data);
			});
			
			
		}
	}

	this.salvarUsuario = function(obj_usuario, successCallback, errorCallback){
		var usuarioSave = new Usuario(obj_usuario);

		usuarioSave.save(function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
	}

	this.alterarUsuario = function(obj_usuario, successCallback, errorCallback){

//		var query;
		if(obj_usuario.cnpj == null || obj_usuario.cnpj == "" ){
			obj_usuario.cnpj = "";
		}else{
			
			obj_usuario.cpf = "";
		}

		
		
		Usuario.update({_id:obj_usuario._id},
				{$set:{nomeUsuario: obj_usuario.nomeUsuario, cpf:obj_usuario.cpf, cnpj:obj_usuario.cnpj, senha:obj_usuario.senha,
					endereco:{cidade:obj_usuario.endereco.cidade, estado: obj_usuario.endereco.estado, 
					cep: obj_usuario.endereco.cep, complemento: obj_usuario.endereco.complemento},
					telefone:{residencial: obj_usuario.telefone.residencial, celular: obj_usuario.telefone.celular }
				
				}},function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
	}

	this.excluirUsuario = function(usuario_id, successCallback, errorCallback){
		
		var query = {_id: usuario_id};
		Usuario.remove(query, function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
	}
	
	
	
	
	
	this.salvarVenda = function(obj_usuario, successCallback, errorCallback){

		var venda = obj_usuario.venda;

		Usuario.update({_id: obj_usuario._id},
		{$addToSet:{vendas:obj_usuario.venda}},function (err, data){
						if (err) {

							errorCallback(err);
						}

						else {

							successCallback(data);
						}
					});	
	}
	
	this.salvarCompra= function(obj_usuario, successCallback, errorCallback){
		
		var compra = obj_usuario.compra;
		
		Usuario.update({_id: obj_usuario._id},
		{$addToSet:{compras:obj_usuario.compra}},function (err, data){
			if (err) errorCallback(err);

			else successCallback(data);
		});	
	}
	
	
	
	
	
}



module.exports.UsuarioService = UsuarioService;