var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'GestionReglasSOD.aspx';
var listaDivToggle = ["divFiltros", "divResultados", "divInformacion", "divInformacionEdit", "divInformacionBrowse","divConfigFunciones"];
var lstArraySF = [];
var Literales = new Array();


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btnCreate");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var prm = Sys.WebForms.PageRequestManager.getInstance();
prm.add_endRequest(function () {
    $("#btnAgregarRegla").on("click", function () {
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=0" frameBorder="0" style="overflow: scroll; width: 99%; height:90%;border: 0px solid black;"></iframe>');
        $("#myModal").addClass("open");
    });
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


$(document).ready(function () {
    $("#btnAgregarRegla").on("click", function () {
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=0&mode=add" width="100%" height="95%" frameBorder="0"></iframe>');
        $("#myModal").addClass("open");
    });
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
    SetLiterales();
    fnGetAllcboEstados(' '); 
    fnGetAllcboTipoRiesgo(' ');
    fnGetAllcboMitigable(' ');
    InitAnimatedCollapse();
    InicializarLanguageJson();

    $("#" + panel + "btnExcel").hide();

/*    CerrarVentana();*/
    
    $("#" + panel + "btnConsultar").click(function (e) {
        fnCargarGrillaSolicitudesServer();
        var btnExcel = $("#" + panel + "btnExcel");
        btnExcel.show();
    });

    $("#" + panel + "btnLimpiar").click(function (e) {
        fnResetarFiltro();
        //e.preventDefault();
    });
});

function CerrarVentana() {
    debugger;
    //$("#myModal").modal('hide');
    $("#myModal").removeClass("open");
};


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
        SetDatableAprobaciones([]);
        //fnInicializarDatatables();
    });
}


