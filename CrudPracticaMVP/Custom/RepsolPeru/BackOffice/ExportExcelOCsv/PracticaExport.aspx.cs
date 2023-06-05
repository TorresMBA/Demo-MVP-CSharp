using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.ExportExcelOCsv
{
    public partial class PracticaExport : System.Web.UI.Page
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
                    dr["PersonType"] = $"X {(i + 1)}";
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

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            /* Se tendría que llenar un nuevo grid view con toda la info a exportar | opcion 1
            GridView gv = new GridView();
            gv.DataSource = sourceList; //Your datasource from database
            gv.DataBind();
             */
            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();
            Response.Buffer = true;
            Response.Charset = "";

            string fileName = "Test_" + DateTime.Now + ".xlsx";


            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "application/ms-excel";
            Response.AddHeader("Content-Disposition", "attachment;filename="+fileName);

            StringWriter sw = new StringWriter();
            HtmlTextWriter htw = new HtmlTextWriter(sw);

            gridView1.GridLines = GridLines.Both;
            gridView1.HeaderStyle.Font.Bold = true;
            gridView1.RenderControl(htw);

            Response.Output.Write(sw.ToString());
            Response.Flush();
            Response.End();
        }

        public override void VerifyRenderingInServerForm(Control control)
        {
            
        }

        protected void LinkButton2_Click(object sender, EventArgs e)
        {
            StringBuilder builder = new StringBuilder();
            string strFileName = "GridviewExcel_" + DateTime.Now.ToShortDateString() + ".csv";
            builder.Append("Name ,Education,Location" + Environment.NewLine);
            foreach (GridViewRow row in gridView1.Rows)
            {
                string name = row.Cells[0].Text;
                string education = row.Cells[1].Text;
                string location = row.Cells[2].Text;
                builder.Append(name + "," + education + "," + location + Environment.NewLine);
            }
            Response.Clear();
            Response.ContentType = "text/csv";
            Response.AddHeader("Content-Disposition", "attachment;filename=" + strFileName);
            Response.Write(builder.ToString());
            Response.End();
        }

        protected void LinkButton3_Click(object sender, EventArgs e)
        {
            
        }

        private void ExportExcelF1()
        {
            //Para exportar con paginación activa
            Response.Clear();
            Response.Buffer = true;
            Response.AddHeader("content-disposition", "attachment;filename=GridViewExport.xls");
            Response.Charset = "";
            Response.ContentType = "application/vnd.ms-excel";
            using (StringWriter sw = new StringWriter())
            {
                HtmlTextWriter hw = new HtmlTextWriter(sw);

                //To Export all pages
                gridView1.AllowPaging = false;
                this.BindGrid();

                gridView1.HeaderRow.BackColor = Color.White;
                foreach (TableCell cell in gridView1.HeaderRow.Cells)
                {
                    cell.BackColor = gridView1.HeaderStyle.BackColor;
                }
                foreach (GridViewRow row in gridView1.Rows)
                {
                    row.BackColor = Color.White;
                    foreach (TableCell cell in row.Cells)
                    {
                        if (row.RowIndex % 2 == 0)
                        {
                            cell.BackColor = gridView1.AlternatingRowStyle.BackColor;
                        }
                        else
                        {
                            cell.BackColor = gridView1.RowStyle.BackColor;
                        }
                        cell.CssClass = "textmode";
                    }
                }

                gridView1.RenderControl(hw);

                //style to format numbers to string
                string style = @"<style> .textmode { } </style>";
                Response.Write(style);
                Response.Output.Write(sw.ToString());
                Response.Flush();
                Response.End();
            }
        }

        private void ExportExcelF2(DataTable dt)
        {
            try
            {
                HttpResponse response = HttpContext.Current.Response;

                // first let's clean up the response.object
                response.Clear();
                response.Charset = "";

                string filename = "Test_" + DateTime.Now + ".xlsx";

                // set the response mime type for excel
                response.ContentType = "application/vnd.ms-excel";
                response.AddHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");

                // create a string writer
                using (StringWriter sw = new StringWriter())
                {
                    using (HtmlTextWriter htw = new HtmlTextWriter(sw))
                    {
                        // instantiate a datagrid
                        DataGrid dg = new DataGrid();
                        dg.DataSource = dt;
                        dg.DataBind();
                        dg.RenderControl(htw);
                        response.Write(sw.ToString());
                        response.End();
                    }
                }
            }
            catch (Exception ex)
            { string msg = ex.Message.ToString(); }
        }
    }
}