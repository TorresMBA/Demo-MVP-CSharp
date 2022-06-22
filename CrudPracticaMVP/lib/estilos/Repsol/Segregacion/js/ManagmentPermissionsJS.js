async function assignPermissionsToPageByRoleProfileUserAsync(item) {
    var responsePermissionsToPageByRoleProfileUser = {
        ObjectsHtmlElementsConfigBeList: [],
        GetRoleById: {},
    };
    var responseInformationKeysByEndPointAsync = await getInformationKeysByEndPointAsync(item);
    if (responseInformationKeysByEndPointAsync.d) {
        responsePermissionsToPageByRoleProfileUser.ObjectsHtmlElementsConfigBeList = responseInformationKeysByEndPointAsync.d.ObjectsHtmlElementsConfigBeList;
        var reponseApiGetRoleByIdAsync = await invokeApiGetRoleByIdAsync(responseInformationKeysByEndPointAsync.d);
        if (reponseApiGetRoleByIdAsync) {
            responsePermissionsToPageByRoleProfileUser.GetRoleById = reponseApiGetRoleByIdAsync;
        }
    }
    return responsePermissionsToPageByRoleProfileUser;
}

async function getInformationKeysByEndPointAsync(item) {
    var URL_PAGINA_GESTIONROLESPERFILES = '/Custom/RepsolPeru/Segregacion/GestionRolesPerfiles.aspx';
    var locationHost = location.host;
    if (locationHost.indexOf('localhost') == -1) {
        URL_PAGINA_GESTIONROLESPERFILES = '/ilionx45' + URL_PAGINA_GESTIONROLESPERFILES;
    }
    var endPoint = 'EndPoint_GetRoleById';
    var objectResponse =
        $.ajax({
            type: "GET",
            url: URL_PAGINA_GESTIONROLESPERFILES + '/GetInformationKeysByEndPoint?endPoint="' + endPoint + '"&item="' + item + '"',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                //console.log(response.d);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });
    return objectResponse;
}

async function invokeApiGetRoleByIdAsync(headerKeysAndItemHtmlElements) {
        var objectResponse = null;
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
            objectResponse =
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
                    //console.log(response);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
            });
        }
        return objectResponse;
    }