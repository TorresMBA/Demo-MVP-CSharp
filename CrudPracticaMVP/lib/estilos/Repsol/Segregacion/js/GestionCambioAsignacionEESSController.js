var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'GestionCambioAsignacionEESS.aspx';
var listaDivToggle = ["divFiltros", "divResultados"];
var lstArraySF = [];
var Literales = new Array();

var lstArrayLanguage = "";
var listaUsuarioAssignPerfilEdit = new Array();
var listaUsuarioNotAssignPerfilEdit = new Array();



$(document).ready(function () {

    jQuery('#PageFooter').css('display', 'none');
    fnGetAllcboEstados(' ');
    fnGetAllcboTiendas(' ');
    fnGetAllcboUsuarios(' ');
    //fnGetAllcboUsuarios(' ');
    //fnGetAllcboMitigable(' ');
    InitAnimatedCollapse();
    InicializarLanguageJson();
    SetLiterales();
    /*    CerrarVentana();*/

    $("#" + panel + "btnConsultar").click(function (e) {
        fnCargarGrillaSolicitudesServer();
        //e.preventDefault();
    });

    $("#" + panel + "btnLimpiar").click(function (e) {
        fnResetarFiltro();
        //e.preventDefault();
    });

    $("#btnEditar").on("click", function (e) {
        var data = $('#dtResultados').DataTable().rows({ selected: true }).data();
        debugger;
        if (data.length == 0) {
            alert(GetLiteralValue('LITALERTDEBESELECCIONARUSUARIO'));
            return;
        };
        fnLoadListStoreAssignNotAssign(data[0].Login);
        fnAbrirDialogoCamnioESS(data);
    });

    $("#" + panel + "ddlEstacion").change(function () {
        fnGetAllcboUsuarios();
    }); 

});


function InitAnimatedCollapse() {
    for (var i = 0; i < listaDivToggle.length; i++) {
        animatedcollapse.addDiv(listaDivToggle[i], 'fade=1');
    }
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}

function InicializarLanguageJson() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {

        lstArrayLanguage = data;
        //SetDatableAprobaciones([]);
        //fnInicializarDatatables();
    });
}


function fnGetAllcboEstados() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarEstados',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlEstado").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlEstado").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function fnGetAllcboTiendas() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarTiendas',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlEstacion").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlEstacion").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function fnGetAllcboUsuarios() {
    var params = new Object();
    params.idEstacion = $("#" + panel + "ddlEstacion").val();;
    params = JSON.stringify(params);
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarUsuarios',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlUsuario").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlUsuario").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}



function fnCargarGrillaSolicitudesServer() {
    //addLoading_table();
    //LimpiarDataCombos();
    SetDatableAprobacionesServer();
}


function SetDatableAprobacionesServer() {
    var param = new Object();
    param.estacion = $("#" + panel + "ddlEstacion").val();
    param.usuario = $("#" + panel + "ddlUsuario").val();
    param.estado = $("#" + panel + "ddlEstado").val();
    $('#dtResultados').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: URL_PAGINA + '/GetAllUsuarios',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                var req = {
                    draw: 0,
                    start: 0,
                    length: 0,
                    search: '',
                    estacion: '',
                    usuario: '',
                    estado: ''
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = 10; //d.length;
                req.search = d.search['value'];
                req.estacion = param.estacion;
                req.usuario = param.usuario;
                req.estado = param.estado
                return req;
            },
            dataSrc: function (json) {
                json.draw = json.d.draw;
                json.recordsTotal = json.d.recordsTotal;
                json.recordsFiltered = json.d.recordsFiltered;
                json.data = json.d.data;
                lstArraySF = json.data;
                lstArrayID = [];
                closeLoading_table();
                return json.data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                closeLoading_table();
            }
        },
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        destroy: true, //MAA >> problema de child al doble cargar era que se agrego render=true
        /*fixedHeader: {
            header: true,
            footer: true
        },*/
        //data: dataJson,
        autoWidth: false,
        fixedColumns: true,
        scrollX: false,
        scrollCollapse: true,
        columns: [
            {
                data: null,
                orderable: false,
                title: '',
                width:'50px',
                render: function () {
                    return '';
                },
                class: 'select-checkbox width-select datoscheckboxsf'
            },
            { data: "Login", title: GetLiteralValue('LITHEADCODIGO'), width: '50px' },
            { data: "Nombre", title: GetLiteralValue('LITHEADUSUARIO'), orderable: false, width: '200px' },
            { data: "TipoPersonal", title: GetLiteralValue('LITHEADTIPOPERSONAL'), orderable: false, width: '150px' },
            { data: "Estado", title: GetLiteralValue('LITHEADESTADO'), orderable: false, width: '150px' },
            { data: "EESSSActual", title: GetLiteralValue('LITHEADEESSACTUAL'), orderable: false, width: '250px' },
            { data: "EESSAsignada", title: GetLiteralValue('LITHEADEESSASIGNADA'), orderable: false, width: '250px' },
            { data: "FechaRegistro", title: GetLiteralValue('LITHEADFECHAREGISTRO'), orderable: false, width: '100px' },
            { data: "UsuarioRegistro", title: GetLiteralValue('LITHEADUSUARIOREGISTRO'), orderable: false, width: '50px' },
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '100',
                defaultContent: ''
            },
        ],
        columnDefs: [
            {
                "targets": [9],
                "render": function (data, type, row, meta) {

                    //var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdSolicitud + '</span>';
                    var HTML_p = '<tr><td><span><a id="MyLink" href="javascript:fnGetStoreUserByLogin(\'' + row.Login + '\')"><input type="button" style="width: 110px" id="btnHistorial" class="btn btn-primary mtl10 btnAprobar" value="Ver Historial" /></a></span></td></tr>';
                    return HTML_p;
                }
            },
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    closerLoading();
}


