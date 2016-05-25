function EstoqueService(mongoose, appSchema){
	var Estoque = mongoose.model("Estoque", appSchema.estoqueSchema);	
	

}

module.exports.EstoqueService = EstoqueService;