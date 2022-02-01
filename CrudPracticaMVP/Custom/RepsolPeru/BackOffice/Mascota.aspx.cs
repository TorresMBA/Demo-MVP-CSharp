using CrudPracticaMVP.MVP;
using CrudPracticaMVP.MVP.Presenter.MascotaPresenter;
using CrudPracticaMVP.MVP.View.Mascota;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CrudPracticaMVP.Custom.RepsolPeru.BackOffice
{
    public partial class Mascota : System.Web.UI.Page, IMascotaView
    {
        MascotaPresenter presenter;

        public Mascota()
        {
            presenter = new MascotaPresenter(this, DependecyManager.GetNavigationService(), DependecyManager.GetMascotaService());
        }

        public string Name { get { return nombre.Text; } set { nombre.Text = value; } }

        public string Raza { get { return raza.Text; } set { raza.Text = value; } }

        public List<MVP.Entities.Mascota> ListMascota
        {
            get => throw new NotImplementedException();
            set
            {
                Repeater1.DataSource = value;
                Repeater1.DataBind();
            }
        }

        public string AsignaEstilos { set => throw new NotImplementedException(); }

        protected void Page_Load(object sender, EventArgs e)
        {
            // Method intentionally left empty.
            if (!IsPostBack)
            {
                presenter.listarMascotas();
            }
        }

        protected void btnGrabar_Click(object sender, EventArgs e)
        {
            presenter.IngresarMascota();
        }

        protected void Repeater1_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            string idMascota = e.CommandArgument.ToString().Trim();
            int result = 0;
            switch (e.CommandName)
            {
                case "Editar":
                    presenter.BuscarMascota(Convert.ToInt32(idMascota));
                    break;

                case "Eliminar":
                    presenter.EliminarMascota(Convert.ToInt32(idMascota));
                    break;
                default:
                    break;
            }
        }

        protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            RepeaterItem fila = e.Item;
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                var imgEditar = fila.FindControl("imgEditar") as ImageButton;
                var imgEliminar = fila.FindControl("imgEliminar") as ImageButton;

                if (imgEditar != null)
                {
                    imgEditar.ImageUrl = Resources.global.App_themes + "ilion_skin/img/" + "editar.png";
                }

                if (imgEliminar != null)
                {
                    imgEliminar.ImageUrl = Resources.global.App_themes + "ilion_skin/img/" + "borra_fila.png";
                }

                imgEditar.Visible = true;
                imgEliminar.Visible = true;
            }

        }
    }
}