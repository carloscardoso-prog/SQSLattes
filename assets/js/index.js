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
    // if((input.files[0].size / 1024) > 70){
    //     alert("Arquivo maior que o permitido. É possivel carregar apenas arquivos com até 70k");
    //     return false;
    // }

    var form = $("<form enctype='multipart/form-data' method='post'></form>").attr("action", "/LATTES/assets/files/sem_foto_cv.jpg").hide(),
        cod = $("<input type='hidden'></input>").attr("name", "f_cod").val("E5537557A"),
        ctr = $("<input type='hidden'></input>").attr("name", "f_ctr").val("I"),
        fotoCV = $("#fotoCV"),
        owner = fotoCV.parent();

    form.append(cod).append(ctr).append(fotoCV).appendTo("body");
    try {
        form.ajaxSubmit({
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.success) {
                    $(":input[name='fenvioufoto']").val(true);
                    var tms_aux = new Date().getTime();
                    $("#imgCV").attr("src", 'pkg_foto_cv_estr.show_foto?f_cod=E5537557A&ts=' + tms_aux);
                }
                else
                    alert(data.message);
            },
            error: function () {
                fotoCV.appendTo(owner);
            }
        });
    } catch (e) {
        alert(e);
        $("#imgCV").attr("src", 'pkg_foto_cv_estr.show_foto?f_cod=E5537557A&ts=' + tms_aux);
    }
    $(".input-file").append("<input id='fotoCV' type='file' onchange='fileChangeHandler()' name='file' title='Use a imagem do seu passaport ou RG' alt='Use a imagem do seu passaport ou RG'/>");
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