function fnGetStoreUserByLogin(user) {
    var sendParameter = { login: user };
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/GetHistorialStoreUserByDni',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                abrirModalUsuarios(user, response.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


function abrirModalUsuarios(user, tiendas) {
    var dataset = tiendas;
    //for (var i = 0; i < array.length; i++) {
    //    dataset[i] = array[i].split("|");
    //}
    console.log(dataset[0]);
    $("#modalEstaciones").dialog({
        autoOpen: false,
        width: 1200,
        height: 550,
        modal: true,
        //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
        title: GetLiteralValue('LITTITHISTORIALASIGNACIONES'),
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
            }
        }

    });
    $("#modalEstaciones").dialog("open");
    //var dataset = [];
    var table = $("#dtHistorialEstaciones").DataTable({
        "data": dataset,
        "searching": false,
        "paging": true,
        "destroy": true,
        "info": false,
        "columns": [
            { data: "Codigo", title: 'Codigo', width: '50px' },
            { data: "Estacion", title: 'Estación', width: '50px' },
            { data: "Estado", title: 'Estado', width: '50px' },
            { data: "Usuario", title: 'Usuario', width: '150px' },
            { data: "FechaDesde", title: 'FechaDesde', width: '50px' },
            { data: "FechaHasta", title: 'FechaHasta', width: '50px' }
        ],
        language: lstArrayLanguage
    });
}



function closerLoading() {
    $('.modal-backdrop').parent().remove();
}

function closeLoading_table() {
    $("#Loading_table").html("");
}




function fnAbrirDialogoCamnioESS(data) {
    $("#modalCambioEESS").dialog({
        autoOpen: false,
        width: 800,
        height: 600,
        modal: true,
        title: GetLiteralValue('LITTITCAMBIOEESS') + data[0].Login + ' - ' + data[0].Nombre,
        buttons: {
            "Guardar": function () {
                SetUsersAssignByPerfilAfter();
                AsignarDesasignarTiendas(data[0].Login);
            },
            "Cancelar": function () {
                $("#" + panel + "txtObservacionAnulacion").val('');
                closeLoading_table();
                $(this).dialog("close");
            }
        }

    });
    $("#modalCambioEESS").dialog("open");
}

function verVentana(htmldata) {
    $("#respGenDoc").dialog({
        autoOpen: false,
        dialogClass: 'hide-close',
        width: 600,
        height: 300,
        modal: true,
        buttons: {
            Aceptar: function () {
                $(this).dialog("close");
                //$(this).dialog("destroy").remove();
                //__doPostBack('btnConsultar', '');
                if ($("#dialog-form_detalle_sol").dialog('isOpen') === true) {

                    jQuery("#dialog-form_detalle_sol").dialog("close");
                }
                //fnCargarGrillaSolicitudesServer();
            }
        },
    });

    $("#respGenDoc").dialog("open");
    var divdetalle = $('#detalle');
    divdetalle.html(htmldata);

}


