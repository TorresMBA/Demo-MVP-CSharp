<%@ Page Language="C#" 
    AutoEventWireup="true" 
    CodeBehind="PracticaUpdatePanel.aspx.cs"
    Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.UpdatePanel.PracticaUpdatePanel" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <br />
            Esto esta fuera de un UpdatePanel<br />
            <asp:Button ID="Button1" runat="server" Text="Boton SinUpdatePanel" />
            <br />
            <br />

            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <br />
                    Esto está en el UpdatePanel<br />
                    <br />
                    <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Text="Boton UpdatePanel" />
                    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
                    <br />
                    <asp:UpdateProgress ID="UpdateProgress1" runat="server">
                        <ProgressTemplate>
                            Cargando Datos, Espere Por favor...
                        </ProgressTemplate>
                    </asp:UpdateProgress>
                </ContentTemplate>
            </asp:UpdatePanel>

        </div>
    </form>
</body>
</html>
