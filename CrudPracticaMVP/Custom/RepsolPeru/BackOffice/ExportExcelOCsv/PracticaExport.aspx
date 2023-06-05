<%@ Page Language="C#" 
    AutoEventWireup="true"
    CodeBehind="PracticaExport.aspx.cs" 
    EnableEventValidation = "false"
    Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ExportExcelOCsv.PracticaExport" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView ID="gridView1" runat="server" 
                AutoGenerateColumns="false" 
                AllowPaging="true" 
                PagerStyle-CssClass="pagingDiv"
                OnPageIndexChanging="OnPageIndexChanging" 
                PageSize="5">
                <PagerSettings Mode="NumericFirstLast" PageButtonCount="4"  FirstPageText="Inicio" LastPageText="Ultimo"/>
                <Columns>
                    <asp:BoundField  DataField="PersonType" HeaderText="Tipo Persona"/>
                    <asp:BoundField  DataField="FirstName" HeaderText="Nombre"/>
                    <asp:BoundField  DataField="LastName" HeaderText="Apellido"/>
                </Columns>
            </asp:GridView>
        </div>
        <asp:LinkButton ID="LinkButton1" runat="server" Font-Bold="True" Font-Size="Medium" OnClick="LinkButton1_Click">Export To Excel</asp:LinkButton>
        <br />
        <asp:LinkButton ID="LinkButton2" runat="server" Font-Bold="True" Font-Size="Medium" OnClick="LinkButton2_Click">Export To Csv</asp:LinkButton>
        <br />
        <asp:LinkButton ID="LinkButton3" runat="server" Font-Bold="True" Font-Size="Medium" OnClick="LinkButton3_Click">Export To Pdf</asp:LinkButton>
    </form>
</body>
</html>
