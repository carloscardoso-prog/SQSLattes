/* parametros

    tabelaId: id da tabela que vai ter funcionalidade de grid
    numMaxLinhas: número máximo de linhas a ser mostrado (para criação de barra de rolagem)
    metodoEdicao: array que determina o método de edição de cada coluna
            default = edicao livre
            null = sem edicao
            array de string = opcoes da combo box
    unicoEdicao: caso o metodo seja um array, permite que o index x seja exclusivo
    tagValor: array que determina qual elemento vai compor o array valores[] do grid
        default = conteudo da coluna
        null = nenhum valor atribuido
        tag = atribui ao array o conteudo da tag escolhida dentro da coluna
            ex: span
    largura: array com a porcentagem de largura de cada coluna
    alinhamento: array que determina o alinhamento de cada coluna (left,right,center,justify)
    numMaxRegistros: indica o numero maximo de registros no array
    exibirAdicionar: controla a visibilidade do botao adicionar
    exibirControle: controla a visibilidade dos controles de remover/alterar
    fnMovimento: funcao executada apos mover as linhas
    fnAdicionar: função chamada pelo botao de adicionar na parte inferior do grid
    manterPrimeiraLinha: impede que a primeira linha do modal seja excluida
    esconderSetas: controla a visibilidade das setas de movimentação
	
*/

function criarGrid(parametros) {

    this.tabelaId = typeof parametros.tabelaId != "undefined" ? parametros.tabelaId : null;
    this.numMaxLinhas = typeof parametros.numMaxLinhas != "undefined" ? parametros.numMaxLinhas : null;
    this.metodoEdicao = typeof parametros.metodoEdicao != "undefined" ? parametros.metodoEdicao : null;
    this.unicoEdicao = typeof parametros.unicoEdicao != "undefined" ? parametros.unicoEdicao : null;
    this.tagValor = typeof parametros.tagValor != "undefined" ? parametros.tagValor : null;
    this.largura = typeof parametros.largura != "undefined" ? parametros.largura : null;
    this.alinhamento = typeof parametros.alinhamento != "undefined" ? parametros.alinhamento : null;
    this.numMaxRegistros = typeof parametros.numMaxRegistros != "undefined" ? parametros.numMaxRegistros : null;
    this.fnMovimento = typeof parametros.fnMovimento != "undefined" ? parametros.fnMovimento : null;
    this.fnAdicionar = typeof parametros.fnAdicionar != "undefined" ? parametros.fnAdicionar : null;
    this.exibirControle = typeof parametros.exibirControle != "undefined" ? parametros.exibirControle : true;
    this.exibirAdicionar = typeof parametros.exibirAdicionar != "undefined" ? parametros.exibirAdicionar : true;
    this.manterPrimeiraLinha = typeof parametros.manterPrimeiraLinha != "undefined" ? parametros.manterPrimeiraLinha : null;
    this.esconderSetas = typeof parametros.esconderSetas != "undefined" ? parametros.esconderSetas : null;

    this.tempInputs = new Array()
    this.tabela = document.getElementById(this.tabelaId)
    this.tabela.style.visibility = "hidden"
    this.tabela.className = "grid"
    this.scroller = document.getElementById('conteudoNavegacao') != null ? document.getElementById('conteudoNavegacao') : null;
    this.cabecalho = this.tabela.tHead
    this.numCol = this.cabecalho.rows[0].cells.length
    this.corpo = this.tabela.tBodies[0]
    this.tamMax = this.corpo.rows.length > 0 ? (this.numMaxLinhas * (this.corpo.rows[0].offsetHeight + 6)) : this.numMaxLinhas * 25
    this.holder = this.tabela.parentNode
    this.alturaCabecalho = this.cabecalho.rows[0].offsetHeight
    this.opcoes = false
    this.protecao = false
    this.navegacaoScroller = document.getElementById("conteudoNavegacao");
    this.trSelecionada = null;

    if (this.metodoEdicao == null) { this.bloquearEdicao = true }

    this.organizarEstrutura()
    this.executarTarefas()
}

