using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.Sys.WebForm
{
    public partial class PracticaSysWebForm : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                lblPrueba.Text = "NO es primera vez";
            }
            else
            {
                lblPrueba.Text = "SI es primera vez";
            }
        }

        protected void ProcessClick_Handler(object sender, EventArgs e)
        {
            System.Threading.Thread.Sleep(4000);
            lblPrueba.Text = "Prueba Loaded";
        }
    }
}