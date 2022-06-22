using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ModalAspx
{
    public partial class TestModalAspx : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager _scriptMan = ScriptManager.GetCurrent(this.Page);
            _scriptMan.AsyncPostBackTimeout = 360000;
        }
    }
}