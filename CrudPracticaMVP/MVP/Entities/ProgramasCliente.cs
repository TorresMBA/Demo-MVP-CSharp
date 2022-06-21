using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP.Entities
{
    [Serializable]
    public class ProgramasCliente
    {
        public string TipoDocumento { get; set; }

        public string NroDocumento { get; set; }

        public string Nombre { get; set; }

        public string SegundoNombre { get; set; }

        public string PrimerApellido { get; set; }

        public string SegundoApellido { get; set; }

        public string NombreCompleto { get; set; }

        public string Email { get; set; }

        public string CodigoEverilion { get; set; }

        public List<Programas> Programas { get; set; }
    }

    [Serializable]
    public class Programas {
        public int CodigoPrograma { get; set; }

        public string NombrePrograma { get; set; }

        public string Publicidad { get; set; }

        public string DesafiliaPublicidad { get; set; }

        public string FechaRegistroPrograma { get; set; }

        public string FechaRegistroSolicitudDesafiliacion { get; set; }

        public bool EstadoSolicitudSF { get; set; }

        public string CodigoResponseSF { get; set; }

        public string FechaDesafiliacionPublicidad { get; set; }

        public string FechaModificacionDetalleSolicitudP { get; set; }
    }
}