$(document).ready(function () {
    $("input[name=fsobrenome]").attr("validate", "false");
    if ($("input[name=fzipend]").val() == "") {
        $("input[name=fzipend]").attr('readonly', true);
    }
    if ($("select[name=fpaisend]").val() != "" &&
        $("select[name=fpaisend]").val() != "BRA") {
        $("input[name=fzipend]").attr('readonly', false);
    }
    $("input[name=fdtanasc]").blur(function () {
        var anoNasc = $("input[name=fdtanasc]").val().split("/")[2];
        var anoAtual = new Date().getFullYear();
        if (anoAtual - anoNasc < 14) {
            formacaoAcademicaAndamento.primeiroGrau();
            $("select[name=fnivel_andamento]").val("B");
        } else {
            $("input[name=fanoiniform]").attr("validate", "true");
            $("input[name=fanoterform]").attr("validate", "true");
        }
    });
});



$(document).ready(function () {
    if ("" == "S") {
        $(".flow-wrapper.default-width.center").css("width", "611px");
        if ("1" == "2")
            $(".flow-wrapper.default-width.center").width(643);
    }
    else
        $(".flow-wrapper.default-width.center").css("width", "755px");
});
function trimGeral(input) {
    var vcarac = "";
    var vacum = "";
    var vtrava = false;
    var val = $(input).val();
    val = $.trim(val);
    for (var j = 0; j < val.length; j++) {
        vcarac = val.substring(j, j + 1);
        if (vcarac != " ") vacum = vacum + vcarac;
    }
    input.value = vacum;
}

function sendCVPart() {
    if ($("input[name=fdtarg]").val() == "ddmmaaaa")
        $("input[name=fdtarg]").val("");

    if ($("input[name=fdtavalpassaporte]").val() == "ddmmaaaa")
        $("input[name=fdtavalpassaporte]").val("");

    if ($("input[name=fdtapassaporte]").val() == "ddmmaaaa")
        $("input[name=fdtapassaporte]").val("");

    if ($("input[name=fdtanasc]").val() == "ddmmaaaa")
        $("input[name=fdtanasc]").val("");


    var form = $("form#regForm"),
        data = form.serializeArray();

    var verro = false;
    escapeSerializedJSON(data);


    $.ajax({
        type: "POST",
        url: "pkg_cv_estr.TARGET_REGISTER",
        data: data,
        error: function (error) {
            verro = true;
        },
        success: function (data) {
            verro = false;
        }
    });

    if ($("input[name=fdtarg]").val() == "")
        $("input[name=fdtarg]").val("ddmmaaaa");

    if ($("input[name=fdtavalpassaporte]").val() == "")
        $("input[name=fdtavalpassaporte]").val("ddmmaaaa");

    if ($("input[name=fdtapassaporte]").val() == "")
        $("input[name=fdtapassaporte]").val("ddmmaaaa");

    if ($("input[name=fdtanasc]").val() == "")
        $("input[name=fdtanasc]").val("ddmmaaaa");

}

function validarData(valor2) {


    function check_data(valor) {
        vlraux = trim(valor);
        if ((vlraux == "") || (vlraux.length != 10) ||
            (vlraux.substring(2, 3) != "/") ||
            (vlraux.substring(5, 6) != "/")) {
            return false;
        }
        dia = parseInt(vlraux.substring(0, 2), 10);
        mes = parseInt(vlraux.substring(3, 5), 10);
        ano = parseInt(vlraux.substring(6, 10), 10);
        if (isNaN(dia) || isNaN(mes) || isNaN(ano) || (mes < 1) || (mes > 12) || (dia < 1)) {
            return false;
        }
        tabmes = "312831303130313130313031";
        if ((dia == 29) && (mes == 2)) {
            if ((ano == 0) || ((ano % 4) != 0)) {
                return false;
            }
            else {
                return true;
            }
        }
        k = (mes * 2 - 2)
        if (dia > tabmes.substring(k, k + 2)) {
            return false;
        }
        else {
            return true;
        }
        return false;
    }

    if (!check_data(valor2.value) && valor2.value != "") {
        alert("Data inválida");
        valor2.value = "";
    }
}


var curDate = "13/04/2025",
    anoNasc = "1896";



registerConfig = {
    fenvioufoto: { required: true },
    fsobrenome: { required: false },
    fnome: { required: true },
    fnomesocial: { required: true },
    fcpf: { required: true, cpf: true },
    fpaisnasc: { required: true },
    fdtanasc: { required: true, date: true, daterange: { date: curDate, min: 7, max: 129 } },
    //fsexo: {required:true},
    //ftipodoc: {required:true},
    fnrorg: { required: true },
    afinstform: { required: true },
    forgrg: { required: true },
    fufrg: { required: true },
    fdtarg: { required: true, date: true, dategt: "fdtanasc" },
    //fsobrenomepai: {requiredif:"fnomepai"},
    //fnomepai: {requiredif:"fsobrenomepai"},
    fsobrenomemae: { required: false },
    fnomemae: { required: true },
    fruaend: { required: true },
    fpaisend: { required: true },
    festadoend: { required: true },
    fcidadeend: { required: true },
    fzipend: { required: true, testzip: "fpaisend" },
    fbairroend: { required: true },
    fdddend: { required: true },
    ffoneend: { required: true },
    fnivel: { required: true },
    finstform: { required: true },
    //fareaform: {required:true},
    fanoiniform: { required: true, numberlt: "2026", numbergt: anoNasc },
    fanoterform: { required: true, numbergt: "fanoiniform", numberlt: "2026" },
    ftitulotese: { required: true },
    fnomeorient: { required: true },
    finstativ: { required: true },
    ftpocontrato: { required: true },
    fcargo: { required: true },
    ftrabinicio: { required: true, numberlt: "2026", numbergt: anoNasc },
    farea: { required: true },
    fidioma1: { required: true },
    fentende1: { required: true },
    fle1: { required: true },
    ffala1: { required: true },
    fescreve1: { required: true },
    fidioma2: { required: true },
    fentende2: { required: true },
    fle2: { required: true },
    ffala2: { required: true },
    fescreve2: { required: true },
    fidioma3: { required: true },
    fentende3: { required: true },
    fle3: { required: true },
    ffala3: { required: true },
    fescreve3: { required: true },
    fcodinstender: { required: true },
    f_nro_id_raca_cor: { required: true }
};



function vercpf(cpf) {
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    } else {
        return true;
    }


}

function passaporteCadastrado(passaporte, pais) {

    var v_retExiste;

    $.ajax({
        type: "POST",
        url: "pkg_util.passaporte_cadastrado",
        data: {
            f_pass: passaporte,
            f_cod: "",
            f_pais: pais


        },
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.existe == true) {
                v_retExiste = true;
            }
            else {
                v_retExiste = false;
            }
        }
    });

    return v_retExiste;


}


function VeriCPFExist() {

    var form = $("form#CPFForm"),
        data = form.serializeArray();

    escapeSerializedJSON(data);

    $.ajax({
        type: "POST",
        url: "pkg_cv_estr.verif_exist_cpf",
        data: data,
        error: function (error) {
            alert("Error");
        },
        success: function (data) {

            if (data.substring(0, 1) == "S") {
                alert("Já existe um currículo cadastrado para o CPF informado.\n" +
                    "Caso queira atualizar as informações, favor acessar o endereço\n" +
                    "https://lattes.cnpq.br/ e clicar na opção \"Atualizar Currículo\".");
                document.formReg.fcpf.value = "";
            }

        }
    });

}