criarGrid.prototype.verificarTamanho = function () {
    this.alturaLinhas = 0

    for (var x = 0; x < this.novoCorpo.rows.length; x++) { this.alturaLinhas += this.novoCorpo.rows[x].offsetHeight }

    this.divHolder.style.height = this.alturaLinhas < this.tamMax ? this.alturaLinhas + "px" : this.tamMax + "px"
}

criarGrid.prototype.associarValores = function () {
    if (!this.valores) this.valores = new Array()

    if (this.valores.length > this.novoCorpo.rows.length) this.valores = new Array()

    for (var x = 0; x < this.novoCorpo.rows.length; x++) {
        this.valores[x] = new Array()
        for (var y = 0; y < this.numCol; y++) {
            if (this.tagValor[y] != "default") {
                tag = this.novoCorpo.rows[x].cells[y].getElementsByTagName(this.tagValor[y])
                tag.length > 0 ? conteudo = tag[0].innerHTML : conteudo = null
            }
            else { conteudo = this.novoCorpo.rows[x].cells[y].innerHTML }

            if (this.tagValor[y] != "undefined" || this.tagValor[y] != null) { this.valores[x][y] = conteudo }
        }
    }

}

criarGrid.prototype.funcoesTr = function () {
    for (var x = 0; x < this.novoCorpo.rows.length; x++) {
        this.novoCorpo.rows[x].grid = this

        // zebraRows
        if (this.novoCorpo.rows[x].className != "selected") {
            x % 2 == 0 ? this.novoCorpo.rows[x].className = "par" : this.novoCorpo.rows[x].className = "impar"
        }

        // mouseover event
        this.novoCorpo.rows[x].onmouseover = function () {
            if (this.grid.timer) clearTimeout(this.grid.timer)
            this.grid.mostrarOpcoes(this)
            if (this.className != "selected") { this.className += " hover" }
        }

        // mouseout event
        this.novoCorpo.rows[x].onmouseout = function () {
            var _this = this.grid
            this.grid.timer = setTimeout(function () { _this.removerOpcoes() }, 500)
            if (this.className != "selected") { this.className = this.className.substring(0, this.className.indexOf(" hover")) }
        }

        // click event
        this.novoCorpo.rows[x].onclick = function () {
            //this.grid.executarTarefas()
            this.grid.selecionarTr(this)
        }

    }
}

criarGrid.prototype.selecionarTr = function (tr) {
    if (this.trSelecionada) this.trSelecionada.className = "";

    this.funcoesTr();

    tr.className = "selected";

    this.trSelecionada = tr;
}

criarGrid.prototype.criarOverlay = function () {
    if (this.protecao) this.removerOverlay()
    this.protecao = true

    this.overlay = document.createElement("div")
    this.overlay.className = "overlay_grid"
    this.overlay.style.filter = "alpha(opacity=40)";
    this.overlay.style.opacity = "0.4";
    this.overlay.style.mozOpacity = "0.4";
    this.overlay.style.height = this.divHolder.offsetHeight + 20 + "px"
    this.overlay.style.width = this.novaTabela.offsetWidth + 20 + "px"

    this.overlay.style.top = this.scroller ? findPos(this.tabela)[1] - this.scroller.scrollTop + "px" : findPos(this.tabela)[1] + "px";
    this.overlay.style.left = findPos(this.tabela)[0] + "px"
    this.holder.appendChild(this.overlay)

    this.divHolder.style.overflow = "hidden"

    this.botaoAdicionar.onclick = function () { return false }
}

criarGrid.prototype.removeOverlay = function () {
    this.overlay.parentNode.removeChild(this.overlay)
    this.protecao = false

    this.divHolder.style.overflow = "auto"
    this.botaoAdicionar.onclick = function () { eval(this.grid.fnAdicionar) }
}

