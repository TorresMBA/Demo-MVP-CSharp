using CrudPracticaMVP.MVP.Presenter;
using CrudPracticaMVP.MVP.View;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP
{
    public class NavigationService : INavigationService
    {
        //Clase traída de la interfaz
        public void GoTo(ViewPages viewPages)
        {
            GoTo(viewPages, null);
        }

        public void GoTo(ViewPages viewPages, NameValueCollection parameters)
        {
            HttpContext context = HttpContext.Current;
            string redirectUrl = string.Empty;

            switch (viewPages)
            {
                case ViewPages.Demo:
                    redirectUrl = "~/Custom/RepsolPeru/Soporte/Demo.aspx";
                    break;

                default:
                    throw new  ArgumentOutOfRangeException("viewPages");
            }
        }
    }
}