$(document).ready(function () {
    function fontSize(o) {
    	
        var maximo = 17,
        	padrao = parseInt(o.css("fontSize"), 10),
        	atual = padrao;
        
        $('.fontMais').click(function(e) {
        	if (atual > maximo) return false;
            o.css("fontSize", ++atual);
	     e.preventDefault()
        });
        
        $('.fontMenos').click(function(e) {
        	atual = padrao;
        	o.css("fontSize", atual);
		 e.preventDefault()
        });

    };
	
	/*Chamada - Cadastro */
	$.fontSizeCad = function() {
		fontSize($('.cadastro .tit'));
		fontSize($('.cadastro .txt_tit'));
		fontSize($('.cadastro .tit_form'));
		fontSize($('.cadastro .sub_tit_form'));
		fontSize($('.cadastro .radios label'));
		fontSize($('.cadastro #bolsaRadioGroup span'));
		fontSize($('input[type="text"], input[type="password"], select, textarea'));
		fontSize($('.cadastro .esq_senha'));
		fontSize($('.cadastro #imgCaptcha'));
		fontSize($('.cadastro .bts a'));
		fontSize($('.cadastro h3'));
	};
	/*Chamada - Cadastro - Visualizar */
	$.fontSizeCadVer = function() {
		fontSize($('.win-content td'));
	};
});