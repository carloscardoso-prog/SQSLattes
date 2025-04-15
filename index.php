<?php
$directory = str_replace($_SERVER['DOCUMENT_ROOT'], '', str_replace('\\', '/', __FILE__));
$directory = str_replace(basename(__FILE__), '', $directory);
?>

<!DOCTYPE HTML>
<html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        Cadastro - Currículo Lattes
        - Para uma melhor experiência, mantenha seu navegador e leitor de tela atualizados.</title>

    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/jquery-1.6.4.min.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/jquery-ui-1.8.13.custom.min.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/jquery.form.min.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/mask.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/jquery.scrollTo.min.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/validatorFildsClass.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/date.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/string.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/gui.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/fomento.gui.js"></script>

    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/import.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/lattes.gui.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/jquery-ui-1.8.13.custom.css">

    <!-- Cabeçalho -->
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/tooltip-position.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/jquery.tipsy.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/font-size.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/alto-contraste.js"></script>
    <script type="text/javascript" src="<?php echo $directory; ?>assets/js/index.js"></script>

    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/tooltip-manager.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/tooltip-position.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>assets/css/alto_contraste_cadastro.css">
    <!-- Cabeçalho - fim -->

    <style>
        .lupa {
            display: block !important;
            float: right !important;
            height: 16px !important;
            position: relative !important;
            right: 7px !important;
            top: -23px !important;
            width: 16px !important;
            z-index: 0 !important;
        }

        .input_busca {
            width: 85% !important;
        }

        .escondido {
            display: none;
        }

        .error {
            background: red;
        }

        .last,
        .area_atua {
            display: none;
        }

        .input-file {
            -moz-text-blink: none;
            -moz-text-decoration-color: -moz-use-text-color;
            -moz-text-decoration-line: none;
            -moz-text-decoration-style: solid;
            background-color: transparent;
            color: #FFFFFF;
            display: inline-block;
            font-size: 11px;
            margin-left: 65px;
            margin-top: -31px;
            overflow-x: hidden !important;
            overflow-y: hidden !important;
            padding-bottom: 7px;
            padding-left: 14px;
            padding-right: 0;
            padding-top: 20px;
            position: relative;
            vertical-align: top;
            width: 14px;
        }


        .layout-cell-1-5 {
            width: 29.6%;

        }
    </style>

    <script>
        function ativarTooltip() {
            $(".titBottom").tipsy();
        }

        $(document).on("ready", function() {
            setTimeout("ativarTooltip()", 1000);
        });

        function cancelarbtn() {
            var confirmacao = confirm("Atenção! Esta operação irá cancelar o procedimento de registro. Confirma ?");

            if ("" == "S") {
                if (confirmacao) {
                    top.location = "https://www.cienciasemfronteiras.gov.br";
                }
            } else {
                if (confirmacao) {
                    if (1 == 1)
                        top.location = "https://lattes.cnpq.br";
                    else
                        top.location = "https://lattes.cnpq.br";
                }
            }
        }

        var formatacao = {
            data: function(input) {
                input.value = DateUtil.format(input.value);
            },
            numero: function(input) {
                input.value = StringUtil.numberOnly(input.value);
            },
            letra: function(input) {
                input.value = StringUtil.numberForbidden(input.value);
            },
            minusculo: function(input) {
                input.value = input.value.toLowerCase();
            }
        };

        // componente
        var winPreRegister, winRegister, winRegisterPub, tabRegister, winError, contractWin, preRegisterValidator, registerValidator;

        // lock
        var preRegisterLock = false,
            registerLock = false;

        // validação
        var preRegisterConfig, registerConfig;

        preRegisterConfig = {
            femail: {
                required: true,
                email: true
            },
            fconfemail: {
                required: true,
                equal: "femail"
            },
            fsenha: {
                required: true,
                minLength: 6
            },
            fconfsenha: {
                required: true,
                equal: "fsenha"
            },
            fpaisnacio: {
                required: true
            }
        };

        $(document).ready(function() {

            var winPreRegisterHelpIcon = '<a href="https://ajuda.cnpq.br/index.php/Criar_um_novo_curr%C3%ADculo" target="_blank" id="helpHref" style="position:absolute; right:5px"><img border="0" width="20" height="20" src="/images/curriculo/v3/help-icon_24.png" title="Help"></a>',
                winPreRegisterTitle = "Cadastrar-se no Currículo Lattes" + winPreRegisterHelpIcon;

            var vts = (new Date()).getTime()
            var vurl = "pkg_cv_estr.PREREGISTER?fts=" + vts;
        });

        function winRegisterPrevious() {
            tabRegister.previous();
        }

        function winRegisterNext() {
            tabRegister.next();
        }

        function winPreRegisterSend() {

            var form = $("form#preRegForm"),
                data = form.serializeArray();
            escapeSerializedJSON(data);

            var erros = new Validator(preRegisterConfig).validate(),
                pattenerPercent = /%/g;

            if (pattenerPercent.test($("input[name=fsenha]").val()) || pattenerPercent.test($("input[name=fsenha]").val()))
                erros.push("O caractere % não é permitido para cadastrar sua senha");

            if (erros.length > 0) {
                alert(erros.join("\n"));
                return;
            }

            var altura = $(document).height();
            $("body").prepend("<div class='aguarde' style='height:" + altura + "px'> <span> Aguarde, carregando...</span></div>");
            $.ajax({
                type: "POST",
                url: "pkg_cv_estr.TARGET_PREREGISTER",
                data: data,
                error: function(error) {
                    preRegisterLock = false;
                    alert("error");
                    $(".aguarde").remove();
                },
                success: function(data) {
                    var vparam = data.substring(1, 11);

                    if (data.substring(0, 1) == "@") {
                        var url_x = "pkg_cv_estr.REGISTER?fcod=" + vparam + "&f_ciencia=";
                        $("body").load(url_x);
                        $(".aguarde").remove();
                    } else if (data.substring(0, 1) == "$") {
                        alert("O e-mail e/ou senha digitados são incorretos. Favor verificar.");
                        $(".aguarde").remove();
                    } else if (data.substring(0, 1) == "#") {
                        if (confirm("Este e-mail já está cadastrado no CNPq. Deseja ser direcionado para a página de \"logon\"?")) {
                            window.location.href = "pkg_login.prc_form";
                        } else {
                            window.location.href = "pkg_cv_estr.inicio";
                        }
                    } else {
                        alert(data);
                        if (data.replace(/^\s+|\s+$/g, "") == "Sua sessão expirou".replace(/^\s+|\s+$/g, ""))
                            window.location.reload();
                        $(".aguarde").remove();
                    }
                }
            });
        }

        function cancelReg() {
            if (confirm("Atenção! Esta operação irá cancelar o procedimento de registro. Confirma?")) {
                window.location.href = "https://lattes.cnpq.br"
            }
        }

        function check_uf(ppais, pestado) {
            var est = "AC.AL.AM.AP.BA.CE.DF.ES.GO.MA.MG.MS.MT.PA.PB.PE.PI.PR.RJ.RN.RO.RR.RS.SC.SE.SP.TO";

            if (
                pestado != "" &&
                ppais == "BRA" &&
                (
                    est.indexOf(pestado.toUpperCase()) == -1 ||
                    pestado.length != 2
                )
            ) {
                return false;
            }
            return true;
        }

        function winRegisterSendPart() {
            sendCVPart()
        }

        function winRegisterSend() {
            if (registerLock) return false;

            var est = "AC,AL,AM,AP,BA,CE,DF,ES,GO,MA,MG,MS,MT,PA,PB,PE,PI,PR,RJ,RN,RO,RR,RS,SC,SE,SP,TO";

            wuf = $(":input[name='festadoend']").val();
            wpais = $(":input[name='fpaisend']").val();

            if (!check_uf(wpais, wuf)) {
                alert("UF inválida no Endereço. Se o país for Brasil a UF deve ser uma das seguintes: \n" + est)
                return false;
            }

            var registerErrors = registerValidator.validate();

            if (registerErrors.length == 0) {
                sendCV()
            } else {
                var errors = "";
                for (var x = 0; x < registerErrors.length; x++)
                    errors += "<li>" + registerErrors[x] + "</li>";
                showErrors(errors);
            }
        }

        function sendCV() {
            registerLock = true;
            document.cookie = "imp=cnpqrestritos ; path=/; domain=.cnpq.br";

            var form = $("form#regForm"),
                data = form.serializeArray();

            escapeSerializedJSON(data);

            $.ajax({
                type: "POST",
                url: "pkg_cv_estr.TARGET_REGISTER",
                data: data,
                error: function(error) {
                    registerLock = false;
                    alert("error");
                },
                success: function(data) {
                    var vparam = data.substring(2, 12);

                    if (data.substring(0, 1) == "@") {
                        if (data.substring(1, 2) == "E") {
                            var timestamp = "f_ts=" + (new Date()).getTime();
                            winRegisterPub = $.win({
                                url: "PKG_PUBLICAR_CV_ESTR.mostrar_cv?" + timestamp + "&f_cod=" + vparam + "&f_idioma=1",
                                loadingMessage: "Carregando conteúdo ....",
                                autoRemove: true,
                                visible: true,
                                width: 550,
                                onHide: function() {
                                    registerLock = false;
                                }
                            });

                        } else if (data.substring(1, 2) == "P") {
                            window.location.href = "https://wwws.cnpq.br/sigef_imp/owa/pservicos.entrada?opcao=lattes"
                        }
                    } else {
                        registerLock = false;
                        alert(data);
                    }
                }
            });
        }

        function escapeSerializedJSON(json) {
            for (var x = 0; x < json.length; x++) {
                if (json[x]["value"]) {
                    json[x]["value"] = escape(json[x]["value"]);
                }
            }
        }

        function showErrors(errors) {
            winError = $.win({
                title: "Erros",
                width: "auto",
                visible: true,
                autoRemove: true,
                content: "<ul class='error'>" + errors + "</ul>",
                buttons: [{
                    label: "fechar",
                    callback: function() {
                        winError.remove();
                    }
                }]
            });
        }

        function contractWinCancel() {
            contractWin.remove();
        }

        function contractWinConfirm() {
            var winContent = contractWin.getContent(),
                selectValue = winContent.find("#mySelect").val();

            alert(selectValue);
            contractWinCancel();
        }
    </script>

</head>

