var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'BandejaSolicitudesSOD.aspx';
var listaDivToggle = ["divFiltros", "divResultados"];
var lstArraySF = [];
var lstArrayChk = [];
var Literales = new Array();
var usuarioActual = "";

var lstArrayLanguage = "";

lstArrayChk[0] = "";
lstArrayChk[1] = "";
lstArrayChk[2] = "";

var ESTADOS_SOD = {
    PENDIENTE: " PENDIENTE ",
    APROBADO: " APROBADO ",
    RECHAZADO: " RECHAZADO "
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var prm = Sys.WebForms.PageRequestManager.getInstance();
prm.add_endRequest(function () {
    InitAnimatedCollapse();

});


$(document).ready(function () {

    
    $("#chkTodos").attr('checked', true);
    $("#chkPend").attr('checked', true);
    $("#chkProce").attr('checked', true);
    $("#chkAprob").attr('checked', true);

    lstArrayChk[0] = "1";
    lstArrayChk[1] = "2";
    lstArrayChk[2] = "3";

    InicializarLanguageJson();
    fnGetAllcboEstados(' ');
    fnGetAllcboTipoRiesgo(' ');
    fnGetAllcboNivelRiesgo(' ');

    InitAnimatedCollapse();
    //fnIniciarlenguageDT();
    SetLiterales();
/*    CerrarVentana();*/

    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {

            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
            // $("#btnBuscar").click();

        }

    });



    $("#" + panel + "btnExcel").hide();

    usuarioActual = $("#" + panel + "hdfUsuarioActual").val();

    $(".case").on("click", function () {
        if ($(".case").length == $(".case:checked").length) {
            //$("#chkTodos").prop("checked", true);
            $("#chkTodos").attr('checked', true);
        } else {
            //$("#chkTodos").prop("checked", false);
            $("#chkTodos").attr('checked', false);
        }
    });

    $("#chkPend").on("click", function () {
        if ($("#chkPend").is(':checked')) lstArrayChk[0] = "1";
        else lstArrayChk[0] = "";
    });
    $("#chkProce").on("click", function () {
        if ($("#chkProce").is(':checked')) lstArrayChk[2] = "2";
        else lstArrayChk[2] = "";
    });
    $("#chkAprob").on("click", function () {
        if ($("#chkAprob").is(':checked')) lstArrayChk[1] = "3";
        else lstArrayChk[1] = "";
    });

    $("#chkTodos").on("click", function () {
        if ($("#chkTodos").is(':checked')) {
            $("#chkPend").attr('checked', true);
            $("#chkProce").attr('checked', true);
            $("#chkAprob").attr('checked', true);
            lstArrayChk[0] = "1";
            lstArrayChk[1] = "2";
            lstArrayChk[2] = "3";
        } else {
            $("#chkPend").attr('checked', false);
            $("#chkProce").attr('checked', false);
            $("#chkAprob").attr('checked', false);

            lstArrayChk[0] = "";
            lstArrayChk[1] = "";
            lstArrayChk[2] = "";
        }
    });


    $("#" + panel + "btnConsultar").click(function (e) {
        fnCargarGrillaSolicitudesServer();
        var btnExcel = $("#" + panel + "btnExcel");
        btnExcel.show();
        //e.preventDefault();
    });

    $("#" + panel + "btnLimpiar").click(function (e) {
        fnResetarFiltro();
        //e.preventDefault();
    });


    $("#" + panel + "txtPersonal").on("change", function () {
        GetInfoPersonal();
    });

    $("#" + panel + "txtAprobador").on("change", function () {
        GetInfoAprobador();
    });

    // Add event listener for opening and closing details

    $("#dtResultadoSolicitudes").on("click", "tbody tr td.details-control", function () {

        var tr = $(this).closest('tr');
        var row = $("#dtResultadoSolicitudes").DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            destroyChild(row);
            tr.removeClass('shown');
        }
        else {
            // Open this row
            createChild(row);
            tr.addClass('shown');
        }
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


function CambioNPersonal() {
    $("#" + panel + "txtPersonal").val(document.getElementById('nPersonal').value);
}
function CambioNombrePersonal() {

    $("#" + panel + "txtNombrePersonal").val(document.getElementById('nom_Personal').value);
}

function CambioNAprobador() {
    $("#" + panel + "txtAprobador").val(document.getElementById('nAprobador').value);
}
function CambioNombreAprobador() {

    $("#" + panel + "txtNombreAprobador").val(document.getElementById('nom_Aprobador').value);
}

function fnGetAllcboTipoRiesgo() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarTipoRiesgo',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlTipoRiesgo").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlTipoRiesgo").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}



function GetInfoPersonal() {
 
    var CodePersonal = $("#" + panel + "txtPersonal").val();
    jQuery.ajax({
        type: 'POST',
        url: 'BandejaSolicitudesSOD.aspx/GetInfoPersonal',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ CodeOperator: CodePersonal }),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result != "") $("#" + panel + "txtNombrePersonal").val(result);
            else {
                $("#" + panel + "txtNombrePersonal").val("");
                $("#" + panel + "txtPersonal").val("");
            }
        },
        error: function (error) {
            console.log(error);
            alert(GetLiteralValue('LITMSJLITERROROPERACION'));
        }
    });
}

