using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.VistaGrilla
{
    public partial class PracticaGrilla : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            BindGrid();
        }

        private void BindGrid()
        {
            using (DataTable dt = new DataTable())
            {
                dt.Columns.Add("PersonType");
                dt.Columns.Add("FirstName");
                dt.Columns.Add("LastName");

                for (int i = 0; i < 50; i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["PersonType"] = $"X {(i+1)}";
                    dr["FirstName"] = "Brian";
                    dr["LastName"] = "Torres";
                    dt.Rows.Add(dr);
                }
               

                gridView1.DataSource = dt;
                gridView1.DataBind();
            }
        }

        protected void OnPageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gridView1.VirtualItemCount = 20;
            gridView1.PageIndex = e.NewPageIndex;
            this.BindGrid();
        }
    }
}