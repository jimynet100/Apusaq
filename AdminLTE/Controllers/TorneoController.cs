using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APSWs;
using Microsoft.AspNetCore.Mvc;
using APS.Web.Models;

namespace AdminLTE.Controllers
{
    [Route("api/[controller]")]
    public class TorneoController : Controller
    {
        [HttpGet("[action]")]
        public string UltimosPartidos()
        {
            TServiceClient sc = new TServiceClient();
            string resu = sc.GetUltimos1Async().Result;

            return resu;
        }

        [HttpGet("[action]/{id}")]
        public string TorneosActivos(int id)
        {
            TServiceClient sc = new TServiceClient();
            string resu = sc.GetData1Async(id).Result;

            return resu;
        }

        [HttpGet("cuadro/{id}")]
        public string Cuadro(int id)
        {
            TServiceClient sc = new TServiceClient();
            string resu = sc.GetCuadro1Async(id).Result;

            return resu;
        }

        [HttpGet("H2H/{id}")]
        public string H2H(string id)
        {
            int p1, p2;
            TServiceClient sc = new TServiceClient();
            string[] words = id.Split('_');
            p1 = int.Parse(words[0].ToString());
            if (words.Length == 2)
                p2 = int.Parse(words[1].ToString());
            else
                p2 = 0;

            string resu = sc.GetH2H1Async(p1, p2).Result;

            return resu;
        }

        [HttpGet("Ranking")]
        public string getRanking()
        {            
            TServiceClient sc = new TServiceClient();
            string resu = sc.GetRanking1Async().Result;
            return resu;
        }

        [HttpGet("Resu/{id}")]
        public string Partidos(int id)
        {
            TServiceClient sc = new TServiceClient();
            string resu = sc.GetPartidos1Async(id).Result;

            return resu;
        }

        [HttpPut]
        [Route("Resultado/save")]
        public int Edit([FromBody]resultado match)
        {
            TServiceClient sc = new TServiceClient();
            int resu = sc.GuardarResultadoAsync(match.idPartido,match.result,match.ganador,match.WO).Result;

            return resu;
            
        }

    }
}
