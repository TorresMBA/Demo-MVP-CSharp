using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice.CargarExcel {
    public partial class UploadExcel : System.Web.UI.Page {

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnCargar_Click(object sender, EventArgs e)
        {
            if(!fuExcel.HasFile)
            {
                ASPNETJSUtils.JSUtils.Show("No hay Archivo Excel!!!", "ErrorUC"); 
                return;
            }

            try
            {
                string fileName = Path.GetFileName(fuExcel.FileName);
                string extension = Path.GetExtension(fileName).ToUpper();
                if(!extension.Equals(".XLSX")) ASPNETJSUtils.JSUtils.Show("El archivo debe ser de extensión XLSX", "ErrorUC");

                var fullFileName = Server.MapPath(fileName) + "_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".xlsx";
                //var fullFileNameTest = Path.GetTempFileName() + "_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".xlsx";
                fuExcel.SaveAs(fullFileName);

                using(FileStream fileStream = new FileStream(fullFileName, FileMode.Open, FileAccess.Read))
                {
                    IWorkbook workbook = new XSSFWorkbook(fileStream);
                    
                    // Obtener la primera hoja de trabajo del archivo (podemos cambiar el índice si es necesario)                
                    ISheet sheet1 = workbook.GetSheetAt(0);

                    IEnumerator iter = sheet1.GetRowEnumerator();

                    List<TablaCubicacion> lstTablaCubicacions = new List<TablaCubicacion>();
                    TablaCubicacion tblCubicacion;

                    while(iter.MoveNext())
                    {
                        IRow oIRow = (IRow)iter.Current;

                        if(oIRow.RowNum == 0) continue;

                        tblCubicacion = new TablaCubicacion();

                        var isValid = bool.TrueString;
                        foreach(ICell cell in oIRow.Cells)
                        {
                            ValidarCeldas(cell);

                            //if(Array.Exists(arrColumn, x => x == cell.ColumnIndex))
                            if(cell.ColumnIndex % 2 == 0)
                                tblCubicacion.Altura = (int)cell.NumericCellValue;

                            if(cell.ColumnIndex % 2 != 0)
                            {
                                tblCubicacion.Volumen = (int)cell.NumericCellValue;

                                lstTablaCubicacions.Add(tblCubicacion);
                                tblCubicacion = new TablaCubicacion();
                            }
                        }
                    }

                    workbook.Close();
                    File.Delete(fullFileName);
                }
            } catch(Exception ex)
            {
                ASPNETJSUtils.JSUtils.Show("Error al Prcesar el Excel!!! -> " + ex.Message, "ErrorUX");
            }

        }

        private void ValidarEncabezados(ISheet sheet, DataTable oDT_Error)
        {
            IRow encabezados = sheet.GetRow(0);
            ICell cellRefProducto = encabezados.GetCell(0);
            ICell cellCantidad = encabezados.GetCell(1);

            if(cellRefProducto.ToString().ToUpper() != "")
            {

            }
            if(cellCantidad.ToString().ToUpper() != "")
            {

            }
        }

        private bool ValidarCeldas(ICell cell)
        {
            if(cell == null) return false;

            if(cell.CellType == CellType.Blank || (cell.CellType == CellType.String && cell.StringCellValue.Length == 0)) return false;

            if(cell.CellType != CellType.Numeric) return false;

            return true;
        }

        private bool IsRowEmpty(IRow row)
        {
            for(int i = row.FirstCellNum; i < row.LastCellNum; i++)
            {
                ICell cell = row.GetCell(i);
                if(cell != null && !string.IsNullOrEmpty(cell.ToString()))
                {
                    return false;
                }
            }
            return true;
        }

    }

    public enum ColumnasExcel {
        [Description("H(mm)")]
        Altura,

        [Description("V(L)")]
        Volumen,
    }

    public class TablaCubicacion {

        public int Altura { get; set; }

        public double Volumen { get; set; }
    }
}