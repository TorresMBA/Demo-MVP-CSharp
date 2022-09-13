<%@ Page Language="C#" 
    AutoEventWireup="true" 
    CodeBehind="PruebaCicloVida.aspx.cs" 
    Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.CicloVidaAspx.PruebaCicloVida" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="btnCiclo" runat="server" OnClick="btnCiclo_Click" Text="Click!"/>
            <asp:Label ID="lblCiclo" runat="server"></asp:Label>
        </div>
    </form>
</body>
</html>
