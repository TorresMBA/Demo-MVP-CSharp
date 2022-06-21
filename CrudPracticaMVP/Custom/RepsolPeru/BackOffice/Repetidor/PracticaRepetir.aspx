<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PracticaRepetir.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Repetidor.PracticaRepetir" %>
<%--<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc" %>--%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Repeater runat="server" ID="ListaProgramas">
                <ItemTemplate>
                    <div>
                        <div>
                            <div>
                                <asp:LinkButton ID="LinkBoton" runat="server">
                                    Click Aqui!
                                </asp:LinkButton>
                            </div>
                            <div>
                                <label><%#((CrudPracticaMVP.MVP.Entities.ProgramasCliente)Container.DataItem).NombrePrograma %></label>
                            </div>
                        </div>
                        <div>
                            <asp:CheckBox ID="cbkPrograma" runat="server" OnLoad="cbkPrograma_Load" OnCheckedChanged="cbkPrograma_CheckedChanged" Checked="<%#((CrudPracticaMVP.MVP.Entities.ProgramasCliente)Container.DataItem).EstadoDesafiliado %>"/>
                        </div>
                        <asp:HiddenField runat="server" ID="CodigoOculto" Value="<%#((CrudPracticaMVP.MVP.Entities.ProgramasCliente)Container.DataItem).CodigoPrograma %>"/>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
            <div>
                <asp:Button ID="btnEnviar" runat="server" OnClick="btnEnviar_Click" Text="Enviar" />

            </div>
        </div>
    </form>
</body>
</html>