function fnGetStoreAssignUser(user) {

    var sendParameter = { User: user };
    ShowLoadingUI();
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/GetStoreAssignUser',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            if (response.d != null) {
                fnSaveUsuariosAssignPerfilEdit(user, response.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
    HideLoadingUI();
}



function fnGetStoreNotAssignUser(user) {

        var sendParameter = { User: user };
        $.ajax({
        type: "POST",
        url: URL_PAGINA + '/GetStoreNotAssignUser',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
            success: function (response) {
                debugger;
            if (response.d != null) {
                fnSaveUsuariosNotAssignPerfilEdit(user, response.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


/**
 * Inicializamos la carga de las estaciones asignadas y no asignadas
 * */
function fnLoadListStoreAssignNotAssign(user) {
    debugger;
    listaUsuarioAssignPerfilEdit = new Array();
    listaUsuarioNotAssignPerfilEdit = new Array();



            fnGetStoreAssignUser(user);
            fnGetStoreNotAssignUser(user);

 
            fnSetSelectUsuarioAssignPerfilEdit(user);
            fnSetSelectUsuarioNotAssignPerfilEdit(user);

    
}



/**
 * Guardamos la informacion de los usuarios asignados en un arreglo
 * @param {any} perfilId_param
 * @param {any} userAssignList
 */
function fnSaveUsuariosAssignPerfilEdit(user, userAssignList) {
    debugger;
    var usuarioAssignPerfilEdit = { user: "", tiendas: new Array() };

    if (userAssignList.length > 0) {
        usuarioAssignPerfilEdit.user = user;
        usuarioAssignPerfilEdit.tiendas = userAssignList;
        listaUsuarioAssignPerfilEdit.push(usuarioAssignPerfilEdit);
    } else {
        usuarioAssignPerfilEdit.user = user;
        usuarioAssignPerfilEdit.tiendas = new Array();
        listaUsuarioAssignPerfilEdit.push(usuarioAssignPerfilEdit);
    }


    SetUsersAssignByPerfilBefore();
}


/**
 * Guardamos la informacion de los usuarios no asignados en un arreglo
 * @param {any} perfilId_param
 * @param {any} userNotAssignList
 */
function fnSaveUsuariosNotAssignPerfilEdit(user, userNotAssignList) {

    var usuarioNotAssignPerfilEdit = { user: "", usuarios: new Array() };

    if (userNotAssignList.length > 0) {
        usuarioNotAssignPerfilEdit.user = user;
        usuarioNotAssignPerfilEdit.tiendas = userNotAssignList;
        listaUsuarioNotAssignPerfilEdit.push(usuarioNotAssignPerfilEdit);
    } else {
        usuarioNotAssignPerfilEdit.user = user;
        usuarioNotAssignPerfilEdit.tiendas = new Array();
        listaUsuarioNotAssignPerfilEdit.push(usuarioNotAssignPerfilEdit);
    }
}



/**
 * Seteamos el listado de usuarios asignados en el listbox segun el perfil
 * @param {any} perfilId_param
 */
function fnSetSelectUsuarioAssignPerfilEdit(user) {
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
    if (userAssignPerfil.tiendas.length > 0) {
        $("#lbSearchUsuarioAssignPerfilEdit").html("");
        $.each(userAssignPerfil.tiendas, function () {
            $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
        });
    }
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(user)
}



/**
 * Seteamos el listado de usuarios no asignados en el listbox segun el perfil
 * @param {any} perfilId_param
 */
function fnSetSelectUsuarioNotAssignPerfilEdit(user) {
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
    if (userNotAssignPerfil.tiendas.length > 0) {
        $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
        $.each(userNotAssignPerfil.tiendas, function () {
            $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
        });
    }
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(user)
}


function GetNumberUserAssign_NotAssign(user) {
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
    var countNotAssignPerfil = userNotAssignPerfil.tiendas.length;
    $("#lblSearchUsuarioNotAssignPerfilEdit").text(countNotAssignPerfil);

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
    var countAssignPerfil = userAssignPerfil.tiendas.length;
    $("#lblSearchUsuarioAssignPerfilEdit").text(countAssignPerfil);

}





/**
 * Buscamos un usuario no asignado segun el perfil
 * @param {any} perfilId_param
 */
function SearchUsuarioNotAssignPerfilEdit() {
    var textFilterUserNotAssign = $("#txtSearchUsuarioNotAssignPerfilEdit").val();
    if (textFilterUserNotAssign != "") {
        textFilterUserNotAssign = textFilterUserNotAssign.toLowerCase();
    }

    var userNotAssignPerfil;
    var user = listaUsuarioNotAssignPerfilEdit[0].user;
    if (listaUsuarioNotAssignPerfilEdit.length > 0) {
        userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
        if (userNotAssignPerfil == null || userNotAssignPerfil == undefined) {
            fnGetUsuariosNotAssignPerfilEdit(user);
            userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userAssign.user == user);
            //Filtramos la busqueda
            var userNotAssignList = userNotAssignPerfil.tiendas.filter(userNot => (userNot.store.toLowerCase().includes(textFilterUserNotAssign) || userNot.description.toLowerCase().includes(textFilterUserNotAssign)));
            ///Pintamos el listbox
            if (userNotAssignList.length > 0) {
                $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
                $.each(userNotAssignList, function () {
                    $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
                });
            }
        } else {
            //Filtramos la busqueda
            var userNotAssignList = userNotAssignPerfil.tiendas.filter(userNot => (userNot.store.toLowerCase().includes(textFilterUserNotAssign) || userNot.description.toLowerCase().includes(textFilterUserNotAssign)));
            ///Pintamos el listbox
            if (userNotAssignList.length > 0) {
                $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
                $.each(userNotAssignList, function () {
                    $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
                });
            }
        }
    } else {
        fnGetUsuariosNotAssignPerfilEdit(user);
        userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
        //Filtramos la busqueda
        var userNotAssignList = userNotAssignPerfil.tiendas.filter(userNot => (userNot.store.toLowerCase().includes(textFilterUserNotAssign) || userNot.description.toLowerCase().includes(textFilterUserNotAssign)));
        ///Pintamos el listbox
        if (userNotAssignList.length > 0) {
            $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
            $.each(userNotAssignList, function () {
                $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
            });
        }
    }
}


/**
 * Buscamos un usuario asignado segun el perfil
 * @param {any} perfilId_param
 */
function SearchUsuarioAssignPerfilEdit(user) {
    var textFilterUserAssign = $("#txtSearchUsuarioAssignPerfilEdit").val();
    if (textFilterUserAssign != "") {
        textFilterUserAssign = textFilterUserAssign.toLowerCase();
    }

    var userAssignPerfil;
    if (listaUsuarioAssignPerfilEdit.length > 0) {
        userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
        if (userAssignPerfil == null || userAssignPerfil == undefined) {
            fnGetUsuariosAssignPerfilEdit(user);
            userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
            //Filtramos la busqueda
            var userAssignList = userAssignPerfil.tiendas.filter(user => (user.store.toLowerCase().includes(textFilterUserAssign) || user.description.toLowerCase().includes(textFilterUserAssign)));
            ///Pintamos el listbox
            if (userAssignList.length > 0) {
                $("#lbSearchUsuarioAssignPerfilEdit").html("");
                $.each(userAssignList, function () {
                    $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
                });
            }
        } else {
            //Filtramos la busqueda
            var userAssignList = userAssignPerfil.tiendas.filter(user => (user.store.toLowerCase().includes(textFilterUserAssign) || user.description.toLowerCase().includes(textFilterUserAssign)));
            ///Pintamos el listbox
            if (userAssignList.length > 0) {
                $("#lbSearchUsuarioAssignPerfilEdit").html("");
                $.each(userAssignList, function () {
                    $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
                });
            }
        }
    } else {
        fnGetUsuariosAssignPerfilEdit(user);
        userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
        //Filtramos la busqueda
        var userAssignList = userAssignPerfil.tiendas.filter(user => (user.store.toLowerCase().includes(textFilterUserAssign) || user.description.toLowerCase().includes(textFilterUserAssign)));
        ///Pintamos el listbox
        if (userAssignList.length > 0) {
            $("#lbSearchUsuarioAssignPerfilEdit").html("");
            $.each(userAssignList, function () {
                $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
            });
        }
    }
}



/**
 * Seleccionamos un usuario no asignado 
 * @param {any} perfilId_param
 */
function GetItemUsuarioNotAssignPerfilEdit() {
    debugger;
    var selectUserNotAssignValue = $('#lbSearchUsuarioNotAssignPerfilEdit' + ' option:selected').val();
    var user = listaUsuarioNotAssignPerfilEdit[0].user;
    //Cambiamos de no asignados > asignados
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
    var indexAddNotAssign = userNotAssignPerfil.tiendas.findIndex(userAddNotAssign => (userAddNotAssign.store == selectUserNotAssignValue));
    var userAddNotAssign = userNotAssignPerfil.tiendas[indexAddNotAssign];

    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.user == user) {
            userAssignPerfil.tiendas.push(userAddNotAssign);
        }
        return userAssignPerfil;
    });

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
    $("#lbSearchUsuarioAssignPerfilEdit").html("");
    $.each(userAssignPerfil.tiendas, function () {
        $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
    });

    //Retiramos el elemento de no asignados
    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.user == user) {
            userNotAssignPerfil.tiendas.splice(indexAddNotAssign, 1);
        }
        return userNotAssignPerfil;
    });

    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
    $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
    $.each(userNotAssignPerfil.tiendas, function () {
        $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
    });
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(user);
    //SetUsersAssignByPerfil();
}