function trim(str) {
    i = 0;
    while (((str.substring(i, i + 1)) == " ") && (i < str.length)) i++;
    aux = str.substring(i, str.length); i = aux.length;
    while (((aux.substring(i - 1, i)) == " ") && (i > 1)) i--;
    aux = aux.substring(0, i);
    return aux;
}


function checkExistCPF(vlr) {

    if (trim(vlr) == "" || !vercpf(vlr)) {
        return;
    } else {
        //  alert("vai verificar o cpf");
        document.formCPF.fcpfrh.value = vlr;
        VeriCPFExist();
    }
}


function DesamarelaMestDout() {
    $(":input[name='ftitulotese']").parent().removeClass();
    $(":input[name='fnomeorient']").parent().removeClass();
}


function Desamarela1grau() {

    //$(":input[name='fareaform']").parent().removeClass()
    $(":input[name='fanoterform']").parent().removeClass()
    $(":input[name='farea']").parent().removeClass()
    $(":input[name='farea']").parent().removeClass()
    $(":input[name='fidioma1']").parent().removeClass()
    $(":input[name='fentende1']").parent().removeClass()
    $(":input[name='fle1']").parent().removeClass()
    $(":input[name='ffala1']").parent().removeClass()
    $(":input[name='fescreve1']").parent().removeClass()


    /*   document.formReg.fareaform.style.backgroundColor = "#FFFFFF";
         document.formReg.fanoterform.style.backgroundColor = "#FFFFFF";
         document.formReg.farea.style.backgroundColor = "#FFFFFF";
         document.formReg.fidioma1.style.backgroundColor = "#FFFFFF";
         document.formReg.fentende1.style.backgroundColor = "#FFFFFF";
         document.formReg.fle1.style.backgroundColor = "#FFFFFF";
         document.formReg.ffala1.style.backgroundColor = "#FFFFFF";
         document.formReg.fescreve1.style.backgroundColor = "#FFFFFF";*/
}

function Desamarela2grau() {

    //$(":input[name='fareaform']").parent().removeClass()
    $(":input[name='farea']").parent().removeClass()
    $(":input[name='farea']").parent().removeClass()
    $(":input[name='fidioma1']").parent().removeClass()
    $(":input[name='fentende1']").parent().removeClass()
    $(":input[name='fle1']").parent().removeClass()
    $(":input[name='ffala1']").parent().removeClass()
    $(":input[name='fescreve1']").parent().removeClass()


    /*   document.formReg.fareaform.style.backgroundColor = "#FFFFFF";
         document.formReg.farea.style.backgroundColor = "#FFFFFF";
         document.formReg.fidioma1.style.backgroundColor = "#FFFFFF";
         document.formReg.fentende1.style.backgroundColor = "#FFFFFF";
         document.formReg.fle1.style.backgroundColor = "#FFFFFF";
         document.formReg.ffala1.style.backgroundColor = "#FFFFFF";
         document.formReg.fescreve1.style.backgroundColor = "#FFFFFF";*/
}

function priGrauLibValidate() {
    //var       inputs1grau = $(":input[name='fareaform'], :input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']") // 1 grau
    var inputs1grau = $(" :input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']") // 1 grau
    inputs1grau.attr("validate", "false");
}

function segGrauLibValidate() {
    //var  inputs2grau = $(":input[name='fareaform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"); // 2 grau
    var inputs2grau = $(":input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"); // 2 grau
    inputs2grau.attr("validate", "false");
}

function changeDegreeHandler(select) {
    var value = select.options[select.selectedIndex].value,
        inputs = $(":input[name='ftitulotese'], :input[name='fnomeorient']"), // mestrado e dotourado
        //inputs1grau = $(":input[name='fareaform'], :input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"), // 1 grau
        //inputs2grau = $(":input[name='fareaform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"); // 2 grau

        inputs1grau = $(":input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"), // 1 grau
        inputs2grau = $(":input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"); // 2 grau


    if (value == "3" || value == "4") {
        inputs.attr("validate", "true");
    }
    else {
        inputs.attr("validate", "false");
        DesamarelaMestDout();
    }

    if (value == "B") { // 1 grau
        inputs1grau.attr("validate", "false");
        Desamarela1grau()
    } else {
        inputs1grau.attr("validate", "true");
    }

    if (value == "C") { // 2 grau
        inputs2grau.attr("validate", "false");
        Desamarela2grau()
    } else {
        inputs2grau.attr("validate", "true");
        if (value == "B") {
            inputs1grau.attr("validate", "false");
            Desamarela1grau()
        }
    }
}

