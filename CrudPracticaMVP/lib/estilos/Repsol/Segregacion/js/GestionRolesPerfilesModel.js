function HideFiltersMaster() {
}

function ShowLoadingUI() {
    $.blockUI({
        message: '<h3><img src="/lib/estilos/Repsol/images/reload.gif" /> <br /> <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 12px; color: #1390c6;"> Cargando...</span></h3>',
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

function fnSortByKey(arrayObject, KeyObject) {
    var arrayObjectSort = new Array();
    arrayObjectSort = arrayObject.sort(function (a, b) {
        if (a[KeyObject] > b[KeyObject]) {
            return 1;
        }
        if (a[KeyObject] < b[KeyObject]) {
            return -1;
        }
        return 0;
    });
    return arrayObjectSort;
}

function fnShowHideIdByFlag(idElement, flagValue) {
    var objElement = document.getElementById(idElement);
    if (flagValue) {
        objElement.style.display = "block";
    } else {
        objElement.style.display = "none";
    }
}


function fnShowHideMenuById(idElement) {
    var objElement = document.getElementById(idElement);
    if (objElement.style.display === "none") {
        objElement.style.display = "block";
    } else {
        objElement.style.display = "none";
    }
}

function fnShowHideEditPerfilById(idElement, perfilId_param) {

    var objConfigUserPerfilEdit = { perfilId: "", flagEdit: "" };
    var objElementItem = document.getElementById('EditPerfilItem_' + perfilId_param);
    var objElementUser = document.getElementById('EditPerfilUser_' + perfilId_param);
    var chkElementItem = document.getElementById('chkActiveItem_' + perfilId_param);
    var chkElementUser = document.getElementById('chkActiveUser_' + perfilId_param);

    if (idElement == 'EditPerfilItem_') {
        
        if (chkElementItem.checked) {
            objElementItem.style.display = "block";
            objElementUser.style.display = "none";
            document.getElementById('chkActiveUser_' + perfilId_param).checked = false;
            objConfigUserPerfilEdit.perfilId = perfilId_param;
            objConfigUserPerfilEdit.flagEdit = "1";
        } else {
            objElementItem.style.display = "none";
            objElementUser.style.display = "block";
            document.getElementById('chkActiveUser_' + perfilId_param).checked = true;
            objConfigUserPerfilEdit.perfilId = perfilId_param;
            objConfigUserPerfilEdit.flagEdit = "2";
        }

        if (listaConfigUserPerfilEdit.length > 0) {
            var indexConfig = listaConfigUserPerfilEdit.map(e => e.perfilId).indexOf(objConfigUserPerfilEdit.perfilId);
            if (indexConfig != -1) {
                listaConfigUserPerfilEdit.forEach(function (element, index, array) {
                    if (element.perfilId == objConfigUserPerfilEdit.perfilId) {
                        element.flagEdit = objConfigUserPerfilEdit.flagEdit;
                    }
                });
            } else {
                listaConfigUserPerfilEdit.push(objConfigUserPerfilEdit);
            }
        }
        else {
            listaConfigUserPerfilEdit.push(objConfigUserPerfilEdit);
        }
    }

    if (idElement == 'EditPerfilUser_') {

        if (chkElementUser.checked) {
            objElementUser.style.display = "block";
            objElementItem.style.display = "none";
            document.getElementById('chkActiveItem_' + perfilId_param).checked = false;
            objConfigUserPerfilEdit.perfilId = perfilId_param;
            objConfigUserPerfilEdit.flagEdit = "2";
        } else {
            objElementUser.style.display = "none";
            objElementItem.style.display = "block";
            document.getElementById('chkActiveItem_' + perfilId_param).checked = true;
            objConfigUserPerfilEdit.perfilId = perfilId_param;
            objConfigUserPerfilEdit.flagEdit = "1";
        }

        if (listaConfigUserPerfilEdit.length > 0) {
            var indexConfig = listaConfigUserPerfilEdit.map(e => e.perfilId).indexOf(objConfigUserPerfilEdit.perfilId);
            if (indexConfig != -1) {
                listaConfigUserPerfilEdit.forEach(function (element, index, array) {
                    if (element.perfilId == objConfigUserPerfilEdit.perfilId) {
                        element.flagEdit = objConfigUserPerfilEdit.flagEdit;
                    }
                });
            } else {
                listaConfigUserPerfilEdit.push(objConfigUserPerfilEdit);
            }
        }
        else {
            listaConfigUserPerfilEdit.push(objConfigUserPerfilEdit);
        }
    }
    var hdfPerfilEditChkActiveValue = "";
    listaConfigUserPerfilEdit.forEach(function (element, index, array) {
        if (index == 0) {
            hdfPerfilEditChkActiveValue = element.perfilId + ";" + element.flagEdit;
        } else {
            hdfPerfilEditChkActiveValue = hdfPerfilEditChkActiveValue + "|" + element.perfilId + ";" + element.flagEdit;
        }
    });
    console.log(listaConfigUserPerfilEdit);
    $("#" + panel + "hdfPerfilEditChkActive").val(hdfPerfilEditChkActiveValue);
}

function InitAnimatedCollapseMenu(listdivmenu, listdivsubmenu)
{
    var listDivMenuArray = new Array();
    var listDivSubMenuArray = new Array();
    
    if (listdivmenu != '') {
        listDivMenuArray = listdivmenu.split('|');
        for (var i = 0; i < listDivMenuArray.length; i++) {
            animatedcollapse.addDiv(listDivMenuArray[i], 'fade=1,hide=0')
        }
    }
    
    if (listdivsubmenu != "") {
        listDivSubMenuArray = listdivsubmenu.split('|');
        for (var i = 0; i < listDivSubMenuArray.length; i++) {
            animatedcollapse.addDiv(listDivSubMenuArray[i], 'fade=1,hide=0')
        }
    }
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}


function InitAnimatedCollapse() {
    for (var i = 0; i < listaDivToggle.length; i++) {
        animatedcollapse.addDiv(listaDivToggle[i], 'fade=1');
    }    
    animatedcollapse.ontoggle = function (jQuery, divobj, state) {
    }
    animatedcollapse.init();
}

function SearchUsuarioPerfilBrowse(perfilId_param)
{
    var textFilterSearch = $("#txtUsuarioSearchPerfilBrowse_" + perfilId_param).val();

    var userAssign;
    if (listaUsuarioAssignPerfilBrowse.length > 0) {
        userAssign = listaUsuarioAssignPerfilBrowse.find(userAssign => userAssign.perfilId == perfilId_param);
        if (userAssign == null || userAssign == undefined) {
            fnGetUsuarioAssignPerfilBrowse(perfilId_param);
            userAssign = listaUsuarioAssignPerfilBrowse.find(userAssign => userAssign.perfilId == perfilId_param);

            var UsuarioAssignPerfilBrowseListHtml = "";
            userAssign.usuarios.forEach(function (element, index, array) {
                if (element.UsuarioLogin.toLowerCase().includes(textFilterSearch) || element.UsuarioName.toLowerCase().includes(textFilterSearch)) {
                    UsuarioAssignPerfilBrowseListHtml = UsuarioAssignPerfilBrowseListHtml + '<li style="padding:2px;color:orange;"><span>' + element.UsuarioLogin + ' - ' + element.UsuarioName + '</span></li>';
                }
            });
            $("#DivPerfilUsuarioAssignBrowse_" + perfilId_param).html(UsuarioAssignPerfilBrowseListHtml);
        }
        else {
            var UsuarioAssignPerfilBrowseListHtml = "";
            userAssign.usuarios.forEach(function (element, index, array) {
                if (element.UsuarioLogin.toLowerCase().includes(textFilterSearch) || element.UsuarioName.toLowerCase().includes(textFilterSearch)) {
                    UsuarioAssignPerfilBrowseListHtml = UsuarioAssignPerfilBrowseListHtml + '<li style="padding:2px;color:orange;"><span>' + element.UsuarioLogin + ' - ' + element.UsuarioName + '</span></li>';
                }
            });
            $("#DivPerfilUsuarioAssignBrowse_" + perfilId_param).html(UsuarioAssignPerfilBrowseListHtml);
        }
    } else {
        fnGetUsuarioAssignPerfilBrowse(perfilId_param);
        userAssign = listaUsuarioAssignPerfilBrowse.find(userAssign => userAssign.perfilId == perfilId_param);

        var UsuarioAssignPerfilBrowseListHtml = "";
        userAssign.usuarios.forEach(function (element, index, array) {
            if (element.UsuarioLogin.toLowerCase().includes(textFilterSearch) || element.UsuarioName.toLowerCase().includes(textFilterSearch)) {
                UsuarioAssignPerfilBrowseListHtml = UsuarioAssignPerfilBrowseListHtml + '<li style="padding:2px;color:orange;"><span>' + element.UsuarioLogin + ' - ' + element.UsuarioName + '</span></li>';
            }
        });
        $("#DivPerfilUsuarioAssignBrowse_" + perfilId_param).html(UsuarioAssignPerfilBrowseListHtml);
    }
}

/**
 * Get users assign - perfil browse
 * @param {any} perfilId
 */
function fnGetUsuarioAssignPerfilBrowse(perfilId) {
    var usuarioAssignPerfilBrowse = { perfilId: "", usuarios: new Array() };
    var rolId = $("#" + panel + "hdfRolCode").val();

    var sendParameter = { RolId: rolId, PerfilId: perfilId };
    $.ajax({
        type: "POST",
        url: url_pagina + '/GetUsuarioAssignPerfilBrowse',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                listaUserFechaVigencia = [];
                usuarioAssignPerfilBrowse.perfilId = perfilId;
                usuarioAssignPerfilBrowse.usuarios = response.d;
                listaUsuarioAssignPerfilBrowse.push(usuarioAssignPerfilBrowse);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

/**
 * Get user assign - perfil edit
 * @param {any} perfilId
 */
function fnGetUsuariosAssignPerfilEdit(perfilId) {

    var rolId = $("#" + panel + "hdfRolCode").val();

    var sendParameter = { RolId: rolId, PerfilId: perfilId };
    $.ajax({
        type: "POST",
        url: url_pagina + '/GetUsuarioAssignPerfilBrowse',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                fnSaveUsuariosAssignPerfilEdit(perfilId, response.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}
/**
 * Get user no assign - perfil edit
 * @param {any} perfilId
 */
function fnGetUsuariosNotAssignPerfilEdit(perfilId) {

    var rolId = $("#" + panel + "hdfRolCode").val();

    var sendParameter = { RolId: rolId, PerfilId: perfilId };
    $.ajax({
        type: "POST",
        url: url_pagina + '/GetUsuarioNotAssignPerfilEdit',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                fnSaveUsuariosNotAssignPerfilEdit(perfilId, response.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

/**
 * Guardamos la informacion de los usuarios asignados en un arreglo
 * @param {any} perfilId_param
 * @param {any} userAssignList
 */
function fnSaveUsuariosAssignPerfilEdit(perfilId_param, userAssignList) {

    var usuarioAssignPerfilEdit = { perfilId: "", usuarios: new Array() };

    if (userAssignList.length > 0) {
        usuarioAssignPerfilEdit.perfilId = perfilId_param;
        usuarioAssignPerfilEdit.usuarios = userAssignList;
        listaUsuarioAssignPerfilEdit.push(usuarioAssignPerfilEdit);
    } else {
        usuarioAssignPerfilEdit.perfilId = perfilId_param;
        usuarioAssignPerfilEdit.usuarios = new Array();
        listaUsuarioAssignPerfilEdit.push(usuarioAssignPerfilEdit);
    }
}

/**
 * Guardamos la informacion de los usuarios no asignados en un arreglo
 * @param {any} perfilId_param
 * @param {any} userNotAssignList
 */
function fnSaveUsuariosNotAssignPerfilEdit(perfilId_param, userNotAssignList) {

    var usuarioNotAssignPerfilEdit = { perfilId: "", usuarios: new Array() };

    if (userNotAssignList.length > 0) {
        usuarioNotAssignPerfilEdit.perfilId = perfilId_param;
        usuarioNotAssignPerfilEdit.usuarios = userNotAssignList;
        listaUsuarioNotAssignPerfilEdit.push(usuarioNotAssignPerfilEdit);
    } else {
        usuarioNotAssignPerfilEdit.perfilId = perfilId_param;
        usuarioNotAssignPerfilEdit.usuarios = new Array();
        listaUsuarioNotAssignPerfilEdit.push(usuarioNotAssignPerfilEdit);
    }
}

/**
 * Buscamos un usuario asignado segun el perfil
 * @param {any} perfilId_param
 */
function SearchUsuarioAssignPerfilEdit(perfilId_param) {
    var textFilterUserAssign = $("#txtSearchUsuarioAssignPerfilEdit_" + perfilId_param).val();
    if (textFilterUserAssign != "") {
        textFilterUserAssign = textFilterUserAssign.toLowerCase();
    }

    var userAssignPerfil;
    if (listaUsuarioAssignPerfilEdit.length > 0) {
        userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
        if (userAssignPerfil == null || userAssignPerfil == undefined) {
            fnGetUsuariosAssignPerfilEdit(perfilId_param);
            userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
            //Filtramos la busqueda
            var userAssignList = userAssignPerfil.usuarios.filter(user => (user.UsuarioLogin.toLowerCase().includes(textFilterUserAssign) || user.UsuarioName.toLowerCase().includes(textFilterUserAssign)));
            ///Pintamos el listbox
            if (userAssignList.length > 0) {
                $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
                $.each(userAssignList, function () {
                    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
                });
            }
        } else {
            //Filtramos la busqueda
            var userAssignList = userAssignPerfil.usuarios.filter(user => (user.UsuarioLogin.toLowerCase().includes(textFilterUserAssign) || user.UsuarioName.toLowerCase().includes(textFilterUserAssign)));
            ///Pintamos el listbox
            if (userAssignList.length > 0) {
                $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
                $.each(userAssignList, function () {
                    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
                });
            }
        }
    } else {
        fnGetUsuariosAssignPerfilEdit(perfilId_param);
        userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
        //Filtramos la busqueda
        var userAssignList = userAssignPerfil.usuarios.filter(user => (user.UsuarioLogin.toLowerCase().includes(textFilterUserAssign) || user.UsuarioName.toLowerCase().includes(textFilterUserAssign)));
        ///Pintamos el listbox
        if (userAssignList.length > 0) {
            $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
            $.each(userAssignList, function () {
                $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
            });
        }
    }
}

/**
 * Buscamos un usuario no asignado segun el perfil
 * @param {any} perfilId_param
 */
function SearchUsuarioNotAssignPerfilEdit(perfilId_param) {
    var textFilterUserNotAssign = $("#txtSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).val();
    if (textFilterUserNotAssign != "") {
        textFilterUserNotAssign = textFilterUserNotAssign.toLowerCase();
    }

    var userNotAssignPerfil;
    if (listaUsuarioNotAssignPerfilEdit.length > 0) {
        userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
        if (userNotAssignPerfil == null || userNotAssignPerfil == undefined) {
            fnGetUsuariosNotAssignPerfilEdit(perfilId_param);
            userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userAssign.perfilId == perfilId_param);
            //Filtramos la busqueda
            var userNotAssignList = userNotAssignPerfil.usuarios.filter(userNot => (userNot.UsuarioLogin.toLowerCase().includes(textFilterUserNotAssign) || userNot.UsuarioName.toLowerCase().includes(textFilterUserNotAssign)));
            ///Pintamos el listbox
            if (userNotAssignList.length > 0) {
                $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
                $.each(userNotAssignList, function () {
                    $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
                });
            }
        } else {
            //Filtramos la busqueda
            var userNotAssignList = userNotAssignPerfil.usuarios.filter(userNot => (userNot.UsuarioLogin.toLowerCase().includes(textFilterUserNotAssign) || userNot.UsuarioName.toLowerCase().includes(textFilterUserNotAssign)));
            ///Pintamos el listbox
            if (userNotAssignList.length > 0) {
                $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
                $.each(userNotAssignList, function () {
                    $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
                });
            }
        }
    } else {
        fnGetUsuariosNotAssignPerfilEdit(perfilId_param);
        userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
        //Filtramos la busqueda
        var userNotAssignList = userNotAssignPerfil.usuarios.filter(userNot => (userNot.UsuarioLogin.toLowerCase().includes(textFilterUserNotAssign) || userNot.UsuarioName.toLowerCase().includes(textFilterUserNotAssign)));
        ///Pintamos el listbox
        if (userNotAssignList.length > 0) {
            $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
            $.each(userNotAssignList, function () {
                $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
            });
        }
    }
}

/**
 * Seleccionamos un usuario no asignado segun el perfil
 * @param {any} perfilId_param
 */
function GetItemUsuarioNotAssignPerfilEdit(perfilId_param) {
    var rolName = $("#" + panel + "hdfRolName").val();
    var usuarioLogin = $('#lbSearchUsuarioNotAssignPerfilEdit_' + perfilId_param + ' option:selected').val();
    var usuarioName = $('#lbSearchUsuarioNotAssignPerfilEdit_' + perfilId_param + ' option:selected').text();

    if (rolName == 'Owner Admin - Owner') {
        console.log("1 prueba");
        ValidateUsuarioAdministrador(rolName, perfilId_param, usuarioLogin, usuarioName);
    } else {
        console.log("3 prueba");
        SetItemUsuarioNotAssignPerfilEdit(perfilId_param, usuarioLogin);
        OpenDialogFechaVigenciaUsuario(rolName, perfilId_param, usuarioLogin, usuarioName);
    }
}

function SetItemUsuarioNotAssignPerfilEdit(perfilId_param, selectUserNotAssignValue) {
    //Cambiamos de no asignados > asignados
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    var indexAddNotAssign = userNotAssignPerfil.usuarios.findIndex(userAddNotAssign => (userAddNotAssign.UsuarioLogin == selectUserNotAssignValue));
    var userAddNotAssign = userNotAssignPerfil.usuarios[indexAddNotAssign];

    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.perfilId == perfilId_param) {
            userAssignPerfil.usuarios.push(userAddNotAssign);
        }
        return userAssignPerfil;
    });

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
    $.each(userAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });

    //Retiramos el elemento de no asignados
    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.perfilId == perfilId_param) {
            userNotAssignPerfil.usuarios.splice(indexAddNotAssign, 1);
        }
        return userNotAssignPerfil;
    });

    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
    $.each(userNotAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param);
    SetUsersAssignByPerfil();
}

/**
 * Seleccionamos un usuario asignado segun el perfil
 * @param {any} perfilId_param
 */
function GetItemUsuarioAssignPerfilEdit(perfilId_param, selectUserAssignDefault = "") {
    var selectUserAssignValue = selectUserAssignDefault != "" ? selectUserAssignDefault : $('#lbSearchUsuarioAssignPerfilEdit_' + perfilId_param + ' option:selected').val();
    //var selectUserAssignValue = $('#lbSearchUsuarioAssignPerfilEdit_' + perfilId_param + ' option:selected').val();

    //Cambiamos de asignados > no asignados
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    var indexAddAssign = userAssignPerfil.usuarios.findIndex(userAddAssign => (userAddAssign.UsuarioLogin == selectUserAssignValue));
    var userAddAssign = userAssignPerfil.usuarios[indexAddAssign];

    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.perfilId == perfilId_param) {
            userNotAssignPerfil.usuarios.push(userAddAssign);
        }
        return userNotAssignPerfil;
    });

    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
    $.each(userNotAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });

    //Retiramos el elemento asignado
    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.perfilId == perfilId_param) {
            userAssignPerfil.usuarios.splice(indexAddAssign, 1);
        }
        return userAssignPerfil;
    });

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
    $.each(userAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param);
    SetUsersAssignByPerfil();
    RemoveFechaVigenciaUser(perfilId_param, selectUserAssignValue);
}

