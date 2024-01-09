<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadExcel.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.CargarExcel.UploadExcel" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="SmManger" runat="server"></asp:ScriptManager>

            <asp:UpdatePanel ID="UpCargar" runat="server" UpdateMode="Conditional">
                <ContentTemplate>
                        <asp:FileUpload ID="fuExcel" runat="server" ToolTip="Seleccionar Excel..."/>
                        <br />
                        <asp:Button ID="btnCargar" runat="server" Text="Cargar" OnClick="btnCargar_Click" />
                </ContentTemplate>
                <Triggers>
                    <asp:PostBackTrigger ControlID="btnCargar" />
                </Triggers>
            </asp:UpdatePanel>
        </div>
    </form>
</body>
</html>
