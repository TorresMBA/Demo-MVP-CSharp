using CrudPracticaMVP.MVP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.Service.MascotaService
{
    public interface IMascotaService
    {
        List<Mascota> ListadoMascotas();

        void IngresarMascota(Mascota mascota);

        Mascota BuscarMascota(int idMascota);

        void ActualizarMascota(Mascota mascota);

        void EliminarMascota(int idMascota);
    }
}