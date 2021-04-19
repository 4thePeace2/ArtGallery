using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZavrsniMilosMaljenovicNet11.Models
{
    public class PictureDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public int MadeYear { get; set; }
        public decimal Price { get; set; }
        public int GaleryId { get; set; }
        public string GaleryName { get; set; }
    }
}