/**
 * Seleccionamos todos los usuarios no asignados segun el perfil
 * @param {any} perfilId_param
 */
function GetAllItemUsuarioNotAssignPerfilEdit(perfilId_param) {
    //Cambiamos de no asignados > asignados
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.perfilId == perfilId_param) {
            userNotAssignPerfil.usuarios.forEach(function (userNot, index, array) {
                userAssignPerfil.usuarios.push(userNot);
            });
        }
        return userAssignPerfil;
    });

    var allUserAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
    $.each(allUserAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });

    //Limpiamos la lista de no asignados
    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.perfilId == perfilId_param) {
            userNotAssignPerfil.usuarios = new Array();
        }
        return userNotAssignPerfil;
    });
    $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param);
    SetUsersAssignByPerfil();
}

/**
 * Retiramos todos los usuarios asignados segun el perfil
 * @param {any} perfilId_param
 */
function GetAllItemUsuarioAssignPerfilEdit(perfilId_param) {
    //Cambiamos de asignados > no asignados
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    listaUsuarioNotAssignPerfilEdit = listaUsuarioNotAssignPerfilEdit.map(function (userNotAssignPerfil) {
        if (userNotAssignPerfil.perfilId == perfilId_param) {
            userAssignPerfil.usuarios.forEach(function (user, index, array) {
                userNotAssignPerfil.usuarios.push(user);
            });
        }
        return userNotAssignPerfil;
    });
    
    var allUserNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    $.each(allUserNotAssignPerfil.usuarios, function () {
        $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
    });

    //Limpiamos la lista de asignados
    listaUsuarioAssignPerfilEdit = listaUsuarioAssignPerfilEdit.map(function (userAssignPerfil) {
        if (userAssignPerfil.perfilId == perfilId_param) {
            userAssignPerfil.usuarios = new Array();
        }
        return userAssignPerfil;
    });
    $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param);
    SetUsersAssignByPerfil();
}

