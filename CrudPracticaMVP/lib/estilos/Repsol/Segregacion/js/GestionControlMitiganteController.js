var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles
var URL_PAGINA = 'GestionControlMitigante.aspx';
var listaDivToggle = ["divFiltros", "divResultados"];
var lstArraySF = [];
var Literales = new Array();




$(document).ready(function () {

    jQuery('#PageFooter').css('display', 'none');
    SetLiterales();
    fnGetAllcboEstados(' ');
    fnGetAllcboFrecuencias(' ');
    fnGetAllcboProcesos(' ');
    //fnGetAllcboMitigable(' ');
    InitAnimatedCollapse();
    InicializarLanguageJson();
    /*    CerrarVentana();*/

    $("#" + panel + "btnConsultar").click(function (e) {
        fnCargarGrillaSolicitudesServer();
        //e.preventDefault();
    });

    $("#" + panel + "btnLimpiar").click(function (e) {
        fnResetarFiltro();
        //e.preventDefault();
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



function fnGetAllcboFrecuencias() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarFrecuencias',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlFrecuencia").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlFrecuencia").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}


function fnGetAllcboProcesos() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarProcesos',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlProceso").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlProceso").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}



/* Modal */



function fnGetAllcboFrecuenciasModal() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarFrecuenciasModal',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlFrecuenciaModal").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlFrecuenciaModal").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function fnGetAllcboProcesosModal() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarProcesosModal',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlProcesoModal").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlProcesoModal").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}


function fnGetAllcboTipoControlModal() {
    var params = '';
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/ListarTipoControlModal',
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#" + panel + "ddlTipoControlModal").html("");
            $.each(response.d, function () {
                $("#" + panel + "ddlTipoControlModal").append($("<option></option>").attr("value", this.Valor).text(this.Descripcion))
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
    var dataToSend = {
        descripcion: '',
        idEstado: '',
        idFrecuencia: '',
        idProceso: ''
    };
    dataToSend.descripcion = $("#" + panel + "txtDescripcion").val();
    dataToSend.idEstado = $("#" + panel + "ddlEstado").val();
    dataToSend.idFrecuencia = $("#" + panel + "ddlFrecuencia").val();
    dataToSend.idProceso = $("#" + panel + "ddlProceso").val();
    return dataToSend;
}


function SetDatableAprobacionesServer() {
    var param = GetParameterDatatable();
    $('#dtResultados').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: URL_PAGINA + '/GetControlMitiganteSodServer',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                var req = {
                    draw: 0,
                    start: 0,
                    length: 0,
                    search: '',
                    descripcion: '',
                    idEstado: '',
                    idFrecuencia: '',
                    idProceso: ''
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = d.length;
                req.search = d.search['value'];
                req.descripcion = param.descripcion;
                req.idEstado = param.idEstado;
                req.idFrecuencia = param.idFrecuencia;
                req.idProceso = param.idProceso;
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
        autoWidth: true,
        fixedColumns: true,
        scrollX: true,
        //scrollCollapse: true,
        columns: [
            { data: "CODIGO_CONTROL", title: GetLiteralValue('LITHEADCODIGOCONTROL'), width: '50px' },
            { data: "PROCESO", title: GetLiteralValue('LITHEADPROCESO'), orderable: false, width: '50px' },
            { data: "RIESGOASOCIADO", title: GetLiteralValue('LITHEADRIESGOASOCIADO'), orderable: false, width: '50px' },
            //{ data: "DESCRIPCION", title: GetLiteralValue('LITHEADCONTROL'), orderable: false, width: '50px' },
            { data: "TIPOCONTROL", title: GetLiteralValue('LITHEADTIPOCONTROL'), orderable: false, width: '50px' },
            { data: "FRECUENCIA", title: GetLiteralValue('LITHEADFRECUENCIA'), orderable: false, width: '50px' },
            { data: "RESPONSABLE_EJECUCION", title: GetLiteralValue('LITHEADRESPONSABLEEJECUCION'), orderable: false, width: '50px' },
            { data: "RESPONSABLE_MONITOREO", title: GetLiteralValue('LITHEADRESPONSABLEMONITOREO'), orderable: false, width: '50px' },
            { data: "EVIDENCIA", title: GetLiteralValue('LITHEADEVIDENCIA'), orderable: false, width: '50px' },
            { data: "DOCUMENTACION_PROCESO", title: GetLiteralValue('LITHEADDOCUMENTACION'), orderable: false, width: '50px' },
            { data: "SUFICIENCIA_CONTROL", title: GetLiteralValue('LITHEADSUFICIENCIA'), orderable: false, width: '50px' },
            { data: "COMENTARIO_CONTROL", title: GetLiteralValue('LITHEADCOMENTARIO'), orderable: false, width: '50px' },
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '20',
                defaultContent: ''
            }
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": true,
                "render": function (data, type, row, meta) {
                    var HTML_p = '<div class="gr-bl gr-bl-4"><a id="MyLink" href="javascript:fnAbrirDialogoMitigacionBrowse(\'' + row.IDCONTROL + '\',' + '\'' + row.CODIGO_CONTROL + '\')"> ' + row.CODIGO_CONTROL + '</a></div>';
                    return HTML_p;
                }
            },
            {
                "className": "dt-center",
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_p = '';
                    if (row.COMENTARIO_CONTROL != "" && row.COMENTARIO_CONTROL != null) {
                        HTML_p = "<textarea name='textarea' id='idtext' cols='22' style='font:12.8px Arial, Helvetica; margin: 0px;  width: 180px; resize:none; border:none;' disabled>" + row.COMENTARIO_CONTROL + "</textarea>";
                        
                    }
                    return HTML_p;
                }
            },
            {
                "className":"dt-center",
                "targets": [11],
                "render": function (data, type, row, meta) {
                    var HTML_p = '<div class="gr-bl gr-bl-12" style="text-align:center;"><a id="MyLink" href="javascript:fnAbrirDialogoMitigacionEdit(\'' + row.IDCONTROL + '\',' + '\'' + row.CODIGO_CONTROL + '\')"><img src="/lib/estilos/Repsol/images/editar.png" alt="Editar Control"/></a></div>';
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


function closerLoading() {
    $('.modal-backdrop').parent().remove();
}

function closeLoading_table() {
    $("#Loading_table").html("");
}

function InicializarLanguageJson() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {
        lstArrayLanguage = data;
        SetDatableAprobaciones([]);
    });
}

function fnResetarFiltro() {
    if ($("#" + panel + "ddlEstado").length) {
        $("#" + panel + "ddlEstado").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlProceso").length) {
        $("#" + panel + "ddlProceso").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlFrecuencia").length) {
        $("#" + panel + "ddlFrecuencia").prop('selectedIndex', 0);
    }


    $("#" + panel + "txtDescripcion").val('');

    $("#" + panel + "txtDescripcion").focus();
}



function fnAbrirDialogoMitigacion() {
    fnGetAllcboFrecuenciasModal(' ');
    fnGetAllcboProcesosModal(' ');
    fnGetAllcboTipoControlModal(' ');
    $("#modalMitigacion").dialog({
        autoOpen: false,
        width: 795,
        height: 465,
        modal: true,
        title: GetLiteralValue('LITTITMODALADD'),
        buttons: [
            {
                id: "Guardar",
                text: "Guardar",
                click: function () {
                    var ok = confirm(GetLiteralValue('LITADDCONFIRMA'));
                    var codProcesoModal = $("#" + panel + "ddlProcesoModal").val();
                    var descripcionModal = $("#" + panel + "txtDescripcionModal").val();;
                    var codTipoControlModal = $("#" + panel + "ddlTipoControlModal").val();
                    var codFrecuenciaModal = $("#" + panel + "ddlFrecuenciaModal").val();
                    var responsableMonitoreoModal = $("#" + panel + "txtResponsableMonitoreoModal").val();
                    var responsableEjecucionModal = $("#" + panel + "txtResponsableEjecucionModal").val();
                    var evidenciaModal = $("#" + panel + "txtEvidenciaModal").val();
                    var documentacionModal = $("#" + panel + "txtDocumentacionModal").val();
                    var suficienciaModal = $("#" + panel + "txtSuficienciaModal").val();
                    var comentarioModal = $("#" + panel + "txtComentarioModal").val();


                    if (ok) {

                        if (codProcesoModal == '0') {
                            alert(GetLiteralValue('LITVALPROCESO'));
                            return false;
                        }
                        if (codTipoControlModal == '00') {
                            alert(GetLiteralValue('LITVALTIPOCONTROL'));
                            return false;
                        }
                        if (codFrecuenciaModal == '00') {
                            alert(GetLiteralValue('LITVALFRECUENCIA'));
                            return false;
                        }
                        if (descripcionModal == "") {
                            alert(GetLiteralValue('LITVALDESCRIPCION'));
                            return false;
                        }

                        if (responsableMonitoreoModal == "") {
                            alert(GetLiteralValue('LITVALRESPONSABLEMONITOREO'));
                            return false;
                        }
                        if (responsableEjecucionModal == "") {
                            alert(GetLiteralValue('LITVALRESPONSABLEEJECUCION'));
                            return false;
                        }
                        else {
                            GuardarControlMitigacion();
                        }
                    }
                }
            },
            {
                id: "Cerrar",
                text: "Cerrar",
                click: function () {
                    $("#" + panel + "txtObservacionAnulacion").val('');
                    closeLoading_table();
                    $(this).dialog("close");
                }
            }
        ] 
    });
    $("#modalMitigacion").dialog("open");
}

function GuardarControlMitigacion() {
    var codProcesoModal = $("#" + panel + "ddlProcesoModal").val();
    var descripcionModal = $("#" + panel + "txtDescripcionModal").val();;
    var codTipoControlModal = $("#" + panel + "ddlTipoControlModal").val();
    var codFrecuenciaModal = $("#" + panel + "ddlFrecuenciaModal").val();
    var responsableMonitoreoModal = $("#" + panel + "txtResponsableMonitoreoModal").val();
    var responsableEjecucionModal = $("#" + panel + "txtResponsableEjecucionModal").val();
    var evidenciaModal = $("#" + panel + "txtEvidenciaModal").val();
    var documentacionModal = $("#" + panel + "txtDocumentacionModal").val();
    var suficienciaModal = $("#" + panel + "txtSuficienciaModal").val();
    var comentarioModal = $("#" + panel + "txtComentarioModal").val();

    //$(".ui-dialog-buttonpane").css("display", "none");
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/SetControlMitigante',
        data: "{codProcesoModal:'" + codProcesoModal +
            "',descripcionModal:'" + descripcionModal +
            "',codTipoControlModal:'" + codTipoControlModal +
            "',codFrecuenciaModal:'" + codFrecuenciaModal +
            "',responsableMonitoreoModal:'" + responsableMonitoreoModal +
            "',responsableEjecucionModal:'" + responsableEjecucionModal +
            "',evidenciaModal:'" + evidenciaModal +
            "',documentacionModal:'" + documentacionModal +
            "',suficienciaModal:'" + suficienciaModal +
            "',comentarioModal:'" + comentarioModal +
            "'}",// data es un arreglo JSON que contiene los parámetros que van a ser recibidos por la función del servidor
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",
        success: function (resultado) {


            clearLoading();

            if (resultado.d != "0") {
                alert(GetLiteralValue('LITMSJGUARDADOCORRECTO'));
                fnResetarCamposModal();

            }
            else {
                alert(GetLiteralValue('LITMSJGUARDADOERROR'));
            }

            $("#modalMitigacion").dialog("close");

            //$(".ui-dialog-buttonpane").css("display", "");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(GetLiteralValue('LITMSJGUARDADOERROR'));

        }
    });
}


function UpdateControlMitigacion() {
    var codProcesoModal = $("#" + panel + "ddlProcesoModal").val();
    var codigoControlModal = $("#" + panel + "txtCodigoControlModal").val();
    var descripcionModal = $("#" + panel + "txtDescripcionModal").val();;
    var codTipoControlModal = $("#" + panel + "ddlTipoControlModal").val();
    var codFrecuenciaModal = $("#" + panel + "ddlFrecuenciaModal").val();
    var responsableMonitoreoModal = $("#" + panel + "txtResponsableMonitoreoModal").val();
    var responsableEjecucionModal = $("#" + panel + "txtResponsableEjecucionModal").val();
    var evidenciaModal = $("#" + panel + "txtEvidenciaModal").val();
    var documentacionModal = $("#" + panel + "txtDocumentacionModal").val();
    var suficienciaModal = $("#" + panel + "txtSuficienciaModal").val();
    var comentarioModal = $("#" + panel + "txtComentarioModal").val();

    //$(".ui-dialog-buttonpane").css("display", "none");
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/UpdateControlMitigante',
        data: "{codProcesoModal:'" + codProcesoModal +
            "',codigoControlModal:'" + codigoControlModal +
            "',descripcionModal:'" + descripcionModal +
            "',codTipoControlModal:'" + codTipoControlModal +
            "',codFrecuenciaModal:'" + codFrecuenciaModal +
            "',responsableMonitoreoModal:'" + responsableMonitoreoModal +
            "',responsableEjecucionModal:'" + responsableEjecucionModal +
            "',evidenciaModal:'" + evidenciaModal +
            "',documentacionModal:'" + documentacionModal +
            "',suficienciaModal:'" + suficienciaModal +
            "',comentarioModal:'" + comentarioModal +
            "'}",// data es un arreglo JSON que contiene los parámetros que van a ser recibidos por la función del servidor
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",
        success: function (resultado) {


            clearLoading();

            if (resultado.d != "0") {
                alert(GetLiteralValue('LITMSJACTUALIZADOCORRECTO'));
                fnResetarCamposModal();
                fnCargarGrillaSolicitudesServer();
            }
            else {
                alert(GetLiteralValue('LITMSJACTUALIZADOERROR'));
            }

            $("#modalMitigacion").dialog("close");

            //$(".ui-dialog-buttonpane").css("display", "");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(GetLiteralValue('LITMSJACTUALIZADOERROR'));

        }
    });
}
function fnResetarCamposModal() {
    if ($("#" + panel + "ddlProcesoModal").length) {
        $("#" + panel + "ddlProcesoModal").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlTipoControlModal").length) {
        $("#" + panel + "ddlTipoControlModal").prop('selectedIndex', 0);
    }
    if ($("#" + panel + "ddlFrecuenciaModal").length) {
        $("#" + panel + "ddlFrecuenciaModal").prop('selectedIndex', 0);
    }

    $("#" + panel + "txtCodigoControlModal").val('');
    $("#" + panel + "txtDescripcionModal").val('');
    $("#" + panel + "txtResponsableMonitoreoModal").val('');
    $("#" + panel + "txtResponsableEjecucionModal").val('');
    $("#" + panel + "txtEvidenciaModal").val('');
    $("#" + panel + "txtDocumentacionModal").val('');
    $("#" + panel + "txtSuficienciaModal").val('');
    $("#" + panel + "txtComentarioModal").val('');

    $("#" + panel + "txtDescripcionModal").focus();
}


