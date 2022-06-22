var panel = "ctl00_wfInterface_";
var URL_PAGINA = 'BandejaSolicitudSODAprobador.aspx';
var listaDivToggle = ["divFiltros", "divResultados"];
var lstArrayChk = [];
var Literales = new Array();
var usuarioActual = "";
var lstArrayLanguage = "";
var dataCountDT = 0;
lstArrayChk[0] = "";
lstArrayChk[1] = "";
lstArrayChk[2] = "";

$(document).ready(function () {
    InitUsuarioActualSistema();
    SetLiterales();
    InitAnimatedCollapse();
    fnGetAllcboNivelRiesgo();
    InitCheckEstadoRiesgo();
    InicializarLanguageJson();
    $("#" + panel + "btnConsultar").click(function (e) {
        fnCargarGrillaSolicitudesServer();
        var btnExcel = $("#" + panel + "btnExcel");
        btnExcel.show();
    });

    $("#" + panel + "btnLimpiar").click(function (e) {
        fnResetarFiltro();
    });

    $(".close").on("click", function () {
        if (confirm("¿Desea salir?")) {
            $("#myModal").removeClass("open");
            var list = document.getElementById("modal-iframe");
            list.parentNode.removeChild(list);
        }
    });
});

function InitUsuarioActualSistema() {
    usuarioActual = $("#" + panel + "hdfUsuarioActual").val();
}



function InitAnimatedCollapse() {
    for (var i = 0; i < listaDivToggle.length; i++) {
        animatedcollapse.addDiv(listaDivToggle[i], 'fade=1');
    }
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}

