using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ZavrsniMilosMaljenovicNet11.Models
{
    public class Galery
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [Range(1800, 2021)]
        public int Year { get; set; }
        public ICollection<Picture> Pictures { get; set; }

    }
}