function fnCargarGrillaSolicitudesServer() {
    //addLoading_table();
    //LimpiarDataCombos();
    SetDatableAprobacionesServer();
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


function fnGetAllcboMitigable() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarReglaMitigable',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlMitigable").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlMitigable").append($("<option></option>").attr("value", this.Code).text(this.Description))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}



function GetParameterDatatable() {
    var dataToSend = {
        nombre: '',
        idEstado: '',
        idTipoRiesgo: '',
        idReglaMitigable: ''
    };
    dataToSend.nombre = $("#" + panel + "txtNombre").val();
    dataToSend.idEstado = $("#" + panel + "ddlEstado").val();
    dataToSend.idTipoRiesgo = $("#" + panel + "ddlTipoRiesgo").val();
    dataToSend.idReglaMitigable = $("#" + panel + "ddlMitigable").val();
    return dataToSend;
}

function SetDatableAprobacionesServer() {
    var param = GetParameterDatatable();
    console.log(param.idEstado);
    $('#dtResultadoReglas').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: URL_PAGINA + '/GetReglasSodServer',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                var req = {
                    draw: 0,
                    start: 0,
                    length: 0,
                    search: '',
                    nombre: '',
                    idEstado: '',
                    idTipoRiesgo: '',
                    idReglaMitigable: ''
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = d.length;
                req.search = d.search['value'];
                req.nombre = param.nombre;
                req.idEstado = param.idEstado;
                req.idTipoRiesgo = param.idTipoRiesgo;
                req.idReglaMitigable = param.idReglaMitigable;
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
                //closeLoading_table();
                return json.data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                //closeLoading_table();
            }
        },
        select: {
            style: 'multi',
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
            { data: "CODIGO_RIESGO", defaultContent: "", title: GetLiteralValue('LITHEADCODIGORIESGO'), width: '50px' },
            { data: "TIPORIESGO", title: GetLiteralValue('LITHEADTIPORIESGO'), orderable: false, width: '50px' },
            { data: "ESTADO", title: GetLiteralValue('LITHEADESTADO'), orderable: true, width: '10px' },
            { data: "REGLA", title: GetLiteralValue('LITHEADREGLA'), orderable: true, width: '100px' },
            { data: "IMPACTO", title: GetLiteralValue('LITHEADIMPACTO'), orderable: true, width: '80' },
            { data: "NIVELRIESGO", title: GetLiteralValue('LITHEADNIVELRIESGO'), orderable: false, width: '50' },
            { data: "IDFUNCION1", title: GetLiteralValue('LITHEADIDFUNCION1'), orderable: true, width: '50' },
            { data: "FUNCIONNEGOCIO1", title: GetLiteralValue('LITHEADFUNCIONNEGOCIO1'), orderable: false, width: '100px' },
            { data: "IDFUNCION2", title: GetLiteralValue('LITHEADIDFUNCION2'), orderable: false, width: '50' },
            { data: "FUNCIONNEGOCIO2", title: GetLiteralValue('LITHEADFUNCIONNEGOCIO2'), orderable: false, width: '100' },
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width:'50',
                defaultContent: ''
            },
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": true,
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('link-popup-sf');
                },
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:browseRow(\'' + row.CODIGO_RIESGO + '\')">' + row.CODIGO_RIESGO + '</a>';
                }
            },
            {
                "targets": [4],
                "render": function (data, type, row) {
                    return "<textarea name='textarea' id='idtext' cols='22' style='font:12.8px Arial, Helvetica; margin: 0px; width: 244px; resize:none; border:none;' disabled>" + row.IMPACTO + "</textarea>";
                }
            },
            {
                "targets": [5],
                "render": function (data, type, row, meta) {
                    debugger;
                    if (row.NIVELRIESGO === 'ALTO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:red; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    } else if (row.NIVELRIESGO === 'BAJO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:green; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    } else if (row.NIVELRIESGO === 'MEDIO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:#9B870C; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    }
                    return HTML_p;
                }
            },
            {
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_p = '<span class="gr-bl gr-bl-8">' + row.CODIGO_RIESGO + '</span>';
                    HTML_p = '<span class="gr-bl gr-bl-8"></span><span class="gr-bl gr-bl-4"><a id="MyLink" href="javascript:editRow(\'' + row.CODIGO_RIESGO + '\')"><img src="/lib/estilos/Repsol/images/editar.png" alt="Ver Detalle Placas"/></a></span><span id="Pl_' + row.CODIGO_RIESGO + '" style="display:none;">' + row.CODIGO_RIESGO + '</span>';
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
    //closerLoading();
}


function editRow(id) {
    if (id != "" && id != null) {
        var str = '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=' + id + '&mode=edit" width="100%" height="95%" frameBorder="0"></iframe>';
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', str);
        $("#myModal").addClass("open");
    }
}

function browseRow(id) {
    debugger;
    if (id != "" && id != null) {
        var str = '<iframe id="modal-iframe" src="./GestionReglasDetalleSOD.aspx?id=' + id + '&mode=browse" width="100%" height="95%" frameBorder="0"></iframe>';
        document.getElementById("modalFrame").insertAdjacentHTML('beforeend', str);
        $("#myModal").addClass("open");
    }
}


function fnResetarFiltro() {
    if ($("#" + panel + "ddlEstado").length) {
        $("#" + panel + "ddlEstado").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlTipoRiesgo").length) {
        $("#" + panel + "ddlTipoRiesgo").prop('selectedIndex', 0);
    }
    $("#" + panel + "txtNombre").val('');

    $("#" + panel + "txtNombre").focus();
}

function CambioNPersonal() {
    $("#" + panel + "txtCodigoFuncion").val(document.getElementById('nPersonal').value);
}
function CambioNombrePersonal() {
    $("#" + panel + "txtNombreFuncion").val(document.getElementById('nom_Personal').value);
}



function SetLiterales() {
    var Literal1 = { LiteralName: 'LITHEADCODIGORIESGO', LiteralValue: $("#HT_LITHEADCODIGORIESGO").val() }; Literales.push(Literal1);
    var Literal2 = { LiteralName: 'LITHEADTIPORIESGO', LiteralValue: $("#HT_LITHEADTIPORIESGO").val() }; Literales.push(Literal2);
    var Literal3 = { LiteralName: 'LITHEADESTADO', LiteralValue: $("#HT_LITHEADESTADO").val() }; Literales.push(Literal3);
    var Literal4 = { LiteralName: 'LITHEADREGLA', LiteralValue: $("#HT_LITHEADREGLA").val() }; Literales.push(Literal4);
    var Literal5 = { LiteralName: 'LITHEADIMPACTO', LiteralValue: $("#HT_LITHEADIMPACTO").val() }; Literales.push(Literal5);
    var Literal6 = { LiteralName: 'LITHEADNIVELRIESGO', LiteralValue: $("#HT_LITHEADNIVELRIESGO").val() }; Literales.push(Literal6);
    var Literal7 = { LiteralName: 'LITHEADIDFUNCION1', LiteralValue: $("#HT_LITHEADIDFUNCION1").val() }; Literales.push(Literal7);
    var Literal8 = { LiteralName: 'LITHEADFUNCIONNEGOCIO1', LiteralValue: $("#HT_LITHEADFUNCIONNEGOCIO1").val() }; Literales.push(Literal8);
    var Literal9 = { LiteralName: 'LITHEADIDFUNCION2', LiteralValue: $("#HT_LITHEADIDFUNCION2").val() }; Literales.push(Literal9);
    var Literal10 = { LiteralName: 'LITHEADFUNCIONNEGOCIO2', LiteralValue: $("#HT_LITHEADFUNCIONNEGOCIO2").val() }; Literales.push(Literal10);
    var Literal11 = { LiteralName: 'LITHEADACCIONES', LiteralValue: $("#HT_LITHEADACCIONES").val() }; Literales.push(Literal11);
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
    $('#dtResultadoReglas').DataTable({
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
            { data: "CODIGO_RIESGO", defaultContent: "", title: GetLiteralValue('LITHEADCODIGORIESGO'), width: '50px' },
            { data: "TIPORIESGO", title: GetLiteralValue('LITHEADTIPORIESGO'), orderable: false, width: '50px' },
            { data: "ESTADO", title: GetLiteralValue('LITHEADESTADO'), orderable: true, width: '10px' },
            { data: "REGLA", title: GetLiteralValue('LITHEADREGLA'), orderable: true, width: '100px' },
            { data: "IMPACTO", title: GetLiteralValue('LITHEADIMPACTO'), orderable: true, width: '80' },
            { data: "NIVELRIESGO", title: GetLiteralValue('LITHEADNIVELRIESGO'), orderable: false, width: '50' },
            { data: "IDFUNCION1", title: GetLiteralValue('LITHEADIDFUNCION1'), orderable: true, width: '50' },
            { data: "FUNCIONNEGOCIO1", title: GetLiteralValue('LITHEADFUNCIONNEGOCIO1'), orderable: false, width: '100px' },
            { data: "IDFUNCION2", title: GetLiteralValue('LITHEADIDFUNCION2'), orderable: false, width: '50' },
            { data: "FUNCIONNEGOCIO2", title: GetLiteralValue('LITHEADFUNCIONNEGOCIO2'), orderable: false, width: '100' },
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '50',
                defaultContent: ''
            },
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": true,
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('link-popup-sf');
                },
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:browseRow(\'' + row.CODIGO_RIESGO + '\')">' + row.CODIGO_RIESGO + '</a>';
                }
            },
            {
                "targets": [5],
                "render": function (data, type, row, meta) {
                    debugger;
                    if (row.NIVELRIESGO === 'ALTO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:red; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    } else if (row.NIVELRIESGO === 'BAJO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:green; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    } else if (row.NIVELRIESGO === 'MEDIO') {
                        var HTML_p = '<span class="gr-bl gr-bl-8" style="Color:#9B870C; font-weight:bold;">' + row.NIVELRIESGO + '</span>';
                    }
                    return HTML_p;
                }
            },
            {
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_p = '';
                    HTML_p = '<span class="gr-bl gr-bl-12" title="Editar"><a id="MyLink" href="javascript:editRow(\'' + row.CODIGO_RIESGO + '\')"><img src="/lib/estilos/Repsol/images/editar.png"/></a></span>';
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