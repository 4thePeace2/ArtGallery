using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ZavrsniMilosMaljenovicNet11.Interfaces;
using ZavrsniMilosMaljenovicNet11.Models;

namespace ZavrsniMilosMaljenovicNet11.Repository
{
    public class GaleryRepository : IGaleryRepository, IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Add(Galery Galery)
        {
            db.Galeries.Add(Galery);
            db.SaveChanges();
        }

        public void Delete(Galery Galery)
        {
            db.Galeries.Remove(Galery);
            db.SaveChanges();
        }

        public IQueryable<Galery> GetAll()
        {
            return db.Galeries.OrderBy(x => x.Name);
        }

        public Galery GetById(int id)
        {
            return db.Galeries.Find(id);
        }

        public void Update(Galery Galery)
        {
            db.Entry(Galery).State = EntityState.Modified;
            db.SaveChanges();
        }

        public IQueryable<Galery> GetTradition()
        {
            return db.Galeries.OrderBy(x => x.Year);

        }

        public IQueryable<GaleryPicturesDTO> GetNumber()
        {
            var galeries = GetAll().ToList();
            List<GaleryPicturesDTO> lista = new List<GaleryPicturesDTO>();
            foreach (Galery g in galeries)
            {
                int pom = db.Pictures.Where(x => x.GaleryId == g.Id).Count();
                lista.Add(new GaleryPicturesDTO { Id = g.Id, Name = g.Name, PicturesSum = pom });
            }

            
            return lista.OrderByDescending(x => x.PicturesSum).AsQueryable();
        }
    }
}