criarGrid.prototype.editarLinha = function (tr) {
    if (this.navegacaoScroller) this.navegacaoScroller.style.overflow = "hidden";
    if (this.trSelecionada) this.trSelecionada.className = "";
    this.botaoAdicionar.style.display = "none";
    this.moveCima.style.visibility = "hidden";
    this.moveBaixo.style.visibility = "hidden";

    // aqui
    this.divHolder.style.overflow = "hidden";

    this.anchors = document.getElementsByTagName("a");

    for (var x = 0; x < this.anchors.length; x++) {
        this.anchors[x].oldClick = this.anchors[x].onclick;
        this.anchors[x].onclick = function () { return false }
    }

    this.removerOpcoes()
    // this.criarOverlay()

    for (var x = 0; x < this.novoCorpo.rows.length; x++) {
        this.novoCorpo.rows[x].onmouseover = this.novoCorpo.rows[x].onmouseout = function () { return false }
    }

    this.edicaoTable = document.createElement("table")
    this.edicaoTable.className = "edicaoTable"
    this.edicaoTbody = document.createElement("tbody")
    this.cloneTr = tr.cloneNode(true)
    this.edicaoTable.appendChild(this.edicaoTbody)
    this.edicaoTbody.appendChild(this.cloneTr)

    this.edicaoTable.style.width = tr.offsetWidth + "px"
    this.edicaoTable.style.top = this.scroller ? findPos(tr)[1] - this.divHolder.scrollTop - this.scroller.scrollTop + "px" : findPos(tr)[1] - this.divHolder.scrollTop + "px"
    this.edicaoTable.style.left = findPos(tr)[0] + "px"

    // metodos de edicao
    for (var x = 0; x < this.cloneTr.cells.length; x++) {
        this.cloneTr.cells[x].style.width = tr.cells[x].offsetWidth + "px"

        if (this.metodoEdicao[x] == "default") {
            this.tempInputs[x] = document.createElement("input")
            this.tempInputs[x].value = tr.cells[x].innerHTML

            if (this.cloneTr.cells[x].childNodes.length > 0) {
                this.cloneTr.cells[x].replaceChild(this.tempInputs[x], this.cloneTr.cells[x].childNodes[0])
            }

            else {
                this.cloneTr.cells[x].appendChild(this.tempInputs[x]);
            }
        }

        else if (this.metodoEdicao[x] && this.metodoEdicao[x].length > 1) {
            this.tempInputs[x] = document.createElement("select")


            for (var y = 0; y < this.metodoEdicao[x].length; y++) {
                opcaoTemp = document.createElement("option")

                isArray = (typeof this.metodoEdicao[x][y] == "object" && "splice" in this.metodoEdicao[x][y] && "join" in this.metodoEdicao[x][y]) ? true : false;

                if (isArray) {
                    opcaoTemp.innerHTML = this.metodoEdicao[x][y][0];
                    opcaoTemp.value = this.metodoEdicao[x][y][1];
                }

                else {
                    opcaoTemp.innerHTML = this.metodoEdicao[x][y];
                    opcaoTemp.value = this.metodoEdicao[x][y];
                }

                this.tempInputs[x].appendChild(opcaoTemp)
            }
            this.cloneTr.cells[x].replaceChild(this.tempInputs[x], this.cloneTr.cells[x].childNodes[0])

            for (var y = 0; y < this.tempInputs[x].options.length; y++) {
                if (this.tempInputs[x].options[y].innerHTML.toLowerCase() == tr.cells[x].innerHTML.toLowerCase()) {
                    this.tempInputs[x].options[y].selected = "selected"
                }
            }
        }

        else {
            this.tempInputs[x] = document.createElement("input")
            this.tempInputs[x].disabled = "disabled"

            if (tr.cells[x].childNodes.length < 2) {
                this.tempInputs[x].value = tr.cells[x].innerHTML
            }
            else {
                this.tempInputs[x].value = tr.cells[x].childNodes[0].nodeValue
            }

            while (this.cloneTr.cells[x].childNodes.length > 0) { this.cloneTr.cells[x].removeChild(this.cloneTr.cells[x].childNodes[0]) }

            this.cloneTr.cells[x].appendChild(this.tempInputs[x])
        }

    }

    this.holder.appendChild(this.edicaoTable)

    this.botaoAceitar = new Image()
    this.botaoAceitar.src = "/images/curriculo/v2/cabecalho/aceitar.gif"
    this.botaoAceitar.className = "botaoAceitar"
    this.botaoAceitar.grid = this
    this.botaoAceitar.onclick = function () { this.grid.aceitarEdicao(tr) }
    this.botaoAceitar.style.top = parseInt(this.edicaoTable.style.top) + this.edicaoTable.offsetHeight / 6 + "px"
    this.botaoAceitar.style.left = parseInt(this.edicaoTable.style.left) + this.edicaoTable.offsetWidth + 3 + "px"
    this.holder.appendChild(this.botaoAceitar)

    this.botaoCancelar = new Image()
    this.botaoCancelar.src = "/images/curriculo/v2/cabecalho/cancelar.gif"
    this.botaoCancelar.className = "botaoCancelar"
    this.botaoCancelar.grid = this
    this.botaoCancelar.onclick = function () { this.grid.cancelarEdicao() }
    this.botaoCancelar.style.top = parseInt(this.botaoAceitar.style.top) + "px"
    this.botaoCancelar.style.left = parseInt(this.edicaoTable.style.left) + this.edicaoTable.offsetWidth + 20 + "px"
    this.holder.appendChild(this.botaoCancelar)
}

