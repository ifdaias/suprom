using Microsoft.AspNetCore.Mvc;
using SUPROM_RESTfulAPI.Models;
using System.Text.Json;
using Microsoft.Data.SqlClient;
using System.Reflection.Metadata;
using SUPROM_RESTfulAPI.Controllers;
using Azure;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SUPROM_RESTfulAPI.Controllers
{
    [Route("u3dk8")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private static readonly string connectionString = "Server=localhost;Database=supromDB;Trusted_Connection=True;TrustServerCertificate = True";
        private SqlConnection connection = new SqlConnection(connectionString);

        // GET: api/<UsuarioController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            //SqlDataReader reader = cmd.ExecuteReader();

            /*if (reader.HasRows)
            {
                while (reader.Read())
                {
                    reponseOpr = new Operator(reader.GetValue(0).ToString(), reader.GetValue(1).ToString(),
                        reader.GetValue(2).ToString(), reader.GetValue(3).ToString(), reader.GetValue(4).ToString());
                }

                returnString = JsonSerializer.Serialize<Operator>(reponseOpr);
            }

            return returnString;*/
            return "value";
        }

        // PUT u3dk8/check
        [HttpPut("check")]
        public string Put([FromBody] Usuario user)
        {
            string query = "SELECT Nombre, TipoUsuario FROM Usuario WHERE Codigo = '" + user.Codigo +
                "' AND Contrasena = '" + user.Contrasena + "'";
            string jsonString = "";
            Usuario usuario = new Usuario();

            SqlCommand cmd = new SqlCommand(query, connection);


            try
            {
                connection.Open();
            }
            catch
            {
                return string.Empty;
            }

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    usuario.Nombre = reader.GetString(0);
                    usuario.TipoUsuario = reader.GetString(1);

                    jsonString = JsonSerializer.Serialize<Usuario>(usuario);
                }
            }
            else
            {
                jsonString = "No existen estas credenciales";
            }


            connection.Close();

            return jsonString;
        }

        [HttpPut("members")]
        public List<string> Put(string tituloProyecto)
        {
            List<string> stringList = new List<string>();
            /*string query = "SELECT Nombre, TipoUsuario FROM Usuario WHERE Codigo = '" + user.Codigo +
                "' AND Contrasena = '" + user.Contrasena + "'";
            bool response = false;
            string jsonString = "", returnString = "";
            
            Usuario usuario = new Usuario();

            SqlCommand cmd = new SqlCommand(query, connection);

            connection.Open();

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    usuario.Nombre = reader.GetString(0);
                    usuario.TipoUsuario = reader.GetString(1);

                    jsonString = JsonSerializer.Serialize<Usuario>(usuario);

                    stringList.Add(jsonString);

                }


            }
            else
            {
                jsonString = "No existen estas credenciales";
                stringList.Add(jsonString);
            }


            connection.Close();*/

            return stringList;
        }

        // POST u3dk8/new
        [HttpPost("new")]
        public string Post([FromBody] Usuario user)
        {
            string returnString = "Ha ocurrido un error";
            int existeUsuario = ExisteUsuario(user);
            if (existeUsuario == 0)
            {
                string query = "INSERT INTO Usuario(Codigo, Nombre, Contrasena, Correo, TipoUsuario, Telefono, Carrera) VALUES ('" +
                    user.Codigo + "', '" + user.Nombre + "', '" + user.Contrasena + "', '" + user.Correo + "', '" +
                    user.TipoUsuario + "', '" + user.Telefono + "', '" + user.Carrera + "')";

                SqlCommand cmd = new SqlCommand(query, connection);
                int affectedRows = 0;

                connection.Open();

                try
                {
                    affectedRows = cmd.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    returnString = e.Message;
                }
                catch (Exception e)
                {
                    returnString = e.Message;
                }
                connection.Close();

                if (affectedRows > 0)
                    returnString = "Usuario agregado con éxito";
                else
                    returnString = "Ha ocurrido un error";
            }
            else if(existeUsuario == 1)
            {
                string query = "UPDATE Usuario " +
                    "SET Nombre = '" + user.Nombre + "', Contrasena = '" + user.Contrasena + "', Correo = '" + user.Correo +
                    "', Telefono =  '" + user.Telefono + "' , Carrera = '" + user.Carrera + "' " + 
                    "WHERE Codigo = '" + user.Codigo + "'";

                SqlCommand cmd = new SqlCommand(query, connection);
                int affectedRows = 0;

                connection.Open();

                try
                {
                    affectedRows = cmd.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    returnString = e.Message;
                    return returnString;
                }
                catch (Exception e)
                {
                    returnString = e.Message;
                    return returnString;
                }

                connection.Close();

                if (affectedRows > 0)
                    returnString = "Usuario MODIFICADO con éxito";
                else
                    returnString = "Ha ocurrido un error";

            }
            else if (existeUsuario == 2)
            {
                returnString = "Ya existe un usuario con este código";
            }

            return returnString;
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }

        public int ExisteUsuario(Usuario user)
        {
            //return:
            //0 = no existe
            //1 = existe solo codigo (registro por proyecto)
            //2 = existe codigo y contraseña (cuenta)

            int response = 0;
            string query = "SELECT * FROM Usuario WHERE Codigo = '" + user.Codigo + "'";
            Usuario u1 = new Usuario();
            string hatriki;
            SqlCommand cmd = new SqlCommand(query, connection);

            connection.Open();

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                u1 = new Usuario(reader.GetValue(0).ToString(), reader.GetValue(1).ToString(),
                        reader.GetValue(2).ToString(), reader.GetValue(3).ToString(), reader.GetValue(4).ToString(),
                        reader.GetValue(5).ToString(), reader.GetValue(6).ToString());
                hatriki = u1.Contrasena;
            }

            if (!reader.HasRows)
                response = 0;
            else if (u1.Codigo != "" && u1.Contrasena == "")
                response = 1;
            else if(u1.Codigo != "" && u1.Contrasena != "")
                response = 2;
            
            connection.Close();

            return response;
        }


        public static bool ExisteUsuarioString(string user)
        {
            UsuarioController usuarioController = new UsuarioController();
            /*string query = "SELECT * FROM Usuario WHERE Codigo = '" + user.Codigo +
                "' AND Contrasena = '" + user.Contrasena + "'";*/
            bool response = false;
            string query = "SELECT * FROM Usuario WHERE Codigo = '" + user + "'";
            SqlCommand cmd = new SqlCommand(query, usuarioController.connection);

            usuarioController.connection.Open();

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();


            if (reader.HasRows)
                response = true;

            usuarioController.connection.Close();

            return response;
        }
    }
}
