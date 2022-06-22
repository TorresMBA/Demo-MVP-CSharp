<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestModalAspx.aspx.cs" Inherits="CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ModalAspx.TestModalAspx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/ilionp.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/ExtraLink.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/generalData.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/breadcrumb.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/StyBreadcrumb.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/ExtraLink.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/UI/jquery-ui-dialog.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/repsolperu.custom.min.css" type="text/css" />
    <link rel="stylesheet" href="https://preproduccion.everilion.com/lib/estilos/Repsol/Sections.css" type="text/css" />

    <link rel="stylesheet" href="/lib/estilos/Repsol/fSelect.css" type="text/css" />
    <link href="/lib/estilos/Repsol/plugins/datatables/css/select.dataTables.min.css" rel="stylesheet" />
    <link href="/lib/estilos/Repsol/plugins/datatables/css/jquery.dataTables.min.css" rel="stylesheet" />    
    <link href="../../../../lib/estilos/Repsol/UI/jquery-ui-dialog.css" rel="stylesheet" />
    <script type="text/javascript" src="../../../../lib/jQuery/UI/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/lib/jquery/ui/ui/animatedcollapse.js"></script>
    <script type="text/javascript" src="https://repsolperu.everilion.com/lib/jQuery/UI/jquery-ui.js"></script>
    <script type="text/javascript" src="/lib/estilos/Repsol/plugins/datatables/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/lib/estilos/Repsol/plugins/datatables/js/dataTables.select.min.js"></script>
    <title>Practica</title>
</head>
<style>
    .link-popup-sf {
        cursor: pointer;
        color: #2589a2;
        text-align: left;
        text-decoration: underline;
    }

    /* Modal Content/Box */
    /*<!--Modal Detalle -->*/
    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }


    .open {
        display: block !important; /* Hidden by default */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 5% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 900px; /* Could be more or less, depending on screen size */
        height: 650px;
    }

    /* The Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }


    .gr-row {
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>
<script>
    $(document).ready(function () {
        DatatableTest();

        $("#DtPrueba").on("click", "tbody tr td.details-control", function () {

            var tr = $(this).closest('tr');
            var row = $("#DtPrueba").DataTable().row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                destroyChild(row);
                tr.removeClass('shown');
            }
            else {
                // Open this row
                createChild(row);
                tr.addClass('shown');
            }
        });

        $(".close").on("click", function () {
            if (confirm("¿Desea salir?")) {
                $("#myModal").removeClass("open");
                var list = document.getElementById("modal-iframe");
                list.parentNode.removeChild(list);
                // $("#btnBuscar").click();
            }
        });
    });

    function DatatableTest() {
        const data = [{
            "Id": "SOD0000001",
            "Codigo": "Test001",
            "Estado": "Aprobado",
            "Cliente": "TorresMBA",
            "Fecha": "21/06/2022"
        }];
        $('#DtPrueba').DataTable({
            destroy: true,
            autoWidth: false,
            fixedColumns: true,
            scrollX: false,
            scrollCollapse: true,
            data: data,
            columns: [
                { data: "Id", title: "Id", width: '50px' },
                { data: "Codigo", title: "Codigo", width: '50px' },
                { data: "Estado", title: "Estado", orderable: false, width: '50px' },
                { data: "Cliente", title: "Cliente", orderable: false, width: '50px' },
                { data: "Fecha", title: "Fecha", orderable: false, width: '50px' },
                {
                    data: null,
                    orderable: false,
                    title: "Roles Responsables",
                    width: '100'
                },
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('link-popup-sf');
                    },
                    "render": function (data, type, row, meta) {
                        return '<a href="javascript:browseRow(\'' + row.Codigo + '\')">' + row.Codigo + '</a>';
                    }
                },
                {
                    "targets": [5],
                    "render": function (data, type, row, meta) {
                        return '<span class="gr-bl gr-bl-4" title = "Ver Detalle" >'+
                                '<a id="MyLink" href="javascript:abrirModalUsuarios(\'' + row.Codigo + '\')">' +
                                    '<img src="/lib/estilos/Repsol/images/busqueda.png" />' +
                                '</a>'+
                            '</span>';
                    }
                }
            ]
        });
    }

    function browseRow(id) {
        if (id != "" && id != null) {
            var str = '<iframe id="modal-iframe" src="./Modal.aspx?id=' + id + '&mode=browse" width="100%" height="95%" frameBorder="0"></iframe>';
            document.getElementById("modalFrame").insertAdjacentHTML('beforeend', str);
            $("#myModal").addClass("open");
        }
    }

    function abrirModalUsuarios(id) {
        $("#modalUsuarios").dialog({
            autoOpen: false,
            width: 800,
            height: 400,
            modal: true,
            title: 'Roles Responsables',
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                }
            }

        });

        $("#modalUsuarios").dialog("open");
    }
    //(function() {})();
</script>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div>
            <asp:UpdatePanel ID="Panel1" ContentPlaceHolderID="wfInterface" runat="server">
                <ContentTemplate>
                    <table id="DtPrueba">

                    </table>
                </ContentTemplate>
            </asp:UpdatePanel>

            <!-- The Modal -->
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content" id="modalFrame">
                    <span class="close">&times;</span>
                </div>
            </div>
            <!--Fin Modal-->

            <!--Modal Usuarios-->
            <div id="modalUsuarios" title="Detalle Informativo" style="display: none; background-color: white; font-family: inherit; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal;">
               <div class="gr-row">                                     
                     <div style="font-size:0.8rem"> 
                          <table id="dtDetalleUsuarios" border="1" class="display dataTable dt-checkboxes-select1 compact1" style="width: 100%; font-size:0.8rem">
                              <thead>
                                  <tr>
                                      <th>Rol</th>
                                      <th>Perfil</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Operaciones - Jefe Estación</td>
                                      <td>Jefe Estación</td>
                                  </tr>
                              </tbody>
                         </table>
         		    </div>                                             
                </div>
            </div>
        <!--Fin Modal Usuarios-->
        </div>
    </form>
</body>
</html>
