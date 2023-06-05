using CrudPracticaMVP.MVP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Repetidor
{
    public partial class PracticarRepetirSelec : System.Web.UI.Page
    {
        private List<ProgramasCliente> ProgramaClientesList
        {
            get { return (List<ProgramasCliente>)ViewState["ProgramaClientesList"]; }
            set { ViewState["ProgramaClientesList"] = value; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            GetProgramas();
            CargarProgramasList();

            // Create a new HtmlAnchor control.
            HtmlAnchor NewAnchorControl = new HtmlAnchor();

            // Set the properties of the new HtmlAnchor control.
            NewAnchorControl.Name = "NombreDeControl";
            NewAnchorControl.HRef = "http://www.google.com";
            NewAnchorControl.Target = "_blank";
            NewAnchorControl.InnerHtml = "Google";

            // Add the new HtmlAnchor control to the Controls collection of the
            // PlaceHolder control. 
            ContenedorControles.Controls.Add(NewAnchorControl);

            //---
            Message.InnerHtml = "Hello";
            lblTest.InnerText = "Soy Label";
        }

        private void GetProgramas()
        {
            List<ProgramasCliente> programasClientesList = new List<ProgramasCliente>();

            ProgramasCliente programasClientes = new ProgramasCliente();
            programasClientes.CodigoEverilion = "B001";
            programasClientes.TipoDocumento = "Dni";
            programasClientes.NroDocumento = "72816121";
            programasClientes.Nombre = "Brian";
            programasClientes.SegundoNombre = "Anthony";
            programasClientes.PrimerApellido = "Torres";
            programasClientes.SegundoApellido = "Menacho";
            programasClientes.NombreCompleto = "Brian Anthony Torres Menacho";
            programasClientes.Email = "btorreme@gmail.com";

            List<Programas> programas = new List<Programas>();

            Programas obj = new Programas();
            obj.CodigoPrograma = 114;
            obj.NombrePrograma = "LATAM Pass";
            obj.EstadoSolicitudSF = false;
            obj.FechaDesafiliacionPublicidad = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            obj.Publicidad = "0";
            programas.Add(obj);

            Programas obj2 = new Programas();
            obj2.CodigoPrograma = 115;
            obj2.NombrePrograma = "AFP Prima";
            obj2.EstadoSolicitudSF = true;
            obj2.FechaDesafiliacionPublicidad = "";
            obj2.Publicidad = "1";
            programas.Add(obj2);

            Programas obj3 = new Programas();
            obj3.CodigoPrograma = 4;
            obj3.NombrePrograma = "CMR Puntos";
            obj3.EstadoSolicitudSF = true;
            obj3.FechaDesafiliacionPublicidad = "";
            obj3.Publicidad = "1";
            programas.Add(obj3);

            Programas obj4 = new Programas();
            obj4.CodigoPrograma = 168;
            obj4.NombrePrograma = "PromoCard";
            obj4.EstadoSolicitudSF = false;
            obj4.FechaDesafiliacionPublicidad = "";
            obj4.Publicidad = "1";
            programas.Add(obj4);

            programasClientes.Programas = programas;
            programasClientesList.Add(programasClientes);
            ProgramaClientesList = programasClientesList;
        }

        private void CargarProgramasList()
        {
            this.rptVuelos.DataSource = ProgramaClientesList;
            this.rptVuelos.DataBind();
        }

        protected void RptrLinks_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                HtmlAnchor link = ((HtmlAnchor)e.Item.FindControl("lnka"));
                Panel pan = ((Panel)e.Item.FindControl("pnlDesglose"));

                link.Attributes["rel"] = "#" + pan.ClientID;
            }
        }
    }
}