function fileChangeHandler(input) {
    // var profilepicture = $("#fotoCV").val().split("\\").pop();
    if ((input.files[0].size / 1024) > 70) {
        alert("Arquivo maior que o permitido. É possivel carregar apenas arquivos com até 70k");
        return false;
    }

    $(":input[name='fenvioufoto']").val(true);
    var tms_aux = new Date().getTime();
    $("#imgCV").attr("src", URL.createObjectURL(input.files[0]));

    //REFAZER FORM NO POST SQS

    // var form = $("<form enctype='multipart/form-data' method='post'></form>").attr("action", "/LATTES/assets/files/sem_foto_cv.jpg").hide(),
    //     cod = $("<input type='hidden'></input>").attr("name", "f_cod").val("E5537557A"),
    //     ctr = $("<input type='hidden'></input>").attr("name", "f_ctr").val("I"),
    //     fotoCV = $("#fotoCV"),
    //     owner = fotoCV.parent();

    // form.append(cod).append(ctr).append(fotoCV).appendTo("body");
    // try {
    //     form.ajaxSubmit({
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             if (data.success) {
    // $(":input[name='fenvioufoto']").val(true);
    // var tms_aux = new Date().getTime();
    // $("#imgCV").attr("src", 'pkg_foto_cv_estr.show_foto?f_cod=E5537557A&ts=' + tms_aux);
    //             }
    //             else
    //                 alert(data.message);
    //         },
    //         error: function () {
    //             fotoCV.appendTo(owner);
    //         }
    //     });
    // } catch (e) {
    //     alert(e);
    //     $("#imgCV").attr("src", 'pkg_foto_cv_estr.show_foto?f_cod=E5537557A&ts=' + tms_aux);
    // }

    // isso tá manual, mas tá presente no if data.success
}

function handleBirthInput(input) {
    var val = $(input).val();
    formatacao.data(input);

    if (val.length == 10) {
        registerConfig = $.extend(registerConfig, {
            fanoiniform: { required: true, numberlt: "2026", numbergt: anoNasc },
            ftrabinicio: { required: true, numberlt: "2026", numbergt: anoNasc }
        });
    }

}




function limpaCaracEstranhos(input) {

    var cvalidos = " ºªáÁãÃâÂàÀäÄéÉêÊèÈëËíÍïÏìÌîÎóÓõÕôÔòÒöÖúÚûÛùÙüÜçÇ!\"#$%&'()*,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    var vacum = "";
    var vcarac = "";
    var val = $(input).val();
    val = $.trim(val);
    for (var j = 0; j < val.length; j++) {
        vcarac = val.substring(j, j + 1);
        if (cvalidos.indexOf(vcarac) > -1) {
            vacum = vacum + vcarac;
        }
    }
    input.value = vacum;
}

function limpaCaracEstranhosN(input) {

    var cvalidos = "-'´`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÒÓÔÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïñòóôõöùúûü ";
    var vacum = "";
    var vcarac = "";
    var val = $(input).val();
    val = $.trim(val);
    for (var j = 0; j < val.length; j++) {
        vcarac = val.substring(j, j + 1);
        if (cvalidos.indexOf(vcarac) > -1) {
            vacum = vacum + vcarac;
        }
    }
    input.value = vacum;
}

function trimNome(input) {
    var vcarac = "";
    var vacum = "";
    var vtrava = false;
    var val = $(input).val();
    val = $.trim(val);
    for (var j = 0; j < val.length; j++) {
        vcarac = val.substring(j, j + 1);
        if (vcarac != " ") {
            vtrava = false;
        }
        if (!vtrava) {
            vacum = vacum + vcarac;
        }
        if (vcarac == " ") {
            vtrava = true;
        } else {
            vtrava = false;
        }
    }
    input.value = vacum;
}


function trimAll(stin) {


    return stin.replace(/\s/g, '');

}

function checkNmeIguais(input) {


    var nomeSocial = $.trim($("input[name=fnomesocial]").val().toUpperCase())
    var nomeCivil = $.trim($("input[name=fnome]").val().toUpperCase())
    if (trimAll(nomeSocial) == trimAll(nomeCivil) && nomeSocial != "") {
        alert("Nome social e nome civil devem ser diferentes");
        input.value = "";
    }

}


function AspDupAspSimples(input) {
    var vacum = "";
    var vcarac = "";
    var val = $(input).val();
    for (var j = 0; j < val.length; j++) {
        vcarac = val.substring(j, j + 1);
        if (vcarac == '"') {
            vcarac = "'";
        }
        vacum = vacum + vcarac;
    }
    input.value = vacum;
}

/*function handleBirthInput2(input) {
  var val = $(input).val();
  if (val.length == 10) {
    diaNasc = parseInt(val.substring(0, 3));
    mesNasc = parseInt(val.substring(3, 5));
    anoNasc = parseInt(val.substring(6, 10));

    diaHoje = parseInt(curDate.substring(0, 3));
    mesHoje = parseInt(curDate.substring(3, 5));
    anoHoje = parseInt(curDate.substring(6, 10));

    var hoje = new Date();
    hoje.setDate(diaHoje);
    hoje.setMonth(mesHoje - 1);
    hoje.setFullYear(anoHoje);

    var nasc = new Date();
    nasc.setDate(diaNasc);
    nasc.setMonth(mesNasc - 1);
    nasc.setFullYear(anoNasc);
    var idade = Math.floor((hoje.getTime() - nasc.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if(idade<14){
        document.formReg.fnivel.selectedIndex = 1;
//      inputs1grau = $(":input[name='fareaform'], :input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"), // 1 grau
        inputs1grau = $(":input[name='fanoterform'],:input[name='farea'],:input[name='fidioma1'], :input[name='fentende1'], :input[name='fle1'], :input[name='ffala1'], :input[name='fescreve1']"), // 1 grau
        inputs1grau.attr("validate", "false");
        Desamarela1grau()
    } else {
        document.formReg.fnivel.selectedIndex = 0;
    }
  }

}*/

function recuperaFoto() {
    var ts = (new Date()).getTime();
    url = "https://wwws.cnpq.br/cvlattesweb/pkg_foto_cv_estr.mostra?f_cod=E5537557A&ts=" + ts;
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            // $(":input[name='fenvioufoto']").val(true);
            //      $("#fotoCurriculo").empty().html(data).hide().fadeIn(1000);
            var tms_aux = new Date().getTime();
            alert('pkg_foto_cv_estr.show_foto?f_cod=E5537557A&tms=' + tms_aux);
            $("#imgCV").attr("src", 'pkg_foto_cv_estr.show_foto?f_cod=E5537557A&tms=' + tms_aux);

        }
    });
}


