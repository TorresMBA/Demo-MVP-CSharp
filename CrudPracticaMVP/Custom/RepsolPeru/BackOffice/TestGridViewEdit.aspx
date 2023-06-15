<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestGridViewEdit.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.TestChatGPS" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />        
        <div>
            <asp:Repeater ID="repeaterDatos" runat="server">
                    <ItemTemplate>
                        <tr>
                            <td><%# Eval("id") %></td>
                            <td><asp:TextBox ID="txtColumna1" runat="server" Text='<%# Eval("nombre") %>' Enabled="false"></asp:TextBox></td>
                            <td><asp:TextBox ID="txtColumna2" runat="server" Text='<%# Eval("raza") %>' Enabled="false"></asp:TextBox></td>
                            <%--<td><asp:TextBox ID="txtColumna3" runat="server" Text='<%# Eval("Columna3") %>' Enabled="false"></asp:TextBox></td>
                            <td><asp:TextBox ID="txtColumna4" runat="server" Text='<%# Eval("Columna4") %>' Enabled="false"></asp:TextBox></td>--%>
                            <td>
                                <asp:Button ID="btnEditar" runat="server" Text="Editar" OnClick="btnEditar_Click" CommandArgument='<%# Eval("id") %>' />
                                <asp:Button ID="btnGuardar" runat="server" Text="Guardar" OnClick="btnGuardar_Click" CommandArgument='<%# Eval("id") %>' Visible="false" />
                            </td><br /><br />
                        </tr>
                    </ItemTemplate>
            </asp:Repeater>

            <hr />
            <div>
                <asp:TextBox ID="txtCod" runat="server" placeholder="Codigo.."></asp:TextBox>
                <asp:TextBox ID="txtNom" runat="server" placeholder="Nombre.."></asp:TextBox>
                <asp:TextBox ID="txtRaza" runat="server" placeholder="Raza..."></asp:TextBox>
                <asp:Button ID="btnInsertar" runat="server" Text="Agregar" OnClick="btnInsertar_Click"/>
                <br /><br />
            </div>
            <asp:UpdatePanel runat="server" id="UpdatePanel" updatemode="Conditional">
                <ContentTemplate>
                    <asp:GridView ID="GridView1" runat="server" 
                        AutoGenerateColumns="False" 
                        OnRowEditing="GridView1_RowEditing" 
                        OnRowUpdating="GridView1_RowUpdating" 
                        OnRowCancelingEdit="GridView1_RowCancelingEdit" 
                        OnRowDeleting="GridView1_RowDeleting"
                        OnRowDataBound="GridView1_RowDataBound"
                        DataKeyNames="ID">
                        <Columns>
                            <asp:TemplateField HeaderText="ID">
                                <ItemTemplate>
                                    <asp:Button ID="btnEdit" runat="server" Text='<%# Eval("id") %>' CommandName="Edit" />
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:Button ID="btnUpdate" runat="server" Text="Guardar" CommandName="Update"/>
                                    <asp:Button ID="btnDelete" runat="server" Text="Cancelar" CommandName="Cancel"/>
                                </EditItemTemplate>
                            </asp:TemplateField>

                            <asp:TemplateField HeaderText="Nombre">
                                <ItemTemplate>
                                    <asp:Label ID="Label1" runat="server" Text='<%# Eval("nombre") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="txtNombre" runat="server" Text='<%# Eval("nombre") %>' Enabled="true"></asp:TextBox>
                                    <asp:DropDownList ID="ddlNombre" runat="server">
                                        <asp:ListItem Text="a" Value="a"></asp:ListItem>
                                        <asp:ListItem Text="b" Value="b"></asp:ListItem>
                                        <asp:ListItem Text="c" Value="c"></asp:ListItem>
                                    </asp:DropDownList>
                                </EditItemTemplate>
                            </asp:TemplateField>

                            <asp:TemplateField HeaderText="Raza">
                                <ItemTemplate>
                                    <asp:Label ID="Label2" runat="server" Text='<%# Eval("raza") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="txtRaza" runat="server" Text='<%# Eval("raza") %>' Enabled="true"></asp:TextBox>
                                    
                                    <asp:TextBox ID="txtFromDate" runat="server" CssClass="CELDAL7" EnableViewState="true" MaxLength="10"></asp:TextBox>
                                    <asp:ImageButton ID="ibFromDate" runat="server" CssClass="imgbtn" SkinID="calendar" Width="25px" ImageUrl="~/lib/estilos/Ilion_skin/img/calendar.png" />
                                    <cc2:CalendarExtender ID="ceFromDate" runat="server" Enabled="true" Format="dd/MM/yyyy" PopupButtonID="ibFromDate" TargetControlID="txtFromDate"></cc2:CalendarExtender>
                                    <cc2:MaskedEditExtender ID="mskFecha" TargetControlID="txtFromDate" runat="server" Mask="99/99/9999" MaskType="Date" MessageValidatorTip="true" OnFocusCssClass="MaskedEditFocus" ClearMaskOnLostFocus="true"/>
                                </EditItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </form>
</body>
</html>