/**
 * Seleccionamos un usuario asignado segun el perfil
 * @param {any} perfilId_param
 */
function GetItemUsuarioAssignPerfilEdit() {
    var selectUserAssignValue = $('#lbSearchUsuarioAssignPerfilEdit' + ' option:selected').val();
    var user = listaUsuarioAssignPerfilEdit[0].user;
    debugger;
    //Cambiamos de asignados > no asignados
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
    var indexAddAssign = userAssignPerfil.tiendas.findIndex(userAddAssign => (userAddAssign.store == selectUserAssignValue));
    var userAddAssign = userAssignPerfil.tiendas[indexAddAssign];

    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.user == user) {
            userNotAssignPerfil.tiendas.push(userAddAssign);
        }
        return userNotAssignPerfil;
    });

    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.user == user);
    $("#lbSearchUsuarioNotAssignPerfilEdit").html("");
    $.each(userNotAssignPerfil.tiendas, function () {
        $("#lbSearchUsuarioNotAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
    });

    //Retiramos el elemento asignado
    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.user == user) {
            userAssignPerfil.tiendas.splice(indexAddAssign, 1);
        }
        return userAssignPerfil;
    });

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.user == user);
    $("#lbSearchUsuarioAssignPerfilEdit").html("");
    $.each(userAssignPerfil.tiendas, function () {
        $("#lbSearchUsuarioAssignPerfilEdit").append($("<option></option>").attr("value", this.store).text(this.description))
    });
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(user);
    //SetUsersAssignByPerfil();
}



