using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrudPracticaMVP.MVP.View.Mascota
{
    public interface IMascotaView : IView
    {
        string Name { get; set; }

        string Raza { get; set; }

        List<Entities.Mascota> ListMascota { get; set; }
    }
}
