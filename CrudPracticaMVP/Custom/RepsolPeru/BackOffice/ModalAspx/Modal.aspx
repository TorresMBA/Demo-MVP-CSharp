<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Modal.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ModalAspx.Modal" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="/lib/jQuery/UI/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/lib/jquery/ui/ui/animatedcollapse.js"></script>
    <script type="text/javascript" src="https://repsolperu.everilion.com/lib/jQuery/UI/jquery-ui.js"></script>
    <script type="text/javascript" src="/lib/estilos/Repsol/Segregacion/js/jquery.blockUI.js"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <script type="text/javascript">
            //function pageLoad(sender, args) {
                var prm = Sys.WebForms.PageRequestManager.getInstance();
                prm.add_beginRequest(BeginRequestHandler);
                prm.add_endRequest(EndRequestHandler);
            //}


            function BeginRequestHandler(sender, args) {
                ShowLoadingUI();
            }

            function EndRequestHandler(sender, args) {
                HideLoadingUI();
                //Para capturar error del servidor
                if (args.get_error()) {
                    document.getElementById("errorMessageLabel").innerText = args.get_error().description;
                    args.set_errorHandled(true);
                }
                //
            }

            function ShowLoadingUI() {
                $.blockUI({
                    message: '<h3><img style="border: 0px; height: 24px;" src="../../../../lib/estilos/Repsol/images/reload.gif" /> <br /> <span style="font-family: Tahoma,Verdana,Arial, Sans-Serif; font-size: 12px; color: #1390c6;"> Cargando...</span></h3>',
                    showOverlay: true,
                    css: {
                        width: '100px',
                        height: '80px',
                        border: 'none',
                        padding: '10px',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .9,
                        top: '45%',
                        left: '45%'
                    },
                    centerX: false,
                    centerY: false
                });
            }

            function HideLoadingUI() {
                $.unblockUI();
            }
        </script>      
        <div>
            <asp:ScriptManager runat="server" ID="scriptmanager" AsyncPostBackTimeout="600"></asp:ScriptManager>
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <section class="head">
                        <label>Responsables:</label>
                        <input type="text" placeholder="Test" value="irebaza"/>
                    </section>
                    <br />
                    <section class="main">
                        <div>
                            <span>Roles No Asignados:</span> <asp:Label ID="lblRolesNoAsig" runat="server" Text="120"></asp:Label>
                            <br />
                            <asp:TextBox ID="inBuscarRolesNoAsig" runat="server" placeholder="Buscar..."></asp:TextBox>
                            <br />

                            <asp:ListBox ID="lstRolesNoAsig" runat="server" SelectionMode="Multiple">
                                <asp:ListItem Value="1">Prueba1</asp:ListItem>
                                <asp:ListItem Value="2">Prueba2</asp:ListItem>
                                <asp:ListItem Value="3">Prueba3</asp:ListItem>
                                <asp:ListItem Value="4">Prueba4</asp:ListItem>
                                <asp:ListItem Value="5">Prueba5</asp:ListItem>
                            </asp:ListBox>

                            <asp:Button ID="btnSelecAll" runat="server" Text="Seleccionar Todos" OnClick="btnSelecAll_Click"/>
                        </div>
                        <br />
                        <div>
                            <span>Roles Asignados:</span> <asp:Label ID="lblRolesAsig" runat="server" Text="6"></asp:Label>
                            <br />
                            <div class="gr-bl gr-bl-11" style="text-align:center;display:flex;">
                                <asp:TextBox ID="inBuscarRolesAsig" runat="server" placeholder="Buscar..."></asp:TextBox>
                                <asp:LinkButton ID="BuscarRol" runat="server" OnClick="BuscarRol_Click">
                                    <img src="/lib/estilos/Repsol/images/btn_ico_search.png" title="Buscar modulo" />
                                </asp:LinkButton>
                            </div>
                            <br />

                            <asp:ListBox ID="lstRoleAsig" runat="server" SelectionMode="Multiple" style="width: 200px;">
                            </asp:ListBox>

                            <asp:Button ID="btnQuitarAll" runat="server" OnClick="btnQuitarAll_Click" Text="Quitar Todos"/>
                        </div>
                    </section>
                    <br />
                    <section class="footer">
                        <asp:Button ID="btnGuardar" OnClientClick="ShowLoadingUI()" runat="server" Text="Guardar" />
                        <asp:Button ID="Cancelar" runat="server" Text="Cancelar"/>
                    </section>
                </ContentTemplate>
            </asp:UpdatePanel>
            <span id="errorMessageLabel"></span>
        </div>
    </form>
</body>
</html>

