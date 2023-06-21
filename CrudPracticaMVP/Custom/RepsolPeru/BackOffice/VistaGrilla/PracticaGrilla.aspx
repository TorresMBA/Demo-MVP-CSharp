<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PracticaGrilla.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.VistaGrilla.PracticaGrilla" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style>
        #gridView {
            margin: 25px auto 0 auto;
        }
  
        #gridView > tbody > tr:nth-child(1) {
            background-color: #0f40e0;
        }
  
        #gridView > tbody > tr:not(:nth-child(1)) {
            background-color: #ff6a00;
        }
  
        #gridView > tbody > tr.pagingDiv {
            background-color: #f2f2f2;
        }
  
        #gridView > tbody > tr.pagingDiv table {
            padding-left: 10px;
            width: 35%;
        }
  
        #gridView > tbody > tr.pagingDiv table td {
            display: inline;
        }
  
        .pagingDiv a, .pagingDiv span {
            display: inline-block;
            padding: 0px 9px;
            margin-right: 4px;
            border-radius: 3px;
            border: solid 1px #c0c0c0;
            background: #e9e9e9;
            box-shadow: inset 0px 1px 0px rgba(255,255,255, .8), 0px 1px 3px rgba(0,0,0, .1);
            font-size: .875em;
            font-weight: bold;
            text-decoration: none;
            color: #717171;
            text-shadow: 0px 1px 0px rgba(255,255,255, 1);
        }
  
        .pagingDiv a:hover {
            background: #fefefe;
            background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FEFEFE), to(#f0f0f0));
            background: -moz-linear-gradient(0% 0% 270deg,#FEFEFE, #f0f0f0);
        }
  
        .pagingDiv a.active {
            border: none;
            background: #616161;
            box-shadow: inset 0px 0px 8px rgba(0,0,0, .5), 0px 1px 0px rgba(255,255,255, .8);
            color: #f0f0f0;
            text-shadow: 0px 0px 3px rgba(0,0,0, .5);
        }
  
        .pagingDiv span {
            color: #f0f0f0;
            background: #616161;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:TextBox ID="txtPageNumber" runat="server" CssClass="page-input"></asp:TextBox>
            <asp:Button ID="btnGoToPage" runat="server" Text="Ir" OnClick="btnGoToPage_Click" />

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
            <br />
            <asp:LinkButton ID="btnPreviousPage" runat="server" OnClick="btnPreviousPage_Click">
                <span class="glyphicon glyphicon-chevron-left"><</span>
            </asp:LinkButton>

            <asp:Label ID="lblPageNumber" runat="server" CssClass="page-label"></asp:Label>

            <asp:LinkButton ID="btnNextPage" runat="server" OnClick="btnNextPage_Click">
                <span class="glyphicon glyphicon-chevron-right">></span>
            </asp:LinkButton>
        </div>
    </form>
</body>
</html>
