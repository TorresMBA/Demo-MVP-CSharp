using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ViewState
{
    public partial class PracitcaViewState : System.Web.UI.Page
    {
        /**
         * ViewState nos permite preservar los datos entre requests
         * El ViewState viaja con la petición y la respuesta, de esa manera
         * se conserva el dato.
         * Tenemos que colocar el nombre de la variable para el ViewState
         * Si no se ha usado previamente tiene el valor de null
         * Cuando lo leamos es importante hacer el typecast correspondiente.
         */

        private int conteo = 1;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                TextBox1.Text = "0";
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (ViewState["click"] != null)
            {
                conteo = (int)ViewState["click"] + 1;
            }

            TextBox1.Text = conteo.ToString();

            ViewState["click"] = conteo;
        }
    }
}