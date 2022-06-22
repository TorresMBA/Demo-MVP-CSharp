export default class ManagmentPermissions {
    // Inicio Metodos para configurar acciones de pagina segun rol del usuario logueado
    locationRedirect = null;
    URL_PAGINA_GESTIONROLESPERFILES = null;
    static getInformationKeysByEndPoint() {
        addLoading();
        ManagmentPermissions.URL_PAGINA_GESTIONROLESPERFILES = '/Custom/RepsolPeru/Segregacion/GestionRolesPerfiles.aspx';
        ManagmentPermissions.locationRedirect = '/notPermission.aspx';
        var locationHost = location.host;
        if (locationHost.indexOf('localhost') == -1) {
            ManagmentPermissions.URL_PAGINA_GESTIONROLESPERFILES = '/ilionx45' + ManagmentPermissions.URL_PAGINA_GESTIONROLESPERFILES;
            ManagmentPermissions.locationRedirect = '/ilionx45' + ManagmentPermissions.locationRedirect;
        }
        var endPoint = 'EndPoint_GetRoleById';
        var item = $("#ManagmentPermissionsModuleJS").attr("data-item");
        $.ajax({
            type: "GET",
            url: ManagmentPermissions.URL_PAGINA_GESTIONROLESPERFILES + '/GetInformationKeysByEndPoint?endPoint="' + endPoint + '"&item="' + item + '"',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                console.log("1. GetInformationKeysByEndPoint", response);
                if (response != null && response.d != null) {
                    console.log("1.1. invokeApiGetRoleById", response);
                    ManagmentPermissions.invokeApiGetRoleById(response.d);
                }
                clearLoading();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var errormsg = textStatus + ": " + XMLHttpRequest.responseText;
                ManagmentPermissions.setErrorAjax('GetInformationKeysByEndPoint', errormsg);
                //alert(textStatus + ": " + XMLHttpRequest.responseText);
                clearLoading();
            }
        });
    }

    static assignPermissionsToPageByRoleProfileUser() {
        ManagmentPermissions.getInformationKeysByEndPoint();
    }

    static invokeApiGetRoleById(headerKeysAndItemHtmlElements) {
        var ocpApimSubscriptionKey = headerKeysAndItemHtmlElements.SubscriptionKey;
        var backendInstance = headerKeysAndItemHtmlElements.BackendInstance;
        var urlService = headerKeysAndItemHtmlElements.UrlService;
        var endPoint = headerKeysAndItemHtmlElements.EndPoint;
        var idWeb = headerKeysAndItemHtmlElements.IdWeb;
        var idPartner = headerKeysAndItemHtmlElements.IdPartner;
        var idRole = headerKeysAndItemHtmlElements.IdRole;
        var idProfile = headerKeysAndItemHtmlElements.IdProfile;
        var user = headerKeysAndItemHtmlElements.IdUser;
        if (ocpApimSubscriptionKey && backendInstance && urlService && endPoint && idWeb && idPartner && idRole && idProfile && user) {
            var urlGetRoleById = urlService + endPoint;
            var fullUrlGetRoleById = urlGetRoleById.replace("{roleId}", idRole).replace("{user}", user).replace("{idWeb}", idWeb).replace("{idPartner}", idPartner)
            $.ajax({
                type: "GET",
                url: fullUrlGetRoleById,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Trace": true,
                    "Ocp-Apim-Subscription-Key": ocpApimSubscriptionKey,
                    "backend-instance": backendInstance
                },
                async: false,
                success: function (response) {
                    console.log("2. invokeApiGetRoleById", response);
                    if (response != null) {
                        console.log("2.1. configElementsToPageByRoleProfileUser", response);
                        ManagmentPermissions.configElementsToPageByRoleProfileUser(response, idProfile, headerKeysAndItemHtmlElements.ObjectsHtmlElementsConfigBeList);
                    }
                    clearLoading();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var errormsg = textStatus + ": " + XMLHttpRequest.responseText;
                    ManagmentPermissions.setErrorAjax(endPoint, errormsg);
                    //alert(textStatus + ": " + XMLHttpRequest.responseText);
                    clearLoading();
                }
            });
        } else {
            clearLoading();
        }
    }

    static configElementsToPageByRoleProfileUser(response, idProfile, objectsHtmlElementsConfigBeList) {
        if (objectsHtmlElementsConfigBeList && objectsHtmlElementsConfigBeList.length > 0) {
            var item = objectsHtmlElementsConfigBeList[0].Item;
            var profile = response.Profiles.filter(profile => profile.ProfileId == idProfile);
            if (profile.length > 0) {
                var profileConfigsByItem = profile[0].ProfileConfigs.filter(profileConfigs => profileConfigs.Item == item)
                var profileConfigItemREA = profileConfigsByItem.filter(profileConfig => profileConfig.ConfigName == "REA");
                if (profileConfigItemREA.length > 0 && profileConfigItemREA[0].ConfigValue == "False") {
                    window.location.href = ManagmentPermissions.locationRedirect;
                }
                else {
                    objectsHtmlElementsConfigBeList.forEach(objectsHtmlElementsConfig => {
                        if (objectsHtmlElementsConfig.HtmlElement_Use_Old_Configuration == false) {
                            var profileConfigItem = profileConfigsByItem.filter(profileConfig => profileConfig.ConfigName == objectsHtmlElementsConfig.Config_Name)
                            if (profileConfigItem.length > 0) {
                                if (profileConfigItem[0].ConfigValue == "False") {
                                    var objElementHtml = document.getElementById(objectsHtmlElementsConfig.HtmlElement_Id);
                                    if (objElementHtml != null) {
                                        if (objElementHtml.tagName == "TABLE") {
                                            for (var i = 0; i < objElementHtml.getElementsByTagName("input").length; i++) {
                                                var elementHtml = objElementHtml.getElementsByTagName("input")[i];
                                                if (elementHtml.type == "image" || elementHtml.type == "button") {
                                                    if (objectsHtmlElementsConfig.HtmlElement_Visible == false) {
                                                        elementHtml.style.pointerEvents = "none";
                                                        elementHtml.hidden = true;
                                                    } else {
                                                        elementHtml.style.pointerEvents = "none";
                                                        elementHtml.disabled = true;
                                                    }
                                                }
                                            }
                                            for (var i = 0; i < objElementHtml.getElementsByTagName("a").length; i++) {
                                                var elementHtml = objElementHtml.getElementsByTagName("a")[i];
                                                if (objectsHtmlElementsConfig.HtmlElement_Visible == false) {
                                                    elementHtml.style.pointerEvents = "none";
                                                    elementHtml.hidden = true;
                                                } else {
                                                    elementHtml.style.pointerEvents = "none";
                                                }
                                            }
                                        } else {
                                            if (objectsHtmlElementsConfig.HtmlElement_Visible == false) {
                                                $("#" + objectsHtmlElementsConfig.HtmlElement_Id).css('pointer-events', 'none');
                                                $("#" + objectsHtmlElementsConfig.HtmlElement_Id).hide();
                                            } else {
                                                $("#" + objectsHtmlElementsConfig.HtmlElement_Id).css('pointer-events', 'none');
                                                $("#" + objectsHtmlElementsConfig.HtmlElement_Id).prop('disabled', true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    }

    static setErrorAjax(method, message) {
        var sendParameter = { pmethod: method, pmessage: message};
        $.ajax({
            type: "POST",
            url: ManagmentPermissions.URL_PAGINA_GESTIONROLESPERFILES + '/SetErrorAjax',
            data: JSON.stringify(sendParameter),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function () {
                //console.log(response)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });
    }

// Fin Metodos para validar permisos al rol del usuario logueado
}