function GetInfoAprobador() {
  
    var CodePersonal = $("#" + panel + "txtAprobador").val();
    jQuery.ajax({
        type: 'POST',
        url: 'BandejaSolicitudesSOD.aspx/GetInfoPersonal',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ CodeOperator: CodePersonal }),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result != "") $("#" + panel + "txtNombreAprobador").val(result);
            else {
                $("#" + panel + "txtNombreAprobador").val("");
                $("#" + panel + "txtAprobador").val("");
            }
        },
        error: function (error) {
            console.log(error);
            alert(GetLiteralValue('LITMSJLITERROROPERACION'));
        }
    });
}

function fnGetAllcboNivelRiesgo() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarNivelRiesgo',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlNivelRiesgo").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlNivelRiesgo").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
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



function GetParameterDatatable() {
    var cbk1 = lstArrayChk[0];
    var cbk2 = lstArrayChk[1];
    var cbk3 = lstArrayChk[2];
    var cbk4 = ($("#chkTodos").is(":checked")) ? "1,2,3" : "";
    var IdEstado = cbk4 == "" ? cbk1 + ',' + cbk2 + ',' + cbk3 : cbk4;

    var dataToSend = {
        codSolicitud: '',
        riesgo: '',
        idEstado: '',
        idTipoRiesgo: '',
        idNivelRiesgo: '',
        fechadesde: '',
        fechahasta: '',
        idusuarioSol: '',
        idusuarioApro: '',
        estadosSolicitud: ''
    };

    dataToSend.codSolicitud = $("#" + panel + "txtCodSolicitud").val();
    dataToSend.riesgo = $("#" + panel + "txtRiesgo").val();
    dataToSend.idEstado = $("#" + panel + "ddlEstado").val();
    dataToSend.idTipoRiesgo = $("#" + panel + "ddlTipoRiesgo").val();
    dataToSend.idNivelRiesgo = $("#" + panel + "ddlNivelRiesgo").val();
    dataToSend.fechadesde = $("#" + panel + "txtDesde_search").val();
    dataToSend.fechahasta = $("#" + panel + "txtHasta_search").val();
    dataToSend.idusuarioSol = $("#" + panel + "txtPersonal").val();
    dataToSend.idusuarioApro = $("#" + panel + "txtAprobador").val();
    dataToSend.estadosSolicitud = IdEstado;
    return dataToSend;
}


function SetDatableAprobacionesServer() {
    var param = GetParameterDatatable();
    $('#dtResultadoSolicitudes').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: URL_PAGINA + '/GetSolicitudesSodServer',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                var req = {
                    draw: 0,
                    start: 0,
                    length: 0,
                    search: '',
                    codSolicitud: '',
                    riesgo: '',
                    idEstado: '',
                    idTipoRiesgo: '',
                    idNivelRiesgo: '',
                    fechadesde: '',
                    fechahasta: '',
                    idusuarioSol: '',
                    idusuarioApro: '',
                    estadosSolicitud: ''
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = d.length;
                req.search = d.search['value'];
                req.codSolicitud = param.codSolicitud;
                req.riesgo = param.riesgo;
                req.idEstado = param.idEstado;
                req.idTipoRiesgo = param.idTipoRiesgo;
                req.idNivelRiesgo = param.idNivelRiesgo;
                req.fechadesde = param.fechadesde;
                req.fechahasta = param.fechahasta;
                req.idusuarioSol = param.idusuarioSol;
                req.idusuarioApro = param.idusuarioApro;
                req.estadosSolicitud = param.estadosSolicitud;
                return req;
            },
            dataSrc: function (json) {
                json.draw = json.d.draw;
                json.recordsTotal = json.d.recordsTotal;
                json.recordsFiltered = json.d.recordsFiltered;
                json.data = json.d.data;

                lstArraySF = json.data;
                $('#btnExpandAll').attr("disabled", false);
                $('#btnCollapseAll').attr("disabled", false);
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
                className: 'details-control',
                orderable: false,
                data: null,
                defaultContent: '',
                width: '20px'
            },
            { data: "IdSolicitud", title: "", width: '50px' },
            { data: "CodSolicitud", title: GetLiteralValue('LITHEADCODIGOSOLICITUD'), width: '50px' },
            { data: "EstadoSolicitud", title: GetLiteralValue('LITHEADESTADOSOLICITUD'), orderable: false, width: '50px' },
            { data: "UsuarioSolicitante", title: GetLiteralValue('LITHEADUSUARIOSOLICITANTE'), orderable: false, width: '50px' },
            { data: "FechaModificacion", title: GetLiteralValue('LITHEADFECHASOLICITUD'), orderable: false, width: '50px' }
        ],
        columnDefs: [
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [2, 3, 4, 5],
                "className": "dt-left"
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    closerLoading();
}




