var panel = "ctl00_wfInterface_";
var url_pagina = 'GestionAreaCargoProceso.aspx';
var modoPantalla = "";
var lstArrayLanguage = "";
var listaDivToggle = ["divDatosGeneralesBrowse", "divDetalleCargosBrowse"];

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];
var prm = Sys.WebForms.PageRequestManager.getInstance();
prm.add_endRequest(function () {
    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {
            debugger;
            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
        }
    });
    InitAnimatedCollapse();
});

$(document).ready(function () {
    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {
            debugger;
            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
        }
    });
    InitAnimatedCollapse();
});

function InitEventControl() {
    HideFiltersMaster();
    InitModoPantalla();
    InicializarLanguageJson();

    $("#" + panel + "txtResponsable").on("change", function () {
        OnChange_txtResponsable();
    });

    $("#" + panel + "ddlTipo").on("change", function () {
        OnChange_ddlTipo();
    });

    $("#lnkVerDetalleCargos").on("click", function () {
        OnClick_VerDetalleCargos();
    });
}

$(document).bind("ajaxStart", function () {
    ShowLoadingUI();
}).bind("ajaxStop", function () {
    HideLoadingUI();
}).bind("ajaxError", function () {
    HideLoadingUI();
});

function InitAnimatedCollapse() {
    for (var i = 0; i < listaDivToggle.length; i++) {
        animatedcollapse.addDiv(listaDivToggle[i], 'fade=1');
    }
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}