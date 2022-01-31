using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.Entities
{
    public class Mascota
    {
        public int id { get; set; }

        public string nombre { get; set; }

        public string raza { get; set; }
    }
}