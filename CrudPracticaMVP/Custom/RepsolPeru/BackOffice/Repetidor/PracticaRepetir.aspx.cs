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
        private List<ProgramasCliente> ProgramaClientesList
        {
            get { return (List<ProgramasCliente>)ViewState["ProgramaClientesList"]; }
            set { ViewState["ProgramaClientesList"] = value; }
        }

        private List<ProgramasCliente> ProgramaClientesListDesafiliar
        {
            get { return (List<ProgramasCliente>)ViewState["ProgramaClientesListDesafiliar"]; }
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
            this.ListaProgramas.DataSource = ProgramaClientesList;
            this.ListaProgramas.DataBind();
        }

        private void GetProgramas()
        {
            List<ProgramasCliente> programasClientes = new List<ProgramasCliente>();

            ProgramasCliente obj = new ProgramasCliente();
            obj.CodigoPrograma = "168";
            obj.NombrePrograma = "Promocard";
            obj.EstadoDesafiliado = true;
            programasClientes.Add(obj);

            ProgramasCliente obj2 = new ProgramasCliente();
            obj2.CodigoPrograma = "114";
            obj2.NombrePrograma = "AFP Prima";
            obj2.EstadoDesafiliado = false;
            programasClientes.Add(obj2);

            ProgramasCliente obj3 = new ProgramasCliente();
            obj3.CodigoPrograma = "4";
            obj3.NombrePrograma = "Cmr Puntos";
            obj3.EstadoDesafiliado = true;
            programasClientes.Add(obj3);

            ProgramasCliente obj4 = new ProgramasCliente();
            obj4.CodigoPrograma = "115";
            obj4.NombrePrograma = "Latam Pass";
            obj4.EstadoDesafiliado = false;
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
                ProgramaClientesListDesafiliar = new List<ProgramasCliente>();
            }

            if (!string.IsNullOrEmpty(codeProgram.Value))
            {
                var program = ProgramaClientesList.Find(x => x.CodigoPrograma.Equals(codeProgram.Value));
                if (program != null)
                {
                    if (chk.Checked)
                    {
                        program.EstadoDesafiliado = true;
                        if (!ProgramaClientesListDesafiliar.Exists(i => i.CodigoPrograma == codeProgram.Value))
                        {
                            ProgramaClientesListDesafiliar.Add(program);
                        }
                    }
                    else
                    {
                        program.EstadoDesafiliado = false;
                    }

                }
            }
        }

        protected void btnEnviar_Click(object sender, EventArgs e)
        {
            var cantidad = ProgramaClientesListDesafiliar.Count;
            ProgramaClientesListDesafiliar = null;
        }

        protected void cbkPrograma_Load(object sender, EventArgs e)
        {
            CheckBox chk = (CheckBox)sender;
            RepeaterItem item = (RepeaterItem)chk.NamingContainer;
            HiddenField codeProgram = (HiddenField)item.FindControl("CodigoOculto");

            var program = ProgramaClientesList.Find(x => x.CodigoPrograma.Equals(codeProgram.Value));

            if (program.EstadoDesafiliado)
            {
                chk.Enabled = false;
                //chk.Text = program.NombrePrograma + DateTime.Now.ToString(" dd/MM/yyyy HH:mm:ss") + "**";
            }
        }
    }
}