using RepsolPeru.Everis.Prueba.CDatos;
using RepsolPeru.Everis.Prueba.CEntidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepsolPeru.Everis.Prueba.CNegocio
{
    public class MascotaCN
    {
        private readonly MascotaCD mascotaCD = null;

        public MascotaCN()
        {
            mascotaCD = new MascotaCD();
        }

        public IList<MascotaCE> ListadoMascotas(string dsn)
        {
            return mascotaCD.ListadoMascotas(dsn);
        }

        public int GuardarMascota(string dsn, MascotaCE mascotaCE)
        {
            return mascotaCD.GuardarMascota(dsn, mascotaCE);
        }

        public MascotaCE BuscarMascota(string dsn, int idMascota)
        {
            return mascotaCD.BuscarMascota(dsn, idMascota);
        }

        public int ActualizarMascota(string dsn, int idMascota, MascotaCE mascotaCE)
        {
            return mascotaCD.ActualizarMascota(dsn, idMascota, mascotaCE);
        }

        public bool EliminarMascota(string dsn, int idMascota)
        {
            return mascotaCD.EliminarMascota(dsn, idMascota);
        }
    }
}
