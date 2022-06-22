function HideFiltersMaster() {}

function ConfigurarBotonesDetalle() {
    modoPantalla = $("#" + panel + "hdfModoPantalla").val();
    if (modoPantalla == "Browse") {
        HabilitarBotonesDetalle(false);
    } else if (modoPantalla == "Edit") {
        HabilitarBotonesDetalle(true);
    } else if (modoPantalla == "Add") {
        HabilitarBotonesDetalle(false);

    }
}

function HabilitarBotonesDetalle(flag) {
    $('input[name=btnAgregarCargo]').prop('disabled', !flag);
    $('input[name=btnEditarCargo]').prop('disabled', !flag);
    $('input[name=btnEliminarCargo]').prop('disabled', !flag);
    if (flag) {
        $('input[name=btnAgregarCargo]').addClass('btn-detalle-enabled');
        $('input[name=btnAgregarCargo]').removeClass('btn-detalle-disabled');
        $('input[name=btnEditarCargo]').addClass('btn-detalle-enabled');
        $('input[name=btnEditarCargo]').removeClass('btn-detalle-disabled');
        $('input[name=btnEliminarCargo]').addClass('btn-detalle-enabled');
        $('input[name=btnEliminarCargo]').removeClass('btn-detalle-disabled');
    } else {
        $('input[name=btnAgregarCargo]').addClass('btn-detalle-disabled');
        $('input[name=btnAgregarCargo]').removeClass('btn-detalle-enabled');
        $('input[name=btnEditarCargo]').addClass('btn-detalle-disabled');
        $('input[name=btnEditarCargo]').removeClass('btn-detalle-enabled');
        $('input[name=btnEliminarCargo]').addClass('btn-detalle-disabled');
        $('input[name=btnEliminarCargo]').removeClass('btn-detalle-enabled');
    }
}

function InitModoPantalla() {
    modoPantalla = $("#" + panel + "hdfModoPantalla").val();
    fnShowHideIdByFlag("SectionDetalleCargos", false);
    fnShowHideIdByFlag("divAgregarCargo", false);
    if (modoPantalla == "Browse") {
        var genericValueTipo = $("#" + panel + "ddlTipo").val();
        if (genericValueTipo == "TipoEntidad_Proceso") {
            fnShowHideIdByFlag("divResponsable", true);
            fnShowHideIdByFlag("divVerDetalle", false);
        } else {
            fnShowHideIdByFlag("divResponsable", false);
            fnShowHideIdByFlag("divVerDetalle", true);
        }
    }
    if (modoPantalla == "Edit") {
        var genericValueTipo = $("#" + panel + "ddlTipo").val();
        if (genericValueTipo == "TipoEntidad_Proceso") {
            fnShowHideIdByFlag("divResponsable", true);
            fnShowHideIdByFlag("divVerDetalle", false);
        } else {
            fnShowHideIdByFlag("divResponsable", false);
            fnShowHideIdByFlag("divVerDetalle", true);
        }
    }
    if (modoPantalla == "Add") {
        var genericValueTipo = $("#" + panel + "ddlTipo").val();
        if (genericValueTipo == "TipoEntidad_Proceso") {
            fnShowHideIdByFlag("divResponsable", true);
            fnShowHideIdByFlag("divVerDetalle", false);
        } else {
            fnShowHideIdByFlag("divResponsable", false);
            fnShowHideIdByFlag("divVerDetalle", false);
        }
    }
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

function fnShowHideIdByFlag(idElement, flagValue, typeDisplay = "flex") {
    var objElement = document.getElementById(idElement);
    if (flagValue) {
        objElement.style.display = typeDisplay;
    } else {
        objElement.style.display = "none";
    }
}

function InicializarLanguageJson() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {

        lstArrayLanguage = data;
        SetDataTableCargos([]);
        //fnInicializarDatatables();
    });
}