function fnResetarFiltro() {
    if ($("#" + panel + "ddlEstado").length) {
        $("#" + panel + "ddlEstado").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlTipoRiesgo").length) {
        $("#" + panel + "ddlTipoRiesgo").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlNivelRiesgo").length) {
        $("#" + panel + "ddlNivelRiesgo").prop('selectedIndex', 0);
    }


    $("#" + panel + "txtCodSolicitud").val('');
    $("#" + panel + "txtRiesgo").val('');

    $("#" + panel + "txtPersonal").val('');
    $("#" + panel + "txtNombrePersonal").val('');
    $("#" + panel + "txtAprobador").val('');
    $("#" + panel + "txtNombreAprobador").val('');
    $("#" + panel + "txtDesde_search").val('');
    $("#" + panel + "txtHasta_search").val('');
    $("#chkTodos").attr('checked', true);
    $("#chkProce").attr('checked', true);
    $("#chkAprob").attr('checked', true);
    $("#chkPend").attr('checked', true);

    $("#" + panel + "txtCodSolicitud").focus();
}


function createChild(row) {
    // This is the table we'll convert into a DataTable
    var table = $('<table class="display" width="100%"/>');

    // Display it the child row
    row.child(table).show();
    var rowData = row.data();

    // Initialise as a DataTable

    var usersTable = table.DataTable({
        dom: 'Bfrtip',
        pageLength: 5,
        ajax: {
            url: URL_PAGINA + '/GetSolicitudesDetalle',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                d.IdSolicitud = rowData.IdSolicitud;
            },
            dataSrc: function (json) {
                json.draw = json.d.draw;
                json.recordsTotal = json.d.recordsTotal;
                json.recordsFiltered = json.d.recordsFiltered;
                json.data = json.d.data;
                return json.data;
            }
        },
        columns: [
            { data: "IdSolicitud", title: "", width: '50px' },
            { data: "IdRiesgo", title: "", width: '50px' },
            { data: "CodigoRiesgo", title: GetLiteralValue('LITHEADCODIGORIESGO'), orderable: false, width: '30px' },
            { data: "Riesgo", title: GetLiteralValue('LITHEADRIESGO'), orderable: false, width: '150px' },
            { data: "Impacto", title: GetLiteralValue('LITHEADIMPACTO'), orderable: false, width: '150px' },
            { data: "TipoRiesgo", title: GetLiteralValue('LITHEADTIPORIESGO'), orderable: false, width: '50px' },
            { data: "NivelRiesgo", title: GetLiteralValue('LITHEADNIVELRIESGO'), orderable: false, width: '50px' },
            { data: "IdUsuarioPermiso", title: GetLiteralValue('LITHEADUSUARIOPERMISO'), orderable: false, width: '250px' },
            { data: "UsuarioAprobador", title: GetLiteralValue('LITHEADUSUARIOAPROBADOR'), orderable: false, width: '150px' },
            { data: "EstadoControl", title: GetLiteralValue('LITHEADESTADOCONTROL'), orderable: false, width: '50px' },
            { data: "FechaModificacion", title: GetLiteralValue('LITHEADFECHAMODIFICACION'), orderable: false, width: '50px' },
            { data: "Comentario", title: GetLiteralValue('LITHEADCOMENTARIO'), orderable: false, width: '100px' },
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
                "targets": [0, 1],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [2],
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('link-popup-sf');
                },
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:browseRow(\'' + row.CodigoRiesgo + '\')">' + row.CodigoRiesgo + '</a>';
                }
            },
            {
                "targets": [4],
                "render": function (data, type, row) {
                    return "<textarea name='textarea' id='idtext' cols='22' style='font:12.8px Arial, Helvetica; margin: 0px; height: 113px; width: 244px; resize:none; border:none;' disabled>" + row.Impacto + "</textarea>";
                }
            },
            {
                "targets": [6],
                "render": function (data, type, row, meta) {
         
                    if (row.NivelRiesgo === 'ALTO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:red; font-weight:bold;">' + row.NivelRiesgo + '</span>';
                    } else if (row.NivelRiesgo === 'BAJO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:green; font-weight:bold;">' + row.NivelRiesgo + '</span>';
                    } else if (row.NivelRiesgo === 'MEDIO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:#ccbc0a; font-weight:bold;">' + row.NivelRiesgo + '</span>';
                    }       
                    return HTML_p;
                }
            },
            {
                "targets": [7],
                "render": function (data, type, row, meta) {
                    var HTML_mas = '';
                    var array = row.IdUsuarioPermisoList.split(";");
                    if (array.length > 1) {
                        HTML_mas = '<span>y más.</span>';
                    }
                    var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + '</span>';
                    if (row.IdUsuarioPermiso != "")
                        HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + ' ' + HTML_mas +'</span><span class="gr-bl gr-bl-4" title="Ver Detalle Usuarios"><a id="MyLink" href="javascript:abrirModalUsuarios(\'' + row.IdUsuarioPermisoList + '\')"><img src="/lib/estilos/Repsol/images/busqueda.png"/></a></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [11],
                "render": function (data, type, row) {
      
                    var HTML_p = "<textarea name='textarea' id='idtext' cols='15' style='font:12.8px Arial, Helvetica; margin: 0px; height: 50px; width: 150px; resize:none; border:none;' disabled>" + row.Comentario + "</textarea>";
                    if (row.Comentario == "")
                        HTML_p = '<span class="gr-bl gr-bl-2"></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [12],
                "render": function (data, type, row, meta) {

                    //var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdSolicitud + '</span>';
                    var HTML_p = '<tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoAprobar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\',' + '\'' + row.DescripcionControl + '\')"><input type="button" style="width: 65px" id="btnAprobar" class="btn btn-primary mtl10 btnRechazar" value="APROBAR" /></a></span></td></tr><p></p><tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoRechazar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\')"><input type="button" style="width: 65px" id="btnRechazar" class="btn btn-primary mtl10 btnAprobar" value="RECHAZAR" /></a></span></td></tr>';
                    var idUsuarioAprobadorUpper = row.IdUsuarioAprobador ? row.IdUsuarioAprobador.replace(/ /g, "").toUpperCase() : '';
                    var usuarioActualUpper = usuarioActual ? usuarioActual.replace(/ /g, "").toUpperCase() : '';
                    if (row.EstadoControl != "PENDIENTE" || idUsuarioAprobadorUpper != usuarioActualUpper)
                        HTML_p = '<span class="gr-bl gr-bl-8"></span>';

                    return HTML_p;
                }
            },
        ],
        paging: false,
        searching: false,
        select: false
    });
}



