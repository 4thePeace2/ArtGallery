using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ZavrsniMilosMaljenovicNet11.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Galerija slika";

            return View();
        }

        public ActionResult Index_eng()
        {
            ViewBag.Title = "Picture galery";

            return View();
        }
    }
}