$(document).ready(function () {

    /*Botão Cancelar*/




    /*Botão próximo*/

    $(".naviPasso1, .navi1").click(function () {
        $("#passo_2, #passo_3, #passo_4, #passo_5").hide();
        $("#passo_1").show();
        $(".naviPasso2, .naviPasso3,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso1").addClass("selected");

        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".info_pess").addClass("select_info_pess");
        sendCVPart();
    });

    $(".naviPasso2, #proximo_1, .navi2").click(function () {
        $("#passo_1, #passo_3, #passo_4, #passo_5").hide();
        $("#passo_2").show();
        $(".naviPasso1, .naviPasso3,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso2").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".end_cont").addClass("select_end_cont");
        sendCVPart();
    });

    $(".naviPasso3, #proximo_2, .navi3").click(function () {
        $("#passo_1, #passo_2, #passo_4, #passo_5").hide();
        $("#passo_3").show();
        $(".naviPasso1, .naviPasso2,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso3").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".form_acad").addClass("select_form_acad");
        sendCVPart();
    });

    $(".naviPasso4, #proximo_3, .navi4").click(function () {
        $("#passo_1, #passo_2, #passo_3, #passo_5").hide();
        $("#passo_4").show();
        $(".naviPasso1, .naviPasso2, .naviPasso3,.naviPasso5").removeClass("selected");
        $(".naviPasso4").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".atua_prof").addClass("select_atua_prof");
        sendCVPart();
    });

    $(".naviPasso5, #proximo_4, .navi5").click(function () {
        $("#passo_1, #passo_2, #passo_3, #passo_4").hide();
        $("#passo_5").show();
        $(".naviPasso1, .naviPasso2, .naviPasso3,.naviPasso4").removeClass("selected");
        $(".naviPasso5").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".area_atua").addClass("select_area_atua");
        sendCVPart();




    });

    $("#proximo_5").click(function () {


        if ($.trim($("input[name=fnomemae]").val().toUpperCase()) == "DESCONHECIDA" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "DECONHECIDA" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "DESCONHECIDO" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "IGNORADO" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "IGNORADOS" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "IGNORADA" ||
            $.trim($("input[name=fnomemae]").val().toUpperCase()) == "IGNORADAS"
        ) {
            $("input[name=fsobrenomemae]").attr("validate", "false");
            document.formReg.fsobrenomemae.style.backgroundColor = "#FFFFFF";
        } else {
            $("input[name=fsobrenomemae]").attr("validate", "false");
        }

        if (($.trim($(":input[name=fnopassaporte]").val()) != "" ||
            ($.trim($(":input[name=fdtavalpassaporte]").val()) != "" && $(":input[name=fdtavalpassaporte]").val() != "ddmmaaaa") ||
            ($.trim($(":input[name=fdtapassaporte]").val()) != "" && $(":input[name=fdtapassaporte]").val() != "ddmmaaaa") /* ||
      $(":input[name=fpaispassaporte]").val() != "" */  )) {

            registerConfig.fdtavalpassaporte = { required: true, date: true, dategt: "fdtapassaporte" };
            registerConfig.fdtapassaporte = { required: true, date: true, dategt: "fdtanasc" };
            registerConfig.fpaispassaporte = { required: true };
            registerConfig.fnopassaporte = { required: true };
            $("#fnopassaporte").get(0).setAttribute("required", "Campos obrigatórios referentes a Passaporte Não informado (Informações pessoais)");
            $("[name=fdtavalpassaporte]").get(0).setAttribute("required", "Campos obrigatórios referentes a Passaporte Não informado (Informações pessoais)");
            $("[name=fdtapassaporte]").get(0).setAttribute("required", "Campos obrigatórios referentes a Passaporte Não informado (Informações pessoais)");
            $("[name=fpaispassaporte]").get(0).setAttribute("required", "Campos obrigatórios referentes a Passaporte Não informado (Informações pessoais)");
            $("[name=fdtavalpassaporte],[name=fdtapassaporte],[name=fpaispassaporte],[name=fnopassaporte]").attr("validate", "true");
        } else {
            $("[name=fdtavalpassaporte],[name=fdtapassaporte],[name=fpaispassaporte],[name=fnopassaporte]").attr("validate", "false")
            registerConfig.fdtavalpassaporte = { required: true, date: true, dategt: "fdtapassaporte" };
            registerConfig.fdtapassaporte = { required: true, date: true, dategt: "fdtanasc" };
            registerConfig.fpaispassaporte = { required: true };
            registerConfig.fnopassaporte = { required: true };

        }

        formacaoAcademica.esperaDisponibilidade();
        if ($("select[name=fnivel]").val() == "B" || $("select[name=fnivel]").val() == "C") {
            $("input[name=farea]").removeAttr("validate");
            $("select[name=fidioma1]").removeAttr("validate");
            $("select[name=fentende1]").removeAttr("validate");
            $("select[name=fle1]").removeAttr("validate");
            $("select[name=ffala1]").removeAttr("validate");
            $("select[name=fescreve1]").removeAttr("validate");

        }
        else {
            $("input[name=farea]").attr("validate", "true");
            $("select[name=fidioma1]").attr("validate", "true");
            $("select[name=fentende1]").attr("validate", "true");
            $("select[name=fle1]").attr("validate", "true");
            $("select[name=ffala1]").attr("validate", "true");
            $("select[name=fescreve1]").attr("validate", "true");

        }
        var dataNascimento = $("input[name=fdtanasc]").val();
        var anoNascimento = dataNascimento.split("/")[2];
        var anoAtual = new Date().getUTCFullYear();

        if ((anoAtual - anoNascimento) <= 14) {
            $("#formacaoConcluida").find("input").removeAttr("validate");
            $("input[name=farea]").removeAttr("validate");
            $("select[name=fidioma1]").removeAttr("validate");
            $("select[name=fentende1]").removeAttr("validate");
            $("select[name=fle1]").removeAttr("validate");
            $("select[name=ffala1]").removeAttr("validate");
            $("select[name=fescreve1]").removeAttr("validate");
            $("input[name=fanoiniform]").removeAttr("validate");
            $("input[name=fanoterform]").removeAttr("validate");
        }
        else {
            $("input[name=farea]").attr("validate", "true");
            $("select[name=fidioma1]").attr("validate", "true");
            $("select[name=fentende1]").attr("validate", "true");
            $("select[name=fle1]").attr("validate", "true");
            $("select[name=ffala1]").attr("validate", "true");
            $("select[name=fescreve1]").attr("validate", "true");

            $("input[name=fanoiniform]").attr("validate");
            $("input[name=fanoterform]").attr("validate");

        }

        /*var dataNascimento = $("input[name=fdtanasc]").val();
        var anoNascimento = dataNascimento.split("/")[2];
        var anoAtual = new Date().getUTCFullYear();
        
        if ((anoAtual - anoNascimento) <= 14 ){
        delete registerConfig.fanoiniform ;
        delete registerConfig.fanoterform ;
        delete registerConfig.com_bolsa ;
        formacaoAcademicaAndamento.primeiroGrau();
        
        
        
        }
        else{
        if (registerConfig.fanoiniform == undefined) {
        registerConfig.fanoiniform = {required:true, numberlt:"2026", numbergt:anoNasc};
        registerConfig.fanoterform = {required:true, numbergt:"fanoiniform", numberlt:"2026"};
        }
        
        
        
        }*/


        if ($("input[name=fdtarg]").val() == "ddmmaaaa")
            $("input[name=fdtarg]").val("");

        if ($("input[name=fdtavalpassaporte]").val() == "ddmmaaaa")
            $("input[name=fdtavalpassaporte]").val("");

        if ($("input[name=fdtapassaporte]").val() == "ddmmaaaa")
            $("input[name=fdtapassaporte]").val("");

        if ($("input[name=fdtanasc]").val() == "ddmmaaaa")
            $("input[name=fdtanasc]").val("");




        function sucessoEnvio() {
            alert("Seu Currículo foi cadastrado e será publicado em até 24h.\nQuaisquer dúvidas, entrar em contato com a Central de Atendimento:\n" +
                "Tel.: + 55 (61) 3211-4000\nE-mail: atendimento@cnpq.br");
        }
        function possuiAP() {
            alert("O currículo não pode ser publicado pois existe uma validação aguardando processamento;");
        }
        function indisponivel() {
            alert("O sistema de validação dos dados cadastrados junto a SRF está inoperante nesse momento. Você será notificado do resultado da validação através do e-mail informado.");
        }
        function muitas_tentativas() {
            alert("Não é possível publicar o currículo nesse momento pois o número máximo de validações consecutivas " +
                "e sem sucesso junto a Receita Federal foi excedido. E o último envio foi feito a menos de 4 horas atrás. Por favor tente mais tarde.");
        }
        function muitas_tentativas_10() {
            alert("Não é possível publicar o currículo. Houve mais de 10 tentativas sem sucesso");

        }
        function cpf_existe() {

            alert("Já existe um currículo cadastrado para o CPF informado.\n" +
                "Caso queira atualizar as informações, favor acessar o endereço\n" +
                "https://lattes.cnpq.br/ e clicar na opção \"Atualizar Currículo\".");
        }


        var campoNome = "Nome";
        var campoNomeMae = "Nome da Mãe";
        var campoSexo = "Sexo";
        var campoDataNasc = "Data de Nascimento";
        var campoNacionalidade = "Nacionalidade";


        var msgDivergenteInicioPlural = "Atenção: Os dados divergentes são :\n"
        var msgDivergenteInicioSingular = "Atenção: O dado divergente é :\n"



        function camposDivergentes(strDiver) {

            var vCampo = "";
            var pv = false;
            if (strDiver.indexOf("N") > -1) {
                vCampo += campoNome;
                pv = true;
            }



            if (strDiver.indexOf("M") > -1) {
                if (pv) {
                    vCampo += ";\n";
                    pv = false;
                }
                vCampo += campoNomeMae;
                pv = true;
            }

            if (strDiver.indexOf("D") > -1) {
                if (pv) {
                    vCampo += ";\n";
                    pv = false;
                }
                vCampo += campoDataNasc;
                pv = true;
            }

            if (strDiver.indexOf("S") > -1) {
                if (pv) {
                    vCampo += ";\n";
                    pv = false;
                }
                vCampo += campoSexo;
                pv = true;
            }

            if (strDiver.indexOf("A") > -1) {
                if (pv) {
                    vCampo += ";\n";
                    pv = false;
                }
                vCampo += campoNacionalidade;
                pv = true;
            }
            return vCampo;
        }



        function submete() {

            // var data = $("form#pubForm").serialize();
            msgIrregular = "";
            loadingWin = $.win({
                showCloseBtn: false,
                width: "auto",
                content: "Carregando ...",
                visible: true
            });

            $.ajax({
                type: "POST",
                url: "pkg_publicar_cv_estr.enviar",
                data: { f_chk: "1", f_cod: "E5537212H", f_ctr: "U" },
                error: function (error) {
                    loadingWin.hide();
                    alert("error");
                },
                success: function (data) {

                    loadingWin.hide();
                    var vdata = data.substring(0, 11);
                    if (vdata == "DIVERGENCIA") {
                        var vdivergencia = $.trim(data.substr(11));
                        if (vdivergencia == "IRREGULAR") {
                            alert("O CPF está não está em situação regular junto à RFB");
                        } else {
                            var dadosDivergentes = camposDivergentes(vdivergencia);
                        }
                        if (dadosDivergentes.indexOf(";") > -1) {
                            msgDivergenteInicio = msgDivergenteInicioPlural;
                        } else {
                            msgDivergenteInicio = msgDivergenteInicioSingular;
                        }
                        alert("O seu Currículo Lattes não pode ser registrado por motivo de incompatibilidade entre os dados" +
                            " cadastrados no Sistema e os existentes na base de dados da Receita Federal (RFB).\n\n" +
                            "Para que seu Currículo seja aceito na Plataforma Lattes, será necessário que as seguintes\n" +
                            "informações estejam exatamente iguais às registradas no Cadastro de Pessoa Física da RFB:\n\n" +
                            "-Nome completo;\n" +
                            "-Nome da mãe;\n" +
                            "-Sexo;\n" +
                            "-Nacionalidade;\n" +
                            "-Data de nascimento.\n\n" +
                            "Além disso, seu CPF deve estar em situação regular junto à RFB." + "\n\n\n" + msgDivergenteInicio + dadosDivergentes);
                        registerLock = false;
                    } else if (vdata == "SUCESSENVIO") {
                        sucessoEnvio();
                        window.location.href = "https://www.cienciasemfronteiras.gov.br";
                    } else if (vdata == "POSSUISITAP") {
                        possuiAP();
                        registerLock = false;
                    } else if (vdata == "NDISPONIVEL") {
                        indisponivel();
                        registerLock = false;
                    } else if (vdata == "MTENTATIVAS") {
                        muitas_tentativas();
                        registerLock = false;
                    } else if (vdata == "MESTOURADAS") {
                        muitas_tentativas_10();
                        registerLock = false;
                    } else if (vdata == "CPFEXISTENT") {
                        cpf_existe();
                        registerLock = false;
                    } else {
                        alert(data);
                    }
                }
            });
        }





        $("input[name=farea]").removeAttr("validate");
        $("select[name=fidioma1]").removeAttr("validate");
        $("select[name=fentende1]").removeAttr("validate");
        $("select[name=fle1]").removeAttr("validate");
        $("select[name=ffala1]").removeAttr("validate");
        $("select[name=fescreve1]").removeAttr("validate");


        function validatePassaporte() {

            var errosPass = [];
            if ($(":input[name=fnopassaporte]").val() != "" && $(":input[name=fpaispassaporte]").val() != "" && $(":input[name=fdtapassaporte]").val() != "" && $(":input[name=fdtavalpassaporte]").val() != "") {

                var passaporteJaCadastrado = passaporteCadastrado($(":input[name=fnopassaporte]").val(), $(":input[name=fpaispassaporte]").val());
                if (passaporteJaCadastrado) errosPass.push("Número do Passaporte já cadastrado (Informações pessoais)");

                return {
                    hasErros: errosPass[0] != null,
                    msgErros: errosPass
                };

            } else {

                return {
                    hasErros: errosPass[0] != null,
                    msgErros: errosPass
                }
            }

        }

        function validateNames() {
            //var nmePaiLength = $("input[name=fnomepai]").val().length + $("input[name=fsobrenomepai]").val().length;
            var nmeMaeLength = $("input[name=fnomemae]").val().length + $("input[name=fsobrenomemae]").val().length;
            var nmeProprio = $("input[name=fnome]").val().length + $("input[name=fsobrenome]").val().length;
            var nmeSocial = $("input[name=fnomesocial]").val().length;
            var errosNme = [];
            if (nmeMaeLength + 1 > 60) {
                $("input[name=fnomemae] , input[name=fsobrenomemae]").addClass("inputError");
                errosNme.push("Campos Nome da Mãe e Sobrenome da Mãe não podem exceder 60 caracteres");
                $("input[name=fnomemae] , input[name=fsobrenomemae]").bind({
                    focus: function () {
                        $("input[name=fnomemae] , input[name=fsobrenomemae]").removeClass("inputError");
                    }
                });
            }

            if (nmeProprio + 1 > 60) {
                $("input[name=fnome] , input[name=fsobrenome]").addClass("inputError");
                errosNme.push("Campos Nome e Sobrenome não podem exceder 60 caracteres");
                $("input[name=fnome] , input[name=fsobrenome]").bind({
                    focus: function () {
                        $("input[name=fnome] , input[name=fsobrenome]").removeClass("inputError");
                    }
                });
            }

            if (nmeSocial > 60) {
                $("input[name=fnomesocial]").addClass("inputError");
                errosNme.push("Campo Nome social não podem exceder 60 caracteres");
                $("input[name=fnomesocial]").bind({
                    focus: function () {
                        $("input[name=fnomesocial]").removeClass("inputError");
                    }
                });
            }


            var nomeS = trim($("input[name=fnomesocial]").val().toUpperCase());
            var nomeC = trim($("input[name=fnome]").val().toUpperCase()) + " " + trim($("input[name=fsobrenome]").val().toUpperCase());


            if (nomeS == nomeC) {
                $("input[name=fnome],input[name=fsobrenome],input[name=fnomesocial]").addClass("inputError");
                errosNme.push("Nome social deve ser diferente do Nome civil(Informações pessoais)");
                $("input[name=fnome],input[name=fsobrenome],input[name=fnomesocial]").bind({
                    focus: function () {
                        $("input[name=fnome],input[name=fsobrenome],input[name=fnomesocial]").removeClass("inputError");
                    }
                });
            }



            return {
                hasErros: errosNme[0] != null,
                msgErros: errosNme
            };
        }

        function removeDuplicates(inputArray) {
            var outputArray = new Array();

            if (inputArray.length > 0) {
                jQuery.each(inputArray, function (index, value) {
                    if (jQuery.inArray(value, outputArray) == -1) {
                        outputArray.push(value);
                    }
                });
            }
            return outputArray;
        }



        function validarUFCidade() {

            var errosUF = [];
            var vret;

            if ($("#fpaisend").val() == "BRA") {
                $.ajax({
                    type: "POST",
                    url: "pkg_util.verifica_cidade_uf",
                    data: {
                        p_cidade: escape($("input[name=fcidadeend]").val()),
                        p_uf: $("input[name=festadoend]").val()
                    },
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (result.localizou == "S") {
                            vret = "S";
                            $("input[name=fcodmunicipio]").val(result.codMunicipio);
                            $("input[name=fcidadeend]").val(result.cidade);
                        } else {
                            vret = "N";
                        }
                    }
                });

                if (vret == "N") {
                    $("input[name=fcidadeend] , input[name=festadoend]").addClass("inputError");
                    errosUF.push("Cidade não localizada para o Estado informado (Endereço e contatos)");
                    $("input[name=fcidadeend] , input[name=festadoend]").bind({
                        focus: function () {
                            $("input[name=fcidadeend] , input[name=festadoend]").removeClass("inputError");
                        }
                    });
                }
                return {
                    hasErros: errosUF[0] != null,
                    msgErros: errosUF
                };
            } else {
                return {
                    hasErros: false,
                    msgErros: []
                };
            }
        }

        var ufErros = validarUFCidade();
        var passErros = validatePassaporte();
        var nmeErros = validateNames();
        if ($("input[name=com_bolsa]:checked").val() == "S") {

            registerConfig.f_nme_agencia = { required: true };
            $("input[name=f_nme_agencia]").attr("validate", "true");
            $("input[name=f_nme_agencia]")[0].setAttribute("required", "Campo 'Agência Financiadora' Obrigatório  não informado(Formação acadêmica)");
        }

        if ($.trim($(":input[name=fdtavalpassaporte]").val()) == "") {
            registerConfig.fdtavalpassaporte = { required: true };
        }
        if ($.trim($(":input[name=fdtapassaporte]").val()) == "") {
            registerConfig.fdtapassaporte = { required: true };
        }
        var erros = new Validator(registerConfig).validate();
        if (erros.length > 0 || nmeErros.hasErros || ufErros.hasErros || passErros.hasErros) {

            erros = removeDuplicates(erros);

            erros = erros.join("\n");


            nmeErros.msgErros = nmeErros.msgErros.join("\n");
            passErros.msgErros = passErros.msgErros.join("\n");
            ufErros.msgErros = ufErros.msgErros.join("\n");


            erros = erros + "\n" + nmeErros.msgErros + passErros.msgErros + "\n" + ufErros.msgErros + "\n";
            alert(erros);
            if ($("input[name=fdtarg]").val() == "")
                $("input[name=fdtarg]").val("ddmmaaaa");

            if ($("input[name=fdtavalpassaporte]").val() == "")
                $("input[name=fdtavalpassaporte]").val("ddmmaaaa");

            if ($("input[name=fdtapassaporte]").val() == "")
                $("input[name=fdtapassaporte]").val("ddmmaaaa");

        } else {

            if ("S" == "") {
                /*$.ajax({
                  type : "POST",
                  url : "PKG_PUBLICAR_CV_ESTR.enviar",
                  data : {f_cod: "E5537212H", f_ctr: "U" , f_chk : "1"},
                  dataType:"html",
                  success : function(msg) {
                    $("#submissao").html(msg);
                  }
                });*/
                submete();

            } else {
                sendCV();
            }
            if ($("input[name=fdtarg]").val() == "")
                $("input[name=fdtarg]").val("ddmmaaaa");

            if ($("input[name=fdtavalpassaporte]").val() == "")
                $("input[name=fdtavalpassaporte]").val("ddmmaaaa");

            if ($("input[name=fdtapassaporte]").val() == "")
                $("input[name=fdtapassaporte]").val("ddmmaaaa");

        }
    });

    /*Botão Anterior*/

    $("#anterior_2").click(function () {
        $("#passo_2, #passo_3, #passo_4, #passo_5").hide();
        $("#passo_1").show();
        $(".naviPasso2, .naviPasso3,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso1").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".info_pess").addClass("select_info_pess");
        sendCVPart();
    });

    $("#anterior_3").click(function () {
        $("#passo_1, #passo_3, #passo_4, #passo_5").hide();
        $("#passo_2").show();
        $(".naviPasso1, .naviPasso3,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso2").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".end_cont").addClass("select_end_cont");
        sendCVPart();
    });

    $("#anterior_4").click(function () {
        $("#passo_1, #passo_2, #passo_4, #passo_5").hide();
        $("#passo_3").show();
        $(".naviPasso1, .naviPasso2,.naviPasso4,.naviPasso5").removeClass("selected");
        $(".naviPasso3").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".form_acad").addClass("select_form_acad");
        sendCVPart();
    });

    $("#anterior_5").click(function () {
        $("#passo_1, #passo_2, #passo_3, #passo_5").hide();
        $("#passo_4").show();
        $(".naviPasso1, .naviPasso2,.naviPasso3,.naviPasso5").removeClass("selected");
        $(".naviPasso4").addClass("selected");
        $(".navi1,.navi2, .navi3, .navi4, .navi5 ").removeClass("select_info_pess select_end_cont select_form_acad  select_atua_pro  select_area_atua  select_atua_prof");
        $(".atua_prof").addClass("select_atua_prof");
        sendCVPart();
    });

});