function destroyChild(row) {
    var table = $("table", row.child());
    table.detach();
    table.DataTable().destroy();

    // And then hide the row
    row.child.hide();
}

function fnAbrirDialogoRechazar(IdSolictud, CodigoRiesgo, IdRiesgo, usuariosList) {
    var array = usuariosList.split(";");
    if (array.length > 1) {
        $("#lblMensajeConfirmacion").empty();
        $("#lblMensajeConfirmacion").append(GetLiteralValue('LITMSJUSUARIOSRELACIONADOSRECHAZADOS'));
        $("#dialogConfirm").dialog({
            modal: true,
            autoOpen: false,
            buttons: {
                "Aceptar": function () {
                    $("#modalRechazo").dialog({
                        autoOpen: false,
                        width: 440,
                        height: 300,
                        modal: true,
                        resizable: false,
                        //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
                        title: 'Rechazar ' + ':' + CodigoRiesgo,
                        buttons: {
                            "Guardar": function () {
                                addLoading_table();
                                var accion = 2;
                                var comentario = $("#" + panel + "txtObservacionAnulacion").val();
                                if (comentario == '' || comentario == null) {
                                    alert(GetLiteralValue('LITMSJDEBECOMENTARIO'));
                                    closeLoading_table();
                                    return false;
                                }
                                var opcion = confirm(GetLiteralValue('LITMSJSEGURORECHAZAR'));
                                if (!opcion) {
                                    accion = 0;
                                    $("#" + panel + "txtObservacionAnulacion").val('');
                                    closeLoading_table();
                                    return false;
                                }
                                else {
                                    var dataToSend = { parameter1: IdSolictud, parameter2: IdRiesgo, parameter3: comentario, parameter4: accion };
                                    var options = {
                                        url: URL_PAGINA + '/AprobarRechazarSolicitud',
                                        data: JSON.stringify(dataToSend),
                                        dataType: 'json',
                                        contentType: "application/json; charset=utf-8",
                                        type: 'POST',
                                        success: function (response) {
                                            var html = '';
                                        
                                            if (response.d) {
                                                html += '<p><strong>' + 'Nro Riesgo: ' + ' ' + CodigoRiesgo + ':</strong> ' + GetLiteralValue('LITMSJRECHAZOCORRECTO') + '</p>';
                                            } else html += '<p><strong style="text-align:center">' + GetLiteralValue('LITMSJRECHAZOERROR') + '</strong></p>';
                                            closeLoading_table();
                                            $("#" + panel + "txtObservacionAnulacion").val('');
                                            $("#modalRechazo").dialog('close');
                                            verVentana(html);
                                        },
                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                            console.log("Status: " + textStatus);
                                            console.log("Error: " + errorThrown);
                                            closeLoading_table();
                                        }
                                    }
                                    $.ajax(options);
                                }
                            },
                            "Cancelar": function () {
                                $("#" + panel + "txtObservacionAnulacion").val('');
                                closeLoading_table();
                                $(this).dialog("close");
                            }
                        }

                    });
                    $("#modalRechazo").dialog("open");
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
        $("#dialogConfirm").dialog("open");
    }
    else {
        $("#modalRechazo").dialog({
            autoOpen: false,
            width: 440,
            height: 300,
            modal: true,
            resizable: false,
            //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
            title: 'Rechazar ' + ':' + CodigoRiesgo,
            buttons: {
                "Guardar": function () {
                    addLoading_table();
                    var accion = 2;
                    var comentario = $("#" + panel + "txtObservacionAnulacion").val();
                    if (comentario == '' || comentario == null) {
                        alert(GetLiteralValue('LITMSJDEBECOMENTARIO'));
                        closeLoading_table();
                        return false;
                    }
                    var opcion = confirm(GetLiteralValue('LITMSJSEGURORECHAZAR'));
                    if (!opcion) {
                        accion = 0;
                        $("#" + panel + "txtObservacionAnulacion").val('');
                        closeLoading_table();
                        return false;
                    }
                    else {
                        var dataToSend = { parameter1: IdSolictud, parameter2: IdRiesgo, parameter3: comentario, parameter4: accion };
                        var options = {
                            url: URL_PAGINA + '/AprobarRechazarSolicitud',
                            data: JSON.stringify(dataToSend),
                            dataType: 'json',
                            contentType: "application/json; charset=utf-8",
                            type: 'POST',
                            success: function (response) {
                                var html = '';
                              
                                if (response.d) {
                                    html += '<p><strong>' + 'Nro Riesgo: ' + ' ' + CodigoRiesgo + ':</strong> ' + GetLiteralValue('LITMSJRECHAZOCORRECTO') + '</p>';
                                } else html += '<p><strong style="text-align:center">' + GetLiteralValue('LITMSJRECHAZOERROR') + '</strong></p>';
                                closeLoading_table();
                                $("#" + panel + "txtObservacionAnulacion").val('');
                                $("#modalRechazo").dialog('close');
                                verVentana(html);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Status: " + textStatus);
                                console.log("Error: " + errorThrown);
                                closeLoading_table();
                            }
                        }
                        $.ajax(options);
                    }
                },
                "Cancelar": function () {
                    $("#" + panel + "txtObservacionAnulacion").val('');
                    closeLoading_table();
                    $(this).dialog("close");
                }
            }

        });
        $("#modalRechazo").dialog("open");
    }

}


function fnAbrirDialogoAprobar(IdSolictud, CodigoRiesgo, IdRiesgo, usuariosList, DescripcionControl) {
    var array = usuariosList.split(";");
    if (array.length > 1) {
        $("#lblMensajeConfirmacion").empty();
        $("#lblMensajeConfirmacion").append(GetLiteralValue('LITMSJUSUARIOSRELACIONADOSAPROBADOS'));

        $("#txtDescripcionControlAprobacion").empty();
        $("#txtDescripcionControlAprobacion").append(DescripcionControl);
        $("#dialogConfirm").dialog({
            modal: true,
            autoOpen: false,
            buttons: {
                "Aceptar": function () {
                    $("#modalAprobacion").dialog({
                        autoOpen: false,
                        width: 440,
                        height: 420,
                        modal: true,
                        resizable: false,
                        //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
                        title: 'Aprobar ' + ':' + CodigoRiesgo,
                        buttons: {
                            "Guardar": function () {
                                addLoading_table();
                                var accion = 1;
                                var comentario = $("#" + panel + "txtObservacionAprobacion").val();
                                if (comentario == '' || comentario == null) {
                                    //alert(GetLiteralValue('LITMSGSUSTENTOSOLICITUD'));
                                    alert(GetLiteralValue('LITMSJDEBECOMENTARIO'));
                                    closeLoading_table();
                                    return false;
                                }
                                //var opcion = confirm(GetLiteralValue('LITMSGANULARSOLICITUD'));
                                var opcion = confirm(GetLiteralValue('LITMSJSEGUROAPROBAR'));
                                if (!opcion) {
                                    accion = 0;
                                    $("#" + panel + "txtObservacionAprobacion").val('');
                                    closeLoading_table();
                                    return false;
                                }
                                else {
                                    var dataToSend = { parameter1: IdSolictud, parameter2: IdRiesgo, parameter3: comentario, parameter4: accion };
                                    var options = {
                                        url: URL_PAGINA + '/AprobarRechazarSolicitud',
                                        data: JSON.stringify(dataToSend),
                                        dataType: 'json',
                                        contentType: "application/json; charset=utf-8",
                                        type: 'POST',
                                        success: function (response) {
                                            var html = '';
                                           
                                            if (response.d) {
                                                html += '<p><strong>' + 'Nro Riesgo: ' + ' ' + CodigoRiesgo + ':</strong> ' + GetLiteralValue('LITMSJAPROBOCORRECTO') + '</p>';
                                            } else html += '<p><strong style="text-align:center">' + GetLiteralValue('LITMSJAPROBOERROR') + '</strong></p>';
                                            closeLoading_table();
                                            $("#" + panel + "txtObservacionAprobacion").val('');
                                            $("#modalAprobacion").dialog('close');
                                            verVentana(html);
                                        },
                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                            console.log("Status: " + textStatus);
                                            console.log("Error: " + errorThrown);
                                            closeLoading_table();
                                        }
                                    }
                                    $.ajax(options);
                                }
                            },
                            "Cancelar": function () {
                                $("#" + panel + "txtObservacionAprobacion").val('');
                                closeLoading_table();
                                $(this).dialog("close");
                            }
                        }

                    });
                    $("#modalAprobacion").dialog("open");
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
        $("#dialogConfirm").dialog("open");
    }
    else {
        $("#txtDescripcionControlAprobacion").empty();
        $("#txtDescripcionControlAprobacion").append(DescripcionControl);
        $("#modalAprobacion").dialog({
            autoOpen: false,
            width: 440,
            height: 420,
            modal: true,
            resizable: false,
            //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
            title: 'Aprobar ' + ':' + CodigoRiesgo,
            buttons: {
                "Guardar": function () {
                    addLoading_table();
                    var accion = 1;
                    var comentario = $("#" + panel + "txtObservacionAprobacion").val();
                    if (comentario == '' || comentario == null) {
                        //alert(GetLiteralValue('LITMSGSUSTENTOSOLICITUD'));
                        alert(GetLiteralValue('LITMSJDEBECOMENTARIO'));
                        closeLoading_table();
                        return false;
                    }
                    //var opcion = confirm(GetLiteralValue('LITMSGANULARSOLICITUD'));
                    var opcion = confirm(GetLiteralValue('LITMSJSEGUROAPROBAR'));
                    if (!opcion) {
                        accion = 0;
                        $("#" + panel + "txtObservacionAprobacion").val('');
                        closeLoading_table();
                        return false;
                    }
                    else {
                        var dataToSend = { parameter1: IdSolictud, parameter2: IdRiesgo, parameter3: comentario, parameter4: accion };
                        var options = {
                            url: URL_PAGINA + '/AprobarRechazarSolicitud',
                            data: JSON.stringify(dataToSend),
                            dataType: 'json',
                            contentType: "application/json; charset=utf-8",
                            type: 'POST',
                            success: function (response) {
                                var html = '';

                                if (response.d) {
                                    html += '<p><strong>' + 'Nro Riesgo: ' + ' ' + CodigoRiesgo + ':</strong> ' + GetLiteralValue('LITMSJAPROBOCORRECTO') + '</p>';
                                } else html += '<p><strong style="text-align:center">' + GetLiteralValue('LITMSJAPROBOERROR') + '</strong></p>';
                                closeLoading_table();
                                $("#" + panel + "txtObservacionAprobacion").val('');
                                $("#modalAprobacion").dialog('close');
                                verVentana(html);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Status: " + textStatus);
                                console.log("Error: " + errorThrown);
                                closeLoading_table();
                            }
                        }
                        $.ajax(options);
                    }
                },
                "Cancelar": function () {
                    $("#" + panel + "txtObservacionAprobacion").val('');
                    closeLoading_table();
                    $(this).dialog("close");
                }
            }

        });
        $("#modalAprobacion").dialog("open");
    }
}


function abrirModalUsuarios(usuariosList) {

    var array = usuariosList.split(";");
    var dataset = [];
    for (var i = 0; i < array.length; i++) {
        dataset[i]=array[i].split("|");
    }
    $("#modalUsuarios").dialog({
        autoOpen: false,
        width: 800,
        height: 400,
        modal: true,
        //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
        title: GetLiteralValue('LITTITUSUARIOSAFECTADOS') ,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
            }
        }

    });
    $("#modalUsuarios").dialog("open");
    //var dataset = [];
    var table = $("#dtDetalleUsuarios").DataTable({
        "data": dataset,
        "searching": false,
        "paging": false,
        "destroy": true,
        "info":false,
        "columns": [
            { title: "Código" },
            { title: "Usuario" },
            { title: "Rol" },
            { title: "Perfil" }
        ],
        language: lstArrayLanguage
    });
}


function addLoading_table() {
    var imgUrl = '/lib/estilos/Repsol/images/reload.gif';
    var span = '<span ></span><span class="modal_dtSF"><img src="'
        + imgUrl + '" alt="" title="" /><br /><span style="background-color:#ff6101; color: #FFF;">&nbsp;' + 'Procesando' + '...</span></span>';
    $("#Loading_table").html(span);
}

function closeLoading_table() {
    $("#Loading_table").html("");
}


function verVentana(htmldata) {
    $("#respGenDoc").dialog({
        autoOpen: false,
        dialogClass: 'hide-close',
        width: 800,
        height: 400,
        modal: true,
        buttons: {
            Aceptar: function () {
                $(this).dialog("close");
                //$(this).dialog("destroy").remove();
                //__doPostBack('btnConsultar', '');
                if ($("#dialog-form_detalle_sol").dialog('isOpen') === true) {

                    jQuery("#dialog-form_detalle_sol").dialog("close");
                }
                fnCargarGrillaSolicitudesServer();
            }
        },
    });

    $("#respGenDoc").dialog("open");
    var divdetalle = $('#detalle');
    divdetalle.html(htmldata);
}

function verificarFechaDesde(sender, args) {
    var getdesdefecha;
    if (sender === undefined) getdesdefecha = $("#" + panel + "txtDesde_search").val().split('/');
    else getdesdefecha = sender._textbox._current.split('/');
    var desdefecha = new Date((getdesdefecha[1] + "/" + getdesdefecha[0] + "/" + getdesdefecha[2]));
    if ($("#" + panel + "txtHasta_search").val() != "") {
        var gethastafecha = $("#" + panel + "txtHasta_search").val().split('/');
        var hastafecha = new Date((gethastafecha[1] + "/" + gethastafecha[0] + "/" + gethastafecha[2]));
        if (desdefecha > hastafecha) {
            alert(GetLiteralValue('LITMSJFECHAVALIDADESDE'));
            if (sender === undefined) $("#" + panel + "txtDesde_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtDesde_search").val("");
            return false;
        }
        if (((hastafecha - desdefecha) / (1000 * 60 * 60 * 24)) > 31) {
            alert(GetLiteralValue('LITMSJRANGOMAYOR31'));
            if (sender === undefined) $("#" + panel + "txtDesde_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtDesde_search").val("");
            return false;
        }
    }
    return true;
}

function verificarFechaHasta(sender, args) {
    var gethastafecha;
    if (sender === undefined) gethastafecha = $("#" + panel + "txtHasta_search").val().split('/');
    else gethastafecha = sender._textbox._current.split('/');
    var hastafecha = new Date((gethastafecha[1] + "/" + gethastafecha[0] + "/" + gethastafecha[2]));
    if ($("#" + panel + "txtDesde_search").val() != "") {
        var getdesdefecha = $("#" + panel + "txtDesde_search").val().split('/');
        var desdefecha = new Date((getdesdefecha[1] + "/" + getdesdefecha[0] + "/" + getdesdefecha[2]));
        if (desdefecha > hastafecha) {
            alert(GetLiteralValue('LITMSJFECHAVALIDADESDE'));
            if (sender === undefined) $("#" + panel + "txtHasta_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtHasta_search").val("");
            return false;
        }
        if (((hastafecha - desdefecha) / (1000 * 60 * 60 * 24)) > 31) {
            alert(GetLiteralValue('LITMSJRANGOMAYOR31'));
            if (sender === undefined) $("#" + panel + "txtHasta_search").val("");
            else
                sender._textbox._current = "";
            $("#" + panel + "txtHasta_search").val("");
            return false;
        }
    }
    return true;
}

function operLoading() {
    $('.modal-backdrop').parent().remove();

    $backdrop = $('<div><div class="modal-backdrop"></div><div class="modal"><img src="'
        + imgUrl + '" alt="" title="" /></div></div>').appendTo(document.body);
}

function closerLoading() {
    $('.modal-backdrop').parent().remove();
}

function InicializarLanguageJson() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {

        lstArrayLanguage = data;
        SetDatableAprobaciones([]);
        //fnInicializarDatatables();
    });
}

function fnIniciarlenguageDT() {

    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "Término de búsqueda",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "No existen solicitudes para mostrar",//Ningún dato disponible en esta tabla",
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            //only works for built-in buttons, not for custom buttons
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "tabla Excel",
                "pdf": "documento PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "Colección",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'Dar clic en la fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        }
    });
}


