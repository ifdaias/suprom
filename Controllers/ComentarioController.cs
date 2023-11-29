using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SUPROM_RESTfulAPI.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SUPROM_RESTfulAPI.Controllers
{
    [Route("c36dh6")]
    [ApiController]
    public class ComentarioController : ControllerBase
    {
        private static readonly string connectionString = "Server=localhost;Database=supromDB;Trusted_Connection=True;TrustServerCertificate = True";
        private SqlConnection connection = new SqlConnection(connectionString);

        // GET: api/<ComentarioController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET c36dh6/comments/{id}
        [HttpGet("comments/{id}")]
        public List<Comentario> Get(string id)
        {
            List<Comentario> response = new List<Comentario>();
            string query = "SELECT * FROM Comentario WHERE TituloProyecto = '" + id + "' ORDER BY FechaCreacion DESC";
            SqlCommand cmd = new SqlCommand(query, connection);
            SqlDataReader readerNames;
            Comentario comment = new Comentario();
            string queryNames = "";
            string name = "";
            connection.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    comment = new Comentario(reader.GetValue(1).ToString(), reader.GetValue(2).ToString(),
                        reader.GetValue(3).ToString(), reader.GetValue(4).ToString());

                    response.Add(comment);
                }
            }

            reader.Close();

            for(int i = 0; i < response.Count; i++)
            {
                queryNames = "SELECT Nombre, TipoUsuario FROM Usuario WHERE Codigo = '" + response[i].NombreRolAutor + "'";
                cmd.CommandText = queryNames;

                readerNames = cmd.ExecuteReader();

                if (readerNames.HasRows)
                {
                    while (readerNames.Read())
                    {
                        name = readerNames.GetValue(0).ToString() + " - " + readerNames.GetValue(1).ToString();
                    }
                }

                response[i].NombreRolAutor = name;

                readerNames.Close();
            }

            connection.Close();

            return response;
        }

        // POST c36dh6/new
        [HttpPost("new")]
        public string Post([FromBody] Comentario comment)
        {
            string returnString = "Ha ocurrido un error";
            int affectedRows = 0;
            string query = "INSERT INTO Comentario(CodigoAutor, TituloProyecto, Texto) VALUES ('" +
                comment.CodigoAutor + "', '" + comment.TituloProyecto + "', '" + comment.Texto + "')";

            SqlCommand cmd = new SqlCommand(query, connection);

            connection.Open();

            try
            {
                affectedRows = cmd.ExecuteNonQuery();
            } catch (Exception ex)
            {
                connection.Close();
                return returnString;
            }

            connection.Close();

            if(affectedRows > 0) {
                returnString = "Comentario agregado";
            }

            return returnString;
        }

        // PUT api/<ComentarioController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ComentarioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
