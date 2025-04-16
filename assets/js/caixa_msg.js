var caixaMsg = {
	alpha:0,
	criado:false,
	bloqueado:false,
	tempo:5000,
	de:eval('document.documentElement'),
	pageBody:eval('document.getElementsByTagName("body")'),
	estruturaClasses:['caixaMsg','conteudo','icone'],
	bordaClasses:['b1','b2','b3','b4'],
	
	estrutura:function() {
	
		if (this.tipo !="default") this.criarOverlay();
	
		this.estruturaDivs = new Array(this.estruturaClasses.length);
		
		for (var x=0; x<this.estruturaDivs.length; x++) {
			this.estruturaDivs[x] = document.createElement("div");
			this.estruturaDivs[x].className = this.estruturaClasses[x];
		}
		
		for (var x=0; x<this.bordaClasses.length; x++) {
			this.tempBorda = document.createElement("b");
			this.tempBorda.className = this.bordaClasses[x];
			this.estruturaDivs[0].appendChild(this.tempBorda);
		}
			
		this.elmTitulo = document.createElement("h1");
		this.elmTitulo.innerHTML = this.titulo;
		this.estruturaDivs[1].appendChild(this.elmTitulo);

		this.elmConteudo = document.createElement("div");
		this.elmConteudo.innerHTML = this.conteudo;
		this.estruturaDivs[2].appendChild(this.elmConteudo);
		
		this.pageBody[0].appendChild(this.estruturaDivs[0]);
		this.estruturaDivs[0].appendChild(this.estruturaDivs[1]);
		this.estruturaDivs[1].appendChild(this.estruturaDivs[2]);

		if (this.tipo !="default") {
			this.bloqueado = true;
		
			this.btnFechar = document.createElement("img");
			this.btnFechar.src = "/images/curriculo/v2/cabecalho/caixa_msg_fechar.gif";
			this.btnFechar.caixaMsg = this;
			this.btnFechar.className = "caixaFechar";
			this.btnFechar.onmouseover = function() { this.src = "/images/curriculo/v2/cabecalho/caixa_msg_fechar_hover.gif" }
			this.btnFechar.onmouseout = function() { this.src = "/images/curriculo/v2/cabecalho/caixa_msg_fechar.gif" }
			this.btnFechar.onclick = function() { this.caixaMsg.remover() }
			this.estruturaDivs[2].appendChild(this.btnFechar);

			this.estruturaDivs[0].style.filter = "alpha(opacity=100)";
			this.estruturaDivs[0].style.opacity = "1";
			this.estruturaDivs[0].style.mozOpacity = "1";
			
			this.botaoHolder = document.createElement("div");
			this.botaoHolder.className = "botaoHolder";
			this.estruturaDivs[1].appendChild(this.botaoHolder);
			
			this.btnConfirmar = document.createElement("input");
			this.btnConfirmar.caixaMsg = this;
			this.btnConfirmar.type = "button";
			this.btnConfirmar.value = this.txtConfirmar;
			this.botaoHolder.appendChild(this.btnConfirmar);
			
				if (this.tipo == "combo") {
				this.combo = document.createElement("select");
				this.combo.caixaMsg = this;
				this.botaoHolder.insertBefore(this.combo,this.botaoHolder.childNodes[0]);
				
					if (this.txtDados) {
					tempOption = document.createElement("option");
					tempOption.innerHTML = this.txtDados;
					tempOption.value = "";
					this.combo.appendChild(tempOption);						
					}
				
					if (this.grupoDados) {
						for (var x=0; x<this.grupoDados.length; x++) {
						tempOptGroup = document.createElement("optgroup");
						tempOptGroup.label = this.grupoDados[x];
						
							for (var y=0; y<this.dados[x].length; y++) {
							tempOption = document.createElement("option");
							tempOption.innerHTML = this.dados[x][y][0];
							tempOption.value = this.dados[x][y][1];
							if (this.dados[x][y][2]) tempOption.className = this.dados[x][y][2];
							tempOptGroup.appendChild(tempOption);
							}
					
						this.combo.appendChild(tempOptGroup);
						}
					}
					
					else {
						for (var x=0; x<this.dados.length; x++) {
						tempOption = document.createElement("option");
						tempOption.innerHTML = this.dados[x][0];
						tempOption.value = this.dados[x][1];
						if (this.dados[x][2]) tempOption.className = this.dados[x][2];
						this.combo.appendChild(tempOption);
						}
					}
				
				this.btnConfirmar.combo = this.combo;
				}

				if (this.tipo == "prompt") {
				this.promptInput = document.createElement("input");
				this.promptInput.caixaMsg = this;
				this.promptInput.type = "text";
				this.botaoHolder.insertBefore(this.promptInput,this.botaoHolder.childNodes[0]);

				this.btnConfirmar.promptInput = this.promptInput;
				}
			
				if (this.tipo == "file") {
				this.fileInput = document.createElement("input");
				this.fileInput.caixaMsg = this;
				this.fileInput.type = "file";
				this.fileInput.size = "40";
				this.botaoHolder.insertBefore(this.fileInput,this.botaoHolder.childNodes[0]);

				this.btnConfirmar.fileInput = this.fileInput;
				}

				this.btnConfirmar.onclick = function() {
					if (this.caixaMsg.txtDados && this.caixaMsg.combo.selectedIndex == 0) {
						return false;
					}
					else {
						eval (this.caixaMsg.fnConfirmar);
						this.caixaMsg.remover();
					}
				}
			
				if (this.tipo == "prompt" || this.tipo == "confirm" || this.tipo == "file") {
				this.btnCancelar = document.createElement("input");
				this.btnCancelar.caixaMsg = this;
				this.btnCancelar.type = "button";
				this.btnCancelar.value = this.txtCancelar;
				this.botaoHolder.appendChild(this.btnCancelar);

					this.btnCancelar.onclick = function() {
					eval(this.caixaMsg.fnCancelar);
					this.caixaMsg.remover();
					}
				}

			this.estruturaDivs[0].style.top = this.de.clientHeight/2 - this.estruturaDivs[0].offsetHeight/2 + "px";
	
		}
		
		else {
			this.estruturaDivs[0].style.filter = "alpha(opacity=0)";
			this.estruturaDivs[0].style.opacity = "0";
			this.estruturaDivs[0].style.mozOpacity = "0";

			this.engine(5);		
		}
		
			this.estruturaDivs[2].className += " " + this.classe;

			for (var x=this.bordaClasses.length-1; x>=0; x--) {
			this.tempBorda = document.createElement("b");
			this.tempBorda.className = this.bordaClasses[x];
			if (x>0) this.tempBorda.className += " cinza";
			this.estruturaDivs[0].appendChild(this.tempBorda);
			}
		
		this.estruturaDivs[0].style.left = this.pageBody[0].scrollWidth/2 - this.estruturaDivs[0].offsetWidth/2 + "px";
			
		this.criado = true;
				
	},
	
	exibir:function(p) {
		
		if (this.bloqueado) return false;
		if (this.criado) this.remover();
		
		this.fnConfirmar = typeof p.fnConfirmar !="undefined" ? p.fnConfirmar : null;
		this.fnCancelar = typeof p.fnCancelar !="undefined" ? p.fnCancelar : null;
		this.txtConfirmar = typeof p.txtConfirmar !="undefined" ? p.txtConfirmar : "Confirmar";
		this.txtCancelar = typeof p.txtCancelar !="undefined" ? p.txtCancelar : "Cancelar";
		this.conteudo = typeof p.conteudo !="undefined" ? p.conteudo : "";
		this.titulo = typeof p.titulo !="undefined" ? p.titulo : "";
		this.tempo = typeof p.tempo !="undefined" ? p.tempo : 2000;
		this.classe = typeof p.classe !="undefined" ? p.classe : "";
		this.tipo = typeof p.tipo !="undefined" ? p.tipo : "default";
		this.dados = typeof p.dados !="undefined" ? p.dados : null;
		this.txtDados = typeof p.txtDados !="undefined" ? p.txtDados : null;
		this.grupoDados = typeof p.grupoDados !="undefined" ? p.grupoDados : null;
		
		this.estrutura();

	},
	
	criarOverlay:function() {
		this.overlayDiv = document.createElement("div");
		this.overlayDiv.modal = this;
		this.overlayDiv.className = "overlayDiv";
		this.overlayDiv.style.filter = "alpha(opacity=50)";
		this.overlayDiv.style.opacity = "0.5";
		this.overlayDiv.style.mozOpacity = "0.5";
		this.pageBody[0].appendChild(this.overlayDiv);	
	},
	
	removerOverlay:function() {
	this.overlayDiv.parentNode.removeChild(this.overlayDiv);
	},
	
	engine:function(qtd) {

		if (qtd > 0 && this.alpha >= 100) {
		var _this = this;
		this.timer = setTimeout(function(){_this.engine(-5)},this.tempo);
		return false;
		}
		
		if (qtd < 0 && this.alpha <= 0) {
		this.remover();
		return false;
		}
		
		this.alpha+=qtd;
		
		this.estruturaDivs[0].style.filter = "alpha(opacity=" + this.alpha + ")";
		this.estruturaDivs[0].style.opacity = this.alpha < 10 ? "0.0" + this.alpha : this.alpha < 100 ? "0." + this.alpha : "1";
		this.estruturaDivs[0].style.mozOpacity = this.alpha < 10 ? "0.0" + this.alpha : this.alpha < 100 ? "0." + this.alpha : "1";
		
		var _this = this;
		this.timer = setTimeout(function(){_this.engine(qtd)},50)
	},
	
	remover:function() {
		if (this.tipo != "default") this.removerOverlay();
		this.estruturaDivs[0].parentNode.removeChild(this.estruturaDivs[0]);
		this.alpha = 0;
		this.criado = false;
		this.bloqueado = false;
		clearTimeout(this.timer);
	}
}