function SetLiterales() {
    var Literal1 = { LiteralName: 'LITHEADCODIGOSOLICITUD', LiteralValue: $("#HT_LITHEADCODIGOSOLICITUD").val() }; Literales.push(Literal1);
    var Literal2 = { LiteralName: 'LITHEADESTADOSOLICITUD', LiteralValue: $("#HT_LITHEADESTADOSOLICITUD").val() }; Literales.push(Literal2);
    var Literal3 = { LiteralName: 'LITHEADUSUARIOSOLICITANTE', LiteralValue: $("#HT_LITHEADUSUARIOSOLICITANTE").val() }; Literales.push(Literal3);
    var Literal4 = { LiteralName: 'LITHEADFECHASOLICITUD', LiteralValue: $("#HT_LITHEADFECHASOLICITUD").val() }; Literales.push(Literal4);
    var Literal5 = { LiteralName: 'LITHEADCODIGORIESGO', LiteralValue: $("#HT_LITHEADCODIGORIESGO").val() }; Literales.push(Literal5);
    var Literal6 = { LiteralName: 'LITHEADRIESGO', LiteralValue: $("#HT_LITHEADRIESGO").val() }; Literales.push(Literal6);
    var Literal7 = { LiteralName: 'LITHEADIMPACTO', LiteralValue: $("#HT_LITHEADIMPACTO").val() }; Literales.push(Literal7);
    var Literal8 = { LiteralName: 'LITHEADTIPORIESGO', LiteralValue: $("#HT_LITHEADTIPORIESGO").val() }; Literales.push(Literal8);
    var Literal9 = { LiteralName: 'LITHEADNIVELRIESGO', LiteralValue: $("#HT_LITHEADNIVELRIESGO").val() }; Literales.push(Literal9);
    var Literal10 = { LiteralName: 'LITHEADUSUARIOPERMISO', LiteralValue: $("#HT_LITHEADUSUARIOPERMISO").val() }; Literales.push(Literal10);
    var Literal11 = { LiteralName: 'LITHEADUSUARIOAPROBADOR', LiteralValue: $("#HT_LITHEADUSUARIOAPROBADOR").val() }; Literales.push(Literal11);
    var Literal12 = { LiteralName: 'LITHEADESTADOCONTROL', LiteralValue: $("#HT_LITHEADESTADOCONTROL").val() }; Literales.push(Literal12);
    var Literal13 = { LiteralName: 'LITHEADFECHAMODIFICACION', LiteralValue: $("#HT_LITHEADFECHAMODIFICACION").val() }; Literales.push(Literal13);
    var Literal14 = { LiteralName: 'LITHEADCOMENTARIO', LiteralValue: $("#HT_LITHEADCOMENTARIO").val() }; Literales.push(Literal14);
    var Literal15 = { LiteralName: 'LITHEADACCIONES', LiteralValue: $("#HT_LITHEADACCIONES").val() }; Literales.push(Literal15);
    var Literal16 = { LiteralName: 'LITMSJDEBECOMENTARIO', LiteralValue: $("#HT_LITMSJDEBECOMENTARIO").val() }; Literales.push(Literal16);
    var Literal17 = { LiteralName: 'LITMSJSEGURORECHAZAR', LiteralValue: $("#HT_LITMSJSEGURORECHAZAR").val() }; Literales.push(Literal17);
    var Literal18 = { LiteralName: 'LITMSJRECHAZOCORRECTO', LiteralValue: $("#HT_LITMSJRECHAZOCORRECTO").val() }; Literales.push(Literal18);
    var Literal19 = { LiteralName: 'LITMSJRECHAZOERROR', LiteralValue: $("#HT_LITMSJRECHAZOERROR").val() }; Literales.push(Literal19);
    var Literal20 = { LiteralName: 'LITMSJSEGUROAPROBAR', LiteralValue: $("#HT_LITMSJSEGUROAPROBAR").val() }; Literales.push(Literal20);
    var Literal21 = { LiteralName: 'LITMSJAPROBOCORRECTO', LiteralValue: $("#HT_LITMSJAPROBOCORRECTO").val() }; Literales.push(Literal21);
    var Literal22 = { LiteralName: 'LITMSJAPROBOERROR', LiteralValue: $("#HT_LITMSJAPROBOERROR").val() }; Literales.push(Literal22);
    var Literal23 = { LiteralName: 'LITMSJFECHAVALIDADESDE', LiteralValue: $("#HT_LITMSJFECHAVALIDADESDE").val() }; Literales.push(Literal23);
    var Literal24 = { LiteralName: 'LITMSJRANGOMAYOR31', LiteralValue: $("#HT_LITMSJRANGOMAYOR31").val() }; Literales.push(Literal24);
    var Literal25 = { LiteralName: 'LITMSJLITERROROPERACION', LiteralValue: $("#HT_LITMSJLITERROROPERACION").val() }; Literales.push(Literal25);
    var Literal26 = { LiteralName: 'LITMSJUSUARIOSRELACIONADOSRECHAZADOS', LiteralValue: $("#HT_LITMSJUSUARIOSRELACIONADOSRECHAZADOS").val() }; Literales.push(Literal26);
    var Literal27 = { LiteralName: 'LITMSJUSUARIOSRELACIONADOSAPROBADOS', LiteralValue: $("#HT_LITMSJUSUARIOSRELACIONADOSAPROBADOS").val() }; Literales.push(Literal27);
    var Literal28 = { LiteralName: 'LITTITUSUARIOSAFECTADOS', LiteralValue: $("#HT_LITTITUSUARIOSAFECTADOS").val() }; Literales.push(Literal28);
}

