var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'RepsolPeruWellcome.aspx';

var Literales = new Array();


$(document).ready(function () {

    jQuery('#PageFooter').css('display', 'none');

    fnGetAllcboEstaciones(' ');

    SetLiterales();



    $("#" + panel + "btnActualizar").click(function (e) {
        ShowLoadingUI();
        fnActualizarEstacion();
        HideLoadingUI();
    });

});



function fnGetAllcboEstaciones() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarEstaciones',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlEstacion").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlEstacion").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


function GetParameter() {
    var dataToSend = {
        estacion: ''
    };
    dataToSend.estacion = $("#" + panel + "ddlEstacion").val();
    return dataToSend;
}

function fnActualizarEstacion()
{
    var param = GetParameter();

    if (param.estacion == "0") {
        
        alert(GetLiteralValue('LITMSJDEBESELECCIONAR'));
        return;
    }
    
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ActualizarEstacion',
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            
            alert(GetLiteralValue('LITMSJSEACTUALIZO'));
            window.top.location.reload();
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


function ShowLoadingUI() {
    $.blockUI({
        message: '<h3><img src="/lib/estilos/Repsol/images/reload.gif" /> <br /> <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 12px; color: #1390c6;"> Cargando...</span></h3>',
        showOverlay: true,
        css: {
            width: '100px',
            height: '80px',
            border: 'none',
            padding: '10px',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .9,
            top: '50%',
            left: '50%'
        },
        centerX: false,
        centerY: false
    });
}

function HideLoadingUI() {
    $.unblockUI();
}



function SetLiterales() {
    var Literal1 = { LiteralName: 'LITMSJDEBESELECCIONAR', LiteralValue: $("#HT_LITMSJDEBESELECCIONAR").val() }; Literales.push(Literal1);
    var Literal2 = { LiteralName: 'LITMSJSEACTUALIZO', LiteralValue: $("#HT_LITMSJSEACTUALIZO").val() }; Literales.push(Literal2);
}

function GetLiteralValue(Name) {
    var index = Literales.findIndex(literal => literal.LiteralName === Name);
    if (index === -1) {
        return '';
    } else {
        return Literales[index].LiteralValue;
    }
}