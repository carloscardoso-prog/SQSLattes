// var init = false;

function listagem(parametros) {
    /*
    if (init) return false;
    
    init = true;
    */
    
    this.tabela = typeof parametros.obj !="undefined" ? parametros.obj : null;
    this.altura = typeof parametros.altura !="undefined" ? parametros.altura : 50;
    this.largura = typeof parametros.largura !="undefined" ? parametros.largura : null;
    
    if (!this.tabela) return false;
    
    this.header = this.tabela.tHead || null;
    this.mainBody = this.tabela.tBodies[0] || null;
    this.footer = this.tabela.tFoot.rows[0] || null;
    this.numColunas = this.header.rows[0].cells.length + 1;
    this.i = 1;
    
        this.tabela.className = "ext";
    
        this.organizarEstrutura = function() {
        if (this.mainBody.rows.length > 0) {
        this.tempTr = document.createElement("tr");
        this.tempTd = document.createElement("td");
        this.tempDiv = document.createElement("div");
        
        this.tempTable = document.createElement("table");
        this.tempTbody = document.createElement("tbody");
        
        this.tempTr.appendChild(this.tempTd);
        this.tempTd.appendChild(this.tempDiv);
        this.tempDiv.appendChild(this.tempTable);
        this.tempTable.appendChild(this.tempTbody);
            
            while (this.mainBody.rows.length > 0) {
            newCell = this.mainBody.rows[0].insertCell(0);
            newCell.innerHTML = this.i;
            newCell.className = "numerador";
            this.i++;
    
            var className = this.mainBody.rows[0].className;
    
            if (className == "") {
                this.mainBody.rows[0].className += (this.i%2 == 0) ? " odd" : " even";
            }
    
            addListener(this.mainBody.rows[0],'mouseover',function(){ this.className += " hover" });
            addListener(this.mainBody.rows[0],'mouseout',function(){ this.className = this.className.substring(0,this.className.indexOf(" hover")) });
            this.tempTbody.appendChild(this.mainBody.rows[0]) 
            }
            
        this.mainBody.appendChild(this.tempTr);
    
        newCell = this.header.rows[0].insertCell(0);
        newCell.className = "numerador";
        newCell.innerHTML = "&nbsp;";
        }
        
        if (this.header.rows.length > 0 && this.tempTbody) {
            for (var x=0; x<this.numColunas; x++) {
            this.header.rows[0].cells[x].style.width = this.tempTbody.rows.length > 0 ? this.tempTbody.rows[0].cells[x].style.width = this.largura[x] + "%" : null;
            }
        }
            
        this.footer.cells[0].colSpan = this.numColunas;
    
        if (!this.tempTbody) return false;
            
            this.tempTd.colSpan = this.numColunas;
            this.tempTd.className = "holder";
        
            if (this.tempTable) {
            this.tempTable.className = "int";
            }
        
            this.tableHolder = (this.tabela.parentNode.tagName.toLowerCase() == "span") ? this.tabela.parentNode.parentNode : this.tabela.parentNode;
            this.alturaDisponivel = $(window).height();
            
            if ( $(this.tempTbody).height() > (this.alturaDisponivel*this.altura)/100 - $(this.header).height() - $(this.footer).height()) {
            this.scrollBar = document.createElement("th");
            this.scrollBar.className = "scrollbar";
            this.scrollBar.innerHTML = "&nbsp;";
    
            unidade = (this.tabela.offsetWidth*1/100)
            this.scrollBar.style.width = 20 / unidade + "%";
    
            this.header.rows[0].appendChild(this.scrollBar);
    
            this.tempTd.colSpan+= 1;
            this.footer.cells[0].colSpan+= 1;	
            }
    
        this.ajustarAltura();
        }
        
        this.ajustarAltura = function() {
        
        if (!this.tempTbody) return false;
        this.tableHolder = (this.tabela.parentNode.tagName.toLowerCase() == "span") ? this.tabela.parentNode.parentNode : this.tabela.parentNode;	
        this.alturaDisponivel = $(window).height();
        this.tamanhoPermitido = (this.alturaDisponivel*this.altura)/100 - $(this.header).height() - $(this.footer).height();
        
            if ( $(this.tempTbody).height() > this.tamanhoPermitido && this.tamanhoPermitido > 0) { 
                $(this.tempTd).height(this.tamanhoPermitido);
            }
                
            else {
                var height = $(this.tempTbody).height() > 0 ? $(this.tempTbody).height() : "auto";
                $(this.tempTd).height(height);
            }
            
        }
        
        this.getItems = function() {
        return this.tempTbody.getElementsByTagName("tr");
        }
            
        this.organizarEstrutura();
        
        var _this = this;
    
        window.onresize = function() {
        _this.ajustarAltura();
        }
    
    }