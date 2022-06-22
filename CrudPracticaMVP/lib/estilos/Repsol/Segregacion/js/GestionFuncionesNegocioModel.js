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
    console.log(objElement.childNodes);
    if (objElement.style.display === "none") {
        objElement.style.display = "block";
    } else {
        objElement.style.display = "none";
    }
}

function InitAnimatedCollapseMenu(listdivmenu, listdivsubmenu) {
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

function fnGetListaModulos() {
    var filtroModulo = $("#" + panel + "txtBusquedaModulo").val();
    var sendParameter = { pfilterModule: filtroModulo };
    $.ajax({
        type: "POST",
        url: url_pagina + '/GetLicensesByClient',
        data: JSON.stringify(sendParameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response)
            if (response.d.Status == 200) {
                listaModulos = response.d.Data;
                fnSetHtmlListaModulos();
            } else {
                console.log(response.d.Error);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function fnGetModulo(nmodule, checkedValue) {
    var sendParameter = { pnmodule: nmodule };
    $.ajax({
        type: "POST",
        url: url_pagina + '/GetCommercialModule',
        data: JSON.stringify(sendParameter),
        beforeSend: function (objeto) {
            //addLoading_table();
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response)
            if (response.d.Status == 200) {
                fnGetGroupModulo(response.d.Data.Items, response.d.Data.Module, response.d.Data.Name, checkedValue);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function fnSetHtmlListaModulos() {
    var HtmlListaModulos = "";
    listaModulos.forEach(function (modulo, index, array) {
        var HtmlModulo =
            "<div class=\"gr-row\" style=\"display:flex; align-items:center;\">" +
            "<div class=\"gr-bl gr-bl-1\"><a href=\"#\" onclick=\"OnClickToolModulo('" + modulo.Nmodule + "');\" ><img id=\"" + "img_modulo_" + modulo.Nmodule + "\" alt=\"\" src=\"/lib/estilos/Repsol/images/numero_serie.png\"></a></div>" +
            "<div class=\"gr-bl gr-bl-10\"><label for=\"" + "chk_modulo_" + modulo.Nmodule + "\">" + modulo.Nmodule + " - " + modulo.ModuleName + "</label></div>" +
            "<div class=\"gr-bl gr-bl-1\" style=\"text-align:center; margin-left: 5px;\"><input type=\"checkbox\" id=\"" + "chk_modulo_" + modulo.Nmodule + "\" name=\"" + "chk_modulo_" + modulo.Nmodule + "\" value=\"" + modulo.Nmodule + "\" onclick=\"OnClickChkModulo(this);\"></div>" +
            "</div>";
        HtmlListaModulos = HtmlListaModulos + HtmlModulo;
    });
    $("#idListaModulos").html(HtmlListaModulos);
}

function OnClickChkModulo(e) {
    console.log(e);
    var CodModulo = e.value.toString();
    if (e.checked) {
        fnGetModulo(CodModulo, "checked");
    } else {
        fnGetModulo(CodModulo, "");
    }
}

function OnClickToolModulo(CodModulo) {
    fnGetModulo(CodModulo, "");
}

function fnGetGroupModulo(listItemModulo, codModulo, nameModulo, checkedValue) {
    listaMenu = [];
    var arrayMenu = new Array();
    var arraySubmenu = new Array();
    listItemModulo.forEach(function (itemModulo, index, array) {
        if (arrayMenu.length > 0) {
            var currentMenu = arrayMenu.find(menu => (menu.Menu == itemModulo.Item.Menu.trim()));
            if (currentMenu == null) {
                var objMenu = {
                    Menu: itemModulo.Item.Menu.trim(),
                    ListSubmenu: [],
                    Checked: checkedValue
                };
                arrayMenu.push(objMenu);
            }
        } else {
            var objMenu = {
                Menu: itemModulo.Item.Menu.trim(),
                ListSubmenu: [],
                Checked: checkedValue
            };
            arrayMenu.push(objMenu);
        }
    });

    arraySubmenu = arrayMenu.map(function (menuMap) {
        var objMenu = { Menu: menuMap.Menu, ListSubmenu: [], Checked: menuMap.Checked };
        listItemModulo.forEach(function (itemModulo, index, array) {
            if (objMenu.Menu == itemModulo.Item.Menu.trim()) {
                var currentSubmenu = objMenu.ListSubmenu.find(submenu => (submenu.Submenu == itemModulo.Item.Submenu.trim()));
                if (currentSubmenu == null) {
                    var objSubmenu = {
                        Menu: itemModulo.Item.Menu.trim(),
                        Submenu: itemModulo.Item.Submenu.trim(),
                        ListItemSubmenu: [],
                        Checked: checkedValue
                    };
                    objMenu.ListSubmenu.push(objSubmenu);
                }
            }
        });
        return objMenu;
    });

    listaMenu = arraySubmenu.map(function (menuMap) {
        var objMenu = { Menu: menuMap.Menu, ListSubmenu: [], Checked: menuMap.Checked };
        var arraySubmenu = menuMap.ListSubmenu.map(function (submenuMap) {
            var objSubmenu = { Menu: submenuMap.Menu, Submenu: submenuMap.Submenu, ListItemSubmenu: [], Checked: submenuMap.Checked };
            listItemModulo.forEach(function (itemModulo, index, array) {
                if (submenuMap.Menu == itemModulo.Item.Menu.trim() && submenuMap.Submenu == itemModulo.Item.Submenu.trim()) {
                    var objItemSubmenu = {
                        Menu: itemModulo.Item.Menu.trim(),
                        Submenu: itemModulo.Item.Submenu.trim(),
                        Item: itemModulo.Item.Item.trim(),
                        Legend: itemModulo.Item.Legend.trim(),
                        Checked: checkedValue
                    };
                    objSubmenu.ListItemSubmenu.push(objItemSubmenu);
                }
            });
            return objSubmenu;
        });
        objMenu.ListSubmenu = arraySubmenu;
        return objMenu;
    });
    fnOrdenarListaMenu();
    fnSetHtmlListaItemModulo(codModulo, nameModulo);
}

function fnOrdenarListaMenu() {
    listaMenu = fnSortByKey(listaMenu, "Menu");

    listaMenu.forEach(function (itemMenu, index, array) {
        itemMenu.ListSubmenu = fnSortByKey(itemMenu.ListSubmenu, "Submenu");
    });

    listaMenu.forEach(function (itemMenu, index, array) {
        itemMenu.ListSubmenu.forEach(function (itemSubmenu, index, array) {
            itemSubmenu.ListItemSubmenu = fnSortByKey(itemSubmenu.ListItemSubmenu, "Legend");
        });
    });
}

function fnSetHtmlListaItemModulo(codModulo, nameModulo) {
    var htmlListMenu = "";
    listaMenu.forEach(function (itemMenu, index, array) {
        var htmlListSubmenu = "";
        var htmlEncapsuleListSubmenu = "";
        itemMenu.ListSubmenu.forEach(function (itemSubmenu, index, array) {
            var htmlListItem = "";
            var htmlEncapsuleListItem = "";
            itemSubmenu.ListItemSubmenu.forEach(function (item, index, array) {
                var htmlObjItem = "";
                htmlObjItem = "<div class=\"gr-row rowItemSubmenu\"><div class=\"gr-bl gr-bl-11\"><span class=\"spanMenuWidth\">" + item.Item + " - " + item.Legend + "</span></div><div class=\"gr-bl gr-bl-1\"><input type=\"checkbox\" name=\"chk_item\" id=\"chk_item_" + item.Item + "\" value=\"" + item.Item + "\" " + item.Checked + " /></div></div>";
                htmlListItem = htmlListItem + htmlObjItem;
            });
            var htmlObjSubmenu = "";
            var divToggleItems = "div_Items_" + itemSubmenu.Menu + "_" + itemSubmenu.Submenu;
            htmlEncapsuleListItem = "<div class=\"gr-row\" id=\"" + divToggleItems + "\" style=\"margin-left: 10px;\">" + htmlListItem + "</div>";
            htmlObjSubmenu = "<div class=\"gr-row rowSubmenu\"><div class=\"gr-bl gr-bl-11\"><img class=\"imgMenu\" src=\"/lib/estilos/Repsol/Salesforce/images/SF_angle-arrow-down.png\" alt=\"\"><a href=\"#\" onclick=\"fnShowHideById('" + divToggleItems + "')\"><span class=\"spanMenuWidth\">" + itemSubmenu.Submenu + "</span></a></div><div class=\"gr-bl gr-bl-1\"><input type=\"checkbox\" name=\"chk_submenu\" id=\"chk_Submenu_" + itemSubmenu.Menu + "_" + itemSubmenu.Submenu + "\" value=\"" + itemSubmenu.Menu + "_" + itemSubmenu.Submenu + "\" " + itemSubmenu.Checked + " /></div></div>" + htmlEncapsuleListItem;
            htmlListSubmenu = htmlListSubmenu + htmlObjSubmenu;
        });
        var htmlObjMenu = "";
        var divToggleSubmenus = "div_Submenus_" + itemMenu.Menu;
        htmlEncapsuleListSubmenu = "<div class=\"gr-row\" id=\"" + divToggleSubmenus + "\" style=\"margin-left: 10px;\">" + htmlListSubmenu + "</div>";
        htmlObjMenu = "<div class=\"gr-row rowMenu\"><div class=\"gr-bl gr-bl-11\"><img class=\"imgMenu\" src=\"/lib/estilos/Repsol/Salesforce/images/SF_angle-arrow-down.png\" alt=\"\"><a href=\"#\" onclick=\"fnShowHideById('" + divToggleSubmenus + "')\"><span class=\"spanMenuWidth\">" + itemMenu.Menu + "</span></a></div><div class=\"gr-bl gr-bl-1\"><input type=\"checkbox\" name=\"chk_menu\" id=\"chk_menu_" + itemMenu.Menu + "\" value=\"" + itemMenu.Menu + "\" " + itemMenu.Checked + " /></div></div>" + htmlEncapsuleListSubmenu;
        htmlListMenu = htmlListMenu + "<div class=\"gr-row\" id=\"div_Menu_" + itemMenu.Menu + "\" style=\"margin - left: 10px;\">" + htmlObjMenu + "</div>";
    });
    $("#idListaMenuModulo").html(htmlListMenu);
    $("#idModuloSelected").html(codModulo + " - " + nameModulo);
}

function abrirModalObjetoConfig() {
    jQuery("#ModalObjetosConfig").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        title:"Acciones",
        buttons: {
            Cerrar: function () {
                jQuery(this).dialog("destroy").remove();
            },
        },
        close: function () {
            jQuery(this).dialog("destroy").remove();
        }
    });
    jQuery("#ModalObjetosConfig").dialog("open");
}

