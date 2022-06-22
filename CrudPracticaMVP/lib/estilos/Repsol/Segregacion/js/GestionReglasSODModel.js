var panel = "ctl00_wfInterface_";//Identifico en que panel esta el form para los controles

function IsAphaNumeric(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789";
    especiales = [8];
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function CambioNPersonal() {
    $("#" + panel + "txtCodigoFuncion").val(document.getElementById('nPersonal').value);
}
function CambioNombrePersonal() {
    $("#" + panel + "txtNombreFuncion").val(document.getElementById('nom_Personal').value);
}