$(document).ready(function () {
    $("#NomeSocial").hide();
    $("#NomeSocial").hide("slow").find("input").removeAttr("validate");
    $("input[name=fnomesocialrd]").change(function () {

        $this = $(this);
        if ($this.val() == "S") {
            $("#NomeSocial").show("slow").find("input").attr("validate", true);
            $("input[name=fnomesocial]").val("");
        } else {
            $("#NomeSocial").hide("slow").find("input").removeAttr("validate");
            $("input[name=fnomesocial]").val("");
        }
    });

    $("input[name=possuicpf]").change(function () {

        $this = $(this);
        if ($this.val() == "S") {
            $("#RadioNomeSocial").show("slow");
        } else {
            $("#NomeSocial").hide("slow").find("input").removeAttr("validate");
            $("input[name=fnomesocial]").val("");
            $("input[name=fnomesocialrd]:eq(0)").attr("checked", "true")
            $("#RadioNomeSocial").hide("slow");

        }
    });
});

function toggleIconProf() {
    //Esconde ou mostra o cadeado dos campos de endereço profissional de acordo com opção já preenchida
    if ($("input[name=ftipoend][value=R]").is(":checked")) {
        $(".icon-aviso-prof").show();
    }
    if ($("input[name=ftipoend][value=I]").is(":checked")) {
        $(".icon-aviso-prof").hide();
    }
    //Esconde ou mostra o cadeado dos campos de endereço profissional de acordo com o clique
    $("input[name=ftipoend][value=R]").click(function () { $(".icon-aviso-prof").show(); });
    $("input[name=ftipoend][value=I]").click(function () { $(".icon-aviso-prof").hide(); });
}

