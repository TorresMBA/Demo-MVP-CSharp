//#region Variables_Globales
var panel = "ctl00_wfInterface_";
var url_pagina = 'GestionRolesPerfiles.aspx';
var listaDivToggle = ["divDatosGeneralesEditar", "divDetalleRolEditar", "divDetallPerfilEditar"];
var listaModulos = new Array();
var listaMenu = new Array();
//#endregion

$(document).ready(function () {
    //var pageFooter = document.getElementById('PageFooter');
    //if (pageFooter) {
    //    pageFooter.style.display = 'none';
    //};
    //#region Metodos_Globales
    //InitAnimatedCollapse();
    //#endregion

});


function ValidarTexto(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 37, 39, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


function EnterPressTextSearchModulo(e) {
    if (e.keyCode == 13) {
        return false;
    }
}

