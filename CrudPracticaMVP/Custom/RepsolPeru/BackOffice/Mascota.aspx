    <%@ Page Title="" EnableEventValidation="false" Language="C#" MasterPageFile="~/ShareMaster/Share.Master" AutoEventWireup="true" CodeBehind="Mascota.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Mascota" %>
    <asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <title>Soy la Pagina Hija</title>
        <style>
           * {
               margin: 0;
               padding: 0;
           }
            .auto-style1 {
                height: 24px;
                width: 86px;
            }
            .auto-style2 {
                width: 86px;
            }
            </style>
    </asp:Content>

    <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <script type="text/javascript" languaje="javascript">
            function func_confirm() {
                if (confirm("Esta seguro de eliminar este registro?")) {
                     return true;
                 } else {
                     return false;
                 }

             }
        </script>
        Nombre:<asp:TextBox ID="nombre" runat="server"></asp:TextBox>
        <br />
        Raza:<asp:TextBox ID="raza" runat="server"></asp:TextBox>

        <br />
        <asp:Button ID="btnGrabar" runat="server" Text="Grabar" OnClick="btnGrabar_Click" />
        <br />

        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Raza</td>
                </tr>
            </thead>
            <tbody>
                <%--<asp:Repeater ID="listMascotas" runat="server" OnItemCommand="listMascotas_ItemCommand">
                    <itemtemplate>
                        <tr>
                            <td>
                                <%# Eval("id") %>
                            </td>
                            <td>
                                <%# Eval("nombre") %>
                            </td>
                            <td>
                                <%# Eval("raza") %>
                            </td>
                            <td>
                                <itemtemplate>

                                </itemtemplate>
                            </td>
                            <td>
                                <itemtemplate>

                                </itemtemplate>
                            </td>
                        </tr>
                    </itemtemplate>
                </asp:Repeater>--%>
            </tbody>
        </table>
        <br />
        <br />
        ==========================
        <br />
        <br />
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td class="auto-style2">Nombre</td>
                    <td>Raza</td>
                    <td>Editar</td>
                    <td>Eliminar</td>
                </tr>
            </thead>
            <tbody>
                <asp:Repeater ID="Repeater1" runat="server" OnItemCommand="Repeater1_ItemCommand" OnItemDataBound="Repeater1_ItemDataBound">
                    <ItemTemplate>
                        <tr>
                            <td>
                                <%# Eval("id") %>
                            </td>
                            <td>
                                <%# Eval("nombre") %>
                            </td>
                            <td>
                                <%# Eval("raza") %>
                            </td>
                            <td>   
                                <itemtemplate>
                                    <asp:ImageButton ID="imgEditar" runat="server" Visible="false" CommandArgument='<%#Eval("id") %>' CausesValidation="False" CommandName="Editar" style="margin-left:15px;"   />
                                </itemtemplate>
                            </td>
                            <td>
                                <itemtemplate>
                                    <asp:ImageButton ID="imgEliminar" runat="server" Visible="false" CommandArgument='<%#Eval("id") %>' CausesValidation="False" CommandName="Eliminar" style="margin-left:15px;" OnClientClick="return func_confirm();" />
                                </itemtemplate>
                            </td>
                        </tr>
                    </ItemTemplate>
                </asp:Repeater>
             </tbody>
        </table>
        <br />
        <br />
        <br />
        <asp:Repeater ID="Repeater2" runat="server">
        </asp:Repeater>
        <br />
        <%--<asp:imagebutton id="imagebutton1" runat="server" imageurl="~/sqlserver.png" />--%>
    </asp:Content>