function toggleValidaInst(ob) {
    var obInst = $(":input[name=fcodinstender]");
    obInst.attr("validate", ob.checked);
    toggleIconProf();
}

function toggleNaoValidaInst(ob) {
    var obInst = $(":input[name=fcodinstender]");
    obInst.attr("validate", !ob.checked);
    apagaDadosInstEnder();
    toggleIconProf();
}

function apagaDadosInstEnder() {
    document.formReg.fcodinstender.value = "";
    document.formReg.finstender.value = "";
}

function validar_uf() {
    var pais = $("select[name=fpaisend]").val();
    var estado = $("input[name=festadoend]").val();
    if (pais != "BRA") {
        $("input[name=fruaend]").attr('readonly', false);
        $("input[name=fbairroend]").attr('readonly', false);
        $("input[name=fcidadeend]").attr('readonly', false);
        $("input[name=festadoend]").attr('readonly', false);
        $("input[name=fruaend]").val("");
        $("input[name=fbairroend]").val("");
        $("input[name=fcidadeend]").val("");
        $("input[name=festadoend]").val("");
    } else if (pais == "BRA") {
        $("input[name=fruaend]").val("");
        $("input[name=fbairroend]").val("");
        $("input[name=fcidadeend]").val("");
        $("input[name=festadoend]").val("");
        $("input[name=fruaend]").attr('readonly', true);
        $("input[name=fbairroend]").attr('readonly', true);
        $("input[name=fcidadeend]").attr('readonly', true);
        $("input[name=festadoend]").attr('readonly', true);
    }
    $("input[name=fzipend]").attr('readonly', false);
    $("input[name=fzipend]").val("");

}