criarGrid.prototype.aceitarEdicao = function (tr) {

    for (var x = 0; x < this.tempInputs.length; x++) {

        if (this.unicoEdicao != null && this.unicoEdicao[x] != null && this.tempInputs[x].value != this.metodoEdicao[x][this.unicoEdicao[x]]) {
            for (var y = 0; y < this.novoCorpo.rows.length; y++) {
                this.novoCorpo.rows[y].cells[x].innerHTML = this.metodoEdicao[x][this.unicoEdicao[x]]
            }
        }
        if (tr.cells[x].childNodes.length < 2) {
            tr.cells[x].innerHTML = this.tempInputs[x].value
        }
    }

    this.cancelarEdicao()
    this.executarTarefas()
}

criarGrid.prototype.cancelarEdicao = function () {
    if (this.navegacaoScroller) this.navegacaoScroller.style.overflow = "auto";
    this.botaoAdicionar.style.display = "block";
    this.divHolder.style.overflow = "auto";
    this.edicaoTable.parentNode.removeChild(this.edicaoTable)
    this.botaoCancelar.parentNode.removeChild(this.botaoCancelar)
    this.botaoAceitar.parentNode.removeChild(this.botaoAceitar)
    this.funcoesTr();
    this.moveCima.style.visibility = this.esconderSetas ? "hidden" : "visible";
    this.moveBaixo.style.visibility = this.esconderSetas ? "hidden" : "visible";

    for (var x = 0; x < this.anchors.length; x++) {
        this.anchors[x].onclick = this.anchors[x].oldClick;
    }
}

criarGrid.prototype.excluirLinha = function (tr) {

    if (this.manterPrimeiraLinha) {
        if (tr.id == "equipe" && tr.rowIndex == 0) {
            self.parent.caixaMsg.exibir({
                titulo: "Atenção",
                conteudo: "Exclusão não permitida!",
                classe: "alerta",
                tipo: "alerta"
            })
            return false;
        }
    }

    this.removerOpcoes();
    tr.parentNode.removeChild(tr);
    this.executarTarefas();
    if (this.fnMovimento) eval(this.fnMovimento);
}

criarGrid.prototype.limparGrid = function () {
    while (this.novoCorpo.rows.length > 0) { this.novoCorpo.removeChild(this.novoCorpo.rows[0]) }
    this.executarTarefas();
}

criarGrid.prototype.removerOpcoes = function () {
    if (this.divEdicaoTr) this.divEdicaoTr.parentNode.removeChild(this.divEdicaoTr)
    this.opcoes = false
}

