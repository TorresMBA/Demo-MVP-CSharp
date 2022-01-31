using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.DB
{
    public class Conexion
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["PracticaDB"].ConnectionString;


    }
}