function GetLiteralValue(Name) {
    var index = Literales.findIndex(literal => literal.LiteralName === Name);
    if (index === -1) {
        return '';
    } else {
        return Literales[index].LiteralValue;
    }
}


function SetDatableAprobaciones(dataJson) {
 
    $('#dtResultadoSolicitudes').DataTable({
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        destroy: true, 
        data: dataJson,
        autoWidth: false,
        fixedColumns: true,
        scrollX: false,
        scrollCollapse: true,
        columns: [
            {
                className: 'details-control',
                orderable: false,
                data: null,
                defaultContent: '',
                width: '20px'
            },
            { data: "IdSolicitud", title: "", width: '50px' },
            { data: "CodSolicitud", title: GetLiteralValue('LITHEADCODIGOSOLICITUD'), width: '50px' },
            { data: "EstadoSolicitud", title: GetLiteralValue('LITHEADESTADOSOLICITUD'), orderable: false, width: '50px' },
            { data: "UsuarioSolicitante", title: GetLiteralValue('LITHEADUSUARIOSOLICITANTE'), orderable: false, width: '50px' },
            { data: "FechaModificacion", title: GetLiteralValue('LITHEADFECHASOLICITUD'), orderable: false, width: '50px' }
        ],
        columnDefs: [
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [2, 3, 4, 5],
                "className": "dt-left"
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    closerLoading();
}

function browseRow(id) {
 
    if (id != "" && id != null) {
        var str = '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=' + id + '&mode=browse" width="100%" height="95%" frameBorder="0"></iframe>';
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', str);
        $("#myModal").addClass("open");
    }
}



function AbrirVentana(pagina, tipo, alto, ancho) {
    var str = "height=" + alto + ",innerHeight=" + alto;
    str += ",width=" + ancho + ",innerWidth=" + ancho;
    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;
        var xc = (aw - ancho) / 2;
        var yc = (ah - alto) / 2;
        str += ",left=" + xc + ",screenX=" + xc;
        str += ",top=" + yc + ",screenY=" + yc;
    }
    if (tipo == "I") {
        str += ",resizable=yes,status=no,toolbar=yes,menubar=yes,scrollbars=yes"
        ventana = window.open(pagina, "", str);
    }
    else {
        if (tipo == "P") {
            str += ",resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=yes"
            ventana = window.open(pagina, "", str);
        }
        else {
            if (tipo == "TALLAS") {
                str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
                ventana = window.open(pagina, "TALLAS", str);
            }
            else {
                if (tipo == "SC") {
                    str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=yes"
                    ventana = window.open(pagina, "TALLAS", str);
                }
                else {
                    str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
                    ventana = window.open(pagina, "", str);
                }
            }
        }
    }
}