criarGrid.prototype.mostrarOpcoes = function (tr) {
    if (this.opcoes) this.removerOpcoes()

    this.opcoes = true

    this.divEdicaoTr = document.createElement("div")
    this.divEdicaoTr.style.display = this.exibirControle ? "block" : "none";
    this.divEdicaoTr.className = "divEdicao"
    this.divEdicaoTr.grid = this

    this.divEdicaoTr.onmouseover = function () { if (this.grid.timer) clearTimeout(this.grid.timer) }
    this.divEdicaoTr.onmouseout = function () {
        var _this = this.grid
        this.grid.timer = setTimeout(function () { _this.removerOpcoes() }, 500)
    }

    /* lugar original - fim da funcao */
    this.divEdicaoTr.style.top = this.scroller ? findPos(tr)[1] - this.divHolder.scrollTop - this.scroller.scrollTop + "px" : findPos(tr)[1] - this.divHolder.scrollTop + "px"
    this.divEdicaoTr.style.left = findPos(tr)[0] + tr.offsetWidth - this.divEdicaoTr.offsetWidth - 35 + "px"
    /* ----------------------------- */

    this.holder.appendChild(this.divEdicaoTr)

    if (!this.bloquearEdicao) {
        this.botaoEditar = new Image()
        this.botaoEditar.grid = this
        this.botaoEditar.alt = "Clique aqui para editar a linha " + (tr.rowIndex + 1)
        this.botaoEditar.title = "Clique aqui para editar a linha " + (tr.rowIndex + 1)
        this.botaoEditar.onclick = function () { this.grid.editarLinha(tr) }
        this.botaoEditar.src = "/images/curriculo/v2/cabecalho/lapis.gif"
        this.divEdicaoTr.appendChild(this.botaoEditar)
    }

    this.botaoExcluir = new Image()
    this.botaoExcluir.grid = this
    this.botaoExcluir.alt = "Clique aqui para excluir a linha " + (tr.rowIndex + 1)
    this.botaoExcluir.title = "Clique aqui para excluir a linha " + (tr.rowIndex + 1)
    this.botaoExcluir.onclick = function () { this.grid.excluirLinha(tr) }
    this.botaoExcluir.src = "/images/curriculo/v2/cabecalho/lixeira.gif"
    this.divEdicaoTr.appendChild(this.botaoExcluir)

    // if (!this.bloquearEdicao) { this.divEdicaoTr.style.width = this.botaoEditar.offsetWidth + this.botaoExcluir.offsetWidth + 12 + "px" }

}

criarGrid.prototype.moverTr = function (qtd) {

    if (!this.trSelecionada) return false;

    oldIndex = this.trSelecionada.rowIndex;

    if (oldIndex + qtd < this.novoCorpo.rows.length) {

        if (oldIndex + qtd < 0 || oldIndex + qtd > this.novoCorpo.rows.length - 1) { return false }

        if (qtd > 0) { this.novoCorpo.insertBefore(this.novoCorpo.rows[oldIndex + qtd], this.novoCorpo.rows[oldIndex]) }

        else { this.novoCorpo.insertBefore(this.novoCorpo.rows[oldIndex], this.novoCorpo.rows[oldIndex + qtd]) }

        if (this.novoCorpo.rows[oldIndex + qtd].offsetTop + this.novoCorpo.rows[oldIndex].offsetHeight > this.divHolder.scrollTop + this.tamMax) {
            this.divHolder.scrollTop += this.novoCorpo.rows[oldIndex + qtd].offsetHeight
        }

        if (this.novoCorpo.rows[oldIndex + qtd].offsetTop < this.divHolder.scrollTop) {
            this.divHolder.scrollTop = this.novoCorpo.rows[oldIndex + qtd].offsetTop
        }

        this.executarTarefas()

    }

    if (this.fnMovimento) eval(this.fnMovimento)
}

criarGrid.prototype.organizarAutores = function () {
    var conteudo, str, vnautcad = 0;
    for (var i = 0; i < this.valores.length; i++) {
        str = i + 1;
        conteudo = str + this.getConteudo(i, 0).substring(this.getConteudo(i, 0).indexOf("º"));;
        this.setConteudo(i, 0, conteudo);
    }
}

criarGrid.prototype.exibirOrdenacao = function () {
    var conteudo, str, vnautcad = 0;
    for (var i = 0; i < this.valores.length; i++) {
        str = i + 1;
        conteudo = (this.getConteudo(i, 0).toUpperCase().indexOf("<SPAN>") != -1) ? str + this.getConteudo(i, 0).substring(this.getConteudo(i, 0).toUpperCase().indexOf("<SPAN>")) : str;
        this.setConteudo(i, 0, conteudo);
    }
}

criarGrid.prototype.executarTarefas = function () {
    this.corrigirLargura();
    this.funcoesTr();
    this.associarValores();
    this.verificarTamanho();

    this.tabela.style.visibility = "visible";
}