function fnResetarCamposModalBrowse() {

    $("#" + panel + "txtDescripcionModalBrowse").val('');
    $("#" + panel + "txtResponsableMonitoreoModalBrowse").val('');
    $("#" + panel + "txtResponsableEjecucionModalBrowse").val('');
    $("#" + panel + "txtEvidenciaModalBrowse").val('');
    $("#" + panel + "txtDocumentacionModalBrowse").val('');
    $("#" + panel + "txtSuficienciaModalBrowse").val('');
    $("#" + panel + "txtComentarioModalBrowse").val('');
    $("#" + panel + "txtProcesoModalBrowse").val('');
    $("#" + panel + "txtTipoControlModalBrowse").val('');
    $("#" + panel + "txtFrecuenciaModalBrowse").val('');
    $("#" + panel + "txtDescripcionModalBrowse").focus();
}


function fnAbrirDialogoMitigacionEdit(IDCONTROL, CODIGO_CONTROL) {

    var sendParameter = { pIdControl: IDCONTROL, pCodigoControl: CODIGO_CONTROL };
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/GetControlMitiganteByCodigo',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                var dataEdit = response.d;

                fnGetAllcboFrecuenciasModal(' ');
                fnGetAllcboProcesosModal(' ');
                fnGetAllcboTipoControlModal(' ');
                $("#" + panel + "ddlTipoControlModal").val(dataEdit.IDTIPOCONTROL);
                $("#" + panel + "ddlFrecuenciaModal").val(dataEdit.IDFRECUENCIA);
                $("#" + panel + "ddlProcesoModal").val(dataEdit.IDPROCESO);
                $("#" + panel + "txtCodigoControlModal").val(dataEdit.CODIGO_CONTROL);
                $("#" + panel + "txtDescripcionModal").val(dataEdit.DESCRIPCION);
                $("#" + panel + "txtResponsableMonitoreoModal").val(dataEdit.RESPONSABLE_MONITOREO);
                $("#" + panel + "txtResponsableEjecucionModal").val(dataEdit.RESPONSABLE_EJECUCION);
                $("#" + panel + "txtEvidenciaModal").val(dataEdit.EVIDENCIA);
                $("#" + panel + "txtDocumentacionModal").val(dataEdit.DOCUMENTACION_PROCESO);
                $("#" + panel + "txtSuficienciaModal").val(dataEdit.SUFICIENCIA_CONTROL);
                $("#" + panel + "txtComentarioModal").val(dataEdit.COMENTARIO_CONTROL);

                $("#modalMitigacion").dialog({
                    autoOpen: false,
                    width: 795,
                    height: 465,
                    modal: true,
                    title: "Mantenimiento de Controles de Riesgo",
                    buttons: [
                        {
                            id: "Guardar",
                            text: "Guardar",
                            click: function () {
                                var ok = confirm('Desea Actualizar Control Mitigación?');
                                var codigoControlModal = $("#" + panel + "txtCodigoControlModal").val();
                                var codProcesoModal = $("#" + panel + "ddlProcesoModal").val();
                                var descripcionModal = $("#" + panel + "txtDescripcionModal").val();;
                                var codTipoControlModal = $("#" + panel + "ddlTipoControlModal").val();
                                var codFrecuenciaModal = $("#" + panel + "ddlFrecuenciaModal").val();
                                var responsableMonitoreoModal = $("#" + panel + "txtResponsableMonitoreoModal").val();
                                var responsableEjecucionModal = $("#" + panel + "txtResponsableEjecucionModal").val();
                                var evidenciaModal = $("#" + panel + "txtEvidenciaModal").val();
                                var documentacionModal = $("#" + panel + "txtDocumentacionModal").val();
                                var suficienciaModal = $("#" + panel + "txtSuficienciaModal").val();
                                var comentarioModal = $("#" + panel + "txtComentarioModal").val();


                                if (ok) {

                                    if (codProcesoModal == '0') {
                                        alert('Debe seleccionar un proceso');
                                        return false;
                                    }
                                    if (codTipoControlModal == '00') {
                                        alert('Debe seleccionar un Tipo Control');
                                        return false;
                                    }
                                    if (codFrecuenciaModal == '00') {
                                        alert('Debe seleccionar una Frecuencia');
                                        return false;
                                    }
                                    if (descripcionModal == "") {
                                        alert('Debe ingresar una descripcion');
                                        return false;
                                    }

                                    if (responsableMonitoreoModal == "") {
                                        alert('Debe ingresar un responsable Monitoreo');
                                        return false;
                                    }
                                    if (responsableEjecucionModal == "") {
                                        alert('Debe ingresar un responsable de Ejecucion');
                                        return false;
                                    }
                                    else {
                                        UpdateControlMitigacion();
                                    }
                                }
                            }
                        },
                        {
                            id: "Cerrar",
                            text: "Cerrar",
                            click: function () {
                                $("#" + panel + "txtObservacionAnulacion").val('');
                                closeLoading_table();
                                fnResetarCamposModal();
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
                $("#modalMitigacion").dialog("open");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function fnAbrirDialogoMitigacionBrowse(IDCONTROL, CODIGO_CONTROL) {

    var sendParameter = { pIdControl: IDCONTROL, pCodigoControl: CODIGO_CONTROL };
    $.ajax({
        type: "POST",
        url: URL_PAGINA + '/GetControlMitiganteByCodigo',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {

            if (response.d != null) {
                var dataBrowse = response.d;

                fnGetAllcboFrecuenciasModal(' ');
                fnGetAllcboProcesosModal(' ');
                fnGetAllcboTipoControlModal(' ');
                $("#" + panel + "txtTipoControlModalBrowse").val(dataBrowse.TIPOCONTROL);
                $("#" + panel + "txtFrecuenciaModalBrowse").val(dataBrowse.FRECUENCIA);
                $("#" + panel + "txtProcesoModalBrowse").val(dataBrowse.PROCESO);
                $("#" + panel + "txtCodigoControlModalBrowse").val(dataBrowse.CODIGO_CONTROL);
                $("#" + panel + "txtDescripcionModalBrowse").val(dataBrowse.DESCRIPCION);
                $("#" + panel + "txtResponsableMonitoreoModalBrowse").val(dataBrowse.RESPONSABLE_MONITOREO);
                $("#" + panel + "txtResponsableEjecucionModalBrowse").val(dataBrowse.RESPONSABLE_EJECUCION);
                $("#" + panel + "txtEvidenciaModalBrowse").val(dataBrowse.EVIDENCIA);
                $("#" + panel + "txtDocumentacionModalBrowse").val(dataBrowse.DOCUMENTACION_PROCESO);
                $("#" + panel + "txtSuficienciaModalBrowse").val(dataBrowse.SUFICIENCIA_CONTROL);
                $("#" + panel + "txtComentarioModalBrowse").val(dataBrowse.COMENTARIO_CONTROL);

                $("#modalMitigacionBrowse").dialog({
                    autoOpen: false,
                    width: 800,
                    height: 600,
                    modal: true,
                    title: "Control de Riesgo - " + dataBrowse.CODIGO_CONTROL,
                    buttons: {
                        "Cancelar": function () {
                            closeLoading_table();
                            fnResetarCamposModalBrowse();
                            $(this).dialog("close");
                        }
                    }

                });
                $("#modalMitigacionBrowse").dialog("open");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function SetLiterales() {
    var Literal1 = { LiteralName: 'LITHEADCODIGOCONTROL', LiteralValue: $("#HT_LITHEADCODIGOCONTROL").val() }; Literales.push(Literal1);
    var Literal2 = { LiteralName: 'LITHEADPROCESO', LiteralValue: $("#HT_LITHEADPROCESO").val() }; Literales.push(Literal2);
    var Literal3 = { LiteralName: 'LITHEADRIESGOASOCIADO', LiteralValue: $("#HT_LITHEADRIESGOASOCIADO").val() }; Literales.push(Literal3);
    var Literal4 = { LiteralName: 'LITHEADTIPOCONTROL', LiteralValue: $("#HT_LITHEADTIPOCONTROL").val() }; Literales.push(Literal4);
    var Literal5 = { LiteralName: 'LITHEADFRECUENCIA', LiteralValue: $("#HT_LITHEADFRECUENCIA").val() }; Literales.push(Literal5);
    var Literal6 = { LiteralName: 'LITHEADRESPONSABLEEJECUCION', LiteralValue: $("#HT_LITHEADRESPONSABLEEJECUCION").val() }; Literales.push(Literal6);
    var Literal7 = { LiteralName: 'LITHEADRESPONSABLEMONITOREO', LiteralValue: $("#HT_LITHEADRESPONSABLEMONITOREO").val() }; Literales.push(Literal7);
    var Literal8 = { LiteralName: 'LITHEADEVIDENCIA', LiteralValue: $("#HT_LITHEADEVIDENCIA").val() }; Literales.push(Literal8);
    var Literal9 = { LiteralName: 'LITHEADDOCUMENTACION', LiteralValue: $("#HT_LITHEADDOCUMENTACION").val() }; Literales.push(Literal9);
    var Literal10 = { LiteralName: 'LITHEADSUFICIENCIA', LiteralValue: $("#HT_LITHEADSUFICIENCIA").val() }; Literales.push(Literal10);
    var Literal11 = { LiteralName: 'LITHEADCOMENTARIO', LiteralValue: $("#HT_LITHEADCOMENTARIO").val() }; Literales.push(Literal11);
    var Literal12 = { LiteralName: 'LITHEADACCIONES', LiteralValue: $("#HT_LITHEADACCIONES").val() }; Literales.push(Literal12);
    var Literal13 = { LiteralName: 'LITHEADCONTROL', LiteralValue: $("#HT_LITHEADCONTROL").val() }; Literales.push(Literal13);
    var Literal14 = { LiteralName: 'LITTITMODALADD', LiteralValue: $("#HT_LITTITMODALADD").val() }; Literales.push(Literal14);
    var Literal15 = { LiteralName: 'LITADDCONFIRMA', LiteralValue: $("#HT_LITADDCONFIRMA").val() }; Literales.push(Literal15);
    var Literal16 = { LiteralName: 'LITVALPROCESO', LiteralValue: $("#HT_LITVALPROCESO").val() }; Literales.push(Literal16);
    var Literal17 = { LiteralName: 'LITVALTIPOCONTROL', LiteralValue: $("#HT_LITVALTIPOCONTROL").val() }; Literales.push(Literal17);
    var Literal18 = { LiteralName: 'LITVALFRECUENCIA', LiteralValue: $("#HT_LITVALFRECUENCIA").val() }; Literales.push(Literal18);
    var Literal19 = { LiteralName: 'LITVALDESCRIPCION', LiteralValue: $("#HT_LITVALDESCRIPCION").val() }; Literales.push(Literal19);
    var Literal20 = { LiteralName: 'LITVALRESPONSABLEMONITOREO', LiteralValue: $("#HT_LITVALRESPONSABLEMONITOREO").val() }; Literales.push(Literal20);
    var Literal21 = { LiteralName: 'LITVALRESPONSABLEEJECUCION', LiteralValue: $("#HT_LITVALRESPONSABLEEJECUCION").val() }; Literales.push(Literal21);
    var Literal22 = { LiteralName: 'LITMSJGUARDADOCORRECTO', LiteralValue: $("#HT_LITMSJGUARDADOCORRECTO").val() }; Literales.push(Literal22);
    var Literal23 = { LiteralName: 'LITMSJGUARDADOERROR', LiteralValue: $("#HT_LITMSJGUARDADOERROR").val() }; Literales.push(Literal23);
    var Literal24 = { LiteralName: 'LITMSJACTUALIZADOCORRECTO', LiteralValue: $("#HT_LITMSJACTUALIZADOCORRECTO").val() }; Literales.push(Literal24);
    var Literal25 = { LiteralName: 'LITMSJACTUALIZADOERROR', LiteralValue: $("#HT_LITMSJACTUALIZADOERROR").val() }; Literales.push(Literal25);
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
    $('#dtResultados').DataTable({
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
            { data: "CODIGO_CONTROL", title: GetLiteralValue('LITHEADCODIGOCONTROL'), width: '50px' },
            { data: "PROCESO", title: GetLiteralValue('LITHEADPROCESO'), orderable: false, width: '50px' },
            { data: "RIESGOASOCIADO", title: GetLiteralValue('LITHEADRIESGOASOCIADO'), orderable: false, width: '50px' },
            //{ data: "DESCRIPCION", title: GetLiteralValue('LITHEADCONTROL'), orderable: false, width: '50px' },
            { data: "TIPOCONTROL", title: GetLiteralValue('LITHEADTIPOCONTROL'), orderable: false, width: '50px' },
            { data: "FRECUENCIA", title: GetLiteralValue('LITHEADFRECUENCIA'), orderable: false, width: '50px' },
            { data: "RESPONSABLE_EJECUCION", title: GetLiteralValue('LITHEADRESPONSABLEEJECUCION'), orderable: false, width: '50px' },
            { data: "RESPONSABLE_MONITOREO", title: GetLiteralValue('LITHEADRESPONSABLEMONITOREO'), orderable: false, width: '50px' },
            { data: "EVIDENCIA", title: GetLiteralValue('LITHEADEVIDENCIA'), orderable: false, width: '50px' },
            { data: "DOCUMENTACION_PROCESO", title: GetLiteralValue('LITHEADDOCUMENTACION'), orderable: false, width: '50px' },
            { data: "SUFICIENCIA_CONTROL", title: GetLiteralValue('LITHEADSUFICIENCIA'), orderable: false, width: '50px' },
            { data: "COMENTARIO_CONTROL", title: GetLiteralValue('LITHEADCOMENTARIO'), orderable: false, width: '50px' },
            {
                data: null,
                orderable: false,
                title: GetLiteralValue('LITHEADACCIONES'),
                width: '20',
                defaultContent: ''
            }
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": true,
                "render": function (data, type, row, meta) {
                    var HTML_p = '<div class="gr-bl gr-bl-4"><a id="MyLink" href="javascript:fnAbrirDialogoMitigacionBrowse(\'' + row.IDCONTROL + '\',' + '\'' + row.CODIGO_CONTROL + '\')"> ' + row.CODIGO_CONTROL + '</a></div>';
                    return HTML_p;
                }
            },
            {
                "className": "dt-center",
                "targets": [10],
                "render": function (data, type, row, meta) {
                    var HTML_p = '';
                    if (row.COMENTARIO_CONTROL != "" && row.COMENTARIO_CONTROL != null) {
                        HTML_p = "<textarea name='textarea' id='idtext' cols='22' style='font:12.8px Arial, Helvetica; margin: 0px;  width: 180px; resize:none; border:none;' disabled>" + row.COMENTARIO_CONTROL + "</textarea>";

                    }
                    return HTML_p;
                }
            },
            {
                "className": "dt-center",
                "targets": [11],
                "render": function (data, type, row, meta) {
                    var HTML_p = '<div class="gr-bl gr-bl-12" style="text-align:center;"><a id="MyLink" href="javascript:fnAbrirDialogoMitigacionEdit(\'' + row.IDCONTROL + '\',' + '\'' + row.CODIGO_CONTROL + '\')"><img src="/lib/estilos/Repsol/images/editar.png" alt="Editar Control"/></a></div>';
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