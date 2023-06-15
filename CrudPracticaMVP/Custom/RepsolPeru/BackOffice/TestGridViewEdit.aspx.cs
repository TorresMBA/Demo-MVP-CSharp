using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice {
    public partial class TestChatGPS : System.Web.UI.Page {

        private List<MVP.Entities.Mascota> ProgramaClientesList {
            get { return (List<MVP.Entities.Mascota>)ViewState["MascotaList"]; }
            set { ViewState["MascotaList"] = value; }
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                var list = new List<CrudPracticaMVP.MVP.Entities.Mascota>()
                {
                    new CrudPracticaMVP.MVP.Entities.Mascota { id=91, nombre="a", raza="11" },
                    new CrudPracticaMVP.MVP.Entities.Mascota { id=92, nombre="b", raza="22" },
                    new CrudPracticaMVP.MVP.Entities.Mascota { id=93, nombre="c", raza="33" },
                };
                ProgramaClientesList = list;

                CargarDatos();
                BindGridView();
            }
        }

        protected void btnEditar_Click(object sender, EventArgs e)
        {
            Button btnEditar = (Button)sender;
            string id = btnEditar.CommandArgument;
            RepeaterItem item = (RepeaterItem)btnEditar.NamingContainer;
            int position = item.ItemIndex;

            // Habilita los campos de entrada (inputs) de la fila seleccionada
            TextBox txtColumna1 = (TextBox)repeaterDatos.Items[position].FindControl("txtColumna1");
            TextBox txtColumna2 = (TextBox)repeaterDatos.Items[position].FindControl("txtColumna2");
            //TextBox txtColumna3 = (TextBox)repeaterDatos.Items[int.Parse(id)].FindControl("txtColumna3");
            //TextBox txtColumna4 = (TextBox)repeaterDatos.Items[int.Parse(id)].FindControl("txtColumna4");

            txtColumna1.Enabled = true;
            txtColumna2.Enabled = true;
            //txtColumna3.Enabled = true;
            //txtColumna4.Enabled = true;

            // Oculta el botón "Editar" y muestra el botón "Guardar"
            Button btnGuardar = (Button)repeaterDatos.Items[position].FindControl("btnGuardar");
            btnEditar.Visible = false;
            btnGuardar.Visible = true;
        }

        protected void btnGuardar_Click(object sender, EventArgs e)
        {
            Button btnGuardar = (Button)sender;
            string id = btnGuardar.CommandArgument;
            RepeaterItem item = (RepeaterItem)btnGuardar.NamingContainer;
            int position = item.ItemIndex;

            var valor = DBFalsa().Find(x => x.id == int.Parse(id));
            valor.nombre = ((TextBox)repeaterDatos.Items[position].FindControl("txtColumna1")).Text;
            valor.raza = ((TextBox)repeaterDatos.Items[position].FindControl("txtColumna2")).Text;

            // Deshabilita los campos de entrada (inputs) de la fila seleccionada
            TextBox txtColumna1 = (TextBox)repeaterDatos.Items[position].FindControl("txtColumna1");
            TextBox txtColumna2 = (TextBox)repeaterDatos.Items[position].FindControl("txtColumna2");
            //TextBox txtColumna3 = (TextBox)repeaterDatos.Items[int.Parse(id)].FindControl("txtColumna3");
            //TextBox txtColumna4 = (TextBox)repeaterDatos.Items[int.Parse(id)].FindControl("txtColumna4");

            txtColumna1.Enabled = false;
            txtColumna2.Enabled = false;
            //txtColumna3.Enabled = false;
            //txtColumna4.Enabled = false;

            // Oculta el botón "Guardar" y muestra el botón "Editar"
            Button btnEditar = (Button)repeaterDatos.Items[position].FindControl("btnEditar");
            btnGuardar.Visible = false;
            btnEditar.Visible = true;

            // Realiza la lógica de guardar los cambios aquí utilizando los valores de los campos de entrada

            // Vuelve a cargar los datos después de guardar los cambios
            CargarDatos();
        }

        public List<MVP.Entities.Mascota> DBFalsa()
        {
            var list = new List<CrudPracticaMVP.MVP.Entities.Mascota>()
            {
                new CrudPracticaMVP.MVP.Entities.Mascota { id=91, nombre="a", raza="11" },
                new CrudPracticaMVP.MVP.Entities.Mascota { id=92, nombre="b", raza="22" },
                new CrudPracticaMVP.MVP.Entities.Mascota { id=93, nombre="c", raza="33" },
            };

            ProgramaClientesList = list;
            return list;
        }

        protected void CargarDatos()
        {   
            repeaterDatos.DataSource = ProgramaClientesList;
            repeaterDatos.DataBind();
        }

        protected void BindGridView()
        {
            // Aquí debes obtener tus datos de la fuente de datos, por ejemplo, una base de datos
            // y asignarlos al GridView
            GridView1.DataSource = ProgramaClientesList;
            GridView1.DataBind();
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindGridView();
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            // Aquí debes obtener los valores editados y actualizar tu fuente de datos, por ejemplo, una base de datos
            int id = Convert.ToInt32(GridView1.DataKeys[e.RowIndex].Value);
            TextBox txtNombre = (TextBox)GridView1.Rows[e.RowIndex].FindControl("txtNombre");
            TextBox txtRaza = (TextBox)GridView1.Rows[e.RowIndex].FindControl("txtRaza");


            // Realizar la actualización en la base de datos
            if(txtNombre.Text.Equals(""))
            {
                // No se cumple la validación, cancelar la actualización
                GridView1.EditIndex = -1; // Salir del modo de edición
                GridView1.DataBind(); // Volver a enlazar los datos para mostrar la vista normal

                // Mostrar una alerta en el lado del cliente
                string script = "alert('La validación no se ha cumplido. La actualización se ha cancelado.');";
                ScriptManager.RegisterStartupScript(this, this.GetType(), "ValidationAlert", script, true);

                e.Cancel = true; // Cancelar la operación de actualización
                BindGridView();
                return;
            }

            var objeto = ProgramaClientesList.Find(obj => obj.id == id);
            objeto.nombre = txtNombre.Text;
            objeto.raza = txtRaza.Text;

            int index = ProgramaClientesList.FindIndex(x => x.id == id);
            if(index != -1)
            {
                ProgramaClientesList[index] = objeto;
            }

            GridView1.EditIndex = -1;
            BindGridView();
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindGridView();
        }

        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            // Aquí debes obtener el ID del elemento a eliminar y eliminarlo de tu fuente de datos, por ejemplo, una base de datos
            int id = Convert.ToInt32(GridView1.DataKeys[e.RowIndex].Value);

            // Realizar la eliminación en la base de datos
            var objeto = ProgramaClientesList.Find(obj => obj.id == id);
            if(objeto != null)
            {
                ProgramaClientesList.Remove(objeto);
            }

            BindGridView();
        }

        protected void btnInsertar_Click(object sender, EventArgs e)
        {
            var mascotaNew = new MVP.Entities.Mascota() {
               id= Convert.ToInt32(txtCod.Text),
               nombre = txtNom.Text,
               raza = txtRaza.Text
            };

            ProgramaClientesList.Add(mascotaNew);

            BindGridView();
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if(e.Row.RowType == DataControlRowType.DataRow && GridView1.EditIndex == e.Row.RowIndex)
            {
                DropDownList ddlNombre = (DropDownList)e.Row.FindControl("ddlNombre");
                string valorSeleccionado = DataBinder.Eval(e.Row.DataItem, "Nombre").ToString();
                ddlNombre.SelectedValue = valorSeleccionado;
            }
        }
    }
}