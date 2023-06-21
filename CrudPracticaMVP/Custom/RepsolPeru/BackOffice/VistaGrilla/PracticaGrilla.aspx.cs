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

            // Obtén el número de página actual
            int currentPage = gridView1.PageIndex + 1;

            // Obtén el número total de páginas
            int totalPages = gridView1.PageCount;

            // Muestra el número de página actual
            lblPageNumber.Text = "Página " + currentPage.ToString() + " de " + totalPages.ToString();

            // Habilita/deshabilita los botones de navegación según sea necesario
            btnPreviousPage.Enabled = (currentPage > 1);
            btnNextPage.Enabled = (currentPage < totalPages);
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

        protected void btnGoToPage_Click(object sender, EventArgs e)
        {
            int pageNumber;
            if(int.TryParse(txtPageNumber.Text, out pageNumber))
            {
                if(pageNumber >= 1 && pageNumber <= gridView1.PageCount)
                {
                    gridView1.PageIndex = pageNumber - 1;
                    this.BindGrid();
                }
            }
        }

        protected void btnPreviousPage_Click(object sender, EventArgs e)
        {
            gridView1.PageIndex -= 1;
            BindGrid();
        }

        protected void btnNextPage_Click(object sender, EventArgs e)
        {
            gridView1.PageIndex += 1;
            BindGrid();
        }
    }
}