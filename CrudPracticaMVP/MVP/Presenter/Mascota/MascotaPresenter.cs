using CrudPracticaMVP.MVP.Service.MascotaService;
using CrudPracticaMVP.MVP.View.Mascota;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.Presenter.MascotaPresenter
{
    public class MascotaPresenter : BasePresenter<IMascotaView>
    {
        private readonly IMascotaService _mascotaService;

        public MascotaPresenter(IMascotaView view, INavigationService navigationService, IMascotaService mascotaService) : base(view, navigationService)
        {
            _mascotaService = mascotaService;
        }

        public override void Inicializar()
        {
            throw new NotImplementedException();
        }
        public void listarMascotas()
        {
            view.ListMascota = _mascotaService.ListadoMascotas();
        }

        public void IngresarMascota()
        {
            var mascota = new Entities.Mascota {
                nombre = view.Name,
                raza = view.Raza
            };

            _mascotaService.IngresarMascota(mascota);
            listarMascotas();
            Limpiar();
        }

        public void BuscarMascota()
        {

        }

        public void ActualizarMascota()
        {

        }

        public void EliminarMascota()
        {
            _mascotaService.EliminarMascota(0);
        }

        public void Limpiar()
        {
            view.Raza = string.Empty;
            view.Name = string.Empty;
        }

    }
}