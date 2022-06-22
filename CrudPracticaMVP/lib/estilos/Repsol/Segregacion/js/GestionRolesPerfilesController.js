//#region Variables_Globales
var panel = "ctl00_wfInterface_";
var url_pagina = 'GestionRolesPerfiles.aspx';
var listaDivToggle = ["divDatosGeneralesEditar", "divDetalleRolEditar", "divDetallPerfilEditar", "divDatosGeneralesBrowse", "divDetalleRolBrowse", "divDetallePerfilBrowse"];
var listaModulos = new Array();
var listaMenu = new Array();
var listaUsuarioAssignPerfilBrowse = new Array();

var listaUsuarioAssignPerfilEdit = new Array();
var listaUsuarioNotAssignPerfilEdit = new Array();

var listaConfigUserPerfilEdit = new Array();
var listaUserFechaVigencia = new Array();
var tipoBusqueda = "";
var lstArrayLanguage = "";
//#endregion

$(document).ready(function () {
    HideFiltersMaster();
    $("#lnkFilterSearchObjetos").on("click", function () {
        SetDatableObjetosServerSide();
    });
});

$(document).bind("ajaxStart", function () {
    ShowLoadingUI();
}).bind("ajaxStop", function () {
    HideLoadingUI();
}).bind("ajaxError", function () {
    HideLoadingUI();
});

function InitEventControl() {
    $("#" + panel + "txtPersonal").on("change", function () {
        OnChange_txtResponsableFecVigencia();
    });
    $("#" + panel + "txtUsuarioAsignadoFecVigencia").on("change", function () {
        OnChange_txtUsuarioAsignadoFecVigencia();
    });
    $("#lnkSearchResponsable").on("click", function () {
        OnClick_lnkSearchResponsable();
    });
    $("#lnkSearchAsignado").on("click", function () {
        OnClick_lnkSearchAsignado();
    });
    $("#" + panel +"lkbSearchObjetos").on("click", function () {
        ShowDialogSearchObject();
    });
    
}