function checkCntAdd() {
    if (!document.formReg.ftipoend[0].checked && !document.formReg.ftipoend[1].checked) {
        return false;
    } else {
        return true;
    }
}

function whatCntAdd() {
    if (document.formReg.ftipoend[0].checked) {
        return "Home";
    } else if (document.formReg.ftipoend[1].checked) {
        return "Inst";
    } else {
        return "";
    }
}

function recuperaInstMacroEstatico() {
    var valornominst = $(":input[name='fnomeinst']").val();
    if ($.trim(valornominst).length <= 2) {
        alert("Realize a busca com ao menos 3 caracteres.");
    } else {
        var data = {
            tipo: 'instituicao', url_action: 'SELE_INST', dado: valornominst
        }

        winSeleInst.request("proxy.php?param=" + encodeURIComponent(JSON.stringify(data)));
        mudarOnClickRecuperaInstMacroEstatico();
        mudarOnClickOutraInstEstatico();
    }
}

function mudarOnClickOutraInstEstatico() {
    waitForObject('form strong a', 'clique aqui').then(el => {
        el.get(0).setAttribute('onclick', 'outraInstEstatico()');
    }).catch(err => {
        console.error(err);
    });
}

function outraInstEstatico() {
    var data = {
        tipo: 'cadastro_instituicao', url_action: 'CADAST_INST'
    }

    winCadInst = $.win({
        url: "proxy.php?param=" + encodeURIComponent(JSON.stringify(data)),
        loadingMessage: "Carregando conteúdo ....",
        autoRemove: true,
        width: 550
    })

    winCadInst.show();
    mudarOnClickCheckEstatico();
}

function seleInstEnd() {

    if (!checkCntAdd()) {
        alert("Enter contact address");
    } else {
        if (whatCntAdd() != "Inst") {
            alert("Somente informe a Instituição se Endereço para Contato for Profissional");
        } else {
            var data = {
                tipo: 'endereco', url_action: 'SELE_INST'
            }

            winSeleInst = $.win({
                autoRemove: true,
                url: "proxy.php?param=" + encodeURIComponent(JSON.stringify(data)),
                loadingMessage: "Carregando conteúdo ....",
                width: 550
            });
            winSeleInst.show();

            mudarOnClickRecuperaInstMacroEstatico();
        }
    }
}

function mudarOnClickRecuperaInstMacroEstatico() {
    waitForObject('#forminst').then(el => {
        el.find('input[type=button]').get(0).setAttribute('onclick', 'recuperaInstMacroEstatico()');
    }).catch(err => {
        console.error(err);
    });
}

function getZipData(fcep) {
    if ($(":input[name='fpaisend']").val() == "BRA") {

        // ini
        $.ajax({
            type: "POST",
            url: "proxy.php",
            data: {
                param: { tipo: 'cep', dado: fcep, url_action: 'recupera_dados_cep' }
            },
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.status == "0") {
                    $("input[name=fruaend]").val(result.endereco);
                    $("input[name=fbairroend]").val(result.bairro);
                    $("input[name=fcidadeend]").val(result.cidade);
                    $("input[name=festadoend]").val(result.uf);
                    $("input[name=fcodmunicipio]").val(result.codMunicipio);
                    $("input[name=fruaend]").attr('readonly', false);
                    $("input[name=fbairroend]").attr('readonly', false);
                    $("input[name=fcidadeend]").attr('readonly', false);
                    $("input[name=festadoend]").attr('readonly', false);
                } else {
                    $("input[name=fruaend]").val("");
                    $("input[name=fbairroend]").val("");
                    $("input[name=fcidadeend]").val("");
                    $("input[name=festadoend]").val("");
                    alert("CEP não localizado.");

                }

            }
        });

        // fim




    }
}

function formataCep(obj) {
    var pattern = /\D/g;
    var str = obj.value;
    var validos = "0123456789";
    var acum = "";
    var carac;
    if ($(":input[name='fpaisend']").val() == "BRA") {
        for (var j = 0; j <= str.length; j++) {
            if (j < 9) {
                carac = str.substr(j, 1);
                if (validos.indexOf(carac) > -1 || (carac == "-" && j == 5)) {
                    acum += carac;
                }
            }
        }
        if (acum.length == 5) {
            acum += "-";
        }
        obj.value = acum;
    } else {
        for (var j = 0; j <= str.length; j++) {
            carac = str.substr(j, 1);
            if (validos.indexOf(carac) > -1 || carac == "-") {
                acum += carac;
            }
        }
        obj.value = acum;
    }

}


function seleInstForm() {
    var dc = document.regForm;

    if ($("select[name=fnivel]").val() == "") {
        alert("Campo Nível Obrigatório não informado.");
    } else {
        var data = {
            tipo: 'form', url_action: 'SELE_INST', nivel: $(":input[name=fnivel]").val()
        };

        winSeleInst = $.win({
            url: "proxy.php?param=" + encodeURIComponent(JSON.stringify(data)),
            autoRemove: true,
            loadingMessage: "Carregando conteúdo ....",
            width: 550
        });
        winSeleInst.show();
    }
}

function seleInstFormAndamento() {
    var dc = document.regForm;

    if ($("select[name=fnivel_andamento]").val() == "") {
        alert("Campo Nível Obrigatório não informado");
    } else {
        var data = {
            tipo: 'andamento', url_action: 'SELE_INST', nivel: $(":input[name=fnivel_andamento]").val()
        };

        winSeleInst = $.win({
            url: "proxy.php?param=" + encodeURIComponent(JSON.stringify(data)),
            autoRemove: true,
            loadingMessage: "Carregando conteúdo ....",
            width: 550
        });
        winSeleInst.show();
    }
}
function testa() {
    alert("Este campo nao deve ser preenchido manualmente.\nUtilize o ícone para selecionar a Agência.");
    apaga();
    return;
}

/*  function apaga(){
      if (dc.f_nme_agencia.value != "") {
          dc.f_nme_agencia.value = "";
          dc.f_agencia.value = "";
      }
      return;
  }*/
var winSelecionarAgenciaFinanciadora;
function selecionarAgenciaFinanciadora() {

    winSelecionarAgenciaFinanciadora = $.win({
        //  url: "pkg_cv_estr.prc_agencia?f_cod=E5537246Y&F_PGM=ANDAMENTO",
        url: "pkg_cv_estr.prc_agencia?f_cod=E5537246Y",
        loadingMessage: "Carregando conteúdo ....",
        autoRemove: true,
        width: 550
    });
    winSelecionarAgenciaFinanciadora.show();
}

function selecionarAgenciaFinanciadoraAndamento() {

    winSelecionarAgenciaFinanciadora = $.win({
        url: "pkg_cv_estr.prc_agencia?f_cod=E5537246Y&F_PGM=ANDAMENTO",
        //    url: "pkg_cv_estr.prc_agencia?f_cod=E5537246Y",
        loadingMessage: "Carregando conteúdo ....",
        autoRemove: true,
        width: 550
    });
    winSelecionarAgenciaFinanciadora.show();
}

