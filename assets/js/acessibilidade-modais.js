$(document).ready(function () {
	//FunÃ§Ã£o de cookie
    $.cookie = function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = '';

            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();

                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

	//Executa script apenas se a acessibilidade estiver ativada
	if($.cookie('acessibilidadeAtivada') == 'S') {
		//Adiciona lang ao html
		var lang = $("html", window.parent.document).attr('lang');
		$('html').attr('lang', lang);
	
		//Adiciona role as tabelas
		var tables = $("table");
		for (var i = 0, len = tables.length; i < len; i++) {
			tables.eq(i).attr('role', 'presentation');
			tables.eq(i).children('td').attr('tabindex', '0');
		}
	
		//Adiciona id aos ems
		var ems = $("em");
		for (var i = 0, len = ems.length; i < len; i++) {
			ems.eq(i).attr('id', 'titulo' + (i + 1));
			ems.eq(i).next('span').children('table').attr('aria-labelledby', 'titulo' + (i + 1));
			ems.eq(i).next('span').children('table').attr('role', 'group');
		}

		//Esperar html ser carregado para executar
		setTimeout(function () {
			//Pega titulo da modal
			var titulo = $(".modal .superior_central:visible", window.parent.document).text();
			
			//Adiciona link sobre aviso de modal
			$("body").eq(0).prepend('<a class="avisa-modal escondido" href="#" tabindex="0">Janela ' + titulo + ' aberta. Para sair pressione Esc.</a>');
			
			//Pular navagacao
			$(".areaSelecao a").attr('tabindex', '-1');
			
			//Ativa modal iFrames
			$(".avisa-modal")[0].focus();
			
			//Ativa mini modal
			var ativaMiniModal = function() {
				$('.grid-content .suggest-wrapper a').click(function() {
					setTimeout(function() {
						$.each($(".win-wrapper .win-title"), function() {
							if ($(this).is(':visible') && $(this).children('.avisa-modal').length == 0) {
								$(this).prepend('<a class="avisa-modal escondido" href="#" tabindex="0">Minimodal aberta. Para sair pressione Esc.</a>');
								$(this).children(".avisa-modal")[0].focus();
							}
							else if($(this).is(':visible')) {
								$(this).children(".avisa-modal")[0].focus();
							}
						});
						
						//Alterar leitura dos icones da minimodal
						$('.win-wrapper .win-content .icon.item').attr('tabindex', '-1');
						$('.win-wrapper .win-content .icon.opened').attr('title', 'Grupo aberto');
						$('.win-wrapper .win-content .icon.closed').attr('title', 'Grupo fechado');
						$('.win-wrapper .win-content .icon.plus').attr('title', 'Abrir grupo');
						$('.win-wrapper .win-content .icon.minus').attr('title', 'Fechar grupo');
					}, 300);
				});
			}
			ativaMiniModal();
			
			//Ativa caixa de mensagem
			$('.lupa').live('click', function() {
				if($(".caixaMsg .conteudo", window.parent.document).is(':visible')) {
					$(".caixaMsg .conteudo", window.parent.document).prepend('<a class="avisa-caixamsg escondido" href="#" tabindex="0"></a>');
					$(".caixaMsg .conteudo .avisa-caixamsg", window.parent.document)[0].focus();
				}
				else if($(".win-wrapper").is(':visible')) {
					setTimeout(function() {
						$.each($(".win-wrapper .win-title"), function() {
							if ($(this).is(':visible') && $(this).children('.avisa-modal').length == 0) {
								$(this).prepend('<a class="avisa-modal escondido" href="#" tabindex="0">Minimodal aberta. Para sair pressione Esc.</a>');
								$(this).children(".avisa-modal")[0].focus();
							}
							else if($(this).is(':visible')) {
								$(this).children(".avisa-modal")[0].focus();
							}
						});
					}, 300);
				}
			});

			//Envolve os nos de texto em spans
			var envolveSpan = function () {
				var tds = $('table td, table td div, table td b').not('.grid *');
				for (var i = 0; i < tds.length; i++) {
					//Pega nos de textos
					node = tds.eq(i).contents(":not(a):not(:input):not(table)").filter(function () {
						return this.nodeType == 3;
					});
			
					//Envolve textos em spans
					node.wrap(function () {
						var text = $(this).text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
				
						if (text != "") {
							return '<span tabindex="0" class="label-texto" title="' + text + '" />';
						}
					});
				}
			}
			envolveSpan();
			
			//Cria array para cada td com seus spans e inputs
			var tdsForm = $(":input:not([type=hidden]):not([type=button]):not([type=submit])").closest("td");
			var elementos = new Array();
			$.each(tdsForm, function(i,e) {
				elementos.push({
					inputs: $(this).find(":input:not([type=hidden]):not([type=button]):not([type=submit])").get().reverse(),
					spans: $(this).find("span.label-texto").get().reverse()
				});
			});
			
			//Percorre o array ligando inputs e labels
			for (elemento in elementos) {
				for (input in elementos[elemento].inputs) {

					//Pega os respectivos spans e inputs (usando o Ã­ndice do input)
					var label = $(elementos[elemento].spans[input]);
					var input = $(elementos[elemento].inputs[input]);
					
					if(label.html() != null) {
						//Caso o input nao tenha id, atribuir o name como id
						if(!input.attr("id")) {
							//Caso checkbox ou radio, id = name + value
							if (input.is(":checkbox") || input.is(":radio")) {
								input.attr("id", input.attr("name") + "_" + input.attr("value").replace(/\s/g, "-"));
							}
							else {
								input.attr("id", input.attr("name"));
							}
						}
						var labelFor = input.attr("id");
						
						//Substitui spans por labels, atribuindo o id do input como for do span
						label.replaceWith($('<label class="label-texto" for="' + labelFor + '" />').html(label.html()));
					}
				}
			}

			//Acionar click com o enter
			$('*[onClick], .suggest-wrapper a, img.botaoAdicionar, .label-texto').keypress(function(e){
				if(e.keyCode == 13){
					$(this)[0].click();
					e.cancelBubble = true;
					if(e.stopPropagation) e.stopPropagation();
				}
			});
			
			//Adicionar tabindex no cabecalho das grids
			var gridCabecalho = function () {
				$.each($('.grid-header th'), function() {
					if ($(this).text()) {
						$(this).attr('tabindex', '0');
					}
				});
			}
			gridCabecalho();
			
			//Desabilitar inputs de ordem das grids
			var gridDesabilitaInputs = function() {
				$.each($('.grid-content tr td input[style="width: 30px; text-align: center;"]'), function() {
					$(this).attr('disabled', 'disabled');
				});
			}
			gridDesabilitaInputs();

			//Imagens de incluir novo
			setTimeout(function() {
				$('.botaoAdicionar').attr({tabindex: '0', title: 'Adicionar novo item'});
				$('iframe').contents().find('.botaoAdicionar').attr({tabindex: '0', title: 'Adicionar novo item'});
			}, 300);

			//Checar radios com a tecla enter
			$('input[type="radio"]').live('keypress', function(e){
				if(e.keyCode == 13){
					$(this).prop('checked', true);
				}
			});
			
			//Mostrar links de edicao do itens da grid (editar e excluir)
			var gridLinksEdicao = function () {
				$('.grid-content tr').unbind(); //Tira os eventos de mouseouver e mouseout
				$('.grid-content tr').addClass('hover');
				$('.grid-content tr td img[src="/images/estatico/imagens/lixeira.gif"]').attr('tabindex', '0');
				$('.grid-content tr td img[src="/images/estatico/imagens/lixeira.gif"]').keypress(function(e) {
					if(e.keyCode == 13){
						$(this).click();
						//Reorganizar a grid
						setTimeout(function() {
							//Envolve os nos de texto em spans
							envolveSpan();
					
							//Desabilitar inputs de ordem das grids
							gridDesabilitaInputs();
							
							//Adicionar tabindex no cabecalho das grids
							gridCabecalho();

							//Ativa mini modal
							ativaMiniModal();
							
							//Mostrar links de edicao do itens da grid (editar e excluir)
							gridLinksEdicao();
						}, 300);
					}
				});
			}
			gridLinksEdicao();
			
			//Evitar o erro de abrir a minimodal novamente ao dar Enter no botao Cancelar
			$('.win-wrapper .botao.excluir').keypress(function(e) {
				if(e.keyCode == 13){
					fecharMinimodal($(this))
				}
			});
			var fecharMinimodal = function(obj) {
				obj.parents('.win-wrapper').hide();
				obj.parents('.win-wrapper').prev('.win-overlay').hide();
				obj.unbind();
				obj.keypress(function(e) {
					if(e.keyCode == 13){
						fecharMinimodal($(this));
					}
				});
				obj.click(function() {
					fecharMinimodal($(this));
				});
			}
			
			//Reorganizar a grid quando ela Ã© refeita
			$('.win-wrapper .win-content ul li .label, .win-wrapper .botao.salvar, .controle .botao.salvar, .tela_menor .celulaTabela01 a').live('click', function() {
				setTimeout(function() {
					//Envolve os nos de texto em spans
					envolveSpan();
			
					//Desabilitar inputs de ordem das grids
					gridDesabilitaInputs();
					
					//Adicionar tabindex no cabecalho das grids
					gridCabecalho();

					//Ativa mini modal
					ativaMiniModal();
					
					//Mostrar links de edicao do itens da grid (editar e excluir)
					gridLinksEdicao();
				}, 300);
			});
			
			//Aviso da grid
			$('.grid, .grid-header').before('<a href="javascript:void(0);" class="escondido">Abaixo voc&ecirc; encontrar&aacute; uma tabela onde ser&aacute; poss&iacute;vel adicionar, editar e excluir itens.</a>');
		}, 500);

		//Focar na modal anterior
		$(".selecionaInst, .selecionaOrg, .controle .botao.salvar, .tela_menor .celulaTabela01 a").live("click", function() {
			setTimeout(function() {
				$(".modal_holder:visible:last iframe", window.parent.document).contents().find('a.avisa-modal').eq(0).focus();
				
				var iframes = $(".modal_holder:visible iframe", window.parent.document);
				
				$('img[onclick="editarLinhaTabela(this)"]').attr({tabindex: '0', title: 'Editar item'});
				$('iframe').contents().find('img[onclick="editarLinhaTabela(this)"]').attr({tabindex: '0', title: 'Editar item'});
				$('img[onclick="apagaLinhaTabela(this)"]').attr({tabindex: '0', title: 'Apagar item'});
				$('iframe').contents().find('img[onclick="apagaLinhaTabela(this)"]').attr({tabindex: '0', title: 'Apagar item'});
			}, 300);
		});
		$("select#f_evento").live('click', function() {
			setTimeout(function() {
				$(".modal_holder:visible:last iframe", window.parent.document).contents().find('a').eq(0).focus();
			}, 300);
		});
		$("select#f_evento").live('keydown', function(e) {
			setTimeout(function() {
				if (e.keyCode == 13) {
					$(".modal_holder:visible:last iframe", window.parent.document).contents().find('a').eq(0).focus();
				}
			}, 300);
		});
		
		$('#FORMDADOSFINANC .controle .botao.salvar').live('click', function() {
			var iframes = $(".modal_holder:visible iframe", window.parent.document);
			$(".modal_holder:visible iframe", window.parent.document).eq(iframes.length - 2).contents().find('a.avisa-modal').eq(0).focus()
		});
	}

    //Fechar modal com a tecla Esc
    $.fecharModalEsc = function () {
        $(document).bind('keydown', function (e) {
            if (e.keyCode == 27) {
				//Fechar mini modal se disponÃ­vel
				if ($(".win-wrapper .win-tools .close").is(':visible')) {
					$.each($(".win-wrapper .win-tools .close"), function(count) {
						if ($(this).is(':visible')) {
							$(this).click();
						}
					});
				}
				else {
					$(".superior_direito img:visible:last", window.parent.document)[0].click();
					
					if ($(".caixaMsg img.caixaFechar", window.parent.document).is(':visible')) {
						$(".caixaMsg img.caixaFechar:visible", window.parent.document)[0].click();
					}
				
					//Foca na modal anterior ou na janela principal
					$(".modal_holder:visible:last iframe", window.parent.document).contents().find('a').eq(0).focus();
					if (!$(".modal_holder", window.parent.document).is(':visible')) {
						$("a[href='http://lattes.cnpq.br/']", window.parent.document)[0].focus();
					}
				}
            }
        });
    };
    $.fecharModalEsc();

	//Adiciona classe para auto contraste
    if ($.cookie('contraste') == 'alto') {
        $("body").addClass("altoContraste");
        $(".icons-top-contraste").addClass("selected");
    }
	
	//Ativa tooltip
	$(".titBottom").tipsy();
});