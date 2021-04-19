using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ZavrsniMilosMaljenovicNet11.Interfaces;
using ZavrsniMilosMaljenovicNet11.Models;

namespace ZavrsniMilosMaljenovicNet11.Controllers
{
    public class GaleriesController : ApiController
    {

        IGaleryRepository _repository { get; set; }

        public GaleriesController(IGaleryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [ResponseType(typeof(IQueryable<GaleryDTO>))]
        public IQueryable<GaleryDTO> GetAll()
        {
            return _repository.GetAll().ProjectTo<GaleryDTO>();
        }

        [Authorize]
        [ResponseType(typeof(GaleryDTO))]
        public IHttpActionResult GetById(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }
            if (_repository.GetById(id) == null)
            {
                return NotFound();
            }
            return Ok(Mapper.Map<GaleryDTO>(_repository.GetById(id)));
        }

        [Authorize]
        [ResponseType(typeof(GaleryDTO))]
        public IHttpActionResult Post(Galery Galery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(Galery);
            return CreatedAtRoute("DefaultApi", new { id = Galery.Id }, Mapper.Map<GaleryDTO>(Galery));
        }

        [Authorize]
        [ResponseType(typeof(GaleryDTO))]
        public IHttpActionResult Put(int id, Galery Galery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Galery.Id)
            {
                return BadRequest();
            }
            try
            {
                _repository.Update(Galery);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(Mapper.Map<GaleryDTO>(Galery));
        }

        [Authorize]
        [ResponseType(typeof(HttpStatusCode))]
        public IHttpActionResult Delete(int id)
        {
            Galery Galery = _repository.GetById(id);
            if (Galery == null)
            {
                return NotFound();
            }

            _repository.Delete(Galery);

            return StatusCode(HttpStatusCode.NoContent);
            //return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("api/tradition")]
        [ResponseType(typeof(IQueryable<GaleryDTO>))]
        public IHttpActionResult GetTradition()
        {
            var galeries = _repository.GetTradition();
            if (galeries == null)
            {
                return NotFound();

            }
            return Ok(galeries.ProjectTo<GaleryDTO>());
        }
        [HttpGet]
        [Authorize]
        [Route("api/number")]
        [ResponseType(typeof(IQueryable<GaleryPicturesDTO>))]
        public IHttpActionResult GetNumber()
        {
            var result = _repository.GetNumber();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