criarGrid.prototype.corrigirLargura = function () {
    for (var x = 0; x < this.numCol; x++) {
        if (this.largura) { this.cabecalho.rows[0].cells[x].style.width = this.largura[x] + "%" }
        for (var y = 0; y < this.novoCorpo.rows.length; y++) {
            if (this.largura) { this.novoCorpo.rows[y].cells[x].style.width = this.largura[x] + "%" }
            if (this.alinhamento) { this.novoCorpo.rows[y].cells[x].style.textAlign = this.alinhamento[x] }
        }
    }
}

criarGrid.prototype.organizarEstrutura = function () {
    this.scrollBar = document.createElement("th")
    this.trHolder = document.createElement("tr")
    this.tdHolder = document.createElement("td")
    this.divHolder = document.createElement("div")
    this.novaTabela = document.createElement("table")
    this.novoCorpo = document.createElement("tbody")

    this.novoRodape = document.createElement("tfoot");
    this.trRodape = document.createElement("tr");
    this.tdRodape = document.createElement("td");

    while (this.corpo.rows.length > 0) { this.novoCorpo.appendChild(this.corpo.rows[0]) }

    this.scrollBar.innerHTML = "&nbsp;"
    this.scrollBar.className = "scrollBar"
    this.cabecalho.rows[0].appendChild(this.scrollBar)

    this.corpo.appendChild(this.trHolder)

    this.tdHolder.colSpan = (this.numCol + 1)
    this.trHolder.appendChild(this.tdHolder)

    this.divHolder.className = "holder"
    this.divHolder.style.height = this.tamMax + "px"
    this.tdHolder.appendChild(this.divHolder)

    this.divHolder.appendChild(this.novaTabela)

    this.novaTabela.appendChild(this.novoCorpo)

    this.tabela.appendChild(this.novoRodape);
    this.novoRodape.appendChild(this.trRodape);
    this.trRodape.appendChild(this.tdRodape);

    this.tdRodape.className = "rodapeGrid";
    this.tdRodape.colSpan = this.numCol;

    this.botaoAdicionar = new Image()
    this.botaoAdicionar.grid = this
    this.botaoAdicionar.style.display = this.exibirAdicionar ? "block" : "none";
    this.botaoAdicionar.onmouseover = function () { this.src = "/images/curriculo/v2/cabecalho/add2-hover.gif" }
    this.botaoAdicionar.onmouseout = function () { this.src = "/images/curriculo/v2/cabecalho/add2.gif" }
    this.botaoAdicionar.className = "botaoAdicionar"
    this.botaoAdicionar.src = "/images/curriculo/v2/cabecalho/add2.gif"
    this.botaoAdicionar.onclick = function () { eval(this.grid.fnAdicionar) }
    this.tdRodape.appendChild(this.botaoAdicionar);

    this.moveBaixo = document.createElement("img")
    this.moveBaixo.grid = this
    this.moveBaixo.alt = "Move a linha para baixo"
    this.moveBaixo.title = "Move a linha para baixo"
    this.moveBaixo.className = "gridSetaBaixo"
    this.moveBaixo.style.visibility = this.esconderSetas ? "hidden" : "visible";
    this.moveBaixo.src = "/images/curriculo/v2/cabecalho/down.gif"
    this.moveBaixo.onmouseover = function () { this.src = "/images/curriculo/v2/cabecalho/down-hover.gif" }
    this.moveBaixo.onmouseout = function () { this.src = "/images/curriculo/v2/cabecalho/down.gif" }
    this.moveBaixo.onclick = function () { this.grid.moverTr(1) }
    this.tdRodape.appendChild(this.moveBaixo)

    this.moveCima = document.createElement("img")
    this.moveCima.grid = this
    this.moveCima.className = "gridSetaCima"
    this.moveCima.alt = "Move a linha para cima"
    this.moveCima.title = "Move a linha para cima"
    this.moveCima.style.visibility = this.esconderSetas ? "hidden" : "visible";
    this.moveCima.src = "/images/curriculo/v2/cabecalho/up.gif"
    this.moveCima.onmouseover = function () { this.src = "/images/curriculo/v2/cabecalho/up-hover.gif" }
    this.moveCima.onmouseout = function () { this.src = "/images/curriculo/v2/cabecalho/up.gif" }
    this.moveCima.onclick = function () { this.grid.moverTr(-1) }
    this.cabecalho.rows[0].cells[this.numCol - 1].insertBefore(this.moveCima, this.cabecalho.rows[0].cells[this.numCol - 1].childNodes[0])

}

