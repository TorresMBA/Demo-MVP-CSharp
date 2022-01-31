using CrudPracticaMVP.MVP.Presenter;
using CrudPracticaMVP.MVP.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudPracticaMVP.MVP
{
    public abstract class BasePresenter<T> where T : IView
    {
        private readonly T _view;

        private readonly INavigationService _navigationService;

        public BasePresenter(T view)
        {
            if (view == null) throw new ArgumentNullException("view Presenter");

            _view = view;
        }

        public BasePresenter(T view, INavigationService navigationService)
        {
            if (view == null) throw new ArgumentNullException("view Presenter");
            if (navigationService == null) throw new ArgumentNullException("navigationService Presenter");

            _view = view;
            _navigationService = navigationService;
        }

        public T view { get { return _view; } }

        public INavigationService navigation { get { return _navigationService; } }

        public abstract void Inicializar();
    }
}