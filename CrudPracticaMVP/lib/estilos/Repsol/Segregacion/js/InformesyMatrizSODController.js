var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'InformesyMatrizSOD.aspx';
var listaDivToggle = ["divFiltros", "divResultados", "divInformacion","divConfigFunciones"];
var lstArraySF = [];


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btnCreate");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var prm = Sys.WebForms.PageRequestManager.getInstance();
prm.add_endRequest(function () {
    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {
            debugger;
            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
           // $("#btnBuscar").click();

        }

    });
    jQuery('#PageFooter').css('display', 'none');
    InitAnimatedCollapse();
});

$(document).bind("ajaxStart", function () {
    ShowLoadingUI();
}).bind("ajaxStop", function () {
    HideLoadingUI();
}).bind("ajaxError", function () {
    HideLoadingUI();
});

$(document).ready(function () {
    //$("#btnAgregarRegla").on("click", function () {
    //    document.getElementById("modalFrame").insertAdjacentHTML('beforeend', '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=0&mode=add" width="100%" height="95%" frameBorder="0"></iframe>');
    //    $("#myModal").addClass("open");
    //});
    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {
            debugger;
            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
           // $("#btnBuscar").click();

        }

    });

    jQuery('#PageFooter').css('display', 'none');
    
    //fnGetAllcboTipoInforme(' ');
    InitAnimatedCollapse();

    $("#" + panel + "btnExcelDownload").click(function (e) {
        ShowLoadingUI();
        setTimeout(function () {
            HideLoadingUI();
        }, 3000);
        //DownloadExcel();
        //e.preventDefault();
    });

    //$("#" + panel + "btnExcelDownload").click(function (e) {
    //    DownloadReport();
    //    //e.preventDefault();
    //});
});

function CerrarVentana() {
    debugger;
    $("#myModal").removeClass("open");
};


function fnGetAllcboTipoInforme() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarTipoInforme',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlTipoInforme").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlTipoInforme").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function DownloadReport() {
    var idTipoInforme = $("#" + panel + "ddlTipoInforme").val();
    $.ajax({
        type: "GET",
        url: URL_PAGINA + '/SetFiltroInformesyMatrizSod?idTipoInforme="' + idTipoInforme + '"',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "btnExcel").click();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function InitAnimatedCollapse() {
    for (var i = 0; i < listaDivToggle.length; i++) {
        animatedcollapse.addDiv(listaDivToggle[i], 'fade=1');
    }
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}

function DisabledControles() {
    $("#" + panel + "btnExcel").prop('disabled', true);
    $("#" + panel + "btnExcelDownload").addClass('btn-disabled');
    $("#" + panel + "btnExcelDownload").removeClass('btn-primary');
    fnShowHideIdByFlag("IdCargador", true);
}

function EnabledControles() {
    console.log("OK");
    $("#" + panel + "btnExcel").prop('disabled', false);
    $("#" + panel + "btnExcelDownload").removeClass('btn-disabled');
    $("#" + panel + "btnExcelDownload").addClass('btn-primary');
    fnShowHideIdByFlag("IdCargador", false);
}

function fnShowHideIdByFlag(idElement, flagValue, typeDisplay = "flex") {
    var objElement = document.getElementById(idElement);
    if (flagValue) {
        objElement.style.display = typeDisplay;
    } else {
        objElement.style.display = "none";
    }
}

function ShowLoadingUI() {
    $.blockUI({
        message: '<h3><img src="/lib/estilos/Repsol/images/reload.gif" style="height: 24px;" /> <br /> <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 10px; color: #1390c6;"> Espere por favor...</span></h3>',
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
    return true;
}

function HideLoadingUI() {
    $.unblockUI();
}

function DownloadExcel() {
    var pTipoInforme = $("#" + panel + "ddlTipoInforme").val();
    if (pTipoInforme != "" && pTipoInforme != null && pTipoInforme != '00') {
        jQuery.ajax({
            type: 'POST',
            url: URL_PAGINA + '/DownloadExcelAjax',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify({ tipoInforme: pTipoInforme }),
            success: function (response) {
                if (response && response.d != null && response.d.Data != null && response.d.FileName != null) {
                    //Convert Base64 string to Byte Array.
                    var bytes = Base64ToBytes(response.d.Data);

                    //Convert Byte Array to BLOB.
                    var blob = new Blob([bytes], { type: "application/excel" });

                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                        window.navigator.msSaveBlob(blob, response.d.FileName);
                    } else {
                        var url = window.URL || window.webkitURL;
                        var link = url.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.href = link;
                        a.download = response.d.FileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    //DeleteFileExcel(response.d.FileName);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        alert("Seleccione el tipo de reporte a descargar.");
    }
}

function DeleteFileExcel(pFileNameMensaje) {
    jQuery.ajax({
        type: 'POST',
        url: URL_PAGINA + '/DeleteFileExcel',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ fileNameMensaje: pFileNameMensaje }),
        success: function (response) {
            //console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
}