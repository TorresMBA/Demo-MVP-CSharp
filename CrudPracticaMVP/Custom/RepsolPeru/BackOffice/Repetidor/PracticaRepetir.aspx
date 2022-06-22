<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PracticaRepetir.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Repetidor.PracticaRepetir" %>
<%--<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc" %>--%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cancelar Suscripción</title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <style>
            *,
            *:before,
            *:after {
                box-sizing: border-box;
            }

            body {
                margin: 0;
            }

            .container {
                max-width: 545px;
                margin: 25px auto;
                display: flex; 
                flex-direction: column; 
                border: 2px solid #838383; 
                padding: 25px;
                font-family: Arial, Helvetica, sans-serif;

                max-height: 785px;
                justify-content: space-between;
            }

            .titulo{
                color: #7b7b7b; 
                text-transform: uppercase;
                letter-spacing: -1px;
                font-weight: bold;
            }

            .body{
                color: #adadad;
                height: 80%;
            }

            .text{
                font-weight: 600;
                font-size: 19px;
            }

            .form-control {
                font-size: 15px;
                font-weight: 600;
                line-height: 1.1;
                display: grid;
                grid-template-columns: 1em auto;
                gap: 0.5em;
                margin-top: 10px;
            }

            input[type="checkbox"]:not(old){
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                margin-top: 6px;
            }

            input[type="checkbox"]:not(old) + label::-moz-selection,
            input[type="checkbox"]:not(old) + label::selection{
                color: inherit;
                background-color: transparent;
            }

            input[type="checkbox"]:not(old) + label {
                cursor: pointer;
            }

            input[type="checkbox"]:not(old) + label:before {
                content: '';
                width: 15px;
                height: 15px;
                border: 1px double #ff8000;
                cursor: pointer;
                vertical-align: middle;
                display: inline-block;
                margin-right: 5px;
            }

            input[type="checkbox"]:not(old):checked + label:before {
                box-shadow: inset 0 0 1px 2px white;
                background: #ff8000;
            }

            .button-aceptar {
                width: 250px;
                border-radius: 10px;
                height: 55px;
                border: none;
                color: #11528e;
                font-size: 20px;
                font-weight: 600;
                background-color: #c4eeec;
                cursor: pointer;
            }

            .footer {
                padding-top: 40px; 
                margin: 0 auto;
            }
        </style>
        <script>
            function TestCheckBox() {
                var allChecksBoxes = document.querySelectorAll('input[type="checkbox"]');
                var listProgramas = "";
                var chkVacio = [].filter.call(allChecksBoxes, function (el) {
                    if (el.checked && (!el.disabled)) {
                        listProgramas += el.value + ",";
                    }
                    return !el.checked
                });

                document.getElementById("hListPrograms").value = listProgramas;
                if (allChecksBoxes.length == chkVacio.length) {
                    alert("1");
                    return false;
                }

                var value = document.getElementsByClassName("lblValor");
                var cant_ast = 0;
                for (var x = 0; x < value.length; x++) {
                    if ((value[x].innerHTML).includes("**")) {
                        cant_ast++;
                    } 
                }

                if (cant_ast == value.length) {
                    alert("2");
                    return false;
                } else if (listProgramas === null || listProgramas === "") {
                    alert("Seleccione un programa sin procesar");
                    return false;
                }
            }
        </script>
        <div>
            <%--<asp:Repeater runat="server" ID="ListaProgramas">
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
                            <asp:CheckBox ID="cbkProgramaBack" runat="server" OnLoad="cbkPrograma_Load" OnCheckedChanged="cbkPrograma_CheckedChanged" Checked="<%#((CrudPracticaMVP.MVP.Entities.ProgramasCliente)Container.DataItem).EstadoDesafiliado %>"/>
                        </div>
                        <asp:HiddenField runat="server" ID="CodigoOculto" Value="<%#((CrudPracticaMVP.MVP.Entities.ProgramasCliente)Container.DataItem).CodigoPrograma %>"/>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
            <div>
                <asp:Button ID="btnEnviar" runat="server" OnClick="btnEnviar_Click" Text="Enviar" />
            </div>--%>

            <div class="container">
                <div class="header">
                    <img src="../../../../lib/estilos/Ilion_skin/img/Repsol1.png" alt="Repsol" width="215">
                </div>
                <div class="body">
                    <div>
                        <h2 class="titulo">Cancelar Suscripción a Publicidad</h2>
                    </div>
                    <div>
                        <p class="text">
                            Hola Brian Anthony Torres Menacho! <br />
                            btorreme@gmail.com    
                        </p>
                        <p>
                            Para anular la Suscripción a cualquier publicación, deseleccione el cuadro y haga click en el botón Aceptar.
                        </p>
                    </div>
                    <div>
                        <p>Programas Disponibles:</p>
                        <table>
                            <tbody>
                                <asp:Repeater ID="ProgramasAfiliados" runat="server">
                                    <ItemTemplate>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="cbkPrograma" runat="server" OnLoad="cbkPrograma_Load" OnCheckedChanged="cbkPrograma_CheckedChanged"/>
                                                    
                                                <asp:Label AssociatedControlID="cbkPrograma" ID="lblNombreProgram" runat="server" class="form-control">
                                                    <%#((CrudPracticaMVP.MVP.Entities.Programas)Container.DataItem).NombrePrograma %>
                                                </asp:Label>

                                                <asp:HiddenField runat="server" ID="CodigoOculto" Value="<%#((CrudPracticaMVP.MVP.Entities.Programas)Container.DataItem).CodigoPrograma %>"/>
                                            </td>
                                            <td>
                                                <asp:Label ID="lblFechaDesafiliacion" OnLoad="lblFechaDesafiliacion_Load" runat="server" CssClass="lblValor" style="display:block; margin-top: 10px; text-align:center; margin-left:55px;" for="<%#((CrudPracticaMVP.MVP.Entities.Programas)Container.DataItem).NombrePrograma %>">
                                                    <%#((CrudPracticaMVP.MVP.Entities.Programas)Container.DataItem).FechaDesafiliacionPublicidad %>
                                                </asp:Label>
                                            </td>
                                        </tr>
                                    </ItemTemplate>
                                </asp:Repeater>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="footer">
                    <asp:Button ID="btnAceptar" CssClass="button-aceptar" runat="server" Text="Cancelar Suscripcion" OnClientClick="javascript:return TestCheckBox();" OnClick="btnAceptar_Click" />
                </div>
            </div>
        </div>
        <asp:HiddenField runat="server" ID="hListPrograms" ClientIDMode="Static" />
    </form>
</body>
</html>