function SetDataTableCargos(dataJson) {

    $('#dtResultadoDetalleCargo').DataTable({
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
            { data: "NCAMPO", title: "Código cargo", width: '50px' }, //0
            { data: "TABLA", title: "Nombre Area", width: '150px' }, //1
            { data: "TIPO", title: "Código de Area", orderable: false, width: '50px' }, //2
            { data: "VALOR", title: "Nombre Cargo", orderable: false, width: '150px' }, //3
            {
                data: null,
                orderable: false,
                title: "Acciones",
                width: '150',
                defaultContent: ''
            }
        ],
        columnDefs: [
            {
                "targets": [0],
                "className": "dtRowStyle"
            },
            {
                "targets": [1],
                "className": "dtRowStyle"
            },
            {
                "targets": [2],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [3],
                "className": "dtRowStyle"
            },
            {
                "targets": [4],
                "className": "dtRowStyle",
                "render": function (data, type, row, meta) {
                    return '<tr><td><div style="display:flex; justify-content: center;"><div><a id="MyLink" href="javascript:fnEditarCargo(\'' + row.TIPO + '\',' + '\'' + row.NCAMPO + '\',' + '\'' + row.VALOR + '\')"><input type="button" style="" id="btnEditarCargo" name="btnEditarCargo" class="btn btn-primary mtl10 btnRechazar" value="Editar" /></a></div></td></tr><tr><td><div><a id="MyLink" href="javascript:fnEliminarCargo(\'' + row.TIPO + '\',' + '\'' + row.NCAMPO + '\')"><input type="button" style="" id="btnEliminarCargo" name="btnEliminarCargo" class="btn btn-primary mtl10 btnRechazar" value="Eliminar" /></a></div></div></td></tr>';
                }
            }
        ],
        paging: false,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "desc"]]
    });
    //closerLoading();
}

function CambioNPersonal() {
    $("#" + panel + "txtResponsable").val(document.getElementById('nPersonal').value);
}
function CambioNombrePersonal() {
    $("#" + panel + "txtNombreResponsable").val(document.getElementById('nom_Personal').value);
}

