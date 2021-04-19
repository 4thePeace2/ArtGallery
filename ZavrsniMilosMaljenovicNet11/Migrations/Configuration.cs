namespace ZavrsniMilosMaljenovicNet11.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ZavrsniMilosMaljenovicNet11.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ZavrsniMilosMaljenovicNet11.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ZavrsniMilosMaljenovicNet11.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.Name,
            //      new Person { Name = "Andrew Peters" },
            //      new Person { Name = "Brice Lambson" },
            //      new Person { Name = "Rowan Miller" }
            //    );
            //

            context.Galeries.AddOrUpdate(
                    new Galery() { Id = 1, Name = "Prva galerija", Year = 2010 },
                    new Galery() { Id = 2, Name = "Art galerija", Year = 2012, },
                    new Galery() { Id = 3, Name = "Vivo galerija", Year = 1988, }

                );

            context.SaveChanges();

            context.Pictures.AddOrUpdate(
                    new Picture() { Id = 1, Name = "Prolece", Author = "Aleksandar Kumric", Price = 380m, MadeYear = 1969, GaleryId = 2 },
                    new Picture() { Id = 2, Name = "Drvo", Author = "Marko Petrovic", Price = 2100m, MadeYear = 2010, GaleryId = 3 },
                    new Picture() { Id = 3, Name = "Tihovanje", Author = "Ljubodrag Jankovic", Price = 1200m, MadeYear = 2005, GaleryId = 1 },
                    new Picture() { Id = 4, Name = "Kanjon Morace", Author = "Vojo Dimitirjevic", Price = 220m, MadeYear = 1980, GaleryId = 2 },
                    new Picture() { Id = 5, Name = "Trg", Author = "Zorka Cerovic", Price = 400m, MadeYear = 1947, GaleryId = 1 }


                );

            context.SaveChanges();
        }
    }
}
