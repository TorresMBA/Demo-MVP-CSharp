<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PracticarRepetirSelec.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Repetidor.PracticarRepetirSelec" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Repeater ID="rptVuelos" runat="server" OnItemDataBound="RptrLinks_ItemDataBound">
                <ItemTemplate>
                    <div style="float:left;width:100%;clear:both;padding-bottom:1em">
                        <div style="float:left;width:100%;clear:both;background-color:#013888;color:White;font-size:large">
                            <div style="float:left;width:30%;background-color:#013888;color:White;font-size:large">
                                <asp:Label ID="lblFare" runat="server" /> 
                            </div>
                            <asp:Panel runat="server" ID="pnlDesglose">
                                <asp:Literal ID="LitDesglose" runat="server"></asp:Literal>
                            </asp:Panel>
                            <div style="float:left;width:70%;background-color:#013888;color:White;font-size:large">
                                <a id="lnka" runat="server" href="" class="localtip"  title="Desglose" >Desglose</a>
                            </div>
                        </div>
                    </div>
                </ItemTemplate>
            </asp:Repeater>

            <hr />

            <asp:Panel ID="pnlTest" runat="server">
                 <h3> HtmlAnchor Constructor Example </h3>
                <asp:PlaceHolder ID="ContenedorControles" runat="server"></asp:PlaceHolder>
            </asp:Panel>

            <hr />

            <span id="Message" runat="server"></span>
            <label id="lblTest" runat="server"></label>
        </div>
    </form>
</body>
</html>