function OnChange_txtResponsable() {
    var CodePersonal = $("#" + panel + "txtResponsable").val();
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/GetInfoPersonal',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ CodePersonal: CodePersonal }),
        success: function (response) {
            var result = response.d;
            if (result && result.Name != "") {
                if (result.Email != "") {
                    $("#" + panel + "txtNombreResponsable").val(result.Name);
                } else {
                    alert("No se puede asignar el responsable, debido a que no cuenta con un correo asociado.");
                    $("#" + panel + "txtNombreResponsable").val("");
                    $("#" + panel + "txtResponsable").val("");
                }
            } else {
                $("#" + panel + "txtNombreResponsable").val("");
                $("#" + panel + "txtResponsable").val("");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function OnChange_ddlTipo() {
    var genericValueTipo = $("#" + panel + "ddlTipo").val();
    if (genericValueTipo == "TipoEntidad_Proceso") {
        fnShowHideIdByFlag("divResponsable", true);
    } else {
        fnShowHideIdByFlag("divResponsable", false);
    }

    $("#" + panel + "txtDescripcion").val("");
    $("#" + panel + "txtResponsable").val("");
    $("#" + panel + "txtNombreResponsable").val("");
}

function OnClick_VerDetalleCargos() {
    var genericValueTipo = $("#" + panel + "ddlTipo").val();
    if (genericValueTipo == "TipoEntidad_Area") {
        fnShowHideIdByFlag("SectionDetalleCargos", true, "block");
        fnShowHideIdByFlag("divAgregarCargo", true, "block");
        GetCargosByArea();
    }
}

function GetCargosByArea() {
    var CodeTipoEntidad = $("#" + panel + "hdfCodigoTipoEntidad").val();
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/GetCargosByIdArea',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ pIdArea: CodeTipoEntidad }),
        success: function (response) {
            SetDataTableCargos(response.d);
            ConfigurarBotonesDetalle();
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function ProcessAddConfirmation() {
    var genericValueTipo = $("#" + panel + "ddlTipo").val();
    var descripcionTipo = $("#" + panel + "txtDescripcion").val();
    var responsable = $("#" + panel + "txtResponsable").val();
    var nombreResponsable = $("#" + panel + "txtNombreResponsable").val();
    if (genericValueTipo == "0" || genericValueTipo == "") {
        alert("Debe seleccionar un tipo de entidad antes de continuar");
        return false;
    }
    if (descripcionTipo == "") {
        alert("Debe ingresar una descripción para la entidad antes de continuar");
        return false;
    }
    if (genericValueTipo == "TipoEntidad_Proceso" && (responsable == "" || nombreResponsable == "")) {
        alert("Debe seleccionar un responsable");
        return false;
    }
    return confirm("¿Esta seguro de registrar la nueva entidad?");
}

function ProcessUpdateConfirmation() {
    var genericValueTipo = $("#" + panel + "ddlTipo").val();
    var descripcionTipo = $("#" + panel + "txtDescripcion").val();
    var responsable = $("#" + panel + "txtResponsable").val();
    var nombreResponsable = $("#" + panel + "txtNombreResponsable").val();
    if (descripcionTipo == "") {
        alert("Debe ingresar una descripción para la entidad antes de continuar");
        return false;
    }
    if (genericValueTipo == "TipoEntidad_Proceso" && (responsable == "" || nombreResponsable == "")) {
        alert("Debe seleccionar un responsable");
        return false;
    }
    return confirm("¿Esta seguro de actualizar la entidad?");
}

function ProcessDeleteConfirmation() {
    return confirm("¿Esta seguro de eliminar la entidad?");
}

function fnAgregarCargo() {
    $("#" + panel + "txtNombreCargoAddUpd").val("");
    jQuery("#DialogCargo").dialog({
        autoOpen: false,
        width: 450,
        height: 200,
        modal: true,
        title: 'Registro de Cargos',
        dialogClass: 'tituloModalSod',
        buttons: {
            Aceptar: function () {
                var nombreCargo = $("#" + panel + "txtNombreCargoAddUpd").val();
                var idTipo = $("#" + panel + "hdfCodigoTipoEntidad").val();
                if (nombreCargo != "") {
                    InsertCargo(idTipo, nombreCargo);
                    jQuery("#DialogCargo").dialog("destroy");
                } else {
                    alert('Debe ingresar el nombre del cargo.');
                }
            },
            Cancelar: function () {
                $("#" + panel + "txtNombreCargoAddUpd").val("");
                jQuery("#DialogCargo").dialog("destroy");
            }
        },
        close: function () {
            jQuery("#DialogCargo").dialog("destroy");
        }
    });
    jQuery("#DialogCargo").dialog("open");
}

function InsertCargo(IdTipo, NombreCargo) {
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/InsertCargo',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ IdTipo: IdTipo, NombreCargo: NombreCargo }),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result) {
                GetCargosByArea();
                alert('El cargo fue registrado correctamente.');
            } else {
                alert('Se produjo un error durante el proceso.');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function fnEditarCargo(idTipo, idDetalleTipo, valor) {
    $("#" + panel + "txtNombreCargoAddUpd").val(valor);
    jQuery("#DialogCargo").dialog({
        autoOpen: false,
        width: 450,
        height: 200,
        modal: true,
        title: 'Actualizaciòn de Cargos',
        dialogClass: 'tituloModalSod',
        buttons: {
            Aceptar: function () {
                var nombreCargo = $("#" + panel + "txtNombreCargoAddUpd").val();
                if (nombreCargo != "") {
                    UpdateCargo(idTipo, idDetalleTipo, nombreCargo);
                    jQuery("#DialogCargo").dialog("destroy");
                } else {
                    alert('Debe ingresar el nombre del cargo.');
                }
            },
            Cancelar: function () {
                $("#" + panel + "txtNombreCargoAddUpd").val("");
                jQuery("#DialogCargo").dialog("destroy");
            }
        },
        close: function () {
            jQuery("#DialogCargo").dialog("destroy");
        }
    });
    jQuery("#DialogCargo").dialog("open");
}

function UpdateCargo(IdTipo, IdDetalleTipo, NombreCargo) {
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/UpdateCargo',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ IdTipo: IdTipo, IdDetalleTipo: IdDetalleTipo, NombreCargo: NombreCargo }),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result) {
                GetCargosByArea();
                alert('El cargo fue actualizado correctamente.');
            } else {
                alert('Se produjo un error durante el proceso.');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function fnEliminarCargo(IdTipo, IdDetalleTipo)  {
    if (confirm("¿Esta seguro de eliminar el cargo?")) {
        DeleteCargo(IdTipo, IdDetalleTipo);
    }
}

function DeleteCargo(IdTipo, IdDetalleTipo) {
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/DeleteCargo',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ IdTipo: IdTipo, IdDetalleTipo: IdDetalleTipo }),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result) {
                GetCargosByArea();
                alert('El cargo fue eliminado correctamente.');
            } else {
                alert('Se produjo un error durante el proceso.');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}