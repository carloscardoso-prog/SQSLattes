var navegacao;

function montarNavegacao(holder,holderAtual) {

	var body = document.getElementsByTagName("body")[0];
	
	this.toggled = false;
	this.holder = holder;
	this.contentHolders = holder.getElementsByTagName("em");
	this.hiddenHolders = holder.getElementsByTagName("span");
	this.controlHolders = getElementsByClassName(holder, "controle");
	this.fieldset = holder.getElementsByTagName("fieldset")[0];
	this.arrayCores = ['#fff','#eee','#ddd','#ccc','#bbb','#aaa','#999','#888','#777']
	this.holderAtual = holderAtual || 0;
	this.scrollerDiv = document.getElementById('conteudoNavegacao');
	this.scrollerDiv.navegacao = this;
	this.scrollerDiv.onscroll = function() { this.navegacao.verificaScroll() }
	
	this.areaSelecao = document.createElement("div");
	this.areaSelecao.className = "areaSelecao";
	this.holder.insertBefore(this.areaSelecao,this.holder.childNodes[0]);
	
	tempInputs = this.holder.getElementsByTagName("input");
	
	if (this.hiddenHolders.length > 1) {
		for (var i=0; i<this.hiddenHolders.length; i++) {
			if (this.hiddenHolders[i].className == "oculto" && i != this.holderAtual) {
				this.contentHolders[i].style.display = "none";
				this.hiddenHolders[i].style.display = "none";
			}
		}
	}

	for (var z=0; z<tempInputs.length; z++) {
		tempInputs[z].controle = x;	
	}

	if (this.contentHolders.length > 1) {
		
		for (var x=0; x<this.contentHolders.length; x++) {
		
			this.tempSeletor = document.createElement("a");
			this.tempSeletor.navegacao = this;
			
			if (x == this.holderAtual) this.tempSeletor.className = "selecionado";
			
			this.tempSeletor.controle = x;
		
			if (this.contentHolders[x].className == "oculto") {
				this.tempSeletor.onclick = function() { this.navegacao.mostrar(this.controle) }
			}
			
			else {
				this.tempSeletor.onclick = function() { this.navegacao.selecionar(this.controle) }
			}
		
			this.tempSeletor.href = "javascript:void(0)";

			var contentText = $(this.contentHolders[x]).text();
			this.tempSeletor.title = contentText;
			
			this.tempText = document.createTextNode(this.contentHolders[x].getAttribute("titulo"));
			this.tempSeletor.appendChild(this.tempText);
	
			this.areaSelecao.appendChild(this.tempSeletor);
		
		}
	
		this.seletores = this.areaSelecao.getElementsByTagName("a");
		
	}
	
	else {
		this.areaSelecao.style.display = "none";
		this.scrollerDiv.parentNode.style.width = "99%";
		this.fieldset.style.margin = "0px";
	}
	
	this.mostrar = function(controle) {
		this.seletores[this.holderAtual].className = "";
		this.hiddenHolders[this.holderAtual].style.display = "none";
		this.contentHolders[this.holderAtual].style.display = "none";
		this.holderAtual = controle;
	
		this.seletores[this.holderAtual].className = "selecionado";
		this.hiddenHolders[this.holderAtual].style.display = "";
		this.contentHolders[this.holderAtual].style.display = "";

		if (this.contentHolders[this.holderAtual].getAttribute('mensagem') !=null) {
			tempTitulo = this.contentHolders[this.holderAtual].getAttribute('titulo') || "Titulo";
			tempMensagem = this.contentHolders[this.holderAtual].getAttribute('mensagem');
			top.caixaMsg.exibir({titulo:tempTitulo,conteudo:tempMensagem});
		}
	}
	
	this.verificaScroll = function() {
	
		for (var x=0; x<this.contentHolders.length-1; x++) {
		
			if (findPos(this.contentHolders[x+1])[1] > (this.scrollerDiv.scrollTop + 10)) {
				this.seletores[this.holderAtual].className = "";
				this.holderAtual = x;
				this.seletores[this.holderAtual].className = "selecionado";
				break;
			}

			else {
				this.seletores[this.holderAtual].className = "";
				this.holderAtual = x+1;
				this.seletores[this.holderAtual].className = "selecionado";			
			}
			
		}
		
	}
	
	this.selecionar = function(controle) {
	
		if (controle == "proximo" && this.holderAtual >= this.contentHolders.length-1) return false;
		if (controle == "anterior" && this.holderAtual <= 0) return false;
	
		this.seletores[this.holderAtual].className = "";

		if (controle == "proximo" ) { this.holderAtual++ }
		else if (controle == "anterior") { this.holderAtual-- }
		else { this.holderAtual = controle }
	
		this.scrollerDiv.scrollTop = findPos(this.contentHolders[this.holderAtual])[1] - 10;

		this.seletores[this.holderAtual].className = "selecionado";
	
		if (this.contentHolders[this.holderAtual].getAttribute('mensagem') !=null) {
			tempTitulo = this.contentHolders[this.holderAtual].getAttribute('titulo') || "Titulo";
			tempMensagem = this.contentHolders[this.holderAtual].getAttribute('mensagem');
			top.caixaMsg.exibir({titulo:tempTitulo,conteudo:tempMensagem});
		}		
	}
	
	this.toggleNavegacao = function() {
	
		if (this.toggled) {
			this.areaSelecao.className = this.areaSelecao.className.substring(0, this.areaSelecao.className.indexOf(" "));
			this.holder.className = this.holder.className.substring(0, this.holder.className.indexOf(" "));
		}
		
		else {
			this.areaSelecao.className += " toggled";
			this.holder.className += " expanded";
		}
		
		this.toggled = !this.toggled;
	
	}
	
	$(window).bind("resize", resizeNavegacao);
	
	window.setTimeout(resizeNavegacao, 100);

}

function resizeNavegacao() {
	if (!navegacao || !navegacao.fieldset || !navegacao.areaSelecao) return false;
	
	var alturaBarra = 35,
		frameHeight = (document.documentElement.offsetHeight - alturaBarra);

	if (frameHeight <= 0) {
		$(navegacao.fieldset).height(385);
		$(navegacao.areaSelecao).height(385);
	}
	
	else {
		$(navegacao.fieldset).height(frameHeight);
		$(navegacao.areaSelecao).height(frameHeight);
	}
}

function iniciarNavegacao() {

	$("div.navegacao").each(function(){
	
		var index = (typeof indexAbaAtiva != "undefined") ? indexAbaAtiva : 0;
		
		navegacao = new montarNavegacao(this, index);
		
	});

}

$(document).ready(function(){
	iniciarNavegacao();
});