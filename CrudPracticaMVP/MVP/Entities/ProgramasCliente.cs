using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.Entities
{
    [Serializable]
    public class ProgramasCliente
    {
        public string NombrePrograma { get; set; }

        public string CodigoPrograma { get; set; }

        public bool EstadoDesafiliado { get; set; }
    }
}