criarGrid.prototype.getConteudo = function (row, cell) {
    return (this.novoCorpo.rows[row].cells[cell].innerHTML);
}

criarGrid.prototype.setConteudo = function (row, cell, conteudo) {
    this.novoCorpo.rows[row].cells[cell].innerHTML = conteudo;
}

criarGrid.prototype.adicionarDados = function (dados, index, autor) {

    if (this.numMaxRegistros && this.novoCorpo.rows.length >= this.numMaxRegistros) {
        self.parent.caixaMsg.exibir({
            titulo: "Atenção",
            conteudo: "Número máximo de registros atingido",
            classe: "alerta",
            tipo: "alerta"
        })
        return false;
    }

    inserirDados = true

    if (autor) {
        for (var x = 0; x < this.novoCorpo.rows.length; x++) {
            span = this.novoCorpo.rows[x].cells[0].getElementsByTagName("span");

            if (span[0].innerHTML.indexOf("-") != -1 && dados[0].indexOf("-") != -1 || span[0].innerHTML.indexOf("D") != -1 && dados[0].indexOf("-") != -1) {
                inserirDados = false;
            }
        }
    }

    for (var x = 0; x < this.novoCorpo.rows.length; x++) {
        if (!index) {
            contadorIgualdade = dados.length
            for (var y = 0; y < dados.length; y++) {
                if (this.novoCorpo.rows[x].cells[y].innerHTML.toUpperCase() == dados[y].toUpperCase()) {
                    contadorIgualdade--
                }
                if (!contadorIgualdade) {
                    inserirDados = false
                    break
                }
            }
        }
        else {
            if (this.novoCorpo.rows[x].cells[index].innerHTML.toUpperCase() == dados[index].toUpperCase()) {
                inserirDados = false
                break
            }
        }
    }

    if (inserirDados) {
        this.novoCorpo.insertRow(this.novoCorpo.rows.length)

        for (var x = 0; x < dados.length; x++) {
            this.novoCorpo.rows[this.novoCorpo.rows.length - 1].insertCell(x)
            this.novoCorpo.rows[this.novoCorpo.rows.length - 1].cells[x].innerHTML = dados[x]
        }

        this.divHolder.scrollTop = this.divHolder.scrollHeight

        this.executarTarefas()
    }

    else {
        self.parent.caixaMsg.exibir({
            titulo: "Atenção",
            conteudo: "Informação existente",
            classe: "alerta",
            tipo: "alerta"
        })
    }
}

criarGrid.prototype.getItems = function () {
    return this.novoCorpo.getElementsByTagName("tr");
}

criarGrid.prototype.importarDados = function (tr) {

    if (this.numMaxRegistros && this.novoCorpo.rows.length >= this.numMaxRegistros) {
        self.parent.caixaMsg.exibir({
            titulo: "Atenção",
            conteudo: "Número máximo de registros atingido",
            classe: "alerta",
            tipo: "alerta"
        })
        return false;
    }

    inserirTr = true

    for (var x = 0; x < this.novoCorpo.rows.length; x++) {
        conteudoAtual = this.novoCorpo.rows[x].textContent ? this.novoCorpo.rows[x].textContent : this.novoCorpo.rows[x].innerText
        conteudoNovo = tr.textContent ? tr.textContent : tr.innerText
        if (conteudoAtual == conteudoNovo) { inserirTr = false }
    }

    if (inserirTr) {

        this.novoCorpo.insertRow(this.novoCorpo.rows.length)

        for (var x = 0; x < this.numCol; x++) {
            this.novoCorpo.rows[this.novoCorpo.rows.length - 1].insertCell(x)
            this.novoCorpo.rows[this.novoCorpo.rows.length - 1].cells[x].innerHTML = tr.getElementsByTagName("td")[x].innerHTML
        }

        this.divHolder.scrollTop = this.divHolder.scrollHeight

        this.executarTarefas()
    }

    else {
        self.parent.caixaMsg.exibir({
            titulo: "Atenção",
            conteudo: "Informação existente",
            classe: "alerta",
            tipo: "alerta"
        })
    }
}