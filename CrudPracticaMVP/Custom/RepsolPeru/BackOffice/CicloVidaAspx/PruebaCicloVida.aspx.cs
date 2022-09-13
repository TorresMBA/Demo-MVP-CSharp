using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.CicloVidaAspx
{
    public partial class PruebaCicloVida : System.Web.UI.Page
    {
        private void Page_PreInit(object sender, EventArgs e)
        {
            /**
             * Es el 1er evento que podemos manejar, para poner 
             * un master page, un theme o para crear controles
             * dinámicos.
             */
            //lblCiclo.Text = "<br /> Evento Page.PreInit <br />";
            Response.Write("1) Pre Init <br />");
        }

        private void Page_Init(object sender, EventArgs e)
        {
            /**
             * Este evento se dispara después de que los controles
             * han sido inicializados, si se quiere cambiar los 
             * valores de inicio de los controles se debe hacer aquí
             */
            //lblCiclo.Text += "Evento Page.Init <br />";
            Response.Write("2) Init Complete <br />");
        }

        private void Page_InitComplete(object sender, EventArgs e)
        {
            /**
             */
            Response.Write("3) InitComplete <br />");
        }

        private void Page_PreLoad(object sender, EventArgs e)
        {
            /**
             */
            Response.Write("4) PreLoad <br />");
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            /**
             * La pagina esta creada, en este evento se pude checar
             * si es PostBack o se pidio la página.
             */

            //lblCiclo.Text += "Evento Page.Load <br />";
            Response.Write("5) Load <br />");

            if (Page.IsPostBack == true)
            {
                lblCiclo.Text += "<b>Esta no es la primera vez que ves la página.</b> <br />";
            }
            else
            {
                lblCiclo.Text += "<b>Bien, esta es la pagina que haz pedido</b> <br />";
            }
        }

        private void Page_LoadComplete(object sender, EventArgs e)
        {
            /**
             */
            Response.Write("6) LoadComplete <br />");
        }

        protected void btnCiclo_Click(object sender, EventArgs e)
        {
            /**
             * Se ejecutan los eventos de los controles
             * que hayan sido disparados en la página.
             */

            //lblCiclo.Text += "Evento btnCiclo.Click <br />";
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            /**
             * Este evento se dispara antes de guardar el ViewState
             * podemos hacer cambios al estado y se guradara.
             */

            //lblCiclo.Text += "Evento Page.PreRender <br /> <hr />";
            Response.Write("7) PreRender <br />");
        }

        private void Page_PreRenderComplete(object sender, EventArgs e)
        {
            /**
             */
            Response.Write("8) PreRenderComplete <br />");
        }

        protected void Page_Unload(object sender, EventArgs e)
        {
            /**
             * Este Texto nunca se vera porque el HTML ya se "pinto" en la página
             * Este evento se usa para liberar recursos en el servidor.
             */

            //lblCiclo.Text += "Evento Page.Unload <br />";
            //Response.Write("9) Unload <br />");
        }
    }
}