function GetNumberUserAssign_NotAssign(perfilId_param)
{
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    var countNotAssignPerfil = userNotAssignPerfil.usuarios.length;
    $("#lblSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).text(countNotAssignPerfil);

    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    var countAssignPerfil = userAssignPerfil.usuarios.length;
    $("#lblSearchUsuarioAssignPerfilEdit_" + perfilId_param).text(countAssignPerfil);

}

function SetUsersAssignByPerfil()
{
    if (listaUsuarioAssignPerfilEdit.length > 0)
    {
        var listaUserAssignCadena = "";
        listaUsuarioAssignPerfilEdit.forEach(function (perfilUserAssign, indexi, array) {
            var userAssignCadena = "";
            perfilUserAssign.usuarios.forEach(function (userAssign, indexj, array) {
                //Concatenamos los usuarios
                if (indexj == 0) {
                    userAssignCadena = userAssign.UsuarioLogin;
                } else {
                    if (userAssignCadena != "" && userAssignCadena != null) {
                        userAssignCadena = userAssignCadena + ";" + userAssign.UsuarioLogin;
                    }
                }
            });
            //Asignamos el codigo de perfil a la cadena de usuarios
            if (userAssignCadena != "" && userAssignCadena != null) {
                userAssignCadena = perfilUserAssign.perfilId + ";" + userAssignCadena;
            } else {
                userAssignCadena = perfilUserAssign.perfilId;
            }
            //Concatenamos los grupos
            if (userAssignCadena != "" && userAssignCadena != null)
            {
                if (indexi == 0) {
                    listaUserAssignCadena = userAssignCadena;
                } else {
                    if (listaUserAssignCadena != "" && listaUserAssignCadena != null) {
                        listaUserAssignCadena = listaUserAssignCadena + "|" + userAssignCadena;
                    }
                }
            }            
        });
        //Asignamos el listado de usuarios
        $("#" + panel + "hdfPerfilEditListUsersAssign").val(listaUserAssignCadena);
    }
}

/**
 * Inicializamos la carga de los usuarios asignados y no asignados
 * */
function fnLoadListBoxUserPerfilEdit() {
    listaUsuarioAssignPerfilEdit = new Array();
    listaUsuarioNotAssignPerfilEdit = new Array();
    
    var perfilEditActive = $("#" + panel + "hdfPerfilEditActive").val();

    //if (perfilEditActive == "1")
    //{
        var perfilEditListCode = $("#" + panel + "hdfPerfilEditListCode").val();

        if (perfilEditListCode == "") {
            return;
        }
        if (perfilEditListCode == null) {
            return;
        }
        if (perfilEditListCode == undefined) {
            return;
        }
        var ArrayPerfilList = perfilEditListCode.split('|');
        ArrayPerfilList.forEach(function (perfilId, index, array) {
            if (perfilId != "" || perfilId != null) {
                fnGetUsuariosAssignPerfilEdit(perfilId);
                fnGetUsuariosNotAssignPerfilEdit(perfilId);
            }
        });
        ArrayPerfilList.forEach(function (perfilId, index, array) {
            if (perfilId != "" || perfilId != null) {
                fnSetSelectUsuarioAssignPerfilEdit(perfilId);
                fnSetSelectUsuarioNotAssignPerfilEdit(perfilId);
            }
        });
    //}
}
/**
 * Seteamos el listado de usuarios asignados en el listbox segun el perfil
 * @param {any} perfilId_param
 */
function fnSetSelectUsuarioAssignPerfilEdit(perfilId_param) {
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    if (userAssignPerfil.usuarios.length > 0) {
        $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).html("");
        $.each(userAssignPerfil.usuarios, function () {
            $("#lbSearchUsuarioAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
        });
    }
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param)
}
/**
 * Seteamos el listado de usuarios no asignados en el listbox segun el perfil
 * @param {any} perfilId_param
 */