function seleAreaForm() {
    nvl = $(":input[name='fnivel']").val();
    var vcodinstform = $(":input[name='fcodinstform']").val();
    winSeleArea = $.win({
        url: "pkg_cv_estr.SELE_AREA?F_ORIGEM=FORM&f_max=1&f_cod_rh=E5537246Y",
        autoRemove: true,
        loadingMessage: "Carregando conteúdo ....",
        width: 550
    });
    winSeleArea.show();
    return;
}

var winSelecaoCurso;
function curso() {
    var fnivel = $("select[name=fnivel] option:selected").val();
    var fcodinstform = $("input[name=fcodinstform]").val();
    winSelecaoCurso = $.win({
        url: "pkg_cv_estr.prc_curso_form?f_cod=E5537246Y&f_pgm=FORM&f_nivel=" + fnivel + "&f_inst=" + fcodinstform + "&f_ciencia=",
        loadingMessage: "Carregando ...",
        autoRemove: true,
        width: 550
    });
    winSelecaoCurso.show();
}

function cursoAndamento() {
    var fnivel = $("select[name=fnivel_andamento] option:selected").val();
    var fcodinstform = $("input[name=afcodinstform]").val();
    winSelecaoCurso = $.win({
        url: "pkg_cv_estr.prc_curso_form?f_cod=E5537246Y&f_pgm=ANDAMENTO&f_nivel=" + fnivel + "&f_inst=" + fcodinstform + "&f_ciencia=",
        loadingMessage: "Carregando ...",
        autoRemove: true,
        width: 550
    });
    winSelecaoCurso.show();
}

function cancelar() {
    return;
}


function seleciona(vlr, texto, xpais) {

    if ("fcodinstform" == "fcodinstender") {
        if ($(":input[name='fcodinstender']").val() != vlr) {
            if ("END" != "ANDAMENTO") {
                $("input[name=f_cod_curso]").val("");
                $("input[name=f_cod_curso_outro]").val("");
                $("input[name=fcurso]").val("");
            } else {

                $("input[name=af_cod_curso]").val("");
                $("input[name=af_cod_curso_outro]").val("");
                $("input[name=afcurso]").val("");
            }
        }
    }


    $(":input[name='finstender']").val(texto).trigger("focus");
    $(":input[name='fcodinstender']").val(vlr);

    winSeleInst.remove()
}

function foco() {

    document.instituicaoForm.fnomeinst.focus();
}
function seleInstAtiv() {
    winSeleInst = $.win({
        url: "pkg_cv_estr.SELE_INST?FTIPO=ATIV&FCOD=E5537246Y",
        autoRemove: true,
        loadingMessage: "Carregando conteúdo ....",
        width: 550
    })
    winSeleInst.show();
}

function dominio() {

    contractWin = $.win({
        visible: true,
        loadingMessage: "Carregando conteúdo ....",
        autoRemove: true,
        title: "Tipo do vínculo",
        url: "pkg_cv_estr.CONTRACT_TYPE",
        width: 200,
        showCloseBtn: false,
        buttons: [
            { label: "Cancelar", callback: contractWinCancel },
            { label: "Confirmar", callback: contractWinConfirm }
        ]
    });

}

function contractWinCancel() {
    contractWin.remove();
}

function contractWinConfirm() {

    var winContent = contractWin.getContent(),
        selectValue = winContent.find("#selectContract").val(),
        tipoContrato = $(":input[name='ftpocontrato']");

    if (selectValue.toLowerCase() == "other")
        tipoContrato.val(winContent.find("#inputContract").val()).trigger("focus");

    else
        tipoContrato.val(selectValue).trigger("focus");

    contractWinCancel();
}

function sele_eq(txt) {
    if (txt != "Other") {
        dc.f_enqua.value = txt;
        if (txt.toUpperCase() == "PROFESSOR TITULAR") {
            dc.f_enqua_en.value = "Full professor";
        }
    } else {
        dc.f_enqua.value = "";
        dc.f_enqua.focus();
    }
    return true;
}

function waitForObject(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        const checkExist = setInterval(() => {
            const el = document.querySelector(selector);

            if (el) {
                clearInterval(checkExist);
                resolve($(el));
            } else if (Date.now() - start > timeout) {
                clearInterval(checkExist);
                reject(new Error(`Timeout: ${selector} not found`));
            }
        }, 100);
    });
}


dc = document.GN_INST_OUTRA;

function trim(str) {
    i = 0;
    while (((str.substring(i, i + 1)) == " ") && (i < str.length))
        i++;
    aux = str.substring(i, str.length);
    i = aux.length;
    while (((aux.substring(i - 1, i)) == " ") && (i > 1))
        i--;
    aux = aux.substring(0, i);
    return aux;
}

function cancelar() {
    return;
}

function checkpais() {
    return;
}
var isValidCharacters;
function checkEstatico() {
    if (trim(document.GN_INST_OUTRA.f_nme_inst.value) == "") {
        alert("Informe o nome da instituição");
        document.GN_INST_OUTRA.f_nme_inst.focus();

    } else if (trim(document.GN_INST_OUTRA.f_sigla.value) == "") {
        alert("Informe a sigla da Instituição");
        document.GN_INST_OUTRA.f_sigla.focus();

    } else if (document.GN_INST_OUTRA.f_pais_inst.options[document.GN_INST_OUTRA.f_pais_inst.options.selectedIndex].value == "") {
        alert("Informe o país da instituição");
        document.GN_INST_OUTRA.f_pais_inst.focus();

    } else {
        var nome = $(":input[name='f_nme_inst']").val();
        var sigla = $(":input[name='f_sigla']").val();
        var pais = $(":input[name='f_pais_inst']").val();
        var data = {
            param: {
                tipo: 'finalizar_cadastro_instituicao',
                url_action: 'CADAST_INST',
                dado: {
                    f_nme_inst: nome,
                    f_sigla: sigla,
                    f_pais_inst: pais,
                    f_cod: "E5531553Z",
                    f_nivel: "",
                    f_pgm: "",
                    f_ctr: "I",
                    f_agencia: "N",
                    ftipo: "END",
                    // bt: "Confirmar",
                }
            }
        }
        //////// winCadInst.request("proxy.php?param=" + encodeURIComponent(JSON.stringify(data)));

        // var form = $("form#formCadInst"), data = form.serializeArray();
        // escapeSerializedJSON(data);
        // console.log(form);

        /* $.ajax({
           url : "pkg_cv_estr.validate_length_special_charac",
           dataType : "json",
           data : {
             val : $("input[name=f_nme_inst]").val(),
             length_val : 75
           },
           error : function(e) {
             alert(e + "erro");
           },
           success : function(result) {
             isValidCharacters = result;
           }
         });*/
        //    if(isValidCharacters.success)
        // winCadInst.request("https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr.CADAST_INST", data, true);
        winCadInst.request("proxy.php", data, true);
        //    else
        //    alert(isValidCharacters.message);
    }
}

function mudarOnClickCheckEstatico() {
    waitForObject('#formCadInst').then(el => {
        el.find('input[type=button]').get(0).setAttribute('onclick', 'checkEstatico()');
    }).catch(err => {
        console.error(err);
    });
}