function SetUsersAssignByPerfilBefore() {
    console.log(listaUsuarioAssignPerfilEdit);
    debugger;
    var userAssignCadena = "";
    for (var i = 0; i < listaUsuarioAssignPerfilEdit[0].tiendas.length; i++) {

        if (userAssignCadena != "" && userAssignCadena != null) {
            userAssignCadena = userAssignCadena + ";" + listaUsuarioAssignPerfilEdit[0].tiendas[i].store;
        } else {
            userAssignCadena = listaUsuarioAssignPerfilEdit[0].tiendas[i].store;
        }
    }

    $("#" + panel + "hdfPerfilEditListUsersAssignBefore").val(userAssignCadena);
}


function SetUsersAssignByPerfilAfter() {
    console.log(listaUsuarioAssignPerfilEdit);
    debugger;
    var userAssignCadena = "";
    for (var i = 0; i < listaUsuarioAssignPerfilEdit[0].tiendas.length; i++) {

        if (userAssignCadena != "" && userAssignCadena != null) {
            userAssignCadena = userAssignCadena + ";" + listaUsuarioAssignPerfilEdit[0].tiendas[i].store;
        } else {
            userAssignCadena = listaUsuarioAssignPerfilEdit[0].tiendas[i].store;
        }
    }

    $("#" + panel + "hdfPerfilEditListUsersAssignAfter").val(userAssignCadena);
}


