using CrudPracticaMVP.MVP.Presenter;
using CrudPracticaMVP.MVP.Service.MascotaService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP
{
    public class DependecyManager
    {
        private static INavigationService _navigationService;

        internal static INavigationService GetNavigationService()
        {
            if (_navigationService == null)
            {
                _navigationService = new NavigationService();
            }
            return _navigationService;
        }


        private static IMascotaService _mascotaService;

        internal static IMascotaService GetMascotaService()
        {
            if (_mascotaService == null)
            {
                _mascotaService = new MascotaService();
            }

            return _mascotaService;
        }

    }
}