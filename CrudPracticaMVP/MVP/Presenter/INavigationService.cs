using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrudPracticaMVP.MVP.Presenter
{
    public interface INavigationService
    {
        void GoTo(View.ViewPages viewPages);
    }
}
