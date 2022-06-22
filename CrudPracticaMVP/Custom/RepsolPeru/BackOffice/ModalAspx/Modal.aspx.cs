using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ModalAspx
{
    public partial class Modal : System.Web.UI.Page
    {
        private List<string> RolesAsignadosList
        {
            get { return (List<string>)ViewState["ListRolesAsignados"]; }
            set { ViewState["ListRolesAsignados"] = value; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetRolesAsignados();
                CargarRolesAsignados();
            }
        }

        protected void btnSelecAll_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < lstRolesNoAsig.Items.Count; i++)
            {
                lstRolesNoAsig.Items[i].Selected = true;
            }
        }

        protected void btnQuitarAll_Click(object sender, EventArgs e)
        {
            RolesAsignadosList.Clear();

            CargarRolesAsignados();
        }

        private void CargarRolesAsignados()
        {
            this.lstRoleAsig.DataSource = RolesAsignadosList;
            this.lstRoleAsig.DataBind();
        }

        private void GetRolesAsignados()
        {
            List<string> obj = new List<string>();
            obj.Add("Rol Asignado 1");
            obj.Add("Rol Asignado 2");
            obj.Add("Rol Asignado 3");
            obj.Add("Rol Asignado 4");
            obj.Add("Rol Asignado 5");

            RolesAsignadosList = obj;
        }

        protected void BuscarRol_Click(object sender, EventArgs e) {
            try {
                GetRolesAsignados();
                List<string> listRolAsig = new List<string>();

                foreach(var str in RolesAsignadosList) {
                    if(str.Contains(inBuscarRolesAsig.Text)) {
                        listRolAsig.Add(str);
                    }
                }

                if(inBuscarRolesAsig.Text.Equals("") || listRolAsig == null) {
                    GetRolesAsignados();
                } else {
                    RolesAsignadosList = listRolAsig;
                }

                CargarRolesAsignados();
            } catch(Exception ex) {

                throw;
            }
        }
    }
}