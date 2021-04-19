using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using AutoMapper;
using ZavrsniMilosMaljenovicNet11.Models;
using Microsoft.Practices.Unity;
using ZavrsniMilosMaljenovicNet11.Interfaces;
using ZavrsniMilosMaljenovicNet11.Repository;
using ZavrsniMilosMaljenovicNet11.Resolver;

namespace ZavrsniMilosMaljenovicNet11
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.EnableSystemDiagnosticsTracing();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Galery, GaleryDTO>();
                cfg.CreateMap<Picture, PictureDTO>()
                .ForMember(dest => dest.GaleryName, opt => opt.MapFrom(src => src.Galery.Name))
                .ForMember(dest => dest.GaleryId, opt => opt.MapFrom(src => src.Galery.Id));


            });

            var container = new UnityContainer();
            //container.RegisterType<IGalerysRepository, GalerysRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IPictureRepository, PictureRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IGaleryRepository, GaleryRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
