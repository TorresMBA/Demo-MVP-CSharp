    <%@ Page Title="" Language="C#" MasterPageFile="~/ShareMaster/Share.Master" AutoEventWireup="true" CodeBehind="Mascota.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Mascota" %>
    <asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <title>Soy la Pagina Hija</title>
        <style>
           * {
               margin: 0;
               padding: 0;
           }
            </style>
    </asp:Content>

    <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

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
                    <td>Nombre</td>
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
                                    <asp:ImageButton ID="imgEditar" runat="server" Visible="false" CommandArgument='<%#Eval("id") %>' CausesValidation="False" CommandName="Eliminar" style="margin-left:15px;" OnClientClick="return func_confirm();"  />
                                </itemtemplate>
                            </td>
                            <td>
                                <itemtemplate>
                                    <asp:ImageButton ID="imgEliminar" runat="server" Visible="false" CommandArgument='<%#Eval("id") %>' CausesValidation="False" CommandName="Eliminar" style="margin-left:15px;" OnClientClick="return func_confirm();"  />
                                </itemtemplate>
                            </td>
                        </tr>
                    </ItemTemplate>
                </asp:Repeater>
             </tbody>
        </table>
        <br />
        <br />
        <%--<asp:imagebutton id="imagebutton1" runat="server" imageurl="~/sqlserver.png" />--%>
    </asp:Content>
