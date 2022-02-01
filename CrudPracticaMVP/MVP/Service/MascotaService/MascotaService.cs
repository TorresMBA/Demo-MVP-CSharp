using CrudPracticaMVP.MVP.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using RepsolPeru.Everis.Prueba.CNegocio;
using RepsolPeru.Everis.Prueba.CEntidades;

namespace CrudPracticaMVP.MVP.Service.MascotaService
{
    public class MascotaService : IMascotaService
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["PracticaDB"].ConnectionString;

        readonly MascotaCN oMascotaLib = new MascotaCN();

        public void ActualizarMascota(Mascota mascota)
        {
            try
            {
                MascotaCE mascotaCE = new MascotaCE {
                    id = mascota.id,
                    nombre = mascota.nombre,
                    raza = mascota.raza
                };
                int result = oMascotaLib.ActualizarMascota(connectionString, mascota.id, mascotaCE);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public Mascota BuscarMascota(int idMascota)
        {
            Mascota mascota = null;
            try
            {
                var mascotalib = oMascotaLib.BuscarMascota(connectionString, idMascota);

                mascota = new Mascota
                {
                    id = mascotalib.id,
                    nombre = mascotalib.nombre,
                    raza = mascotalib.raza
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return mascota;
        }

        public void EliminarMascota(int idMascota)
        {
            try
            {
                var resul = oMascotaLib.EliminarMascota(connectionString, idMascota);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void IngresarMascota(Mascota mascota)
        {
            try
            {
                MascotaCE mascotaCE = new MascotaCE();
                mascotaCE.nombre = mascota.nombre;
                mascotaCE.raza = mascota.raza;

                int result = oMascotaLib.GuardarMascota(connectionString, mascotaCE);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public List<Mascota> ListadoMascotas()
        {
            List<Mascota> listMascota = new List<Mascota>();

            try
            {
                IList<MascotaCE> listMascotaLib = oMascotaLib.ListadoMascotas(connectionString);

                if (listMascotaLib != null && listMascotaLib.Count > 0)
                {
                    Mascota oMascota = null;
                    foreach (MascotaCE item in listMascotaLib)
                    {
                        oMascota = new Mascota();
                        oMascota.id = item.id;
                        oMascota.nombre = item.nombre;
                        oMascota.raza = item.raza;
                        listMascota.Add(oMascota);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }          
            
            return listMascota;
        }
    }
}