<body>
    <div id="container">
        <div class="header header-space">
            <div class="header-content max-width">
                <div class="identity center">
                    <div class="combo">
                        <h1>
                            <a href="https://lattes.cnpq.br/" title="Currículo Lattes" target="_blank">
                                <img src="<?php echo $directory; ?>assets/files/titulo-sistema.png" alt="Currículo Lattes" title="Currículo Lattes">
                            </a>
                        </h1>
                    </div>

                    <div class="logo">
                        <a href="https://www.cnpq.br/" title="Ir para Portal CNPq" target="_blank">
                            <h2>CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico</h2>
                        </a>
                    </div>
                    <h3><span class="yellow-bg">#Sem</span><span class="green-bg">Anistia</span></h3>
                </div>
            </div>
        </div>

        <div class="conteudo cadastro-um">
            <p>Lembrete: O Currículo Lattes é um site <strong>horrível</strong>. As coisas VÃO quebrar/deixar de funcionar!</p>
            <div class="cadastro">
                <form id="preRegForm">
                    <input type="hidden" name="f_ciencia" value="">
                    <h1 class="tit" tabindex="0">Cadastrar-se no Currículo Lattes</h1>
                    <div class="txt_tit">
                        Leia as condições do Termo de adesão e compromisso da base de dados Lattes.
                        <a href="https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr.termo">
                            Termo de adesão e compromisso do sistema de currículo da Plataforma Lattes
                        </a>.
                        Inclua a informação abaixo e siga os passos para completar o seu cadastro.
                    </div>
                    <hr>
                    <div class="form layout-cell layout-cell-12">

                        <div class="colun_form">
                            <fieldset>
                                <legend class="tit_form">País de Nacionalidade</legend>
                                <select name="fpaisnacio" size="1" style="width:150px" validate="true" required="Campo País de Nacionalidade obrigatório não informado.">
                                    <option value="" selected="selected"></option>
                                    <option value="RFA">Alemanha</option>
                                    <option value="ARG">Argentina</option>
                                    <option value="AUS">Austrália</option>
                                    <option value="BRA">Brasil</option>
                                    <option value="CAN">Canadá</option>
                                    <option value="ESP">Espanha</option>
                                    <option value="EUA">Estados Unidos</option>
                                    <option value="FRA">França</option>
                                    <option value="GBR">Grã-Bretanha</option>
                                    <option value="HOL">Holanda</option>
                                    <option value="ING">Inglaterra</option>
                                    <option value="ITA">Itália</option>
                                    <option value="POR">Portugal</option>
                                    <option value="AFG">Afeganistão</option>
                                    <option value="AFS">África do Sul</option>
                                    <option value="ALB">Albânia</option>
                                    <option value="AND">Andorra</option>
                                    <option value="ANG">Angola</option>
                                    <option value="ATC">Antártida</option>
                                    <option value="ANB">Antigua</option>
                                    <option value="AHL">Antilhas Holandesas</option>
                                    <option value="ARA">Arábia Saudita</option>
                                    <option value="ARL">Argélia</option>
                                    <option value="ARM">Armênia</option>
                                    <option value="ABW">Aruba</option>
                                    <option value="AUT">Áustria</option>
                                    <option value="AZE">Azerbaijão</option>
                                    <option value="BHS">Bahamas</option>
                                    <option value="BGD">Bangladesh</option>
                                    <option value="BRB">Barbados</option>
                                    <option value="BAR">Barein</option>
                                    <option value="BEA">Belarus</option>
                                    <option value="BEL">Bélgica</option>
                                    <option value="BLZ">Belize</option>
                                    <option value="BEN">Benin</option>
                                    <option value="BER">Bermudas</option>
                                    <option value="BIR">Birmânia</option>
                                    <option value="BOL">Bolívia</option>
                                    <option value="BOS">Bósnia</option>
                                    <option value="BOT">Botsuana</option>
                                    <option value="IOT">British Indian Ocean</option>
                                    <option value="BRN">Brunei</option>
                                    <option value="BUL">Bulgária</option>
                                    <option value="BKF">Burkina Faso</option>
                                    <option value="BUR">Burundi</option>
                                    <option value="BUT">Butão</option>
                                    <option value="CBV">Cabo Verde</option>
                                    <option value="CAM">Camarões</option>
                                    <option value="CBJ">Camboja</option>
                                    <option value="CAT">Catar</option>
                                    <option value="CAZ">Cazaquistão</option>
                                    <option value="CHA">Chade</option>
                                    <option value="CHL">Chile</option>
                                    <option value="CHN">China</option>
                                    <option value="CHP">Chipre</option>
                                    <option value="CXR">Christmas Island</option>
                                    <option value="CIN">Cingapura</option>
                                    <option value="COL">Colômbia</option>
                                    <option value="COM">Comores</option>
                                    <option value="CON">Congo</option>
                                    <option value="CRN">Coreia do Norte</option>
                                    <option value="CRS">Coreia do Sul</option>
                                    <option value="CMF">Costa do Marfim</option>
                                    <option value="CRC">Costa Rica</option>
                                    <option value="CRO">Croácia</option>
                                    <option value="CUB">Cuba</option>
                                    <option value="DIN">Dinamarca</option>
                                    <option value="DJI">Djibuti</option>
                                    <option value="DON">Dominica</option>
                                    <option value="EGI">Egito</option>
                                    <option value="ELS">El Salvador</option>
                                    <option value="EAU">Emirados Árabes</option>
                                    <option value="EQU">Equador</option>
                                    <option value="ERT">Eritreia</option>
                                    <option value="ESC">Escócia</option>
                                    <option value="SVK">Eslováquia</option>
                                    <option value="SVN">Eslovênia</option>
                                    <option value="EST">Estônia</option>
                                    <option value="ETP">Etiópia</option>
                                    <option value="FJI">Fiji</option>
                                    <option value="FIL">Filipinas</option>
                                    <option value="FIN">Finlândia</option>
                                    <option value="FOR">Formosa</option>
                                    <option value="GAB">Gabão</option>
                                    <option value="GAL">Gales</option>
                                    <option value="GAM">Gâmbia</option>
                                    <option value="GAN">Gana</option>
                                    <option value="GEO">Geórgia</option>
                                    <option value="GIB">Gibraltar</option>
                                    <option value="GRD">Granada</option>
                                    <option value="GRE">Grécia</option>
                                    <option value="GRL">Groenlândia</option>
                                    <option value="GDL">Guadalupe</option>
                                    <option value="GUM">Guam</option>
                                    <option value="GUA">Guatemala</option>
                                    <option value="GUI">Guiana</option>
                                    <option value="GFR">Guiana Francesa</option>
                                    <option value="GNE">Guiné</option>
                                    <option value="GNB">Guiné Bissau</option>
                                    <option value="GNQ">Guiné Equatorial</option>
                                    <option value="HTI">Haiti</option>
                                    <option value="HON">Honduras</option>
                                    <option value="HKG">Hong Kong</option>
                                    <option value="HUN">Hungria</option>
                                    <option value="IEM">Iêmen</option>
                                    <option value="IMS">Iêmen do Sul</option>
                                    <option value="CYM">Ilhas Cayman</option>
                                    <option value="CCK">Ilhas Cocos</option>
                                    <option value="COK">Ilhas Cook</option>
                                    <option value="FLK">Ilhas Falkland</option>
                                    <option value="IFA">Ilhas Faroe</option>
                                    <option value="IMH">Ilhas Marshall</option>
                                    <option value="MID">Ilhas Midway</option>
                                    <option value="NFK">Ilhas Norfolk</option>
                                    <option value="SLB">Ilhas Salomão</option>
                                    <option value="SHN">Ilhas Santa Helena</option>
                                    <option value="TCA">Ilhas Turcas e Caicos</option>
                                    <option value="IVA">Ilhas Virgens (EUA)</option>
                                    <option value="VGB">Ilhas Virgens (GBR)</option>
                                    <option value="WAK">Ilhas Wake</option>
                                    <option value="WLF">Ilhas Wallis e Futuna</option>
                                    <option value="IND">Índia</option>
                                    <option value="IDN">Indonésia</option>
                                    <option value="IRA">Irã</option>
                                    <option value="IRQ">Iraque</option>
                                    <option value="IRL">Irlanda</option>
                                    <option value="IRN">Irlanda do Norte</option>
                                    <option value="ISL">Islândia</option>
                                    <option value="ISR">Israel</option>
                                    <option value="IUG">Iugoslávia</option>
                                    <option value="JAM">Jamaica</option>
                                    <option value="JAP">Japão</option>
                                    <option value="JOR">Jordânia</option>
                                    <option value="KIR">Kiribati</option>
                                    <option value="KWT">Kuwait</option>
                                    <option value="LAO">Laos</option>
                                    <option value="LES">Lesoto</option>
                                    <option value="LET">Letônia</option>
                                    <option value="LBN">Líbano</option>
                                    <option value="LBR">Libéria</option>
                                    <option value="LIB">Líbia</option>
                                    <option value="LIE">Liechtenstein</option>
                                    <option value="LIT">Lituânia</option>
                                    <option value="LUX">Luxemburgo</option>
                                    <option value="MAC">Macau</option>
                                    <option value="MCD">Macedônia</option>
                                    <option value="MAD">Madagascar</option>
                                    <option value="MAL">Malásia</option>
                                    <option value="MLV">Malavi</option>
                                    <option value="MDV">Maldivas</option>
                                    <option value="MLI">Mali</option>
                                    <option value="MLT">Malta</option>
                                    <option value="MAR">Marrocos</option>
                                    <option value="MRT">Martinica</option>
                                    <option value="MAU">Maurício</option>
                                    <option value="MTN">Mauritânia</option>
                                    <option value="MEX">México</option>
                                    <option value="MMR">Mianmar</option>
                                    <option value="FSM">Micronésia</option>
                                    <option value="MBQ">Moçambique</option>
                                    <option value="MOL">Moldova</option>
                                    <option value="MON">Mônaco</option>
                                    <option value="MGL">Mongólia</option>
                                    <option value="MNE">Montenegro</option>
                                    <option value="MSR">Montserrat</option>
                                    <option value="NAM">Namíbia</option>
                                    <option value="NRU">Nauru</option>
                                    <option value="NPL">Nepal</option>
                                    <option value="NIC">Nicarágua</option>
                                    <option value="NIG">Niger</option>
                                    <option value="NGA">Nigéria</option>
                                    <option value="NIU">Niue</option>
                                    <option value="NOR">Noruega</option>
                                    <option value="NCL">Nova Caledônia</option>
                                    <option value="NZL">Nova Zelândia</option>
                                    <option value="OMA">Omã</option>
                                    <option value="PCI">Pacific Islands</option>
                                    <option value="PLU">Palau</option>
                                    <option value="PAN">Panamá</option>
                                    <option value="PNG">Papua Nova Guiné</option>
                                    <option value="PAQ">Paquistão</option>
                                    <option value="PRG">Paraguai</option>
                                    <option value="PER">Peru</option>
                                    <option value="PCN">Pitcairn</option>
                                    <option value="PLF">Polinésia Francesa</option>
                                    <option value="POL">Polônia</option>
                                    <option value="PTR">Porto Rico</option>
                                    <option value="QUE">Quênia</option>
                                    <option value="QUI">Quirguistão</option>
                                    <option value="COD">RD Congo</option>
                                    <option value="RCA">Rep. Centro-Africana</option>
                                    <option value="DOM">República Dominicana</option>
                                    <option value="TCH">República Tcheca</option>
                                    <option value="RTC">República Tcheca</option>
                                    <option value="REU">Reunião</option>
                                    <option value="ROM">Romênia</option>
                                    <option value="RUA">Ruanda</option>
                                    <option value="RSS">Rússia</option>
                                    <option value="ASM">Samoa Americana</option>
                                    <option value="SAM">Samoa Ocidental</option>
                                    <option value="SMR">San Marino</option>
                                    <option value="LCA">Santa Lúcia</option>
                                    <option value="KNA">São Cristóvão e Nevis</option>
                                    <option value="SPM">São Pedro e Miquelon</option>
                                    <option value="STP">São Tomé e Príncipe</option>
                                    <option value="VCT">São Vicente e Granadinas</option>
                                    <option value="SEN">Senegal</option>
                                    <option value="SRL">Serra Leoa</option>
                                    <option value="RS">Sérvia</option>
                                    <option value="SYC">Seychelles</option>
                                    <option value="SIR">Síria</option>
                                    <option value="SOM">Somália</option>
                                    <option value="SRI">Sri Lanka</option>
                                    <option value="SUA">Suazilândia</option>
                                    <option value="SUD">Sudão</option>
                                    <option value="SUE">Suécia</option>
                                    <option value="SUI">Suíça</option>
                                    <option value="SUR">Suriname</option>
                                    <option value="TAD">Tajiquistão</option>
                                    <option value="TAI">Tailândia</option>
                                    <option value="TAN">Tanzânia</option>
                                    <option value="TMP">Timor Leste</option>
                                    <option value="TGO">Togo</option>
                                    <option value="TKL">Tokelau</option>
                                    <option value="TON">Tonga</option>
                                    <option value="TRT">Trinidad e Tobago</option>
                                    <option value="TUN">Tunísia</option>
                                    <option value="TUC">Turcomenistão</option>
                                    <option value="TUR">Turquia</option>
                                    <option value="TUV">Tuvalu</option>
                                    <option value="UCR">Ucrânia</option>
                                    <option value="UGA">Uganda</option>
                                    <option value="URS">União Soviética</option>
                                    <option value="URU">Uruguai</option>
                                    <option value="UZB">Uzbequistão</option>
                                    <option value="VUT">Vanuatu</option>
                                    <option value="VAT">Vaticano</option>
                                    <option value="VEN">Venezuela</option>
                                    <option value="VTN">Vietnã</option>
                                    <option value="ESH">Western Sahara</option>
                                    <option value="ZAR">Zaire</option>
                                    <option value="ZAN">Zâmbia</option>
                                    <option value="ZIN">Zimbábue</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="clear"></div>

                        <div class="colun_form layout-cell-6">
                            <div class="layout-cell-pad">
                                <label for="femail" class="tit_form">E-mail</label>
                                <div class="sub_tit_form">Digite aqui seu e-mail</div>
                                <input id="femail" type="text" name="femail" validate="true" required="Campo Email Obrigatório Não informado" placeholder="exemplo@protonmail.com" email="Campo E-mail deve ser válido" onkeyup="formatacao.minusculo(this)" onblur="formatacao.minusculo(this);trimGeral(this)">
                            </div>
                        </div>
                        <div class="colun_form layout-cell-6">
                            <div class="layout-cell-pad">
                                <label for="fconfemail" class="tit_form">Confirme o e-mail</label>
                                <div class="sub_tit_form">Digite seu e-mail novamente para confirmação dos dados</div>
                                <input id="fconfemail" type="text" name="fconfemail" validate="true" required="Campo Confirme E-mail Obrigatório Não informado" placeholder="exemplo@protonmail.com" equal="Campo Confirme o E-mail deve ser igual ao E-mail" maxlength="70">
                            </div>
                        </div>
                        <div class="clear"></div>

                        <div class="colun_form layout-cell-6">
                            <div class="layout-cell-pad">
                                <label for="fsenha" class="tit_form">Senha</label>
                                <div class="sub_tit_form">Crie uma senha para acessar o sistema Lattes</div>
                                <input id="fsenha" type="password" name="fsenha" value="" validate="true" required="Campo Senha Obrigatório Não informado." minlength="Campo Senha deve ter no mínimo 6 caracteres" maxlength="14" onblur="trimGeral(this)">
                                <div class="esq_senha"><span></span>Se você esqueceu a senha, <a href="https://www.cnpq.br/restaurar-senha/" target="_blank" title="Se você esqueceu a senha">clique aqui</a> para solicitá-la</div>
                            </div>
                        </div>

                        <div class="colun_form layout-cell-6">
                            <div class="layout-cell-pad">
                                <label for="fconfsenha" class="tit_form">Confirme a senha</label>
                                <div class="sub_tit_form">Digite sua senha novamente para confirmação dos dados</div>
                                <input id="fconfsenha" type="password" name="fconfsenha" value="" validate="true" required="Campo Confirme a Senha Obrigatório Não informado" equal="Campo Confirme a senha deve ser igual a Senha" maxlength="14">
                            </div>
                        </div>
                        <div class="clear"></div>
                        <hr>

                        <div class="colun_form layout-cell-6">
                            <div class="layout-cell-pad">
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
                <div class="clear"></div>

            </div>
        </div>
        <div class="conteudo cadastro-dois">

            <form id="CPFForm" name="formCPF">
                <input name="fcpfrh" type="hidden" value="14114493638">
            </form>
            <form id="regForm" name="formReg">
                <input type="HIDDEN" name="fcod" value="E5537557A">
                <input type="HIDDEN" name="fcodmunicipio" value="">
                <input type="HIDDEN" name="fenvioufoto" required="Foto obrigatória não enviada." validate="true">
                <div id="conteiner">
                    <div class="conteudo">
                        <div id="cv-register">
                            <div id="passo_1" class="conteudo">
                                <div class="cadastro">
                                    <h1 class="tit" tabindex="0">Informação pessoal</h1>
                                    <hr>
                                    <div class="form layout-cell-12 layout-cell">
                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <div class="fotoCurriculo">
                                                    <h2 class="tit3">Foto de perfil</h2>
                                                    <label class="input-file">
                                                        <span class="input-file-text">Alterar foto</span>
                                                        <input type="file" id="fotoCV" alt="Use a imagem do seu passaporte ou RG." title="Use a imagem do seu passaporte ou RG." name="file" onchange="fileChangeHandler(this)">
                                                    </label>
                                                    <div class="imgDIV">
                                                        <img id="imgCV" src="<?php echo $directory; ?>assets/files/sem_foto_cv.jpg" title="Use a imagem do seu passaporte ou RG." alt="Use a imagem do seu passaporte ou RG.">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="colun_form layout-cell-12">
                                            <h2 class="tit2">Nome civil</h2>
                                            <hr>
                                            <div class="colun_form layout-cell-6">
                                                <div class="layout-cell-pad">
                                                    <label for="fnome" class="tit_form">Primeiro nome<span></span></label>
                                                    <div class="sub_tit_form">Informe seu primeiro nome ex:"José"</div>
                                                    <input id="fnome" type="text" name="fnome" value="" validate="true" required="Campo Primeiro nome Obrigatório Não Informado (Informações pessoais)" maxlength="60" onkeyup="formatacao.letra(this)" onblur="formatacao.letra(this);limpaCaracEstranhosN(this);trimNome(this)">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-6">
                                                <div class="layout-cell-pad">
                                                    <label for="fsobrenome" class="tit_form">Sobrenome</label>
                                                    <div class="sub_tit_form">
                                                        <div class="sub_tit_form">Informe seu sobrenome completo ex:"Pereira da Silva Aquino"</div>
                                                    </div>
                                                    <input id="fsobrenome" type="text" name="fsobrenome" value="" validate="false" required="Campo Sobrenome Obrigatório Não informado (Informações pessoais)" maxlength="60" onkeyup="formatacao.letra(this)" onblur="formatacao.letra(this);limpaCaracEstranhosN(this);trimNome(this)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <h2 class="tit2">Dados pessoais</h2>
                                            <hr>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="fdtanasc" class="tit_form">Data de nascimento<a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe sua data de nascimento</div>
                                                    <input id="fdtanasc" type="text" name="fdtanasc" value="ddmmaaaa" maxlength="10" validate="true" required="Campo Data de Nascimento Obrigatório Não Informado (Informações pessoais)" date="Campo Data de Nascimento inválida. Entre com a Data no formato DDMMAAAA" daterange="Usuário deve ter entre 7 e 129 anos de idade." onkeyup="handleBirthInput(this)" onblur="validarData(this);">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="fpaisnasc" class="tit_form">País de nascimento <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Selecione seu país de nascimento</div>
                                                    <select id="fpaisnasc" name="fpaisnasc" validate="true" required="">
                                                        <option value="">Selecione seu país de nascimento</option>

                                                        <option value="RFA">Alemanha

                                                        </option>
                                                        <option value="ARG">Argentina

                                                        </option>
                                                        <option value="AUS">Austrália

                                                        </option>
                                                        <option value="BRA" selected="">Brasil

                                                        </option>
                                                        <option value="CAN">Canadá

                                                        </option>
                                                        <option value="ESP">Espanha

                                                        </option>
                                                        <option value="EUA">Estados Unidos

                                                        </option>
                                                        <option value="FRA">França

                                                        </option>
                                                        <option value="GBR">Grã-Bretanha

                                                        </option>
                                                        <option value="HOL">Holanda

                                                        </option>
                                                        <option value="ING">Inglaterra

                                                        </option>
                                                        <option value="ITA">Itália

                                                        </option>
                                                        <option value="POR">Portugal

                                                        </option>
                                                        <option value="AFG">Afeganistão

                                                        </option>
                                                        <option value="AFS">África Do Sul

                                                        </option>
                                                        <option value="ALB">Albânia

                                                        </option>
                                                        <option value="AND">Andorra

                                                        </option>
                                                        <option value="ANG">Angola

                                                        </option>
                                                        <option value="ATC">Antartida

                                                        </option>
                                                        <option value="ANB">Antigua

                                                        </option>
                                                        <option value="AHL">Antilhas Holandesas

                                                        </option>
                                                        <option value="ARA">Arábia Saudita

                                                        </option>
                                                        <option value="ARL">Argélia

                                                        </option>
                                                        <option value="ARM">Armênia

                                                        </option>
                                                        <option value="ABW">Aruba

                                                        </option>
                                                        <option value="AUT">Austria

                                                        </option>
                                                        <option value="AZE">Azerbaijão

                                                        </option>
                                                        <option value="BHS">Bahamas

                                                        </option>
                                                        <option value="BGD">Bangladesh

                                                        </option>
                                                        <option value="BRB">Barbados

                                                        </option>
                                                        <option value="BAR">Barein

                                                        </option>
                                                        <option value="BEA">Belarus

                                                        </option>
                                                        <option value="BEL">Bélgica

                                                        </option>
                                                        <option value="BLZ">Belize

                                                        </option>
                                                        <option value="BEN">Benin

                                                        </option>
                                                        <option value="BER">Bermudas

                                                        </option>
                                                        <option value="BIR">Birmânia

                                                        </option>
                                                        <option value="BOL">Bolívia

                                                        </option>
                                                        <option value="BOS">Bósnia

                                                        </option>
                                                        <option value="BOT">Botsuana

                                                        </option>
                                                        <option value="IOT">Britsh Indian Ocean

                                                        </option>
                                                        <option value="BRN">Brunei

                                                        </option>
                                                        <option value="BUL">Bulgária

                                                        </option>
                                                        <option value="BKF">Burkina Fasso

                                                        </option>
                                                        <option value="BUR">Burundi

                                                        </option>
                                                        <option value="BUT">Butão

                                                        </option>
                                                        <option value="CBV">Cabo Verde

                                                        </option>
                                                        <option value="CAM">Camarões

                                                        </option>
                                                        <option value="CBJ">Camboja

                                                        </option>
                                                        <option value="CAT">Catar

                                                        </option>
                                                        <option value="CAZ">Cazaquistão

                                                        </option>
                                                        <option value="CHA">Chade

                                                        </option>
                                                        <option value="CHL">Chile

                                                        </option>
                                                        <option value="CHN">China

                                                        </option>
                                                        <option value="CHP">Chipre

                                                        </option>
                                                        <option value="CXR">Christmas Island

                                                        </option>
                                                        <option value="CIN">Cingapura

                                                        </option>
                                                        <option value="COL">Colômbia

                                                        </option>
                                                        <option value="COM">Comores

                                                        </option>
                                                        <option value="CON">Congo

                                                        </option>
                                                        <option value="CRN">Coréia Do Norte

                                                        </option>
                                                        <option value="CRS">Coréia Do Sul

                                                        </option>
                                                        <option value="CMF">Costa Do Marfim

                                                        </option>
                                                        <option value="CRC">Costa Rica

                                                        </option>
                                                        <option value="CRO">Croácia

                                                        </option>
                                                        <option value="CUB">Cuba

                                                        </option>
                                                        <option value="DIN">Dinamarca

                                                        </option>
                                                        <option value="DJI">Djibuti

                                                        </option>
                                                        <option value="DON">Dominica

                                                        </option>
                                                        <option value="EGI">Egito

                                                        </option>
                                                        <option value="ELS">El Salvador

                                                        </option>
                                                        <option value="EAU">Emirados Árabes

                                                        </option>
                                                        <option value="EQU">Equador

                                                        </option>
                                                        <option value="ERT">Eritréa

                                                        </option>
                                                        <option value="ESC">Escócia

                                                        </option>
                                                        <option value="SVK">Eslováquia

                                                        </option>
                                                        <option value="SVN">Eslovênia

                                                        </option>
                                                        <option value="EST">Estônia

                                                        </option>
                                                        <option value="ETP">Etiópia

                                                        </option>
                                                        <option value="FJI">Fiji

                                                        </option>
                                                        <option value="FIL">Filipinas

                                                        </option>
                                                        <option value="FIN">Finlândia

                                                        </option>
                                                        <option value="FOR">Formosa

                                                        </option>
                                                        <option value="GAB">Gabão

                                                        </option>
                                                        <option value="GAL">Gales

                                                        </option>
                                                        <option value="GAM">Gâmbia

                                                        </option>
                                                        <option value="GAN">Gana

                                                        </option>
                                                        <option value="GEO">Geórgia

                                                        </option>
                                                        <option value="GIB">Gibraltar

                                                        </option>
                                                        <option value="GRD">Granada

                                                        </option>
                                                        <option value="GRE">Grécia

                                                        </option>
                                                        <option value="GRL">Groênlandia

                                                        </option>
                                                        <option value="GDL">Guadalupe

                                                        </option>
                                                        <option value="GUM">Guam

                                                        </option>
                                                        <option value="GUA">Guatemala

                                                        </option>
                                                        <option value="GUI">Guiana

                                                        </option>
                                                        <option value="GFR">Guiana Francesa

                                                        </option>
                                                        <option value="GNE">Guiné

                                                        </option>
                                                        <option value="GNB">Guiné Bissau

                                                        </option>
                                                        <option value="GNQ">Guiné Equatorial

                                                        </option>
                                                        <option value="HTI">Haiti

                                                        </option>
                                                        <option value="HON">Honduras

                                                        </option>
                                                        <option value="HKG">Hong Kong

                                                        </option>
                                                        <option value="HUN">Hungria

                                                        </option>
                                                        <option value="IEM">Iêmem

                                                        </option>
                                                        <option value="IMS">Iêmen Do Sul

                                                        </option>
                                                        <option value="CYM">Ilhas Cayman

                                                        </option>
                                                        <option value="CCK">Ilhas Cocos

                                                        </option>
                                                        <option value="COK">Ilhas Cook

                                                        </option>
                                                        <option value="FLK">Ilhas Falkland

                                                        </option>
                                                        <option value="IFA">Ilhas Faroe

                                                        </option>
                                                        <option value="IMH">Ilhas Marshall

                                                        </option>
                                                        <option value="MID">Ilhas Midway

                                                        </option>
                                                        <option value="NFK">Ilhas Norfolk

                                                        </option>
                                                        <option value="SLB">Ilhas Salomão

                                                        </option>
                                                        <option value="SHN">Ilhas Santa Helena

                                                        </option>
                                                        <option value="TCA">Ilhas Turcas Caicos

                                                        </option>
                                                        <option value="IVA">Ilhas Vírgens Eua

                                                        </option>
                                                        <option value="VGB">Ilhas Vírgens Gbr

                                                        </option>
                                                        <option value="WAK">Ilhas Wake

                                                        </option>
                                                        <option value="WLF">Ilhas Wallis Futuna

                                                        </option>
                                                        <option value="IND">Índia

                                                        </option>
                                                        <option value="IDN">Indonésia

                                                        </option>
                                                        <option value="IRA">Irã

                                                        </option>
                                                        <option value="IRQ">Iraque

                                                        </option>
                                                        <option value="IRL">Irlanda

                                                        </option>
                                                        <option value="IRN">Irlanda Do Norte

                                                        </option>
                                                        <option value="ISL">Islândia

                                                        </option>
                                                        <option value="ISR">Israel

                                                        </option>
                                                        <option value="IUG">Iugoslávia

                                                        </option>
                                                        <option value="JAM">Jamaica

                                                        </option>
                                                        <option value="JAP">Japão

                                                        </option>
                                                        <option value="JOR">Jordânia

                                                        </option>
                                                        <option value="KIR">Kiribati

                                                        </option>
                                                        <option value="KWT">Kuweit

                                                        </option>
                                                        <option value="LAO">Laos

                                                        </option>
                                                        <option value="LES">Lesoto

                                                        </option>
                                                        <option value="LET">Letônia

                                                        </option>
                                                        <option value="LBN">Líbano

                                                        </option>
                                                        <option value="LBR">Libéria

                                                        </option>
                                                        <option value="LIB">Líbia

                                                        </option>
                                                        <option value="LIE">Liechtenstein

                                                        </option>
                                                        <option value="LIT">Lituânia

                                                        </option>
                                                        <option value="LUX">Luxemburgo

                                                        </option>
                                                        <option value="MAC">Macau

                                                        </option>
                                                        <option value="MCD">Macedônia

                                                        </option>
                                                        <option value="MAD">Madagascar

                                                        </option>
                                                        <option value="MAL">Malásia

                                                        </option>
                                                        <option value="MLV">Malavi

                                                        </option>
                                                        <option value="MDV">Maldivas

                                                        </option>
                                                        <option value="MLI">Mali

                                                        </option>
                                                        <option value="MLT">Malta

                                                        </option>
                                                        <option value="MAR">Marrocos

                                                        </option>
                                                        <option value="MRT">Martinica

                                                        </option>
                                                        <option value="MAU">Maurício

                                                        </option>
                                                        <option value="MTN">Mauritânia

                                                        </option>
                                                        <option value="MEX">México

                                                        </option>
                                                        <option value="MMR">Mianmar

                                                        </option>
                                                        <option value="FSM">Micronésia

                                                        </option>
                                                        <option value="MBQ">Moçambique

                                                        </option>
                                                        <option value="MOL">Moldova

                                                        </option>
                                                        <option value="MON">Mônaco

                                                        </option>
                                                        <option value="MGL">Mongólia

                                                        </option>
                                                        <option value="MNE">Montenegro

                                                        </option>
                                                        <option value="MSR">Montserrat

                                                        </option>
                                                        <option value="NAM">Namíbia

                                                        </option>
                                                        <option value="NRU">Nauru

                                                        </option>
                                                        <option value="NPL">Nepal

                                                        </option>
                                                        <option value="NIC">Nicarágua

                                                        </option>
                                                        <option value="NIG">Niger

                                                        </option>
                                                        <option value="NGA">Nigéria

                                                        </option>
                                                        <option value="NIU">Niue

                                                        </option>
                                                        <option value="NOR">Noruega

                                                        </option>
                                                        <option value="NCL">Nova Caledônia

                                                        </option>
                                                        <option value="NZL">Nova Zelândia

                                                        </option>
                                                        <option value="OMA">Omã

                                                        </option>
                                                        <option value="PCI">Pacific Islands

                                                        </option>
                                                        <option value="PLU">Palau

                                                        </option>
                                                        <option value="PAN">Panamá

                                                        </option>
                                                        <option value="PNG">Papua Nova Guiné

                                                        </option>
                                                        <option value="PAQ">Paquistão

                                                        </option>
                                                        <option value="PRG">Paraguai

                                                        </option>
                                                        <option value="PER">Peru

                                                        </option>
                                                        <option value="PCN">Pitcairn

                                                        </option>
                                                        <option value="PLF">Polinésia Francesa

                                                        </option>
                                                        <option value="POL">Polônia

                                                        </option>
                                                        <option value="PTR">Porto Rico

                                                        </option>
                                                        <option value="QUE">Quênia

                                                        </option>
                                                        <option value="QUI">Quirgistão

                                                        </option>
                                                        <option value="COD">Rd Congo

                                                        </option>
                                                        <option value="RCA">Rep.Centro-Africana

                                                        </option>
                                                        <option value="DOM">República Dominicana

                                                        </option>
                                                        <option value="TCH">República Tcheca

                                                        </option>
                                                        <option value="RTC">República Tcheca

                                                        </option>
                                                        <option value="REU">Reunião

                                                        </option>
                                                        <option value="ROM">Romênia

                                                        </option>
                                                        <option value="RUA">Ruanda

                                                        </option>
                                                        <option value="RSS">Rússia

                                                        </option>
                                                        <option value="ASM">Samoa Americana

                                                        </option>
                                                        <option value="SAM">Samoa Ocidental

                                                        </option>
                                                        <option value="SMR">San Marino

                                                        </option>
                                                        <option value="LCA">Santa Lúcia

                                                        </option>
                                                        <option value="KNA">São Cristóvão Nevis

                                                        </option>
                                                        <option value="SPM">São Pedro Miquelon

                                                        </option>
                                                        <option value="STP">São Tomé E Príncipe

                                                        </option>
                                                        <option value="VCT">São Vicente Granadi

                                                        </option>
                                                        <option value="SEN">Senegal

                                                        </option>
                                                        <option value="SRL">Serra Leoa

                                                        </option>
                                                        <option value="RS">Sérvia

                                                        </option>
                                                        <option value="SYC">Seychelles

                                                        </option>
                                                        <option value="SIR">Síria

                                                        </option>
                                                        <option value="SOM">Somália

                                                        </option>
                                                        <option value="SRI">Sri Lanka

                                                        </option>
                                                        <option value="SUA">Suazilândia

                                                        </option>
                                                        <option value="SUD">Sudão

                                                        </option>
                                                        <option value="SUE">Suécia

                                                        </option>
                                                        <option value="SUI">Suiça

                                                        </option>
                                                        <option value="SUR">Suriname

                                                        </option>
                                                        <option value="TAD">Tadjaquistão

                                                        </option>
                                                        <option value="TAI">Tailândia

                                                        </option>
                                                        <option value="TAN">Tanzânia

                                                        </option>
                                                        <option value="TMP">Timor Leste

                                                        </option>
                                                        <option value="TGO">Togo

                                                        </option>
                                                        <option value="TKL">Tokelau

                                                        </option>
                                                        <option value="TON">Tonga

                                                        </option>
                                                        <option value="TRT">Trinidad E Tobago

                                                        </option>
                                                        <option value="TUN">Tunísia

                                                        </option>
                                                        <option value="TUC">Turcomenistão

                                                        </option>
                                                        <option value="TUR">Turquia

                                                        </option>
                                                        <option value="TUV">Tuvalu

                                                        </option>
                                                        <option value="UCR">Ucrânia

                                                        </option>
                                                        <option value="UGA">Uganda

                                                        </option>
                                                        <option value="URS">União Soviética

                                                        </option>
                                                        <option value="URU">Uruguai

                                                        </option>
                                                        <option value="UZB">Uzbekistan

                                                        </option>
                                                        <option value="VUT">Vanuatu

                                                        </option>
                                                        <option value="VAT">Vaticano

                                                        </option>
                                                        <option value="VEN">Venezuela

                                                        </option>
                                                        <option value="VTN">Vietnã

                                                        </option>
                                                        <option value="ESH">Western Sahara

                                                        </option>
                                                        <option value="ZAR">Zaire

                                                        </option>
                                                        <option value="ZAN">Zâmbia

                                                        </option>
                                                        <option value="ZIN">Zimbabue
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3" style="">
                                                <div class="layout-cell-pad">
                                                    <fieldset>
                                                        <legend class="tit_form">Cor ou Raça<a class="icons-aviso titBottom icons-aviso-help icon-cor" href="javascript:void(0)" rel="tooltip" original-title="Informação solicitada para subsidiar a adoção de ações de promoção da igualdade racial, previstas na Lei Nº 12.288, de 20 de julho de 2010">aviso</a> <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </legend>
                                                        <div class="sub_tit_form">Informe sua cor ou raça</div>
                                                        <select id="" name="f_nro_id_raca_cor" validate="true" required="O campo 'Cor ou Raça' é de preenchimento obrigatório para o envio do Currículo Lattes ao CNPq. O conteúdo desse campo é de cárater sigiloso e não estará disponível para acesso público.">
                                                            <option value="" selected=""></option>
                                                            <option value="1">Branca</option>
                                                            <option value="2">Preta</option>
                                                            <option value="3">Parda</option>
                                                            <option value="4">Indígena</option>
                                                            <option value="5">Amarela</option>
                                                            <option value="6">Não desejo declarar</option>

                                                        </select>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="fcpf" class="tit_form">Número do CPF<a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" original-title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe seu CPF (apenas os números)</div>
                                                    <input id="fcpf" value="" cpf="Campo CPF inválido (Informações pessoais)" onkeyup="formatacao.numero(this)" maxlength="11" onblur="formatacao.numero(this);checkExistCPF(this.value)" name="fcpf" validate="true" required="Campo CPF Obrigatório Não preenchido (Informações pessoais)" type="text">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="fnrorg" class="tit_form">Número de identidade<a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe o número de seu documento</div>
                                                    <input id="fnrorg" class="grupoIdent" name="fnrorg" value="" validate="true" required="Campo Número de identidade Obrigatório Não informado (Informações pessoais)" maxlength="15" type="text">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="forgrg" class="tit_form">Órgão emissor<a original-title="Essa informação não será exibida na consulta pública" class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe o órgão emissor</div>
                                                    <input id="forgrg" class="grupoIdent" name="forgrg" value="" validate="true" required="Campo Orgão emissor da carteira de identidade Obrigatório Não informado (Informações pessoais)" maxlength="8" type="text">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-1">
                                                <div class="layout-cell-pad">
                                                    <label for="fufrg" class="tit_form">UF <a original-title="Essa informação não será exibida na consulta pública" class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip">aviso</a> </label>
                                                    <div class="sub_tit_form">Unidade</div>

                                                    <select id="fufrg" class="grupoIdent" name="fufrg" validate="true" required="Campo UF do orgão emissor da carteira de identidade Obrigatório Não informado">
                                                        <option value=""></option>

                                                        <option value="AC">AC

                                                        </option>
                                                        <option value="AL">AL

                                                        </option>
                                                        <option value="AP">AP

                                                        </option>
                                                        <option value="AM">AM

                                                        </option>
                                                        <option value="BA">BA

                                                        </option>
                                                        <option value="CE">CE

                                                        </option>
                                                        <option value="DF">DF

                                                        </option>
                                                        <option value="ES">ES

                                                        </option>
                                                        <option value="GO">GO

                                                        </option>
                                                        <option value="MA">MA

                                                        </option>
                                                        <option value="MT">MT

                                                        </option>
                                                        <option value="MS">MS

                                                        </option>
                                                        <option value="MG">MG

                                                        </option>
                                                        <option value="PA">PA

                                                        </option>
                                                        <option value="PB">PB

                                                        </option>
                                                        <option value="PR">PR

                                                        </option>
                                                        <option value="PE">PE

                                                        </option>
                                                        <option value="PI">PI

                                                        </option>
                                                        <option value="RJ">RJ

                                                        </option>
                                                        <option value="RN">RN

                                                        </option>
                                                        <option value="RS">RS

                                                        </option>
                                                        <option value="RO">RO

                                                        </option>
                                                        <option value="RR">RR

                                                        </option>
                                                        <option value="SC">SC

                                                        </option>
                                                        <option value="SP">SP

                                                        </option>
                                                        <option value="SE">SE

                                                        </option>
                                                        <option value="TO">TO
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-2">
                                                <div class="layout-cell-pad">
                                                    <label for="fdtarg" class="tit_form">Data de emissão<a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe a data de emissão</div>
                                                    <input id="fdtarg" class="grupoIdent" name="fdtarg" type="text" validate="true" value="ddmmaaaa" required="Campo Data de emissão Obrigatório Não informado (Informações pessoais)" date="Campo Data de emissão da carteira de identidade inválida (Informações pessoais)" dategt="Data de emissão inválida, a data de emissão deve ser maior do que a data de nascimento (Informações pessoais) " onkeyup="formatacao.data(this)" onblur="validarData(this);" maxlength="10">
                                                </div>
                                            </div>
                                        </div>


                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <div class="colun_form layout-cell-3">
                                                <label for="fnopassaporte" class="tit_form">Número do passaporte <a original-title="Essa informação não será exibida na consulta pública" class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip">aviso</a> </label>
                                                <div class="layout-cell-pad">
                                                    <div class="sub_tit_form">Informe nº do seu passaporte</div>
                                                    <input id="fnopassaporte" class="grupoPass" name="fnopassaporte" value="" type="text" validate="" required="Campo Passaporte Obrigatório Não Informado (Informações pessoais)" maxlength="20">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <label for="fdtavalpassaporte" class="tit_form">Data de validade <a original-title="Essa informação não será exibida na consulta pública" class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip">aviso</a> </label>
                                                <div class="layout-cell-pad">
                                                    <div class="sub_tit_form">Informe a data de validade do passaporte</div>
                                                    <input id="fdtavalpassaporte" class="grupoPass" name="fdtavalpassaporte" type="text" validate="" value="ddmmaaaa" required="Campo Data de validade Obrigatório Não Informado (Informações pessoais)" date="Data de validade inválida. Entre a data no formato DDMMAAAA (Informações pessoais)" dategt="Campo Data de Validade inválida. Data de Validade deve ser maior que Data de Emissão." onkeyup="formatacao.data(this)" onblur="validarData(this);" maxlength="10">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <label for="fdtapassaporte" class="tit_form">Data de emissão <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                <div class="layout-cell-pad">
                                                    <div class="sub_tit_form">Informe a data de emissão do passaporte</div>
                                                    <input id="fdtapassaporte" class="grupoPass" name="fdtapassaporte" value="ddmmaaaa" type="text" validate="" required="Campo Data de Emissão Obrigatório Não informado (Informações pessoais)" date="Campo Data de Emissão inválida. Entre com a Data no formato DDMMAAAA (Informações pessoais)" onkeyup="formatacao.data(this)" dategt="the issue date must be greater than date of birth" onblur="validarData(this);" maxlength="10">
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad">
                                                    <label for="fpaispassaporte" class="tit_form">País emissor <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe o país onde foi expedido</div>
                                                    <select id="fpaispassaporte" class="grupoPass" name="fpaispassaporte" validate="" required="Campo País Emissor Obrigatório Não informado (Informações pessoais)">
                                                        <option value="">Selecione o país</option>

                                                        <option value="RFA">Alemanha

                                                        </option>
                                                        <option value="ARG">Argentina

                                                        </option>
                                                        <option value="AUS">Austrália

                                                        </option>
                                                        <option value="BRA" selected="">Brasil

                                                        </option>
                                                        <option value="CAN">Canadá

                                                        </option>
                                                        <option value="ESP">Espanha

                                                        </option>
                                                        <option value="EUA">Estados Unidos

                                                        </option>
                                                        <option value="FRA">França

                                                        </option>
                                                        <option value="GBR">Grã-Bretanha

                                                        </option>
                                                        <option value="HOL">Holanda

                                                        </option>
                                                        <option value="ING">Inglaterra

                                                        </option>
                                                        <option value="ITA">Itália

                                                        </option>
                                                        <option value="POR">Portugal

                                                        </option>
                                                        <option value="AFG">Afeganistão

                                                        </option>
                                                        <option value="AFS">África Do Sul

                                                        </option>
                                                        <option value="ALB">Albânia

                                                        </option>
                                                        <option value="AND">Andorra

                                                        </option>
                                                        <option value="ANG">Angola

                                                        </option>
                                                        <option value="ATC">Antartida

                                                        </option>
                                                        <option value="ANB">Antigua

                                                        </option>
                                                        <option value="AHL">Antilhas Holandesas

                                                        </option>
                                                        <option value="ARA">Arábia Saudita

                                                        </option>
                                                        <option value="ARL">Argélia

                                                        </option>
                                                        <option value="ARM">Armênia

                                                        </option>
                                                        <option value="ABW">Aruba

                                                        </option>
                                                        <option value="AUT">Austria

                                                        </option>
                                                        <option value="AZE">Azerbaijão

                                                        </option>
                                                        <option value="BHS">Bahamas

                                                        </option>
                                                        <option value="BGD">Bangladesh

                                                        </option>
                                                        <option value="BRB">Barbados

                                                        </option>
                                                        <option value="BAR">Barein

                                                        </option>
                                                        <option value="BEA">Belarus

                                                        </option>
                                                        <option value="BEL">Bélgica

                                                        </option>
                                                        <option value="BLZ">Belize

                                                        </option>
                                                        <option value="BEN">Benin

                                                        </option>
                                                        <option value="BER">Bermudas

                                                        </option>
                                                        <option value="BIR">Birmânia

                                                        </option>
                                                        <option value="BOL">Bolívia

                                                        </option>
                                                        <option value="BOS">Bósnia

                                                        </option>
                                                        <option value="BOT">Botsuana

                                                        </option>
                                                        <option value="IOT">Britsh Indian Ocean

                                                        </option>
                                                        <option value="BRN">Brunei

                                                        </option>
                                                        <option value="BUL">Bulgária

                                                        </option>
                                                        <option value="BKF">Burkina Fasso

                                                        </option>
                                                        <option value="BUR">Burundi

                                                        </option>
                                                        <option value="BUT">Butão

                                                        </option>
                                                        <option value="CBV">Cabo Verde

                                                        </option>
                                                        <option value="CAM">Camarões

                                                        </option>
                                                        <option value="CBJ">Camboja

                                                        </option>
                                                        <option value="CAT">Catar

                                                        </option>
                                                        <option value="CAZ">Cazaquistão

                                                        </option>
                                                        <option value="CHA">Chade

                                                        </option>
                                                        <option value="CHL">Chile

                                                        </option>
                                                        <option value="CHN">China

                                                        </option>
                                                        <option value="CHP">Chipre

                                                        </option>
                                                        <option value="CXR">Christmas Island

                                                        </option>
                                                        <option value="CIN">Cingapura

                                                        </option>
                                                        <option value="COL">Colômbia

                                                        </option>
                                                        <option value="COM">Comores

                                                        </option>
                                                        <option value="CON">Congo

                                                        </option>
                                                        <option value="CRN">Coréia Do Norte

                                                        </option>
                                                        <option value="CRS">Coréia Do Sul

                                                        </option>
                                                        <option value="CMF">Costa Do Marfim

                                                        </option>
                                                        <option value="CRC">Costa Rica

                                                        </option>
                                                        <option value="CRO">Croácia

                                                        </option>
                                                        <option value="CUB">Cuba

                                                        </option>
                                                        <option value="DIN">Dinamarca

                                                        </option>
                                                        <option value="DJI">Djibuti

                                                        </option>
                                                        <option value="DON">Dominica

                                                        </option>
                                                        <option value="EGI">Egito

                                                        </option>
                                                        <option value="ELS">El Salvador

                                                        </option>
                                                        <option value="EAU">Emirados Árabes

                                                        </option>
                                                        <option value="EQU">Equador

                                                        </option>
                                                        <option value="ERT">Eritréa

                                                        </option>
                                                        <option value="ESC">Escócia

                                                        </option>
                                                        <option value="SVK">Eslováquia

                                                        </option>
                                                        <option value="SVN">Eslovênia

                                                        </option>
                                                        <option value="EST">Estônia

                                                        </option>
                                                        <option value="ETP">Etiópia

                                                        </option>
                                                        <option value="FJI">Fiji

                                                        </option>
                                                        <option value="FIL">Filipinas

                                                        </option>
                                                        <option value="FIN">Finlândia

                                                        </option>
                                                        <option value="FOR">Formosa

                                                        </option>
                                                        <option value="GAB">Gabão

                                                        </option>
                                                        <option value="GAL">Gales

                                                        </option>
                                                        <option value="GAM">Gâmbia

                                                        </option>
                                                        <option value="GAN">Gana

                                                        </option>
                                                        <option value="GEO">Geórgia

                                                        </option>
                                                        <option value="GIB">Gibraltar

                                                        </option>
                                                        <option value="GRD">Granada

                                                        </option>
                                                        <option value="GRE">Grécia

                                                        </option>
                                                        <option value="GRL">Groênlandia

                                                        </option>
                                                        <option value="GDL">Guadalupe

                                                        </option>
                                                        <option value="GUM">Guam

                                                        </option>
                                                        <option value="GUA">Guatemala

                                                        </option>
                                                        <option value="GUI">Guiana

                                                        </option>
                                                        <option value="GFR">Guiana Francesa

                                                        </option>
                                                        <option value="GNE">Guiné

                                                        </option>
                                                        <option value="GNB">Guiné Bissau

                                                        </option>
                                                        <option value="GNQ">Guiné Equatorial

                                                        </option>
                                                        <option value="HTI">Haiti

                                                        </option>
                                                        <option value="HON">Honduras

                                                        </option>
                                                        <option value="HKG">Hong Kong

                                                        </option>
                                                        <option value="HUN">Hungria

                                                        </option>
                                                        <option value="IEM">Iêmem

                                                        </option>
                                                        <option value="IMS">Iêmen Do Sul

                                                        </option>
                                                        <option value="CYM">Ilhas Cayman

                                                        </option>
                                                        <option value="CCK">Ilhas Cocos

                                                        </option>
                                                        <option value="COK">Ilhas Cook

                                                        </option>
                                                        <option value="FLK">Ilhas Falkland

                                                        </option>
                                                        <option value="IFA">Ilhas Faroe

                                                        </option>
                                                        <option value="IMH">Ilhas Marshall

                                                        </option>
                                                        <option value="MID">Ilhas Midway

                                                        </option>
                                                        <option value="NFK">Ilhas Norfolk

                                                        </option>
                                                        <option value="SLB">Ilhas Salomão

                                                        </option>
                                                        <option value="SHN">Ilhas Santa Helena

                                                        </option>
                                                        <option value="TCA">Ilhas Turcas Caicos

                                                        </option>
                                                        <option value="IVA">Ilhas Vírgens Eua

                                                        </option>
                                                        <option value="VGB">Ilhas Vírgens Gbr

                                                        </option>
                                                        <option value="WAK">Ilhas Wake

                                                        </option>
                                                        <option value="WLF">Ilhas Wallis Futuna

                                                        </option>
                                                        <option value="IND">Índia

                                                        </option>
                                                        <option value="IDN">Indonésia

                                                        </option>
                                                        <option value="IRA">Irã

                                                        </option>
                                                        <option value="IRQ">Iraque

                                                        </option>
                                                        <option value="IRL">Irlanda

                                                        </option>
                                                        <option value="IRN">Irlanda Do Norte

                                                        </option>
                                                        <option value="ISL">Islândia

                                                        </option>
                                                        <option value="ISR">Israel

                                                        </option>
                                                        <option value="IUG">Iugoslávia

                                                        </option>
                                                        <option value="JAM">Jamaica

                                                        </option>
                                                        <option value="JAP">Japão

                                                        </option>
                                                        <option value="JOR">Jordânia

                                                        </option>
                                                        <option value="KIR">Kiribati

                                                        </option>
                                                        <option value="KWT">Kuweit

                                                        </option>
                                                        <option value="LAO">Laos

                                                        </option>
                                                        <option value="LES">Lesoto

                                                        </option>
                                                        <option value="LET">Letônia

                                                        </option>
                                                        <option value="LBN">Líbano

                                                        </option>
                                                        <option value="LBR">Libéria

                                                        </option>
                                                        <option value="LIB">Líbia

                                                        </option>
                                                        <option value="LIE">Liechtenstein

                                                        </option>
                                                        <option value="LIT">Lituânia

                                                        </option>
                                                        <option value="LUX">Luxemburgo

                                                        </option>
                                                        <option value="MAC">Macau

                                                        </option>
                                                        <option value="MCD">Macedônia

                                                        </option>
                                                        <option value="MAD">Madagascar

                                                        </option>
                                                        <option value="MAL">Malásia

                                                        </option>
                                                        <option value="MLV">Malavi

                                                        </option>
                                                        <option value="MDV">Maldivas

                                                        </option>
                                                        <option value="MLI">Mali

                                                        </option>
                                                        <option value="MLT">Malta

                                                        </option>
                                                        <option value="MAR">Marrocos

                                                        </option>
                                                        <option value="MRT">Martinica

                                                        </option>
                                                        <option value="MAU">Maurício

                                                        </option>
                                                        <option value="MTN">Mauritânia

                                                        </option>
                                                        <option value="MEX">México

                                                        </option>
                                                        <option value="MMR">Mianmar

                                                        </option>
                                                        <option value="FSM">Micronésia

                                                        </option>
                                                        <option value="MBQ">Moçambique

                                                        </option>
                                                        <option value="MOL">Moldova

                                                        </option>
                                                        <option value="MON">Mônaco

                                                        </option>
                                                        <option value="MGL">Mongólia

                                                        </option>
                                                        <option value="MNE">Montenegro

                                                        </option>
                                                        <option value="MSR">Montserrat

                                                        </option>
                                                        <option value="NAM">Namíbia

                                                        </option>
                                                        <option value="NRU">Nauru

                                                        </option>
                                                        <option value="NPL">Nepal

                                                        </option>
                                                        <option value="NIC">Nicarágua

                                                        </option>
                                                        <option value="NIG">Niger

                                                        </option>
                                                        <option value="NGA">Nigéria

                                                        </option>
                                                        <option value="NIU">Niue

                                                        </option>
                                                        <option value="NOR">Noruega

                                                        </option>
                                                        <option value="NCL">Nova Caledônia

                                                        </option>
                                                        <option value="NZL">Nova Zelândia

                                                        </option>
                                                        <option value="OMA">Omã

                                                        </option>
                                                        <option value="PCI">Pacific Islands

                                                        </option>
                                                        <option value="PLU">Palau

                                                        </option>
                                                        <option value="PAN">Panamá

                                                        </option>
                                                        <option value="PNG">Papua Nova Guiné

                                                        </option>
                                                        <option value="PAQ">Paquistão

                                                        </option>
                                                        <option value="PRG">Paraguai

                                                        </option>
                                                        <option value="PER">Peru

                                                        </option>
                                                        <option value="PCN">Pitcairn

                                                        </option>
                                                        <option value="PLF">Polinésia Francesa

                                                        </option>
                                                        <option value="POL">Polônia

                                                        </option>
                                                        <option value="PTR">Porto Rico

                                                        </option>
                                                        <option value="QUE">Quênia

                                                        </option>
                                                        <option value="QUI">Quirgistão

                                                        </option>
                                                        <option value="COD">Rd Congo

                                                        </option>
                                                        <option value="RCA">Rep.Centro-Africana

                                                        </option>
                                                        <option value="DOM">República Dominicana

                                                        </option>
                                                        <option value="TCH">República Tcheca

                                                        </option>
                                                        <option value="RTC">República Tcheca

                                                        </option>
                                                        <option value="REU">Reunião

                                                        </option>
                                                        <option value="ROM">Romênia

                                                        </option>
                                                        <option value="RUA">Ruanda

                                                        </option>
                                                        <option value="RSS">Rússia

                                                        </option>
                                                        <option value="ASM">Samoa Americana

                                                        </option>
                                                        <option value="SAM">Samoa Ocidental

                                                        </option>
                                                        <option value="SMR">San Marino

                                                        </option>
                                                        <option value="LCA">Santa Lúcia

                                                        </option>
                                                        <option value="KNA">São Cristóvão Nevis

                                                        </option>
                                                        <option value="SPM">São Pedro Miquelon

                                                        </option>
                                                        <option value="STP">São Tomé E Príncipe

                                                        </option>
                                                        <option value="VCT">São Vicente Granadi

                                                        </option>
                                                        <option value="SEN">Senegal

                                                        </option>
                                                        <option value="SRL">Serra Leoa

                                                        </option>
                                                        <option value="RS">Sérvia

                                                        </option>
                                                        <option value="SYC">Seychelles

                                                        </option>
                                                        <option value="SIR">Síria

                                                        </option>
                                                        <option value="SOM">Somália

                                                        </option>
                                                        <option value="SRI">Sri Lanka

                                                        </option>
                                                        <option value="SUA">Suazilândia

                                                        </option>
                                                        <option value="SUD">Sudão

                                                        </option>
                                                        <option value="SUE">Suécia

                                                        </option>
                                                        <option value="SUI">Suiça

                                                        </option>
                                                        <option value="SUR">Suriname

                                                        </option>
                                                        <option value="TAD">Tadjaquistão

                                                        </option>
                                                        <option value="TAI">Tailândia

                                                        </option>
                                                        <option value="TAN">Tanzânia

                                                        </option>
                                                        <option value="TMP">Timor Leste

                                                        </option>
                                                        <option value="TGO">Togo

                                                        </option>
                                                        <option value="TKL">Tokelau

                                                        </option>
                                                        <option value="TON">Tonga

                                                        </option>
                                                        <option value="TRT">Trinidad E Tobago

                                                        </option>
                                                        <option value="TUN">Tunísia

                                                        </option>
                                                        <option value="TUC">Turcomenistão

                                                        </option>
                                                        <option value="TUR">Turquia

                                                        </option>
                                                        <option value="TUV">Tuvalu

                                                        </option>
                                                        <option value="UCR">Ucrânia

                                                        </option>
                                                        <option value="UGA">Uganda

                                                        </option>
                                                        <option value="URS">União Soviética

                                                        </option>
                                                        <option value="URU">Uruguai

                                                        </option>
                                                        <option value="UZB">Uzbekistan

                                                        </option>
                                                        <option value="VUT">Vanuatu

                                                        </option>
                                                        <option value="VAT">Vaticano

                                                        </option>
                                                        <option value="VEN">Venezuela

                                                        </option>
                                                        <option value="VTN">Vietnã

                                                        </option>
                                                        <option value="ESH">Western Sahara

                                                        </option>
                                                        <option value="ZAR">Zaire

                                                        </option>
                                                        <option value="ZAN">Zâmbia

                                                        </option>
                                                        <option value="ZIN">Zimbabue

                                                        </option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <div class="colun_form layout-cell-6">
                                                <div class="layout-cell-pad">
                                                    <label for="fnomemae" class="tit_form">Primeiro nome da mãe <span></span> <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe o primeiro nome da sua mãe</div>
                                                    <input id="fnomemae" type="text" name="fnomemae" value="" validate="true" required="Campo Nome da mãe Obrigatório Não informado (Informações pessoais)" maxlength="60" onkeyup="formatacao.letra(this)" onblur="formatacao.letra(this);limpaCaracEstranhosN(this);trimNome(this)">
                                                    <div class="sub_tit_form">Esta informação não será armazenada, somente será utilizado para validação com a Receita Federal.</div>
                                                </div>
                                            </div>
                                            <div class="colun_form layout-cell-6">
                                                <div class="layout-cell-pad">
                                                    <label for="fsobrenomemae" class="tit_form">Sobrenome da mãe <span>(nome de família)</span> <a original-title="Essa informação não será exibida na consulta pública" class="icons-aviso titBottom icons-aviso-privado icon-dado-unico" href="javascript:void(0)" rel="tooltip">aviso</a> </label>
                                                    <div class="sub_tit_form">Informe o sobrenome completo da sua mãe</div>
                                                    <input id="fsobrenomemae" type="text" name="fsobrenomemae" value="" validate="true" required="Campo Sobrenome da mãe Obrigatório Não informado (Informações pessoais)" maxlength="60" onkeyup="formatacao.letra(this)" onblur="formatacao.letra(this);limpaCaracEstranhosN(this);trimNome(this)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                        <div>
                                            <div class="colun_form layout-cell-12">
                                                <h2 class="tit2">Nome social</h2>
                                                <div class="sub_tit_form">De acordo com o <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/D8727.htm" target="_blank" title="Link para o Decreto">Decreto 8.727/2016</a>, a pessoa travesti ou transexual poderá optar apenas pela exibição do nome social nas buscas públicas do Currículo Lattes</div>
                                                <hr>
                                            </div>

                                            <div class="clear"></div>
                                            <div class="colun_form layout-cell-12">
                                                <div class="colun_form">
                                                    <label class="tit_form">Deseja utilizar o nome social?</label>
                                                    <div class="sub_tit_form">Ao selecionar SIM, a busca pública do Currículo Lattes será realizada somente a partir dos componentes (prenome e sobrenome) do nome social cadastrado abaixo:</div>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="colun_form layout-cell-3">
                                                <div class="layout-cell-pad" id="RadioNomeSocial">
                                                    <div class="radios">
                                                        <input id="nomesocial_S" type="radio" checked="" value="N" name="fnomesocialrd">
                                                        <label for="nomesocial_S">Não</label>
                                                        <input id="nomesocial_N" type="radio" value="S" name="fnomesocialrd">
                                                        <label for="nomesocial_N">Sim</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad" id="NomeSocial">
                                                <div class="layout-cell-pad">
                                                    <label for="" class="tit_form">Nome social<span></span></label>
                                                    <div class="sub_tit_form">Informe o Nome Social</div>
                                                    <input id="fnomesocial" name="fnomesocial" value="" required="Campo Nome social Obrigatório Não Informado (Informações pessoais)" maxlength="60" onkeyup="formatacao.letra(this)" onblur="formatacao.letra(this);limpaCaracEstranhosN(this);trimNome(this)" type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="colun_form layout-cell-12">
                                            <h2 class="tit2">Configuração de Privacidade</h2>
                                            <hr>
                                            <div class="sub_tit_form">Na atualização do seu currículo, você poderá definir a visibilidade das suas informações.</div>
                                            <div class="sub_tit_form">Apenas as informações configuradas com visibilidade "público" serão apresentadas no seu currículo quando consultado na busca pública.</div>
                                            <div class="sub_tit_form">Veja como configurar: <a href="https://buscatextual.cnpq.br/buscatextual/visibilidade.jsp">Configuração de privacidade na Plataforma Lattes</a></div>
                                        </div>
                                        <div class="clear"></div>
                                        <br>
                                    </div>
                                </div>
                            </div>

                            <div id="passo_2" class="conteudo">
                                <div class="cadastro">
                                    <h1 class="tit" tabindex="0">Endereço</h1>
                                    <hr>
                                    <div class="form layout-cell-12 layout-cell">
                                        <div class="colun_form layout-cell-12">
                                            <div class="colun_form">
                                                <div class="tit_form"></div>
                                                <div class="sub_tit_form"></div>
                                                <div class="radios">
                                                    <input id="ftipoend_R" type="radio" checked="" name="ftipoend" value="R" onclick="toggleNaoValidaInst(this)">
                                                    <label for="ftipoend_R">Residencial</label>
                                                    <input id="ftipoend_I" type="radio" name="ftipoend" value="I" onclick="toggleValidaInst(this)">
                                                    <label for="ftipoend_I">Profissional
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <label for="finstender" class="tit_form">Instituição</label>
                                                <div class="sub_tit_form">Clique no ícone para pesquisar a instituição</div>
                                                <input id="finstender" type="text" name="finstender" value="" readonly="readonly">
                                                <input type="hidden" name="fcodinstender" value="" validate="false" required="Campo Instituição Obrigatório Não Informado (Endereço e contatos)">
                                                <a title="Institiuições" class="lupa" href="#" onclick="seleInstEnd()"></a>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-3">
                                            <div class="layout-cell-pad">
                                                <label for="fpaisend" class="tit_form">País
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" original-title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Selecione o país do endereço</div>
                                                <select id="fpaisend" onchange="validar_uf()" name="fpaisend" size="1" validate="true" required="Campo País Obrigatório Não informado (Endereço e contatos)">
                                                    <option value="" selected="">
                                                        Selecione o país
                                                    </option>



                                                    <option value="RFA">Alemanha


                                                    </option>
                                                    <option value="ARG">Argentina


                                                    </option>
                                                    <option value="AUS">Austrália


                                                    </option>
                                                    <option value="BRA">Brasil


                                                    </option>
                                                    <option value="CAN">Canadá


                                                    </option>
                                                    <option value="ESP">Espanha


                                                    </option>
                                                    <option value="EUA">Estados Unidos


                                                    </option>
                                                    <option value="FRA">França


                                                    </option>
                                                    <option value="GBR">Grã-Bretanha


                                                    </option>
                                                    <option value="HOL">Holanda


                                                    </option>
                                                    <option value="ING">Inglaterra


                                                    </option>
                                                    <option value="ITA">Itália


                                                    </option>
                                                    <option value="POR">Portugal


                                                    </option>
                                                    <option value="AFG">Afeganistão


                                                    </option>
                                                    <option value="AFS">África Do Sul


                                                    </option>
                                                    <option value="ALB">Albânia


                                                    </option>
                                                    <option value="AND">Andorra


                                                    </option>
                                                    <option value="ANG">Angola


                                                    </option>
                                                    <option value="ATC">Antartida


                                                    </option>
                                                    <option value="ANB">Antigua


                                                    </option>
                                                    <option value="AHL">Antilhas Holandesas


                                                    </option>
                                                    <option value="ARA">Arábia Saudita


                                                    </option>
                                                    <option value="ARL">Argélia


                                                    </option>
                                                    <option value="ARM">Armênia


                                                    </option>
                                                    <option value="ABW">Aruba


                                                    </option>
                                                    <option value="AUT">Austria


                                                    </option>
                                                    <option value="AZE">Azerbaijão


                                                    </option>
                                                    <option value="BHS">Bahamas


                                                    </option>
                                                    <option value="BGD">Bangladesh


                                                    </option>
                                                    <option value="BRB">Barbados


                                                    </option>
                                                    <option value="BAR">Barein


                                                    </option>
                                                    <option value="BEA">Belarus


                                                    </option>
                                                    <option value="BEL">Bélgica


                                                    </option>
                                                    <option value="BLZ">Belize


                                                    </option>
                                                    <option value="BEN">Benin


                                                    </option>
                                                    <option value="BER">Bermudas


                                                    </option>
                                                    <option value="BIR">Birmânia


                                                    </option>
                                                    <option value="BOL">Bolívia


                                                    </option>
                                                    <option value="BOS">Bósnia


                                                    </option>
                                                    <option value="BOT">Botsuana


                                                    </option>
                                                    <option value="IOT">Britsh Indian Ocean


                                                    </option>
                                                    <option value="BRN">Brunei


                                                    </option>
                                                    <option value="BUL">Bulgária


                                                    </option>
                                                    <option value="BKF">Burkina Fasso


                                                    </option>
                                                    <option value="BUR">Burundi


                                                    </option>
                                                    <option value="BUT">Butão


                                                    </option>
                                                    <option value="CBV">Cabo Verde


                                                    </option>
                                                    <option value="CAM">Camarões


                                                    </option>
                                                    <option value="CBJ">Camboja


                                                    </option>
                                                    <option value="CAT">Catar


                                                    </option>
                                                    <option value="CAZ">Cazaquistão


                                                    </option>
                                                    <option value="CHA">Chade


                                                    </option>
                                                    <option value="CHL">Chile


                                                    </option>
                                                    <option value="CHN">China


                                                    </option>
                                                    <option value="CHP">Chipre


                                                    </option>
                                                    <option value="CXR">Christmas Island


                                                    </option>
                                                    <option value="CIN">Cingapura


                                                    </option>
                                                    <option value="COL">Colômbia


                                                    </option>
                                                    <option value="COM">Comores


                                                    </option>
                                                    <option value="CON">Congo


                                                    </option>
                                                    <option value="CRN">Coréia Do Norte


                                                    </option>
                                                    <option value="CRS">Coréia Do Sul


                                                    </option>
                                                    <option value="CMF">Costa Do Marfim


                                                    </option>
                                                    <option value="CRC">Costa Rica


                                                    </option>
                                                    <option value="CRO">Croácia


                                                    </option>
                                                    <option value="CUB">Cuba


                                                    </option>
                                                    <option value="DIN">Dinamarca


                                                    </option>
                                                    <option value="DJI">Djibuti


                                                    </option>
                                                    <option value="DON">Dominica


                                                    </option>
                                                    <option value="EGI">Egito


                                                    </option>
                                                    <option value="ELS">El Salvador


                                                    </option>
                                                    <option value="EAU">Emirados Árabes


                                                    </option>
                                                    <option value="EQU">Equador


                                                    </option>
                                                    <option value="ERT">Eritréa


                                                    </option>
                                                    <option value="ESC">Escócia


                                                    </option>
                                                    <option value="SVK">Eslováquia


                                                    </option>
                                                    <option value="SVN">Eslovênia


                                                    </option>
                                                    <option value="EST">Estônia


                                                    </option>
                                                    <option value="ETP">Etiópia


                                                    </option>
                                                    <option value="FJI">Fiji


                                                    </option>
                                                    <option value="FIL">Filipinas


                                                    </option>
                                                    <option value="FIN">Finlândia


                                                    </option>
                                                    <option value="FOR">Formosa


                                                    </option>
                                                    <option value="GAB">Gabão


                                                    </option>
                                                    <option value="GAL">Gales


                                                    </option>
                                                    <option value="GAM">Gâmbia


                                                    </option>
                                                    <option value="GAN">Gana


                                                    </option>
                                                    <option value="GEO">Geórgia


                                                    </option>
                                                    <option value="GIB">Gibraltar


                                                    </option>
                                                    <option value="GRD">Granada


                                                    </option>
                                                    <option value="GRE">Grécia


                                                    </option>
                                                    <option value="GRL">Groênlandia


                                                    </option>
                                                    <option value="GDL">Guadalupe


                                                    </option>
                                                    <option value="GUM">Guam


                                                    </option>
                                                    <option value="GUA">Guatemala


                                                    </option>
                                                    <option value="GUI">Guiana


                                                    </option>
                                                    <option value="GFR">Guiana Francesa


                                                    </option>
                                                    <option value="GNE">Guiné


                                                    </option>
                                                    <option value="GNB">Guiné Bissau


                                                    </option>
                                                    <option value="GNQ">Guiné Equatorial


                                                    </option>
                                                    <option value="HTI">Haiti


                                                    </option>
                                                    <option value="HON">Honduras


                                                    </option>
                                                    <option value="HKG">Hong Kong


                                                    </option>
                                                    <option value="HUN">Hungria


                                                    </option>
                                                    <option value="IEM">Iêmem


                                                    </option>
                                                    <option value="IMS">Iêmen Do Sul


                                                    </option>
                                                    <option value="CYM">Ilhas Cayman


                                                    </option>
                                                    <option value="CCK">Ilhas Cocos


                                                    </option>
                                                    <option value="COK">Ilhas Cook


                                                    </option>
                                                    <option value="FLK">Ilhas Falkland


                                                    </option>
                                                    <option value="IFA">Ilhas Faroe


                                                    </option>
                                                    <option value="IMH">Ilhas Marshall


                                                    </option>
                                                    <option value="MID">Ilhas Midway


                                                    </option>
                                                    <option value="NFK">Ilhas Norfolk


                                                    </option>
                                                    <option value="SLB">Ilhas Salomão


                                                    </option>
                                                    <option value="SHN">Ilhas Santa Helena


                                                    </option>
                                                    <option value="TCA">Ilhas Turcas Caicos


                                                    </option>
                                                    <option value="IVA">Ilhas Vírgens Eua


                                                    </option>
                                                    <option value="VGB">Ilhas Vírgens Gbr


                                                    </option>
                                                    <option value="WAK">Ilhas Wake


                                                    </option>
                                                    <option value="WLF">Ilhas Wallis Futuna


                                                    </option>
                                                    <option value="IND">Índia


                                                    </option>
                                                    <option value="IDN">Indonésia


                                                    </option>
                                                    <option value="IRA">Irã


                                                    </option>
                                                    <option value="IRQ">Iraque


                                                    </option>
                                                    <option value="IRL">Irlanda


                                                    </option>
                                                    <option value="IRN">Irlanda Do Norte


                                                    </option>
                                                    <option value="ISL">Islândia


                                                    </option>
                                                    <option value="ISR">Israel


                                                    </option>
                                                    <option value="IUG">Iugoslávia


                                                    </option>
                                                    <option value="JAM">Jamaica


                                                    </option>
                                                    <option value="JAP">Japão


                                                    </option>
                                                    <option value="JOR">Jordânia


                                                    </option>
                                                    <option value="KIR">Kiribati


                                                    </option>
                                                    <option value="KWT">Kuweit


                                                    </option>
                                                    <option value="LAO">Laos


                                                    </option>
                                                    <option value="LES">Lesoto


                                                    </option>
                                                    <option value="LET">Letônia


                                                    </option>
                                                    <option value="LBN">Líbano


                                                    </option>
                                                    <option value="LBR">Libéria


                                                    </option>
                                                    <option value="LIB">Líbia


                                                    </option>
                                                    <option value="LIE">Liechtenstein


                                                    </option>
                                                    <option value="LIT">Lituânia


                                                    </option>
                                                    <option value="LUX">Luxemburgo


                                                    </option>
                                                    <option value="MAC">Macau


                                                    </option>
                                                    <option value="MCD">Macedônia


                                                    </option>
                                                    <option value="MAD">Madagascar


                                                    </option>
                                                    <option value="MAL">Malásia


                                                    </option>
                                                    <option value="MLV">Malavi


                                                    </option>
                                                    <option value="MDV">Maldivas


                                                    </option>
                                                    <option value="MLI">Mali


                                                    </option>
                                                    <option value="MLT">Malta


                                                    </option>
                                                    <option value="MAR">Marrocos


                                                    </option>
                                                    <option value="MRT">Martinica


                                                    </option>
                                                    <option value="MAU">Maurício


                                                    </option>
                                                    <option value="MTN">Mauritânia


                                                    </option>
                                                    <option value="MEX">México


                                                    </option>
                                                    <option value="MMR">Mianmar


                                                    </option>
                                                    <option value="FSM">Micronésia


                                                    </option>
                                                    <option value="MBQ">Moçambique


                                                    </option>
                                                    <option value="MOL">Moldova


                                                    </option>
                                                    <option value="MON">Mônaco


                                                    </option>
                                                    <option value="MGL">Mongólia


                                                    </option>
                                                    <option value="MNE">Montenegro


                                                    </option>
                                                    <option value="MSR">Montserrat


                                                    </option>
                                                    <option value="NAM">Namíbia


                                                    </option>
                                                    <option value="NRU">Nauru


                                                    </option>
                                                    <option value="NPL">Nepal


                                                    </option>
                                                    <option value="NIC">Nicarágua


                                                    </option>
                                                    <option value="NIG">Niger


                                                    </option>
                                                    <option value="NGA">Nigéria


                                                    </option>
                                                    <option value="NIU">Niue


                                                    </option>
                                                    <option value="NOR">Noruega


                                                    </option>
                                                    <option value="NCL">Nova Caledônia


                                                    </option>
                                                    <option value="NZL">Nova Zelândia


                                                    </option>
                                                    <option value="OMA">Omã


                                                    </option>
                                                    <option value="PCI">Pacific Islands


                                                    </option>
                                                    <option value="PLU">Palau


                                                    </option>
                                                    <option value="PAN">Panamá


                                                    </option>
                                                    <option value="PNG">Papua Nova Guiné


                                                    </option>
                                                    <option value="PAQ">Paquistão


                                                    </option>
                                                    <option value="PRG">Paraguai


                                                    </option>
                                                    <option value="PER">Peru


                                                    </option>
                                                    <option value="PCN">Pitcairn


                                                    </option>
                                                    <option value="PLF">Polinésia Francesa


                                                    </option>
                                                    <option value="POL">Polônia


                                                    </option>
                                                    <option value="PTR">Porto Rico


                                                    </option>
                                                    <option value="QUE">Quênia


                                                    </option>
                                                    <option value="QUI">Quirgistão


                                                    </option>
                                                    <option value="COD">Rd Congo


                                                    </option>
                                                    <option value="RCA">Rep.Centro-Africana


                                                    </option>
                                                    <option value="DOM">República Dominicana


                                                    </option>
                                                    <option value="TCH">República Tcheca


                                                    </option>
                                                    <option value="RTC">República Tcheca


                                                    </option>
                                                    <option value="REU">Reunião


                                                    </option>
                                                    <option value="ROM">Romênia


                                                    </option>
                                                    <option value="RUA">Ruanda


                                                    </option>
                                                    <option value="RSS">Rússia


                                                    </option>
                                                    <option value="ASM">Samoa Americana


                                                    </option>
                                                    <option value="SAM">Samoa Ocidental


                                                    </option>
                                                    <option value="SMR">San Marino


                                                    </option>
                                                    <option value="LCA">Santa Lúcia


                                                    </option>
                                                    <option value="KNA">São Cristóvão Nevis


                                                    </option>
                                                    <option value="SPM">São Pedro Miquelon


                                                    </option>
                                                    <option value="STP">São Tomé E Príncipe


                                                    </option>
                                                    <option value="VCT">São Vicente Granadi


                                                    </option>
                                                    <option value="SEN">Senegal


                                                    </option>
                                                    <option value="SRL">Serra Leoa


                                                    </option>
                                                    <option value="RS">Sérvia


                                                    </option>
                                                    <option value="SYC">Seychelles


                                                    </option>
                                                    <option value="SIR">Síria


                                                    </option>
                                                    <option value="SOM">Somália


                                                    </option>
                                                    <option value="SRI">Sri Lanka


                                                    </option>
                                                    <option value="SUA">Suazilândia


                                                    </option>
                                                    <option value="SUD">Sudão


                                                    </option>
                                                    <option value="SUE">Suécia


                                                    </option>
                                                    <option value="SUI">Suiça


                                                    </option>
                                                    <option value="SUR">Suriname


                                                    </option>
                                                    <option value="TAD">Tadjaquistão


                                                    </option>
                                                    <option value="TAI">Tailândia


                                                    </option>
                                                    <option value="TAN">Tanzânia


                                                    </option>
                                                    <option value="TMP">Timor Leste


                                                    </option>
                                                    <option value="TGO">Togo


                                                    </option>
                                                    <option value="TKL">Tokelau


                                                    </option>
                                                    <option value="TON">Tonga


                                                    </option>
                                                    <option value="TRT">Trinidad E Tobago


                                                    </option>
                                                    <option value="TUN">Tunísia


                                                    </option>
                                                    <option value="TUC">Turcomenistão


                                                    </option>
                                                    <option value="TUR">Turquia


                                                    </option>
                                                    <option value="TUV">Tuvalu


                                                    </option>
                                                    <option value="UCR">Ucrânia


                                                    </option>
                                                    <option value="UGA">Uganda


                                                    </option>
                                                    <option value="URS">União Soviética


                                                    </option>
                                                    <option value="URU">Uruguai


                                                    </option>
                                                    <option value="UZB">Uzbekistan


                                                    </option>
                                                    <option value="VUT">Vanuatu


                                                    </option>
                                                    <option value="VAT">Vaticano


                                                    </option>
                                                    <option value="VEN">Venezuela


                                                    </option>
                                                    <option value="VTN">Vietnã


                                                    </option>
                                                    <option value="ESH">Western Sahara


                                                    </option>
                                                    <option value="ZAR">Zaire


                                                    </option>
                                                    <option value="ZAN">Zâmbia


                                                    </option>
                                                    <option value="ZIN">Zimbabue

                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-3">
                                            <div class="layout-cell-pad">
                                                <label for="fzipend" class="tit_form">CEP
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>

                                                <div class="sub_tit_form"><a href="https://www.buscacep.correios.com.br/servicos/dnec/index.do" target="_BLANK">Não sei meu CEP</a></div>
                                                <input id="fzipend" validate="true" type="text" value="" name="fzipend" maxlength="15" required="Campo CEP Obrigatorio Não informado (Endereço e contatos)" onkeyup="formataCep(this)" zip="Campo CEP inválido. (Endereço e contatos)" onblur="getZipData(this.value)" readonly="readonly">
                                                <!-- <a title="CEP" class="lupa" href="#" onclick=""></a> -->
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="fruaend" class="tit_form">Endereço
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe o endereço para contato</div>
                                                <input id="fruaend" type="text" name="fruaend" value="" validate="true" required="Campo Endereço Obrigatório Não informado (Endereço e contatos)" maxlength="180" onblur="limpaCaracEstranhos(this);trimNome(this)" readonly="readonly">
                                            </div>
                                        </div>



                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-4">
                                            <div class="layout-cell-pad">
                                                <label class="tit_form">Bairro
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe o bairro do endereço</div>
                                                <input id="fbairroend" type="text" name="fbairroend" value="" validate="true" required="Campo Bairro Obrigatorio Não informado (Endereço e contatos)" maxlength="255" onblur="limpaCaracEstranhos(this);trimNome(this)" readonly="readonly">
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-4">
                                            <div class="layout-cell-pad">
                                                <label for="fcidadeend" class="tit_form">Cidade
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe a cidade do endereço</div>
                                                <input id="fcidadeend" type="text" name="fcidadeend" value="" validate="true" required="Campo Cidade Obrigatório Não Informado (Endereço e contatos)" maxlength="45" onblur="limpaCaracEstranhos(this);trimNome(this)" readonly="readonly">
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-4">
                                            <div class="layout-cell-pad">
                                                <label for="festadoend" class="tit_form">Estado/Província/Departamento
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe o estado do endereço</div>
                                                <input id="festadoend" type="text" name="festadoend" value="" validate="true" required="Campo Estado Obrigatório Não informado (Endereço e contatos)" maxlength="2" onblur="limpaCaracEstranhos(this);trimNome(this)" readonly="readonly">
                                            </div>
                                        </div>

                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="ffoneend" class="tit_form">Telefone
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe o DDD e o número do telefone fixo</div>
                                                <input title="DDD do telefone" type="text" onkeyup="formatacao.numero(this)" onblur="formatacao.numero(this);" value="" size="2" name="fdddend" validate="true" required="Campo DDD Obrigatório Não informado (Endereço e contatos)" maxlength="5">
                                                <input id="ffoneend" type="text" onkeyup="formatacao.numero(this)" onblur="formatacao.numero(this);" value="" name="ffoneend" validate="true" required="Campo Telefone Obrigatório Não informado (Endereço e contatos)" maxlength="10">
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="ffonemob" class="tit_form">Celular
                                                    <a class="icons-aviso titBottom icons-aviso-privado icon-dado-unico icon-aviso-prof" href="javascript:void(0)" rel="tooltip" original-title="Essa informação não será exibida na consulta pública"></a>
                                                </label>
                                                <div class="sub_tit_form">Informe o DDD e o número do telefone celular</div>
                                                <input title="DDD do celular" type="text" onkeyup="formatacao.numero(this)" onblur="formatacao.numero(this);" value="" size="2" name="fdddmob" maxlength="5">
                                                <input id="ffonemob" type="text" onkeyup="formatacao.numero(this)" onblur="formatacao.numero(this);" value="" name="ffonemob" maxlength="10">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                    </div>
                                </div>
                            </div>


                            <div id="passo_3" class="conteudo">
                                <div class="cadastro">
                                    <h1 class="tit" tabindex="0">Formação acadêmica</h1>
                                    <hr>





                                    <div id="formacao-concluida" class="form layout-cell-12 layout-cell">

                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <label for="fnivel" class="tit_form">Formação acadêmica concluída</label>
                                                <hr>
                                                <div class="sub_tit_form"></div>
                                                <select id="fnivel" name="fnivel">
                                                    <option value="" selected="selected"></option>
                                                    <option value="B">Ensino Fundamental (1o grau)</option>
                                                    <option value="C">Ensino Médio (2o grau)</option>
                                                    <option value="1">Graduação</option>
                                                    <option value="3">Mestrado</option>
                                                    <option value="4">Doutorado</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-8">
                                            <div class="layout-cell-pad">
                                                <label for="finstform" class="tit_form">Instituição (nome da Instituição) </label>
                                                <div class="sub_tit_form"></div>
                                                <input id="finstform" type="text" name="finstform" value="" readonly="readonly" required="Campo Instituição Obrigatório não informado (Formação acadêmica) " validate="true">
                                                <input type="hidden" required="required field institution / university not informed (Formação acadêmica)" validate="true" value="" name="fcodinstform">
                                                <a class="lupa" href="javascript:void(0)" onclick="seleInstForm()" title="Instituição (nome da Instituição) "></a>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-2">
                                            <div class="layout-cell-pad">
                                                <label for="fanoiniform" class="tit_form">Início (ano)</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="fanoiniform" type="text" name="fanoiniform" value="" onkeyup="formatacao.numero(this)" maxlength="4" numbergt="Campo Início(ano) deve ser maior ou igual ao ano de nascimento (Formação acadêmica)" numberlt="Campo Ano De deve ser menor ou igual a 2011 (Formação acadêmica)" required="Campo Obrigatório Inicio(ano) não informado(Formação Acadêmica)" validate="true">
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-2">
                                            <div class="layout-cell-pad">
                                                <label for="fanoterform" class="tit_form">Conclusão (ano)</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="fanoterform" type="text" name="fanoterform" value="" onkeyup="formatacao.numero(this)" maxlength="4" numbergt="Campo Ano (Fim) deve ser maior que o Ano (Início) (Formação acadêmica)" required="Campo Conclusão (ano) não informado (Formação acadêmica)" validate="true" numberlt="Campo Conclusão (ano) da Formação acadêmica não pode ser maior que o ano corrente.">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="fcurso" class="tit_form">Curso</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="fcurso" type="text" name="fcurso" value="" readonly="readonly">
                                                <a class="lupa" onclick="curso();" href="javascript:void(0)" title="Curso"></a>
                                                <input type="hidden" value="" name="f_cod_curso">
                                                <input type="hidden" value="" name="f_cod_curso_outro">
                                            </div>
                                        </div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <fieldset>
                                                    <legend class="tit_form">Com Bolsa?</legend>
                                                    <div class="sub_tit_form"></div>
                                                    <div class="radios">
                                                        <input id="com_bolsa_S" name="com_bolsa" change="formacaoAcademica.AdicionarEventoComBolsaValidacao()" type="radio" value=""><label for="com_bolsa_S">Sim</label>
                                                        <input id="com_bolsa_N" name="com_bolsa" change="formacaoAcademica.AdicionarEventoComBolsaValidacao()" type="radio" value=""><label for="com_bolsa_N">Não</label>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        <div class="esconde-graduacao colun_form layout-cell-4">
                                            <div class="layout-cell-pad">
                                                <label for="f_nme_agencia" class="tit_form">Agência financiadora</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="f_nme_agencia" type="text" value="" readonly="readonly" onchange="testa();" disabled="true" maxlength="75" size="75" name="f_nme_agencia">
                                                <a class="lupa" onclick="selecionarAgenciaFinanciadora();" href="javascript:void(0)" title="Agência financiadora"></a>
                                                <input type="hidden" value="" name="f_agencia">
                                                <input type="hidden" value="" name="f_agencia_outra">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="ftitulotese" id="titulo_monografia" class="tit_form">Título da Monografia</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="ftitulotese" type="text" value="" name="ftitulotese" maxlength="254">
                                            </div>
                                        </div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="fnomeorient" class="tit_form">Nome completo do orientador</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="fnomeorient" type="text" maxlength="60" value="" name="fnomeorient">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <br>

                                    </div>

                                    <div id="formacao-andamento" class="form layout-cell-12 layout-cell">
                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <label for="fnivel_andamento" class="tit_form">Formação acadêmica em andamento</label>
                                                <hr>
                                                <div class="sub_tit_form"></div>
                                                <select id="fnivel_andamento" name="fnivel_andamento">
                                                    <option value="" selected="selected"></option>
                                                    <option value="B">Ensino Fundamental (1o grau)</option>
                                                    <option value="C">Ensino Médio (2o grau)</option>
                                                    <option value="1">Graduação</option>
                                                    <option value="3">Mestrado</option>
                                                    <option value="4">Doutorado</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-10">
                                            <div class="layout-cell-pad">
                                                <label for="afinstform" class="tit_form">Instituição (nome da Instituição) </label>
                                                <div class="sub_tit_form"></div>
                                                <input id="afinstform" readonly="readonly" type="text" value="" name="afinstform" required="Campo Instituição Obrigatório não informado (Formação acadêmica) " validate="true">
                                                <input type="hidden" required="required field institution / university not informed (Formação acadêmica)" validate="true" value="" name="afcodinstform">
                                                <a class="lupa" href="javascript:void(0)" onclick="seleInstFormAndamento()" title="Instituição (nome da Instituição) "></a>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-2">
                                            <div class="layout-cell-pad">
                                                <label for="afanoiniform" class="tit_form">Início (ano)</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="afanoiniform" type="text" value="" name="afanoiniform" onkeyup="formatacao.numero(this)" maxlength="4" numbergt="Campo Início(ano) deve ser maior ou igual ao ano de nascimento (Formação acadêmica)" numberlt="Campo Ano De deve ser menor ou igual a 2011 (Formação acadêmica)" required="Campo Obrigatório Inicio(ano) não informado(Formação Acadêmica)" validate="true">
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-2" style="display:none;">
                                            <div class="layout-cell-pad">
                                                <label for="afanoterform" class="tit_form">Conclusão (ano)</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="afanoterform" type="text" value="" name="afanoterform" onkeyup="formatacao.numero(this)" maxlength="4" numbergt="Campo Ano (Fim) deve ser maior que o Ano (Início) (Formação acadêmica)" required="Campo Obrigatório Inicio(ano) não informado(Formação Acadêmica)" validate="true">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="esconde-graduacao colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <label for="afcurso" class="tit_form">Curso</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="afcurso" readonly="readonly" type="text" value="" name="afcurso">
                                                <a class="lupa" onclick="cursoAndamento();" href="javascript:void(0)" title="Curso"></a>
                                                <input type="hidden" value="" name="af_cod_curso">
                                                <input type="hidden" value="" name="af_cod_curso_outro">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="esconde-graduacao colun_form layout-cell-2">
                                            <div class="layout-cell-pad">
                                                <fieldset>
                                                    <legend class="tit_form">Com Bolsa?</legend>
                                                    <div class="sub_tit_form"></div>
                                                    <div class="radios">
                                                        <input id="acom_bolsa_S" name="acom_bolsa" type="radio" value=""><label for="acom_bolsa_S">Sim</label>
                                                        <input id="acom_bolsa_N" type="radio" name="acom_bolsa" value=""><label for="acom_bolsa_N">Não</label>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        <div class="esconde-graduacao colun_form layout-cell-4">
                                            <div class="layout-cell-pad">
                                                <label for="af_nme_agencia" class="tit_form">Agência financiadora</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="af_nme_agencia" type="text" value="" onchange="testa();" disabled="true" maxlength="75" size="75" name="af_nme_agencia">
                                                <a class="lupa" onclick="selecionarAgenciaFinanciadoraAndamento();" href="javascript:void(0)" title="Agência financiadora"></a>
                                                <input type="hidden" value="" name="af_agencia">
                                                <input type="hidden" value="" name="af_agencia_outra">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label id="atitulo_monografia" for="aftitulotese" class="tit_form">Título da Monografia</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="aftitulotese" type="text" value="" name="aftitulotese">
                                            </div>
                                        </div>

                                        <div class="esconde-graduacao colun_form layout-cell-6">
                                            <div class="layout-cell-pad">
                                                <label for="afnomeorient" class="tit_form">Nome completo do orientador</label>
                                                <div class="sub_tit_form"></div>
                                                <input id="afnomeorient" maxlength="60" type="text" value="" name="afnomeorient">
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>

                                </div>
                            </div>





                            <div id="passo_4" class="conteudo">
                                <div class="cadastro">
                                    <h1 class="tit" tabindex="0">Atuação profissional</h1>
                                    <hr>

                                    <div class="form layout-cell layout-cell-12">

                                        <div class="colun_form layout-cell-4">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional1">
                                                <fieldset>
                                                    <legend class="tit_form">Alguma atuação profissional no momento?</legend>
                                                    <div class="sub_tit_form"></div>
                                                    <div class="layout-cell-pad" id="AtuacaoProfissional2">
                                                        <div class="radios">
                                                            <input id="ftrabcasual_S" name="ftrabcasual" type="radio" value="S"><label for="ftrabcasual_S">Sim</label>
                                                            <input id="ftrabcasual_N" checked="" name="ftrabcasual" type="radio" value="N"><label for="ftrabcasual_N">Não</label>

                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-7">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional3">
                                                <label for="finstativ" class="tit_form">Instituição / Universidade</label>



                                                <div class="sub_tit_form">Clique no ícone para pesquisar</div>
                                                <input id="finstativ" type="text" name="finstativ" value="" readonly="readonly" required="Campo Instituição / Universidade Obrigatório Não informado (Atuação profissional)">
                                                <input type="hidden" name="fcodinstativ" value="">
                                                <a href="javascript:void(0)" class="lupa" onclick="seleInstAtiv()" title="Institiuições"></a>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-5">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional4">
                                                <label for="finstpais" class="tit_form">País</label>
                                                <div class="sub_tit_form">País referente a instituição selecionada</div>
                                                <input id="finstpais" type="text" readonly="readonly" disabled="disabled" name="finstpais" value="">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-7">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional5">
                                                <label for="ftpocontrato" class="tit_form">Tipo do vínculo</label>
                                                <div class="sub_tit_form">Clique no ícone para pesquisar o tipo de contrato</div>
                                                <input id="ftpocontrato" type="text" name="ftpocontrato" value="" readonly="readonly" required="Campo Tipo de contrato Obrigatório Não informado (Atuação profissional)" maxlength="30">
                                                <a href="javascript:void(0)" class="lupa" onclick="dominio();return false;" title="Tipo de contrato"></a>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-5">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional6">
                                                <label for="fcargo" class="tit_form">Cargo</label>
                                                <div class="sub_tit_form">Cargo referente ao contrato selecionado</div>
                                                <input id="fcargo" name="fcargo" type="text" value="" required="Campo Cargo Obrigatório Não Informado (Atuação profissional)" maxlength="45">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-2">
                                            <div class="layout-cell-pad" id="AtuacaoProfissional7">
                                                <label for="ftrabinicio" class="tit_form">Desde</label>
                                                <div class="sub_tit_form">(Ano)</div>
                                                <input id="ftrabinicio" type="text" size="4" style="width:75px" name="ftrabinicio" value="" required="Campo Desde (ano) Obrigatório Não informado (Atuação profissional)" maxlength="4" onkeyup="formatacao.numero(this)" onblur="formatacao.numero(this)" numberlt="O campo Início (ano) deve ser menor ou igual a  2025 (4º passo)" numbergt="Campo Início (ano) deve ser maior que a Data de Nascimento (Atuação profissional)">
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                    </div>
                                </div>
                            </div>


                            <div id="passo_5" class="conteudo">
                                <div class="cadastro">
                                    <h1 class="tit" tabindex="0">Área de atuação</h1>
                                    <hr>




                                    <div class="form layout-cell layout-cell-12">
                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <input type="text" name="farea" value="" readonly="readonly" validate="true" required="Campo Área de atuação Obrigatório Não informado (Área de atuação)">
                                                <input type="hidden" name="fcodarea" value="">
                                                <a href="#" class="lupa" onclick="seleArea()" title="Área de atuação"></a>
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-12">
                                            <div class="layout-cell-pad">
                                                <div tabindex="0" class="tit_form">Habilidades linguísticas</div>
                                                <div class="sub_tit_form">Informe os idiomas e o nível de cada idioma selecionado</div>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="colun_form layout-cell-2-1">
                                            <div class="layout-cell-pad">
                                                <div class="tit_form">idioma</div>
                                                <div>
                                                    <select title="idioma 1" name="fidioma1" size="1" validate="true" required="Campo Idioma Obrigatório Não informado (Área de atuação)" onchange="alteraOpcoes(this,1)">
                                                        <option value="" selected=""></option>


                                                        <option value="DE">Alemão

                                                        </option>
                                                        <option value="ES">Espanhol

                                                        </option>
                                                        <option value="FR">Francês

                                                        </option>
                                                        <option value="EN">Inglês

                                                        </option>
                                                        <option value="IT">Italiano

                                                        </option>
                                                        <option value="LB">Libras

                                                        </option>
                                                        <option value="PT">Português

                                                        </option>
                                                        <option value="AB">Abhkazian

                                                        </option>
                                                        <option value="AA">Afar

                                                        </option>
                                                        <option value="AF">Afrikaans

                                                        </option>
                                                        <option value="AY">Aimara

                                                        </option>
                                                        <option value="SQ">Albanês

                                                        </option>
                                                        <option value="AM">Amarico

                                                        </option>
                                                        <option value="AR">Árabe

                                                        </option>
                                                        <option value="AN">Armênio

                                                        </option>
                                                        <option value="AS">Assames

                                                        </option>
                                                        <option value="AZ">Azerbaidjano

                                                        </option>
                                                        <option value="BC">Baluchi

                                                        </option>
                                                        <option value="EU">Basco

                                                        </option>
                                                        <option value="BA">Bashquir

                                                        </option>
                                                        <option value="BN">Bengali

                                                        </option>
                                                        <option value="BB">Berbere

                                                        </option>
                                                        <option value="BE">Bielo-Russo

                                                        </option>
                                                        <option value="BH">Bihari

                                                        </option>
                                                        <option value="BM">Birmanês

                                                        </option>
                                                        <option value="BI">Bislama

                                                        </option>
                                                        <option value="BR">Bretão

                                                        </option>
                                                        <option value="BG">Búlgaro

                                                        </option>
                                                        <option value="CB">Cabie

                                                        </option>
                                                        <option value="KS">Cachemiriano

                                                        </option>
                                                        <option value="KM">Cambodjano

                                                        </option>
                                                        <option value="KN">Canadá

                                                        </option>
                                                        <option value="KK">Casaque

                                                        </option>
                                                        <option value="CA">Catalão

                                                        </option>
                                                        <option value="ZH">Chinês

                                                        </option>
                                                        <option value="SI">Cingalês

                                                        </option>
                                                        <option value="KO">Coreano

                                                        </option>
                                                        <option value="CO">Corsico

                                                        </option>
                                                        <option value="CR">Crioulo

                                                        </option>
                                                        <option value="HR">Croata

                                                        </option>
                                                        <option value="KU">Curdo

                                                        </option>
                                                        <option value="DA">Dinamarquês

                                                        </option>
                                                        <option value="DI">Divehi

                                                        </option>
                                                        <option value="DZ">Dzongka

                                                        </option>
                                                        <option value="FY">Erisão

                                                        </option>
                                                        <option value="SK">Eslovaco

                                                        </option>
                                                        <option value="SL">Esloveno

                                                        </option>
                                                        <option value="EO">Esperanto

                                                        </option>
                                                        <option value="ET">Estoniano

                                                        </option>
                                                        <option value="EE">Eue

                                                        </option>
                                                        <option value="FO">Feróico

                                                        </option>
                                                        <option value="FJ">Fijiano

                                                        </option>
                                                        <option value="FL">Filipino

                                                        </option>
                                                        <option value="FI">Finlandês

                                                        </option>
                                                        <option value="GD">Gaelico Escocês

                                                        </option>
                                                        <option value="GL">Galego

                                                        </option>
                                                        <option value="CY">Galês

                                                        </option>
                                                        <option value="KA">Georgiano

                                                        </option>
                                                        <option value="EL">Grego

                                                        </option>
                                                        <option value="KL">Groenlandês

                                                        </option>
                                                        <option value="GN">Guarani

                                                        </option>
                                                        <option value="GU">Gujarati

                                                        </option>
                                                        <option value="HY">Harmênio

                                                        </option>
                                                        <option value="HA">Hausa

                                                        </option>
                                                        <option value="IW">Hebraico

                                                        </option>
                                                        <option value="HI">Hindi

                                                        </option>
                                                        <option value="NL">Holandês

                                                        </option>
                                                        <option value="HU">Húngaro

                                                        </option>
                                                        <option value="JI">Iidiche

                                                        </option>
                                                        <option value="IN">Indonésio

                                                        </option>
                                                        <option value="IA">Interlíngua

                                                        </option>
                                                        <option value="IE">Interlíngue

                                                        </option>
                                                        <option value="IK">Inupiak

                                                        </option>
                                                        <option value="ID">Ioma

                                                        </option>
                                                        <option value="GA">Irlandês

                                                        </option>
                                                        <option value="IS">Islandês

                                                        </option>
                                                        <option value="JA">Japonês

                                                        </option>
                                                        <option value="JV">Javanês

                                                        </option>
                                                        <option value="LO">Laosiano

                                                        </option>
                                                        <option value="LP">Lapão

                                                        </option>
                                                        <option value="LA">Latim

                                                        </option>
                                                        <option value="LV">Letão

                                                        </option>
                                                        <option value="LN">Lingála

                                                        </option>
                                                        <option value="LT">Lituano

                                                        </option>
                                                        <option value="LX">Luxemburguês

                                                        </option>
                                                        <option value="MK">Macedônio

                                                        </option>
                                                        <option value="ML">Malaiala

                                                        </option>
                                                        <option value="MS">Malaio

                                                        </option>
                                                        <option value="MG">Malgaxe

                                                        </option>
                                                        <option value="MT">Maltês

                                                        </option>
                                                        <option value="MA">Mandingo

                                                        </option>
                                                        <option value="MI">Maori

                                                        </option>
                                                        <option value="MR">Maratí

                                                        </option>
                                                        <option value="MO">Moldavio

                                                        </option>
                                                        <option value="MN">Mongol

                                                        </option>
                                                        <option value="NA">Nauruano

                                                        </option>
                                                        <option value="NE">Nepali

                                                        </option>
                                                        <option value="NO">Norueguês

                                                        </option>
                                                        <option value="OR">Oria

                                                        </option>
                                                        <option value="OM">Oromo

                                                        </option>
                                                        <option value="FA">Persa

                                                        </option>
                                                        <option value="PL">Polonês

                                                        </option>
                                                        <option value="PA">Punjabi

                                                        </option>
                                                        <option value="PS">Pushto

                                                        </option>
                                                        <option value="QU">Quichua

                                                        </option>
                                                        <option value="RW">Quiniaruanda

                                                        </option>
                                                        <option value="KY">Quirquiz

                                                        </option>
                                                        <option value="RN">Quirundi

                                                        </option>
                                                        <option value="QI">Quisuahili

                                                        </option>
                                                        <option value="RM">Reto-Romano

                                                        </option>
                                                        <option value="RO">Romeno

                                                        </option>
                                                        <option value="RU">Russo

                                                        </option>
                                                        <option value="SM">Samoano

                                                        </option>
                                                        <option value="SG">Sango

                                                        </option>
                                                        <option value="SA">Sanscrito

                                                        </option>
                                                        <option value="SR">Serbian

                                                        </option>
                                                        <option value="SH">Servo-Croata

                                                        </option>
                                                        <option value="ST">Sesoto

                                                        </option>
                                                        <option value="TN">Setsuana

                                                        </option>
                                                        <option value="SN">Shona

                                                        </option>
                                                        <option value="SD">Sindi

                                                        </option>
                                                        <option value="MY">Sirmanês

                                                        </option>
                                                        <option value="SS">Sisvati

                                                        </option>
                                                        <option value="SO">Somali

                                                        </option>
                                                        <option value="SW">Suaili

                                                        </option>
                                                        <option value="SU">Sudanês

                                                        </option>
                                                        <option value="SV">Sueco

                                                        </option>
                                                        <option value="TG">Tadjique

                                                        </option>
                                                        <option value="TH">Tai

                                                        </option>
                                                        <option value="TL">Talagog

                                                        </option>
                                                        <option value="TA">Tamil

                                                        </option>
                                                        <option value="TT">Tatar

                                                        </option>
                                                        <option value="CS">Tcheco

                                                        </option>
                                                        <option value="TE">Telugo

                                                        </option>
                                                        <option value="BO">Tibetano

                                                        </option>
                                                        <option value="TI">Tigrina

                                                        </option>
                                                        <option value="TO">Tongalês

                                                        </option>
                                                        <option value="TS">Tsonga

                                                        </option>
                                                        <option value="TW">Tui

                                                        </option>
                                                        <option value="TR">Turco

                                                        </option>
                                                        <option value="TK">Turcomano

                                                        </option>
                                                        <option value="TU">Tuvaloano

                                                        </option>
                                                        <option value="UK">Ucraniâno

                                                        </option>
                                                        <option value="UR">Urdu

                                                        </option>
                                                        <option value="UZ">Uzbeco

                                                        </option>
                                                        <option value="VI">Vietnamita

                                                        </option>
                                                        <option value="VO">Volupak

                                                        </option>
                                                        <option value="WO">Wolof

                                                        </option>
                                                        <option value="XH">Xosa

                                                        </option>
                                                        <option value="YO">Yoruba

                                                        </option>
                                                        <option value="ZU">Zulú

                                                        </option>
                                                        <option value="OU">Outros

                                                        </option>
                                                    </select>
                                                </div>
                                                <div>

                                                    <select title="idioma 2" name="fidioma2" size="1" onchange="validacaoIdioma(this, 2)" required="Campo Idioma Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value="" selected=""></option>


                                                        <option value="DE">Alemão

                                                        </option>
                                                        <option value="ES">Espanhol

                                                        </option>
                                                        <option value="FR">Francês

                                                        </option>
                                                        <option value="EN">Inglês

                                                        </option>
                                                        <option value="IT">Italiano

                                                        </option>
                                                        <option value="LB">Libras

                                                        </option>
                                                        <option value="PT">Português

                                                        </option>
                                                        <option value="AB">Abhkazian

                                                        </option>
                                                        <option value="AA">Afar

                                                        </option>
                                                        <option value="AF">Afrikaans

                                                        </option>
                                                        <option value="AY">Aimara

                                                        </option>
                                                        <option value="SQ">Albanês

                                                        </option>
                                                        <option value="AM">Amarico

                                                        </option>
                                                        <option value="AR">Árabe

                                                        </option>
                                                        <option value="AN">Armênio

                                                        </option>
                                                        <option value="AS">Assames

                                                        </option>
                                                        <option value="AZ">Azerbaidjano

                                                        </option>
                                                        <option value="BC">Baluchi

                                                        </option>
                                                        <option value="EU">Basco

                                                        </option>
                                                        <option value="BA">Bashquir

                                                        </option>
                                                        <option value="BN">Bengali

                                                        </option>
                                                        <option value="BB">Berbere

                                                        </option>
                                                        <option value="BE">Bielo-Russo

                                                        </option>
                                                        <option value="BH">Bihari

                                                        </option>
                                                        <option value="BM">Birmanês

                                                        </option>
                                                        <option value="BI">Bislama

                                                        </option>
                                                        <option value="BR">Bretão

                                                        </option>
                                                        <option value="BG">Búlgaro

                                                        </option>
                                                        <option value="CB">Cabie

                                                        </option>
                                                        <option value="KS">Cachemiriano

                                                        </option>
                                                        <option value="KM">Cambodjano

                                                        </option>
                                                        <option value="KN">Canadá

                                                        </option>
                                                        <option value="KK">Casaque

                                                        </option>
                                                        <option value="CA">Catalão

                                                        </option>
                                                        <option value="ZH">Chinês

                                                        </option>
                                                        <option value="SI">Cingalês

                                                        </option>
                                                        <option value="KO">Coreano

                                                        </option>
                                                        <option value="CO">Corsico

                                                        </option>
                                                        <option value="CR">Crioulo

                                                        </option>
                                                        <option value="HR">Croata

                                                        </option>
                                                        <option value="KU">Curdo

                                                        </option>
                                                        <option value="DA">Dinamarquês

                                                        </option>
                                                        <option value="DI">Divehi

                                                        </option>
                                                        <option value="DZ">Dzongka

                                                        </option>
                                                        <option value="FY">Erisão

                                                        </option>
                                                        <option value="SK">Eslovaco

                                                        </option>
                                                        <option value="SL">Esloveno

                                                        </option>
                                                        <option value="EO">Esperanto

                                                        </option>
                                                        <option value="ET">Estoniano

                                                        </option>
                                                        <option value="EE">Eue

                                                        </option>
                                                        <option value="FO">Feróico

                                                        </option>
                                                        <option value="FJ">Fijiano

                                                        </option>
                                                        <option value="FL">Filipino

                                                        </option>
                                                        <option value="FI">Finlandês

                                                        </option>
                                                        <option value="GD">Gaelico Escocês

                                                        </option>
                                                        <option value="GL">Galego

                                                        </option>
                                                        <option value="CY">Galês

                                                        </option>
                                                        <option value="KA">Georgiano

                                                        </option>
                                                        <option value="EL">Grego

                                                        </option>
                                                        <option value="KL">Groenlandês

                                                        </option>
                                                        <option value="GN">Guarani

                                                        </option>
                                                        <option value="GU">Gujarati

                                                        </option>
                                                        <option value="HY">Harmênio

                                                        </option>
                                                        <option value="HA">Hausa

                                                        </option>
                                                        <option value="IW">Hebraico

                                                        </option>
                                                        <option value="HI">Hindi

                                                        </option>
                                                        <option value="NL">Holandês

                                                        </option>
                                                        <option value="HU">Húngaro

                                                        </option>
                                                        <option value="JI">Iidiche

                                                        </option>
                                                        <option value="IN">Indonésio

                                                        </option>
                                                        <option value="IA">Interlíngua

                                                        </option>
                                                        <option value="IE">Interlíngue

                                                        </option>
                                                        <option value="IK">Inupiak

                                                        </option>
                                                        <option value="ID">Ioma

                                                        </option>
                                                        <option value="GA">Irlandês

                                                        </option>
                                                        <option value="IS">Islandês

                                                        </option>
                                                        <option value="JA">Japonês

                                                        </option>
                                                        <option value="JV">Javanês

                                                        </option>
                                                        <option value="LO">Laosiano

                                                        </option>
                                                        <option value="LP">Lapão

                                                        </option>
                                                        <option value="LA">Latim

                                                        </option>
                                                        <option value="LV">Letão

                                                        </option>
                                                        <option value="LN">Lingála

                                                        </option>
                                                        <option value="LT">Lituano

                                                        </option>
                                                        <option value="LX">Luxemburguês

                                                        </option>
                                                        <option value="MK">Macedônio

                                                        </option>
                                                        <option value="ML">Malaiala

                                                        </option>
                                                        <option value="MS">Malaio

                                                        </option>
                                                        <option value="MG">Malgaxe

                                                        </option>
                                                        <option value="MT">Maltês

                                                        </option>
                                                        <option value="MA">Mandingo

                                                        </option>
                                                        <option value="MI">Maori

                                                        </option>
                                                        <option value="MR">Maratí

                                                        </option>
                                                        <option value="MO">Moldavio

                                                        </option>
                                                        <option value="MN">Mongol

                                                        </option>
                                                        <option value="NA">Nauruano

                                                        </option>
                                                        <option value="NE">Nepali

                                                        </option>
                                                        <option value="NO">Norueguês

                                                        </option>
                                                        <option value="OR">Oria

                                                        </option>
                                                        <option value="OM">Oromo

                                                        </option>
                                                        <option value="FA">Persa

                                                        </option>
                                                        <option value="PL">Polonês

                                                        </option>
                                                        <option value="PA">Punjabi

                                                        </option>
                                                        <option value="PS">Pushto

                                                        </option>
                                                        <option value="QU">Quichua

                                                        </option>
                                                        <option value="RW">Quiniaruanda

                                                        </option>
                                                        <option value="KY">Quirquiz

                                                        </option>
                                                        <option value="RN">Quirundi

                                                        </option>
                                                        <option value="QI">Quisuahili

                                                        </option>
                                                        <option value="RM">Reto-Romano

                                                        </option>
                                                        <option value="RO">Romeno

                                                        </option>
                                                        <option value="RU">Russo

                                                        </option>
                                                        <option value="SM">Samoano

                                                        </option>
                                                        <option value="SG">Sango

                                                        </option>
                                                        <option value="SA">Sanscrito

                                                        </option>
                                                        <option value="SR">Serbian

                                                        </option>
                                                        <option value="SH">Servo-Croata

                                                        </option>
                                                        <option value="ST">Sesoto

                                                        </option>
                                                        <option value="TN">Setsuana

                                                        </option>
                                                        <option value="SN">Shona

                                                        </option>
                                                        <option value="SD">Sindi

                                                        </option>
                                                        <option value="MY">Sirmanês

                                                        </option>
                                                        <option value="SS">Sisvati

                                                        </option>
                                                        <option value="SO">Somali

                                                        </option>
                                                        <option value="SW">Suaili

                                                        </option>
                                                        <option value="SU">Sudanês

                                                        </option>
                                                        <option value="SV">Sueco

                                                        </option>
                                                        <option value="TG">Tadjique

                                                        </option>
                                                        <option value="TH">Tai

                                                        </option>
                                                        <option value="TL">Talagog

                                                        </option>
                                                        <option value="TA">Tamil

                                                        </option>
                                                        <option value="TT">Tatar

                                                        </option>
                                                        <option value="CS">Tcheco

                                                        </option>
                                                        <option value="TE">Telugo

                                                        </option>
                                                        <option value="BO">Tibetano

                                                        </option>
                                                        <option value="TI">Tigrina

                                                        </option>
                                                        <option value="TO">Tongalês

                                                        </option>
                                                        <option value="TS">Tsonga

                                                        </option>
                                                        <option value="TW">Tui

                                                        </option>
                                                        <option value="TR">Turco

                                                        </option>
                                                        <option value="TK">Turcomano

                                                        </option>
                                                        <option value="TU">Tuvaloano

                                                        </option>
                                                        <option value="UK">Ucraniâno

                                                        </option>
                                                        <option value="UR">Urdu

                                                        </option>
                                                        <option value="UZ">Uzbeco

                                                        </option>
                                                        <option value="VI">Vietnamita

                                                        </option>
                                                        <option value="VO">Volupak

                                                        </option>
                                                        <option value="WO">Wolof

                                                        </option>
                                                        <option value="XH">Xosa

                                                        </option>
                                                        <option value="YO">Yoruba

                                                        </option>
                                                        <option value="ZU">Zulú

                                                        </option>
                                                        <option value="OU">Outros

                                                        </option>
                                                    </select>
                                                </div>
                                                <div>

                                                    <select title="idioma 3" name="fidioma3" size="1" onchange="validacaoIdioma(this, '3')" required="Campo Idioma Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value="" selected=""></option>


                                                        <option value="DE">Alemão

                                                        </option>
                                                        <option value="ES">Espanhol

                                                        </option>
                                                        <option value="FR">Francês

                                                        </option>
                                                        <option value="EN">Inglês

                                                        </option>
                                                        <option value="IT">Italiano

                                                        </option>
                                                        <option value="LB">Libras

                                                        </option>
                                                        <option value="PT">Português

                                                        </option>
                                                        <option value="AB">Abhkazian

                                                        </option>
                                                        <option value="AA">Afar

                                                        </option>
                                                        <option value="AF">Afrikaans

                                                        </option>
                                                        <option value="AY">Aimara

                                                        </option>
                                                        <option value="SQ">Albanês

                                                        </option>
                                                        <option value="AM">Amarico

                                                        </option>
                                                        <option value="AR">Árabe

                                                        </option>
                                                        <option value="AN">Armênio

                                                        </option>
                                                        <option value="AS">Assames

                                                        </option>
                                                        <option value="AZ">Azerbaidjano

                                                        </option>
                                                        <option value="BC">Baluchi

                                                        </option>
                                                        <option value="EU">Basco

                                                        </option>
                                                        <option value="BA">Bashquir

                                                        </option>
                                                        <option value="BN">Bengali

                                                        </option>
                                                        <option value="BB">Berbere

                                                        </option>
                                                        <option value="BE">Bielo-Russo

                                                        </option>
                                                        <option value="BH">Bihari

                                                        </option>
                                                        <option value="BM">Birmanês

                                                        </option>
                                                        <option value="BI">Bislama

                                                        </option>
                                                        <option value="BR">Bretão

                                                        </option>
                                                        <option value="BG">Búlgaro

                                                        </option>
                                                        <option value="CB">Cabie

                                                        </option>
                                                        <option value="KS">Cachemiriano

                                                        </option>
                                                        <option value="KM">Cambodjano

                                                        </option>
                                                        <option value="KN">Canadá

                                                        </option>
                                                        <option value="KK">Casaque

                                                        </option>
                                                        <option value="CA">Catalão

                                                        </option>
                                                        <option value="ZH">Chinês

                                                        </option>
                                                        <option value="SI">Cingalês

                                                        </option>
                                                        <option value="KO">Coreano

                                                        </option>
                                                        <option value="CO">Corsico

                                                        </option>
                                                        <option value="CR">Crioulo

                                                        </option>
                                                        <option value="HR">Croata

                                                        </option>
                                                        <option value="KU">Curdo

                                                        </option>
                                                        <option value="DA">Dinamarquês

                                                        </option>
                                                        <option value="DI">Divehi

                                                        </option>
                                                        <option value="DZ">Dzongka

                                                        </option>
                                                        <option value="FY">Erisão

                                                        </option>
                                                        <option value="SK">Eslovaco

                                                        </option>
                                                        <option value="SL">Esloveno

                                                        </option>
                                                        <option value="EO">Esperanto

                                                        </option>
                                                        <option value="ET">Estoniano

                                                        </option>
                                                        <option value="EE">Eue

                                                        </option>
                                                        <option value="FO">Feróico

                                                        </option>
                                                        <option value="FJ">Fijiano

                                                        </option>
                                                        <option value="FL">Filipino

                                                        </option>
                                                        <option value="FI">Finlandês

                                                        </option>
                                                        <option value="GD">Gaelico Escocês

                                                        </option>
                                                        <option value="GL">Galego

                                                        </option>
                                                        <option value="CY">Galês

                                                        </option>
                                                        <option value="KA">Georgiano

                                                        </option>
                                                        <option value="EL">Grego

                                                        </option>
                                                        <option value="KL">Groenlandês

                                                        </option>
                                                        <option value="GN">Guarani

                                                        </option>
                                                        <option value="GU">Gujarati

                                                        </option>
                                                        <option value="HY">Harmênio

                                                        </option>
                                                        <option value="HA">Hausa

                                                        </option>
                                                        <option value="IW">Hebraico

                                                        </option>
                                                        <option value="HI">Hindi

                                                        </option>
                                                        <option value="NL">Holandês

                                                        </option>
                                                        <option value="HU">Húngaro

                                                        </option>
                                                        <option value="JI">Iidiche

                                                        </option>
                                                        <option value="IN">Indonésio

                                                        </option>
                                                        <option value="IA">Interlíngua

                                                        </option>
                                                        <option value="IE">Interlíngue

                                                        </option>
                                                        <option value="IK">Inupiak

                                                        </option>
                                                        <option value="ID">Ioma

                                                        </option>
                                                        <option value="GA">Irlandês

                                                        </option>
                                                        <option value="IS">Islandês

                                                        </option>
                                                        <option value="JA">Japonês

                                                        </option>
                                                        <option value="JV">Javanês

                                                        </option>
                                                        <option value="LO">Laosiano

                                                        </option>
                                                        <option value="LP">Lapão

                                                        </option>
                                                        <option value="LA">Latim

                                                        </option>
                                                        <option value="LV">Letão

                                                        </option>
                                                        <option value="LN">Lingála

                                                        </option>
                                                        <option value="LT">Lituano

                                                        </option>
                                                        <option value="LX">Luxemburguês

                                                        </option>
                                                        <option value="MK">Macedônio

                                                        </option>
                                                        <option value="ML">Malaiala

                                                        </option>
                                                        <option value="MS">Malaio

                                                        </option>
                                                        <option value="MG">Malgaxe

                                                        </option>
                                                        <option value="MT">Maltês

                                                        </option>
                                                        <option value="MA">Mandingo

                                                        </option>
                                                        <option value="MI">Maori

                                                        </option>
                                                        <option value="MR">Maratí

                                                        </option>
                                                        <option value="MO">Moldavio

                                                        </option>
                                                        <option value="MN">Mongol

                                                        </option>
                                                        <option value="NA">Nauruano

                                                        </option>
                                                        <option value="NE">Nepali

                                                        </option>
                                                        <option value="NO">Norueguês

                                                        </option>
                                                        <option value="OR">Oria

                                                        </option>
                                                        <option value="OM">Oromo

                                                        </option>
                                                        <option value="FA">Persa

                                                        </option>
                                                        <option value="PL">Polonês

                                                        </option>
                                                        <option value="PA">Punjabi

                                                        </option>
                                                        <option value="PS">Pushto

                                                        </option>
                                                        <option value="QU">Quichua

                                                        </option>
                                                        <option value="RW">Quiniaruanda

                                                        </option>
                                                        <option value="KY">Quirquiz

                                                        </option>
                                                        <option value="RN">Quirundi

                                                        </option>
                                                        <option value="QI">Quisuahili

                                                        </option>
                                                        <option value="RM">Reto-Romano

                                                        </option>
                                                        <option value="RO">Romeno

                                                        </option>
                                                        <option value="RU">Russo

                                                        </option>
                                                        <option value="SM">Samoano

                                                        </option>
                                                        <option value="SG">Sango

                                                        </option>
                                                        <option value="SA">Sanscrito

                                                        </option>
                                                        <option value="SR">Serbian

                                                        </option>
                                                        <option value="SH">Servo-Croata

                                                        </option>
                                                        <option value="ST">Sesoto

                                                        </option>
                                                        <option value="TN">Setsuana

                                                        </option>
                                                        <option value="SN">Shona

                                                        </option>
                                                        <option value="SD">Sindi

                                                        </option>
                                                        <option value="MY">Sirmanês

                                                        </option>
                                                        <option value="SS">Sisvati

                                                        </option>
                                                        <option value="SO">Somali

                                                        </option>
                                                        <option value="SW">Suaili

                                                        </option>
                                                        <option value="SU">Sudanês

                                                        </option>
                                                        <option value="SV">Sueco

                                                        </option>
                                                        <option value="TG">Tadjique

                                                        </option>
                                                        <option value="TH">Tai

                                                        </option>
                                                        <option value="TL">Talagog

                                                        </option>
                                                        <option value="TA">Tamil

                                                        </option>
                                                        <option value="TT">Tatar

                                                        </option>
                                                        <option value="CS">Tcheco

                                                        </option>
                                                        <option value="TE">Telugo

                                                        </option>
                                                        <option value="BO">Tibetano

                                                        </option>
                                                        <option value="TI">Tigrina

                                                        </option>
                                                        <option value="TO">Tongalês

                                                        </option>
                                                        <option value="TS">Tsonga

                                                        </option>
                                                        <option value="TW">Tui

                                                        </option>
                                                        <option value="TR">Turco

                                                        </option>
                                                        <option value="TK">Turcomano

                                                        </option>
                                                        <option value="TU">Tuvaloano

                                                        </option>
                                                        <option value="UK">Ucraniâno

                                                        </option>
                                                        <option value="UR">Urdu

                                                        </option>
                                                        <option value="UZ">Uzbeco

                                                        </option>
                                                        <option value="VI">Vietnamita

                                                        </option>
                                                        <option value="VO">Volupak

                                                        </option>
                                                        <option value="WO">Wolof

                                                        </option>
                                                        <option value="XH">Xosa

                                                        </option>
                                                        <option value="YO">Yoruba

                                                        </option>
                                                        <option value="ZU">Zulú

                                                        </option>
                                                        <option value="OU">Outros

                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="colun_form layout-cell-2-1">
                                            <div class="layout-cell-pad">
                                                <div class="tit_form">compreende</div>
                                                <div>
                                                    <select title="compreende 1" name="fentende1" validate="true" required="Campo Compreensão Obrigatório Não informado (Área de atuação)">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="compreende 2" name="fentende2" onchange="validacaoIdioma(this, '2')" required="Campo Compreensão Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="compreende 3" name="fentende3" onchange="validacaoIdioma(this, '3')" required="Campo Compreensão Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="colun_form layout-cell-2-1">
                                            <div class="layout-cell-pad">
                                                <div class="tit_form">lê</div>
                                                <div>
                                                    <select title="lê 1" name="fle1" validate="true" required="Campo Leitura Obrigatório Não informado (Área de atuação)">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="lê 2" name="fle2" onchange="validacaoIdioma(this, '2')" required="Campo Leitura Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="lê 3" name="fle3" onchange="validacaoIdioma(this, '3')" required="Campo Leitura Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="colun_form layout-cell-2-1">
                                            <div class="layout-cell-pad">
                                                <div class="tit_form">fala</div>
                                                <div>
                                                    <select title="fala 1" name="ffala1" validate="true" required="Campo Oral Obrigatório Não informado (Área de atuação)">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="fala 2" name="ffala2" onchange="validacaoIdioma(this, '2')" required="Campo Oral Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="fala 3" name="ffala3" onchange="validacaoIdioma(this, '3')" required="Campo Oral Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="colun_form layout-cell-2-1">
                                            <div class="layout-cell-pad">
                                                <div class="tit_form">escreve</div>
                                                <div>
                                                    <select title="escreve 1" name="fescreve1" validate="true" required="Campo Escrita Obrigatório Não informado (Área de atuação)">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="escreve 2" name="fescreve2" onchange="validacaoIdioma(this, '2')" required="Campo Escrita Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select title="escreve 3" name="fescreve3" onchange="validacaoIdioma(this, '3')" required="Campo Escrita Obrigatório Não informado (Área de atuação)" validate="false">
                                                        <option value=""></option>
                                                        <option value="P">
                                                            pouco
                                                        </option>
                                                        <option value="R">
                                                            bom
                                                        </option>
                                                        <option value="B">
                                                            excelente
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                    <div class="bts">
                                        <a href="#" class="button" id="proximo_5"> <span class="mini-ico mini-ico-right"></span>Finalizar cadastro</a>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>

</html>