function AsignarDesasignarTiendas(user) {
    var hdfListaBefore = $("#" + panel + "hdfPerfilEditListUsersAssignBefore").val();
    var hdfListaAfter = $("#" + panel + "hdfPerfilEditListUsersAssignAfter").val();
    var sendParameter = {usuario : user, listaAsignadasBefore: hdfListaBefore, listaAsignadasAfter: hdfListaAfter };

    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/AsignarDesasignarTiendas',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = '';
            if (response.d.length > 0) {
                for (var x in response.d) {
                        html += '<p><strong>' + response.d[x].Codigo + ' - ' + response.d[x].Tienda + ':</strong> ' + response.d[x].Respuesta + '</p>';
                }
            } else html += '<p><strong style="text-align:center">' + GetLiteralValue('LITMSJNOCAMBIOEESS')+'</strong></p>';
            closeLoading_table();
            $("#" + panel + "txtObservacionAnulacion").val('');
            $("#modalCambioEESS").dialog('close');
            verVentana(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}




function ShowLoadingUI() {
    $.blockUI({
        message: '<h3><img src="/lib/estilos/Repsol/images/reload.gif" style="height: 24px;" /> <br /> <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 12px; color: #1390c6;"> Cargando...</span></h3>',
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


//$(document).bind("ajaxStart", function () {
//    ShowLoadingUI();
//}).bind("ajaxStop", function () {
//    HideLoadingUI();
//}).bind("ajaxError", function () {
//    HideLoadingUI();
//});

function SetLiterales() {
    var Literal1 = { LiteralName: 'LITALERTDEBESELECCIONARUSUARIO', LiteralValue: $("#HT_LITALERTDEBESELECCIONARUSUARIO").val() }; Literales.push(Literal1);
    var Literal2 = { LiteralName: 'LITHEADCODIGO', LiteralValue: $("#HT_LITHEADCODIGO").val() }; Literales.push(Literal2);
    var Literal3 = { LiteralName: 'LITHEADUSUARIO', LiteralValue: $("#HT_LITHEADUSUARIO").val() }; Literales.push(Literal3);
    var Literal4 = { LiteralName: 'LITHEADTIPOPERSONAL', LiteralValue: $("#HT_LITHEADTIPOPERSONAL").val() }; Literales.push(Literal4);
    var Literal5 = { LiteralName: 'LITHEADEESSACTUAL', LiteralValue: $("#HT_LITHEADEESSACTUAL").val() }; Literales.push(Literal5);
    var Literal6 = { LiteralName: 'LITHEADEESSASIGNADA', LiteralValue: $("#HT_LITHEADEESSASIGNADA").val() }; Literales.push(Literal6);
    var Literal7 = { LiteralName: 'LITHEADFECHAREGISTRO', LiteralValue: $("#HT_LITHEADFECHAREGISTRO").val() }; Literales.push(Literal7);
    var Literal8 = { LiteralName: 'LITHEADUSUARIOREGISTRO', LiteralValue: $("#HT_LITHEADUSUARIOREGISTRO").val() }; Literales.push(Literal8);
    var Literal9 = { LiteralName: 'LITHEADACCIONES', LiteralValue: $("#HT_LITHEADACCIONES").val() }; Literales.push(Literal9);
    var Literal10 = { LiteralName: 'LITTITHISTORIALASIGNACIONES', LiteralValue: $("#HT_LITTITHISTORIALASIGNACIONES").val() }; Literales.push(Literal10);
    var Literal11 = { LiteralName: 'LITTITCAMBIOEESS', LiteralValue: $("#HT_LITTITCAMBIOEESS").val() }; Literales.push(Literal11);
    var Literal12 = { LiteralName: 'LITMSJNOCAMBIOEESS', LiteralValue: $("#HT_LITMSJNOCAMBIOEESS").val() }; Literales.push(Literal12);
    var Literal13 = { LiteralName: 'LITHEADESTADO', LiteralValue: $("#HT_LITHEADESTADO  ").val() }; Literales.push(Literal13);
    
}

function GetLiteralValue(Name) {
    var index = Literales.findIndex(literal => literal.LiteralName === Name);
    if (index === -1) {
        return '';
    } else {
        return Literales[index].LiteralValue;
    }
}