function fnGetAllcboNivelRiesgo() {
    $.ajax({
        type: "GET",
        url: URL_PAGINA + '/ListarNivelRiesgo',
        data: {},
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

function InitCheckEstadoRiesgo() {
    $("#chkTodos").attr('checked', true);
    $("#chkPendiente").attr('checked', true);
    $("#chkAprobado").attr('checked', true);
    $("#chkRechazado").attr('checked', true);

    lstArrayChk[0] = "01";
    lstArrayChk[1] = "02";
    lstArrayChk[2] = "03";

    $(".case").on("click", function () {
        if ($(".case").length == $(".case:checked").length) {
            $("#chkTodos").attr('checked', true);
        } else {
            $("#chkTodos").attr('checked', false);
        }
    });

    $("#chkPendiente").on("click", function () {
        if ($("#chkPendiente").is(':checked')) lstArrayChk[0] = "01";
        else lstArrayChk[0] = "";
    });
    $("#chkAprobado").on("click", function () {
        if ($("#chkAprobado").is(':checked')) lstArrayChk[1] = "02";
        else lstArrayChk[1] = "";
    });
    $("#chkRechazado").on("click", function () {
        if ($("#chkRechazado").is(':checked')) lstArrayChk[2] = "03";
        else lstArrayChk[2] = "";
    });

    $("#chkTodos").on("click", function () {
        if ($("#chkTodos").is(':checked')) {
            $("#chkPendiente").attr('checked', true);
            $("#chkAprobado").attr('checked', true);
            $("#chkRechazado").attr('checked', true);
            lstArrayChk[0] = "01";
            lstArrayChk[1] = "02";
            lstArrayChk[2] = "03";
        } else {
            $("#chkPendiente").attr('checked', false);
            $("#chkAprobado").attr('checked', false);
            $("#chkRechazado").attr('checked', false);

            lstArrayChk[0] = "";
            lstArrayChk[1] = "";
            lstArrayChk[2] = "";
        }
    });
}

function InicializarLanguageJson() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {

        lstArrayLanguage = data;
        SetDataTableAprobaciones([]);
        //fnInicializarDatatables();
    });
}

function SetDataTableAprobaciones(dataJson) {

    $('#dtResultadoDetalleSolicitudes').DataTable({
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
            { data: "IdSolicitud", title: "", width: '50px' }, //0
            { data: "IdRiesgo", title: "", width: '50px' }, //1
            { data: "CodigoRiesgo", title: GetLiteralValue('LITHEADCODIGORIESGO'), orderable: false, width: '30px' }, //2
            { data: "Riesgo", title: "Descripción Riesgo", orderable: false, width: '120px' }, //3
            { data: "Impacto", title: GetLiteralValue('LITHEADIMPACTO'), orderable: false, width: '120px' }, //4
            { data: "Proceso", title: "Proceso", orderable: false, width: '50px' }, //5
            { data: "NivelRiesgo", title: GetLiteralValue('LITHEADNIVELRIESGO'), orderable: false, width: '50px' }, //6
            { data: "CodigoSolicitud", title: "Código Solicitud", orderable: false, width: '30px' }, //7
            { data: "UsuarioSolicitante", title: "Usuario solicitante", orderable: false, width: '150px' }, //8
            { data: "FechaSolicitud", title: "Fecha solicitud", orderable: false, width: '30px' }, //9
            { data: "IdUsuarioPermiso", title: GetLiteralValue('LITHEADUSUARIOPERMISO'), orderable: false, width: '220px' }, //10
            { data: "UsuarioAprobador", title: GetLiteralValue('LITHEADUSUARIOAPROBADOR'), orderable: false, width: '150px' }, //11
            { data: "EstadoControl", title: GetLiteralValue('LITHEADESTADOCONTROL'), orderable: false, width: '50px' }, //12
            { data: "FechaModificacion", title: "Fecha y hora atención", orderable: false, width: '50px' }, //13
            { data: "Comentario", title: GetLiteralValue('LITHEADCOMENTARIO'), orderable: false, width: '100px' }, //14
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '100',
                defaultContent: ''
            } //15
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
                    return "<textarea name='textarea' id='idtext' cols='20' style='font:12px Arial, Helvetica; margin: 0px; height: 50px; width: 150px; resize:none; border:none;' disabled>" + row.Impacto + "</textarea>";
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
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_mas = '';
                    var array = row.IdUsuarioPermisoList.split(";");
                    if (array.length > 1) {
                        HTML_mas = '<span>y más.</span>';
                    }
                    var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + '</span>';
                    if (row.IdUsuarioPermiso != "")
                        HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + ' ' + HTML_mas + '</span><span class="gr-bl gr-bl-4" title="Ver Detalle Usuarios"><a id="MyLink" href="javascript:abrirModalUsuarios(\'' + row.IdUsuarioPermisoList + '\')"><img src="/lib/estilos/Repsol/images/busqueda.png"/></a></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [14],
                "render": function (data, type, row) {

                    var HTML_p = "<textarea name='textarea' id='idtext' cols='15' style='font:12px Arial, Helvetica; margin: 0px; height: 50px; width: 150px; resize:none; border:none;' disabled>" + row.Comentario + "</textarea>";
                    if (row.Comentario == "")
                        HTML_p = '<span class="gr-bl gr-bl-2"></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [15],
                "render": function (data, type, row, meta) {

                    //var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdSolicitud + '</span>';
                    var HTML_p = '<tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoAprobar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\',' + '\'' + row.DescripcionControl + '\')"><input type="button" style="width: 65px" id="btnAprobar" class="btn btn-primary mtl10 btnRechazar" value="APROBAR" /></a></span></td></tr><p></p><tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoRechazar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\')"><input type="button" style="width: 65px" id="btnRechazar" class="btn btn-primary mtl10 btnAprobar" value="RECHAZAR" /></a></span></td></tr>';
                    if (row.EstadoControl != "PENDIENTE" || row.IdUsuarioAprobador != usuarioActual)
                        HTML_p = '<span class="gr-bl gr-bl-8"></span>';

                    return HTML_p;
                }
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    //closerLoading();
}

function fnCargarGrillaSolicitudesServer() {
    SetDataTableAprobacionesServer();
}

function GetParameterDatatable() {
    var cbk1 = lstArrayChk[0];
    var cbk2 = lstArrayChk[1];
    var cbk3 = lstArrayChk[2];
    var cbk4 = ($("#chkTodos").is(":checked")) ? "01,02,03" : "";
    var IdEstadoControl = cbk4 == "" ? cbk1 + ',' + cbk2 + ',' + cbk3 : cbk4;

    var dataToSend = {
        codSolicitud: '',
        riesgo: '',
        idNivelRiesgo: '',
        fechadesde: '',
        fechahasta: '',
        idEstadoControl: ''
    };

    dataToSend.codSolicitud = $("#" + panel + "txtCodSolicitud").val();
    dataToSend.riesgo = $("#" + panel + "txtRiesgo").val();
    dataToSend.idNivelRiesgo = $("#" + panel + "ddlNivelRiesgo").val();
    dataToSend.fechadesde = $("#" + panel + "txtDesde_search").val();
    dataToSend.fechahasta = $("#" + panel + "txtHasta_search").val();
    dataToSend.idEstadoControl = IdEstadoControl;
    return dataToSend;
}

function SetDataTableAprobacionesServer() {
    var param = GetParameterDatatable();
    console.log(param);
    $('#dtResultadoDetalleSolicitudes').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: URL_PAGINA + '/GetDetalleSolicitudesSodServer',
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
                    idNivelRiesgo: '',
                    fechadesde: '',
                    fechahasta: '',
                    idEstadoControl: ''
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = d.length;
                req.search = d.search['value'];
                req.codSolicitud = param.codSolicitud;
                req.riesgo = param.riesgo;
                req.idNivelRiesgo = param.idNivelRiesgo;
                req.fechadesde = param.fechadesde;
                req.fechahasta = param.fechahasta;
                req.idEstadoControl = param.idEstadoControl;
                return req;
            },
            dataSrc: function (json) {
                json.draw = json.d.draw;
                json.recordsTotal = json.d.recordsTotal;
                json.recordsFiltered = json.d.recordsFiltered;
                json.data = json.d.data;
                dataCountDT = json.recordsTotal;
                $('#btnExpandAll').attr("disabled", false);
                $('#btnCollapseAll').attr("disabled", false);
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
            { data: "IdSolicitud", title: "", width: '50px' }, //0
            { data: "IdRiesgo", title: "", width: '50px' }, //1
            { data: "CodigoRiesgo", title: GetLiteralValue('LITHEADCODIGORIESGO'), orderable: false, width: '30px' }, //2
            { data: "Riesgo", title: "Descripción Riesgo", orderable: false, width: '120px' }, //3
            { data: "Impacto", title: GetLiteralValue('LITHEADIMPACTO'), orderable: false, width: '120px' }, //4
            { data: "Proceso", title: "Proceso", orderable: false, width: '50px' }, //5
            { data: "NivelRiesgo", title: GetLiteralValue('LITHEADNIVELRIESGO'), orderable: false, width: '50px' }, //6
            { data: "CodigoSolicitud", title: "Código Solicitud", orderable: false, width: '30px' }, //7
            { data: "UsuarioSolicitante", title: "Usuario solicitante", orderable: false, width: '150px' }, //8
            { data: "FechaSolicitud", title: "Fecha solicitud", orderable: false, width: '30px' }, //9
            { data: "IdUsuarioPermiso", title: GetLiteralValue('LITHEADUSUARIOPERMISO'), orderable: false, width: '220px' }, //10
            { data: "UsuarioAprobador", title: GetLiteralValue('LITHEADUSUARIOAPROBADOR'), orderable: false, width: '150px' }, //11
            { data: "EstadoControl", title: GetLiteralValue('LITHEADESTADOCONTROL'), orderable: false, width: '50px' }, //12
            { data: "FechaModificacion", title: "Fecha y hora atención", orderable: false, width: '50px' }, //13
            { data: "Comentario", title: GetLiteralValue('LITHEADCOMENTARIO'), orderable: false, width: '100px' }, //14
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '100',
                defaultContent: ''
            } //15
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
                    return "<textarea name='textarea' id='idtext' cols='20' style='font:12px Arial, Helvetica; margin: 0px; height: 50px; width: 150px; resize:none; border:none;' disabled>" + row.Impacto + "</textarea>";
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
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_mas = '';
                    var array = row.IdUsuarioPermisoList.split(";");
                    if (array.length > 1) {
                        HTML_mas = '<span>y más.</span>';
                    }
                    var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + '</span>';
                    if (row.IdUsuarioPermiso != "")
                        HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdUsuarioPermiso + ' ' + HTML_mas + '</span><span class="gr-bl gr-bl-4" title="Ver Detalle Usuarios"><a id="MyLink" href="javascript:abrirModalUsuarios(\'' + row.IdUsuarioPermisoList + '\')"><img src="/lib/estilos/Repsol/images/busqueda.png"/></a></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [14],
                "render": function (data, type, row) {

                    var HTML_p = "<textarea name='textarea' id='idtext' cols='15' style='font:12px Arial, Helvetica; margin: 0px; height: 50px; width: 150px; resize:none; border:none;' disabled>" + row.Comentario + "</textarea>";
                    if (row.Comentario == "")
                        HTML_p = '<span class="gr-bl gr-bl-2"></span>';
                    return HTML_p;
                }
            },
            {
                "targets": [15],
                "render": function (data, type, row, meta) {

                    //var HTML_p = '<span class="gr-bl gr-bl-8">' + row.IdSolicitud + '</span>';
                    var HTML_p = '<tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoAprobar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\',' + '\'' + row.DescripcionControl + '\')"><input type="button" style="width: 65px" id="btnAprobar" class="btn btn-primary mtl10 btnRechazar" value="APROBAR" /></a></span></td></tr><p></p><tr><td><span><a id="MyLink" href="javascript:fnAbrirDialogoRechazar(\'' + row.IdSolicitud + '\',' + '\'' + row.CodigoRiesgo + '\',' + '\'' + row.IdRiesgo + '\',' + '\'' + row.IdUsuarioPermisoList + '\')"><input type="button" style="width: 65px" id="btnRechazar" class="btn btn-primary mtl10 btnAprobar" value="RECHAZAR" /></a></span></td></tr>';
                    if (row.EstadoControl != "PENDIENTE" || row.IdUsuarioAprobador != usuarioActual)
                        HTML_p = '<span class="gr-bl gr-bl-8"></span>';

                    return HTML_p;
                }
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    //closerLoading();
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
        dataset[i] = array[i].split("|");
    }
    $("#modalUsuarios").dialog({
        autoOpen: false,
        width: 800,
        height: 400,
        modal: true,
        //title: GetLiteralValue('LITTXTANULACIONSOL') + ':' + codsolsalesforce,
        title: GetLiteralValue('LITTITUSUARIOSAFECTADOS'),
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
        "info": false,
        "columns": [
            { title: "Código" },
            { title: "Usuario" },
            { title: "Rol" },
            { title: "Perfil" }
        ],
        language: lstArrayLanguage
    });
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

function browseRow(id) {

    if (id != "" && id != null) {
        var str = '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=' + id + '&mode=browse" width="100%" height="95%" frameBorder="0"></iframe>';
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', str);
        $("#myModal").addClass("open");
    }
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

function ValidarDataTable() {
    if (dataCountDT <= 0) {
        alert("No existe registros para descargar");
        return false;
    } else {
        return true;
    }
}