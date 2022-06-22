using CrudPracticaMVP.MVP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Repetidor
{
    public partial class PracticaRepetir : System.Web.UI.Page
    {
        private List<Programas> ProgramaClientesList
        {
            get { return (List<Programas>)ViewState["ProgramaClientesList"]; }
            set { ViewState["ProgramaClientesList"] = value; }
        }

        private List<Programas> ProgramaClientesListDesafiliar
        {
            get { return (List<Programas>)ViewState["ProgramaClientesListDesafiliar"]; }
            set { ViewState["ProgramaClientesListDesafiliar"] = value; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetProgramas();
                CargarProgramasList();
            }
        }

        private void CargarProgramasList()
        {
            this.ProgramasAfiliados.DataSource = ProgramaClientesList;
            this.ProgramasAfiliados.DataBind();
        }

        private void GetProgramas()
        {
            List<Programas> programasClientes = new List<Programas>();

            Programas obj = new Programas();
            obj.CodigoPrograma = 114;
            obj.NombrePrograma = "LATAM Pass";
            obj.EstadoSolicitudSF = false;
            obj.FechaDesafiliacionPublicidad = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            obj.Publicidad = "0";
            programasClientes.Add(obj);

            Programas obj2 = new Programas();
            obj2.CodigoPrograma = 115;
            obj2.NombrePrograma = "AFP Prima";
            obj2.EstadoSolicitudSF = true;
            obj2.FechaDesafiliacionPublicidad = "";
            obj2.Publicidad = "1";
            programasClientes.Add(obj2);

            Programas obj3 = new Programas();
            obj3.CodigoPrograma = 4;
            obj3.NombrePrograma = "CMR Puntos";
            obj3.EstadoSolicitudSF = true;
            obj3.FechaDesafiliacionPublicidad = "";
            obj3.Publicidad = "1";
            programasClientes.Add(obj3);

            Programas obj4 = new Programas();
            obj4.CodigoPrograma = 168;
            obj4.NombrePrograma = "PromoCard";
            obj4.EstadoSolicitudSF = false;
            obj4.FechaDesafiliacionPublicidad = "";
            obj4.Publicidad = "1";
            programasClientes.Add(obj4);

            ProgramaClientesList = programasClientes;
        }

        protected void cbkPrograma_CheckedChanged(object sender, EventArgs e)
        {
            CheckBox chk = (CheckBox)sender;
            RepeaterItem item = (RepeaterItem)chk.NamingContainer;
            HiddenField codeProgram = (HiddenField)item.FindControl("CodigoOculto");

            if (ProgramaClientesListDesafiliar == null)
            {
                ProgramaClientesListDesafiliar = new List<Programas>();
            }

            if (!string.IsNullOrEmpty(codeProgram.Value))
            {
                var program = ProgramaClientesList.Find(x => x.CodigoPrograma == int.Parse(codeProgram.Value));
                if (program != null && !program.EstadoSolicitudSF && chk.Checked)
                {
                    program.EstadoSolicitudSF = true;
                    if (!ProgramaClientesListDesafiliar.Exists(i => i.CodigoPrograma == int.Parse(codeProgram.Value)))
                    {
                        ProgramaClientesListDesafiliar.Add(program);
                    }
                }
            }
        }

        protected void btnEnviar_Click(object sender, EventArgs e)
        {
            var cantidad = ProgramaClientesListDesafiliar.Count;
            ProgramaClientesListDesafiliar = null;
        }

        protected void btnAceptar_Click(object sender, EventArgs e)
        {
            var cantidad = ProgramaClientesListDesafiliar.Count;
            ProgramaClientesListDesafiliar = null;
        }

        protected void cbkPrograma_Load(object sender, EventArgs e)
        {
            CheckBox chk = (CheckBox)sender;
            RepeaterItem item = (RepeaterItem)chk.NamingContainer;
            HiddenField codeProgram = (HiddenField)item.FindControl("CodigoOculto");

            var program = ProgramaClientesList.Find(x => x.CodigoPrograma == int.Parse(codeProgram.Value));
            chk.InputAttributes["class"] = "test";
            if (program.EstadoSolicitudSF)
            {
                chk.InputAttributes["disabled"] = "disabled";
                chk.Checked = true;
            }
        }

        protected void lblFechaDesafiliacion_Load(object sender, EventArgs e) {
            Label lbl = (Label)sender;
            RepeaterItem item = (RepeaterItem)lbl.NamingContainer;
            HiddenField codeProgram = (HiddenField)item.FindControl("CodigoOculto");

            var program = ProgramaClientesList.Find(x => x.CodigoPrograma == int.Parse(codeProgram.Value));

            if(program.EstadoSolicitudSF) {
                lbl.Text = "En Proceso**";
            } else if((!string.IsNullOrEmpty(program.FechaDesafiliacionPublicidad)) && program.Publicidad.Equals("0")) {
                lbl.Text = " " + program.FechaDesafiliacionPublicidad + "*";
            }
        }
    }
}