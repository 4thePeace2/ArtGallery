using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZavrsniMilosMaljenovicNet11.Models;

namespace ZavrsniMilosMaljenovicNet11.Interfaces
{
    public interface IGaleryRepository
    {
        Galery GetById(int id);
        void Add(Galery Galery);
        IQueryable<Galery> GetAll();
        IQueryable<Galery> GetTradition();
        IQueryable<GaleryPicturesDTO> GetNumber();

        void Update(Galery Galery);
        void Delete(Galery Galery);
    }
}