function fnSetSelectUsuarioNotAssignPerfilEdit(perfilId_param) {
    var userNotAssignPerfil = listaUsuarioNotAssignPerfilEdit.find(userNotAssign => userNotAssign.perfilId == perfilId_param);
    if (userNotAssignPerfil.usuarios.length > 0) {
        $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).html("");
        $.each(userNotAssignPerfil.usuarios, function () {
            $("#lbSearchUsuarioNotAssignPerfilEdit_" + perfilId_param).append($("<option></option>").attr("value", this.UsuarioLogin).text(this.UsuarioName))
        });
    }
    //Asignamos los contadores
    GetNumberUserAssign_NotAssign(perfilId_param)
}

function EnterPressTextSearchModulo(e) {
    if (e.keyCode == 13) {
        return false;
    }
}

function ShowDialogValidateRegla() {
    jQuery("#DialogValidateRegla").dialog({
        autoOpen: false,
        width: 800,
        modal: true,
        dialogClass: 'tituloModalSod',
        buttons: {
            Aceptar: function () {
                RegistrarSolicitudSendEmail();
                jQuery(this).dialog("destroy").remove();
            },
            Cancelar: function () {
                jQuery(this).dialog("destroy").remove();
            }
        },
        close: function () {
            jQuery(this).dialog("destroy").remove();
        }
    });
    jQuery("#DialogValidateRegla").dialog("open");
}

