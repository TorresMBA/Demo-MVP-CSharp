<%@ Page Language="C#" 
    AutoEventWireup="true" 
    CodeBehind="PracticaSysWebForm.aspx.cs" 
    Async="true"
    Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Sys.WebForm.PracticaSysWebForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>PageRequestManager Example</title>
    <style type="text/css">
        body {
            font-family: Tahoma;
        }
        a  {
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        div.UpdatePanelStyle{
           width: 300px;
           height: 300px;
        }
        div.AlertStyle {
          font-size: smaller;
          background-color: #FFC080;
          height: 20px;
          visibility: hidden;
        }
        div.Container {
          display: inline;
          float: left;
          width: 330px;
          height: 300px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server" />

            <script type="text/javascript" language="javascript">
                var prm = Sys.WebForms.PageRequestManager.getInstance();
                var divElem = 'AlertDiv';
                var messageElem = 'AlertMessage';
                var postbackElement;

                prm.add_initializeRequest(InitializeRequestHandler);
                //prm.remove_initializeRequest(InitializeRequestHandler);

                prm.add_beginRequest(BeginRequestHandler);
                //prm.remove_beginRequest(BeginRequestHandler);

                prm.add_pageLoading(PageLoadingtHandler);
                //prm.remove_pageLoading(PageLoadingtHandler);

                prm.add_pageLoaded(PageLoadedHandler);
                //prm.remove_pageLoaded(PageLoadedHandler);

                prm.add_endRequest(EndRequestHandler);
                //prm.remove_endRequest(EndRequestHandler);

                function InitializeRequestHandler(sender, args) {
                    console.log("=>Inicio InitializeRequest<=");
                    /**
                     * El método initializeRequest se desencadena antes de que se inicie el procesamiento 
                     * de la solicitud asincrónica. Puede utilizar este evento para cancelar una devolución de datos.
                     * */
                    console.log("get_isInAsyncPostBack() -> ", prm.get_isInAsyncPostBack());
                    if (prm.get_isInAsyncPostBack() & args.get_postBackElement().id == 'CancelRefresh') {
                        console.warn("a - Cancel");
                        prm.abortPostBack();
                    }
                    else if (prm.get_isInAsyncPostBack() & args.get_postBackElement().id == 'RefreshButton') {
                        console.log("b");
                        args.set_cancel(true);
                        ActivateAlertDiv('visible', 'Todavía trabajando en la solicitud anterior.');
                    }
                    else if (!prm.get_isInAsyncPostBack() & args.get_postBackElement().id == 'RefreshButton') {
                        console.log("c");
                        ActivateAlertDiv('visible', 'Cargando....');
                    }

                    console.log("=>Fin InitializeRequest<=");
                }

                function BeginRequestHandler(sender, args) {
                    console.log("=>Inicio BeginRequest<=");
                    /**
                     * El evento beginRequest se provoca antes de que se inicie el procesamiento de 
                     * una devolución de datos asincrónica y se envíe la devolución (postback) al 
                     * servidor. Puede utilizar este evento para llamar a un script personalizado que 
                     * establezca un encabezado de la solicitud o que inicie una animación que notifique 
                     * al usuario que se está procesando la devolución de datos.
                     **/

                    postbackElement = args.get_postBackElement();
                    console.log("postbackElement -> ",postbackElement);
                    console.log("postbackElement.value -> ", postbackElement.value);
                    ActivateAlertDiv('visible', 'Begin-Cargando...');

                    console.log("=>Fin BeginRequest<=");
                }

                function PageLoadingtHandler(sender, args) {
                    console.log("=>Inicio PageLoading<=");
                    /**
                     * El evento pageLoading se provoca después de recibir la respuesta del servidor 
                     * a una devolución asincrónica, pero antes de actualizar cualquier contenido en 
                     * la página. Puede utilizar este evento para proporcionar un efecto de transición 
                     * personalizado para el contenido actualizado.
                     */
                    console.log("=>Fin PageLoading<=");
                }

                function PageLoadedHandler(sender, args) {
                    console.debug("=>Inicio PageLoaded<=");
                    /**
                     * El evento pageLoaded se provoca cuando se actualiza todo el contenido de la página, 
                     * ya sea debido a una devolución de datos sincrónica (de página completa) o una 
                     * devolución de datos asincrónica. Puede utilizar este evento para proporcionar 
                     * un efecto de transición personalizado para el contenido actualizado.
                     * */

                    var updatedPanels = args.get_panelsUpdated();
                    console.log("updatedPanels -> ", updatedPanels);

                    if (typeof (postbackElement) === "undefined") {
                        return;
                    }
                    else if (postbackElement.id.toLowerCase().indexOf('refresh') > -1) {
                        for (i = 0; i < updatedPanels.length; i++) {
                            console.log(i);                            
                        }
                    }

                    console.log("=>Fin PageLoaded<=");
                }

                function EndRequestHandler(sender, args) {
                    console.log("=>Inicio EndRequest<=");
                    /**
                     * El evento endRequest se provoca después de que finalice una devolución 
                     * de datos asincrónica y se haya devuelto el control al explorador. 
                     * Puede utilizar este evento para proporcionar una notificación 
                     * a los usuarios o para registrar los errores.
                     **/
                    ActivateAlertDiv('hidden', 'AlertDiv', '');
                    if (args.get_error() != undefined) {
                        var errorMessage = args.get_error().message;
                        console.log("errorMessage -> ", errorMessage);
                        args.set_errorHandled(true);
                    }

                    console.log("=>Fin EndRequest<=");
                }

                /*---------------------*/
                function ActivateAlertDiv(visString, msg) {
                    var adiv = $get(divElem);
                    var aspan = $get(messageElem);
                    adiv.style.visibility = visString;
                    aspan.innerHTML = msg;
                }
            </script>

            <div class="Container">
                <asp:UpdatePanel ID="UpdatePanel1" UpdateMode="Conditional" runat="Server">
                    <ContentTemplate>
                        <asp:Panel ID="Panel1" runat="server" GroupingText="Update Panel">
                            <asp:DropDownList runat="server" ID="cboPrueba" AutoPostBack="true">
                                <asp:ListItem Text="Selecione..." Value="0"></asp:ListItem>
                                <asp:ListItem Text="Día" Value="1"></asp:ListItem>
                                <asp:ListItem Text="Mes" Value="2"></asp:ListItem>
                                <asp:ListItem Text="Año" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                            <br />
                            Last update:
                            <%= DateTime.Now.ToString()%>.
                            <br />
                            <asp:Button runat="server" ID="RefreshButton" Text="Refresh" OnClick="ProcessClick_Handler" />
                             <div id="AlertDiv" class="AlertStyle">
                                <span id="AlertMessage"></span> &nbsp;&nbsp;&nbsp;&nbsp;
                                <asp:LinkButton ID="CancelRefresh" runat="server">cancel</asp:LinkButton>
                            </div>
                            <asp:Label ID="lblPrueba" runat="server"></asp:Label>
                        </asp:Panel>
                    </ContentTemplate>
                </asp:UpdatePanel>
                <div id="AnimacionCarga" style="display: none;">
                    <img style="border: 0px; height: 24px;" src="../../../../lib/estilos/Repsol/images/reload.gif" /> 
                    <br /> 
                    <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 12px; color: #1390c6;">Cargando...</span>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
