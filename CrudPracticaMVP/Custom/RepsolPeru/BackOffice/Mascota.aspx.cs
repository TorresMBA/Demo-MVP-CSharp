using CrudPracticaMVP.MVP;
using CrudPracticaMVP.MVP.Presenter.MascotaPresenter;
using CrudPracticaMVP.MVP.View.Mascota;
using System;
using System.Collections.Generic;
using System.Linq;
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
            presenter.listarMascotas();
        }

        protected void btnGrabar_Click(object sender, EventArgs e)
        {
            presenter.IngresarMascota();
        }

        protected void Repeater1_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }

        protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            RepeaterItem fila = e.Item;

            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                var imgEditar = fila.FindControl("imgEditar") as ImageButton;

                if (imgEditar != null)
                {
                    imgEditar.ImageUrl = "";// System.Resources.global.App_Themes;
                }
                Console.WriteLine(fila.ToString());
            }
        }
    }
}