function RegistrarSolicitudSendEmail() {
    ShowLoadingUI();
    var roleCode = $("#" + panel + "hdfRolCode").val();
    var solicitudTipoControl = $("#" + panel + "hdfSolicitudTipoControl").val();
    var solicitudReglaSodData = $("#" + panel + "hdfSolicitudReglaSodData").val();

    var sendParameter = { TipoControl: solicitudTipoControl, ReglaSodData: solicitudReglaSodData };

    $.ajax({
        type: "POST",
        url: url_pagina + '/RegistrarSolicitudAprobacionRiesgoSod',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != null) {
                if (response.d.ValidateFound == true) {
                    alert("La solicitud con código " + response.d.CodSolicitud + " fue registrada satisfactoriamente");
                    PostBackByTipoControl(solicitudTipoControl, roleCode);
                }
                else if (response.d.ValidateFound == false) {
                    alert("Ya existe una solicitud con codigo " + response.d.SolicitudFound + ", con el mismo solicitante, conflicto sod y usuarios a dar permiso.");
                    PostBackByTipoControl(solicitudTipoControl, roleCode);
                }
                else {
                    alert("Error en el registro de la solicitud");
                }
            }
            console.log(response);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function PostBackByTipoControl(tipoControl_param, roleCode_param)
{
    if (tipoControl_param == "01") {
        __doPostBack('ibAdd_RoleEdit', roleCode_param);
    }
}

function ValidateActiveConfigPerfil()
{
    var active = "True";
    $("#" + panel + "hdfPerfilEditConfigUpdate").val(active);
}

function DeleteProfileConfirmation(perfilId_param) {
    var userAssignPerfil = listaUsuarioAssignPerfilEdit.find(userAssign => userAssign.perfilId == perfilId_param);
    var countAssignPerfil = userAssignPerfil.usuarios.length;
    return confirm("Existen " + countAssignPerfil + " usuarios vinculados a este perfil. ¿Está seguro de querer borrar el perfil?");
}

function CopyProfileConfirmation(perfilName_param) {
    return confirm("¿Está seguro de copiar el perfil \"" + perfilName_param + "\"?");
}

function NewProfileConfirmation() {
    var NewPerfilName = $("#" + panel + "txtNombrePerfilEdit").val();
    var NewPerfilDesc = $("#" + panel + "txtDescripcionPerfilEdit").val();
    if (NewPerfilName == "" || NewPerfilDesc == "") {
        alert('Debe ingresar un nombre y descripción para configurar un nuevo perfil.');
        return false;
    }
    return confirm("¿Está seguro de dar de alta el perfil \"" + NewPerfilName + "\"?");
}

function SaveProfileConfirmation() {
    return confirm("¿Está seguro de guardar los cambios realizados a este perfil?");
}

function ShowDialogFechaVigenciaUsuario(perfilId_param, usuarioLogin, UsuarioName) {
    
}

function OpenDialogFechaVigenciaUsuario(rolName, perfilId_param, usuarioLogin, usuarioName) {

    $("#" + panel + "hdfFecVigenciaPerfil").val(perfilId_param);
    $("#" + panel + "lblFecVigenciaUser").html(usuarioLogin + " - " + usuarioName);

    jQuery("#DialogFechaVigenciaUsuario").dialog({
        autoOpen: false,
        width: 600,
        height: 375,
        modal: true,
        dialogClass: 'tituloModalSod',
        buttons: {
            Aceptar: function () {
                var fechaVigenciaInicio = $("#" + panel + "txtFecVigenciaInicio_search").val();
                var fechaVigenciaFin = $("#" + panel + "txtFecVigenciaFin_search").val();
                var usuarioTipo = $("#" + panel + "txtTipoUsuarioFecVigencia").val();
                var usuarioResponsable = $("#" + panel + "txtPersonal").val();
                var usuarioAsignado = $("#" + panel + "txtUsuarioAsignadoFecVigencia").val();

                if (rolName == 'Owner Admin - Owner') {
                    if (usuarioTipo == "Administrador") {
                        if (fechaVigenciaInicio != "" && fechaVigenciaFin != "" && usuarioResponsable != "" && usuarioAsignado != "") {
                            setFechaVigenciaAddUser(perfilId_param, usuarioLogin, fechaVigenciaInicio, fechaVigenciaFin, usuarioResponsable, usuarioAsignado);
                            LimpiarCajaFecVigencia();
                            jQuery("#DialogFechaVigenciaUsuario").dialog("close");
                        } else {
                            alert('Debe ingresar o seleccionar una fecha de vigencia de inicio y fin, asi como el usuario responsable y asignado');
                        }
                    } else {
                        alert('El usuario a asociar no se encuentra configurado como administrador');
                    }
                } else {
                    if (fechaVigenciaInicio != "" && fechaVigenciaFin != "") {
                        setFechaVigenciaAddUser(perfilId_param, usuarioLogin, fechaVigenciaInicio, fechaVigenciaFin, usuarioResponsable, usuarioAsignado);
                        LimpiarCajaFecVigencia();
                        jQuery("#DialogFechaVigenciaUsuario").dialog("close");
                    } else {
                        alert('Debe ingresar o seleccionar una fecha de vigencia de inicio y fin.');
                    }
                }
                
            },
            Cancelar: function () {
                var usuarioTipo = $("#" + panel + "txtTipoUsuarioFecVigencia").val();
                if (usuarioTipo == "Administrador") {
                    GetItemUsuarioAssignPerfilEdit(perfilId_param, usuarioLogin);
                }
                LimpiarCajaFecVigencia();

                jQuery("#DialogFechaVigenciaUsuario").dialog("close");
            }
        },
        close: function () {
            jQuery("#DialogFechaVigenciaUsuario").dialog("close");
        }
    });
    jQuery("#DialogFechaVigenciaUsuario").dialog("open");
}

function ValidateUsuarioAdministrador(pRolName, pPerfilParam, pUsuarioLogin, pUsuarioName) {
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/GetEntityTypeAdministrador',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ UsuarioLogin: pUsuarioLogin }),
        success: function (response) {
            if (pRolName == 'Owner Admin - Owner') {
                if (response != null && response.d != null) {
                    console.log("2 prueba");
                    fnShowHideIdByFlag('divInfoResponsableFecVigencia', true);
                    $("#" + panel + "txtTipoUsuarioFecVigencia").val(response.d.Description);
                    SetItemUsuarioNotAssignPerfilEdit(pPerfilParam, pUsuarioLogin);
                    OpenDialogFechaVigenciaUsuario(pRolName, pPerfilParam, pUsuarioLogin, pUsuarioName);
                } else {
                    alert('El usuario a asociar no se encuentra configurado como administrador');
                }
            } else {
                fnShowHideIdByFlag('divInfoResponsableFecVigencia', false);
                $("#" + panel + "txtTipoUsuarioFecVigencia").val("");
                SetItemUsuarioNotAssignPerfilEdit(pPerfilParam, pUsuarioLogin);
                OpenDialogFechaVigenciaUsuario(pRolName, pPerfilParam, pUsuarioLogin, pUsuarioName);
            }
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function CambioNPersonal() {
    console.log(tipoBusqueda);
    switch (tipoBusqueda) {
        case "1":
            $("#" + panel + "txtPersonal").val(document.getElementById('nPersonal').value);
            break;
        case "2":
            $("#" + panel + "txtUsuarioAsignadoFecVigencia").val(document.getElementById('nPersonal').value);
            break;
        default:
            break;
    }
}
function CambioNombrePersonal() {
    console.log(tipoBusqueda);
    switch (tipoBusqueda) {
        case "1":
            $("#" + panel + "txtNombrePersonal").val(document.getElementById('nom_Personal').value);
            break;
        case "2":
            $("#" + panel + "txtNombreUsuarioAsignadoFecVigencia").val(document.getElementById('nom_Personal').value);
            break;
        default:
            break;
    }
}

function OnChange_txtResponsableFecVigencia() {
    var CodePersonal = $("#" + panel + "txtPersonal").val();
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/GetInfoPersonal',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ CodePersonal: CodePersonal }),
        success: function (response) {
            var result = response.d;
            if (result && result.Name != "") {
                $("#" + panel + "txtNombrePersonal").val(result.Name);
            }
            else {
                $("#" + panel + "txtNombrePersonal").val("");
                $("#" + panel + "txtPersonal").val("");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//function CambioNUsuarioAsignado() {
//    $("#" + panel + "txtUsuarioAsignadoFecVigencia").val(document.getElementById('nUsuarioAsignadoFecVigencia').value);
//}
//function CambioNombreUsuarioAsignado() {
//    $("#" + panel + "txtNombreUsuarioAsignadoFecVigencia").val(document.getElementById('nom_UsuarioAsignadoFecVigencia').value);
//}

function OnChange_txtUsuarioAsignadoFecVigencia() {
    var CodePersonal = $("#" + panel + "txtUsuarioAsignadoFecVigencia").val();
    jQuery.ajax({
        type: 'POST',
        url: url_pagina + '/GetInfoPersonal',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify({ CodePersonal: CodePersonal }),
        success: function (response) {
            var result = response.d;
            if (result && result.Name != "") {
                $("#" + panel + "txtNombreUsuarioAsignadoFecVigencia").val(result.Name);
            }
            else {
                $("#" + panel + "txtNombreUsuarioAsignadoFecVigencia").val("");
                $("#" + panel + "txtUsuarioAsignadoFecVigencia").val("");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function OnClick_lnkSearchResponsable() {
    tipoBusqueda = "1";
    console.log(tipoBusqueda);
}

function OnClick_lnkSearchAsignado() {
    tipoBusqueda = "2";
    console.log(tipoBusqueda);
}

function verificarFechaVigenciaInicio(sender, args) {
    var getdesdefecha;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;

    if (sender === undefined) {
        var fecVigInicio = $("#" + panel + "txtFecVigenciaInicio_search").val();
        if ((fecVigInicio != "") && (!fecVigInicio.match(RegExPattern))) {
            alert('Debe ingresar una fecha de vigencia de inicio válida');
            $("#" + panel + "txtFecVigenciaInicio_search").val("");
            return false;
        } else {
            getdesdefecha = $("#" + panel + "txtFecVigenciaInicio_search").val().split('/');
        }
    } else {
        var fecVigInicio = sender._textbox._current;
        if ((fecVigInicio != "") && (!fecVigInicio.match(RegExPattern))) {
            alert('Debe ingresar una fecha de vigencia de inicio válida');
            sender._textbox._current = "";
            return false;
        } else {
            getdesdefecha = sender._textbox._current.split('/');
        }
    }

    var desdefecha = new Date((getdesdefecha[1] + "/" + getdesdefecha[0] + "/" + getdesdefecha[2]));
    
    if ($("#" + panel + "txtFecVigenciaInicio_search").val() != "") {
        var f = new Date();
        var fact = new Date(f.getFullYear(), f.getMonth(), f.getDate());
        if (desdefecha < fact) {
            alert('Fecha de vigencia de inicio debe ser mayor o igual a la fecha actual');
            if (sender === undefined) $("#" + panel + "txtFecVigenciaInicio_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtFecVigenciaInicio_search").val("");
            return false;
        }
    }
    if ($("#" + panel + "txtFecVigenciaFin_search").val() != "") {
        var gethastafecha = $("#" + panel + "txtFecVigenciaFin_search").val().split('/');
        var hastafecha = new Date((gethastafecha[1] + "/" + gethastafecha[0] + "/" + gethastafecha[2]));
        if (desdefecha >= hastafecha) {
            //alert(GetLiteralValue('LITMSGFECHAINICIOMENOR'));
            alert('Fecha de vigencia de inicio debe ser menor a la fecha de vigencia fin');
            if (sender === undefined) $("#" + panel + "txtFecVigenciaInicio_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtFecVigenciaInicio_search").val("");
            return false;
        }
    }
    return true;
}

function verificarFechaVigenciaFin(sender, args) {
    var gethastafecha;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;

    if (sender === undefined) {
        var fecVigFin = $("#" + panel + "txtFecVigenciaFin_search").val();
        if ((fecVigFin != "") && (!fecVigFin.match(RegExPattern))) {
            alert('Debe ingresar una fecha de vigencia de fin válida');
            $("#" + panel + "txtFecVigenciaFin_search").val("");
            return false;
        } else {
            gethastafecha = $("#" + panel + "txtFecVigenciaFin_search").val().split('/');
        }
    } else {
        var fecVigFin = sender._textbox._current;
        if ((fecVigFin != "") && (!fecVigFin.match(RegExPattern))) {
            alert('Debe ingresar una fecha de vigencia de fin válida');
            sender._textbox._current = "";
            return false;
        } else {
            gethastafecha = sender._textbox._current.split('/');
        }
    }

    var hastafecha = new Date((gethastafecha[1] + "/" + gethastafecha[0] + "/" + gethastafecha[2]));

    if ($("#" + panel + "txtFecVigenciaInicio_search").val() != "") {
        var getdesdefecha = $("#" + panel + "txtFecVigenciaInicio_search").val().split('/');
        var desdefecha = new Date((getdesdefecha[1] + "/" + getdesdefecha[0] + "/" + getdesdefecha[2]));
        if (desdefecha >= hastafecha) {
            //alert(GetLiteralValue('LITMSGFECHAFINMAYOR'));
            alert('Fecha de vigencia de fin debe ser mayor a la fecha de vigencia de inicio');
            if (sender === undefined) $("#" + panel + "txtFecVigenciaFin_search").val("");
            else sender._textbox._current = "";
            $("#" + panel + "txtFecVigenciaFin_search").val("");
            return false;
        }
    }
    return true;
}

function LimpiarCajaFecVigencia() {
    $("#" + panel + "txtFecVigenciaInicio_search").val("");
    $("#" + panel + "txtFecVigenciaFin_search").val("");
    $("#" + panel + "txtTipoUsuarioFecVigencia").val("");
    $("#" + panel + "txtPersonal").val("");
    $("#" + panel + "txtUsuarioAsignadoFecVigencia").val("");
    $("#" + panel + "txtNombrePersonal").val("");
    $("#" + panel + "txtNombreUsuarioAsignadoFecVigencia").val("");
}

function setFechaVigenciaAddUser(perfil_param, usuarioLogin, fechaVigenciaInicio, fechaVigenciaFin, nResponsable, nAsignado) {
    var objUserFechaVigencia = { perfilId: "", usuarioLogin: "", fecVigenciaInicio: "", fecVigenciaFin: "", usuarioResponsable: "", usuarioAsignado: "" };
    objUserFechaVigencia.perfilId = perfil_param;
    objUserFechaVigencia.usuarioLogin = usuarioLogin;
    objUserFechaVigencia.fecVigenciaInicio = fechaVigenciaInicio;
    objUserFechaVigencia.fecVigenciaFin = fechaVigenciaFin;
    objUserFechaVigencia.usuarioResponsable = nResponsable;
    objUserFechaVigencia.usuarioAsignado = nAsignado;

    if (listaUserFechaVigencia.length > 0) {
        var indexFound = listaUserFechaVigencia.findIndex(function (elementObj) {
            return (elementObj.perfilId == perfil_param && elementObj.usuarioLogin == usuarioLogin);
        });
        if (indexFound != -1) {

            listaUserFechaVigencia.forEach(function (element, index, array) {
                if (element.perfilId == objUserFechaVigencia.perfilId && element.usuarioLogin == objUserFechaVigencia.usuarioLogin) {
                    element.fecVigenciaInicio = objUserFechaVigencia.fecVigenciaInicio;
                    element.fecVigenciaFin = objUserFechaVigencia.fecVigenciaFin;
                    element.usuarioResponsable = objUserFechaVigencia.usuarioResponsable;
                    element.usuarioAsignado = objUserFechaVigencia.usuarioAsignado;
                }
            });

        } else {
            listaUserFechaVigencia.push(objUserFechaVigencia);
        }
    } else {
        listaUserFechaVigencia.push(objUserFechaVigencia);
    }

    var hdfListaFecVigenciaData = "";
    listaUserFechaVigencia.forEach(function (element, index, array) {
        if (index == 0) {
            hdfListaFecVigenciaData = element.perfilId + ";" + element.usuarioLogin + ";" + element.fecVigenciaInicio + ";" + element.fecVigenciaFin + ";" + element.usuarioResponsable + ";" + element.usuarioAsignado;
        } else {
            hdfListaFecVigenciaData = hdfListaFecVigenciaData + "|" + element.perfilId + ";" + element.usuarioLogin + ";" + element.fecVigenciaInicio + ";" + element.fecVigenciaFin + ";" + element.usuarioResponsable + ";" + element.usuarioAsignado;
        }
    });
    $("#" + panel + "hdfFecVigenciaData").val(hdfListaFecVigenciaData);
    console.log(hdfListaFecVigenciaData);
}

function RemoveFechaVigenciaUser(perfil_param, usuarioLogin) {
    if (listaUserFechaVigencia.length > 0) {
        var indexFound = listaUserFechaVigencia.findIndex(function (elementObj) {
            return (elementObj.perfilId == perfil_param && elementObj.usuarioLogin == usuarioLogin);
        });
        if (indexFound > -1) {
            listaUserFechaVigencia.splice(indexFound, 1);
        }
        if (listaUserFechaVigencia.length == 0) {
            $("#" + panel + "hdfFecVigenciaData").val("");
        }
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

function InitTipoObjetos() {
    $("#" + panel + "ddlTipoObjeto").html("");
    $("#" + panel + "ddlTipoObjeto").append($("<option></option>").attr("value", "0").text("Código"));
    $("#" + panel + "ddlTipoObjeto").append($("<option></option>").attr("value", "1").text("Nombre"));
    $("#" + panel + "ddlTipoObjeto").val("0");
}

function InitLanguageDatatable() {
    $.getJSON("/lib/estilos/Repsol/plugins/datatables/language/Spanish.json", function (data) {
        lstArrayLanguage = data;
        SetDatableSearchObjetos([]);
    });
}

function SetDatableSearchObjetos(dataJson) {

    $('#dtResultadoSearchObjetos').DataTable({
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
            { data: "NMODULO", title: "NMODULO", width: '25px' },
            { data: "NOMBRE_MODULO", title: "NOMBRE", width: '50px' },
            { data: "ITEM", title: "ITEM", orderable: false, width: '25px' },
            { data: "GESTION", title: "GESTION", orderable: false, width: '50px' },
            { data: "LEYENDA", title: "LEYENDA", orderable: false, width: '50px' },
            { data: "SUBMENU", title: "SUBMENU", orderable: false, width: '50px' },
            { data: "MENU", title: "MENU", orderable: false, width: '50px' }
        ],
        columnDefs: [
            {
                "targets": [5, 6],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [0, 1, 2, 3, 4, 5, 6],
                "className": "dt-left"
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "asc"]]
    });
}

function SetDatableObjetosServerSide() {
    console.log("Datatable");
    var tipoObjeto = $("#" + panel + "ddlTipoObjeto").val();
    var valorObjeto = $("#" + panel + "txtValorObjeto").val();

    var codigoItem = tipoObjeto == "0" ? valorObjeto : "";
    var nombreItem = tipoObjeto == "1" ? valorObjeto : "";

    $('#dtResultadoSearchObjetos').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: url_pagina + '/SearchObjetosByItemServerSide',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'JSON',
            data: function (d) {
                var req = {
                    draw: 0,
                    start: 0,
                    length: 0,
                    search: '',
                    codigoItem: '',
                    nombreItem: '',
                };
                req.draw = d.draw;
                req.start = d.start;
                req.length = d.length;
                req.search = d.search['value'];
                req.codigoItem = codigoItem;
                req.nombreItem = nombreItem;
                return req;
            },
            dataSrc: function (json) {
                json.draw = json.d.draw;
                json.recordsTotal = json.d.recordsTotal;
                json.recordsFiltered = json.d.recordsFiltered;
                json.data = json.d.data;
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
            { data: "NMODULO", title: "NMODULO", width: '25px' },
            { data: "NOMBRE_MODULO", title: "NOMBRE", width: '50px' },
            { data: "ITEM", title: "ITEM", orderable: false, width: '25px' },
            { data: "GESTION", title: "GESTION", orderable: false, width: '50px' },
            { data: "LEYENDA", title: "LEYENDA", orderable: false, width: '50px' },
            { data: "SUBMENU", title: "SUBMENU", orderable: false, width: '50px' },
            { data: "MENU", title: "MENU", orderable: false, width: '50px' }
        ],
        columnDefs: [
            {
                "targets": [5, 6],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [0, 1, 2, 3, 4, 5, 6],
                "className": "dt-left"
            }
        ],
        paging: true,
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        language: lstArrayLanguage,
        order: [[2, "asc"]]
    });
}

function ShowDialogSearchObject() {
    InitTipoObjetos();
    InitLanguageDatatable();
    jQuery("#DialogSearchObjects").dialog({
        autoOpen: false,
        width: 800,
        height: 500,
        modal: true,
        dialogClass: 'tituloModalSod',
        buttons: {
            //Aceptar: function () {
            //    jQuery("#DialogSearchObjects").dialog("close");
            //},
            Cancelar: function () {
                jQuery("#DialogSearchObjects").dialog("close");
            }
        },
        close: function () {
            jQuery("#DialogSearchObjects").dialog("close");
        }
    });
    jQuery("#DialogSearchObjects").dialog("open");
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
