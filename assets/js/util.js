/* get da variavel resolucao

	resolucao[0] = largura
	resolucao[1] = altura
*/

function getResolucao() {
    var screenX = 0, screenY = 0;
    screenX = screen.availWidth;
    screenY = screen.availHeight
    return [screenX,screenY];
    }
    
    /* get da variavel resolucao browser
    
        resolucaoBrowser[0] = largura
        resolucaoBrowser[1] = altura
    
    */
    
    function getResolucaoBrowser() {
      var browserX = 0, browserY = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        browserX = window.innerWidth;
        browserY = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        browserX = document.documentElement.clientWidth;
        browserY = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        browserX = document.body.clientWidth;
        browserY = document.body.clientHeight;
      }
      return [browserX,browserY];
    }
    
    /*	get/set da variavel global de operacoes
    
    */
    
    var ultimaOperacao = "";
    
    function setUltimaOperacao(string) {
    ultimaOperacao = string;
    }
    
    function getUltimaOperacao() {
    return ultimaOperacao;
    }
    
    /* detecta o browser do client
    
        BrowserDetect.browser =  agente do browser
        BrowserDetect.version = versão do browser
        BrowserDetect.OS = 	sistema operacional
    
    */
    
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++)	{
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            { 	string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari"
            },
            {
                prop: window.opera,
                identity: "Opera"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {		// for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { 		// for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ]
    
    };
    
    BrowserDetect.init();
    
    /*
        Adiciona eventos aos elementos
        
        element - elemento a receber o evento
        type - tipo do evento (load, click, mouseup,etc)
        expression - funcao a ser chamada
    */
    
    function addListener(element, type, expression, bubbling) {
    bubbling = bubbling || false;
    
        if(window.addEventListener) { // Standard
        element.addEventListener(type, expression, bubbling);
        return true;
        } 
        
        else if(window.attachEvent) { // IE
        element.attachEvent('on' + type, expression);
        return true;
        }
        
        else return false;
    }
    
    /* 
        Remove eventos do elemento
    */
    
    function removeEventSimple(obj,evt,fn) {
        if (obj.removeEventListener)
            obj.removeEventListener(evt,fn,false);
        else if (obj.detachEvent)
            obj.detachEvent('on'+evt,fn);
    }
    
    
    /*
        Retorna um array com a posição absoluta do objeto
    */
    
    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft
            curtop = obj.offsetTop
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
            }
        }
        return [curleft,curtop];
    }
    
    /*
        retorna todos os objetos da classe (c) no objeto (o) passado como parametro
    */
    
    function getElementsByClassName(o, c) {
        var items = o.getElementsByTagName("*");
        var arr = new Array();
        for (var x=0; x<items.length; x++) {
            if (items[x].className && items[x].className == c) {
                arr.push(items[x]);
            }
        }
        return arr;
    }
    
    /*
        organiza o line-height de acordo com a existencia 
        da tag <br> para permitir a quebra de texto no menu
    */
    
    function fixMenu() {
        var menu = $(".menu");
        $("a.aTop", menu).each(function(){
            if ($(this).find("br").size() != 0) 
                $(this).css("line-height", "15px").css("text-align", "center");
        });	
    }
    
    $(document).ready(function(){
        fixMenu();
    });