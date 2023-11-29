using Microsoft.AspNetCore.Mvc;
using SUPROM_RESTfulAPI.Models;
using System.Text.Json;
using Microsoft.Data.SqlClient;
using SUPROM_RESTfulAPI.Controllers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Reflection.PortableExecutable;
using Azure;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SUPROM_RESTfulAPI.Controllers
{
    [Route("k8k3dylm")]
    [ApiController]
    public class ProyectoController : ControllerBase
    {
        private static readonly string connectionString = "Server=localhost;Database=supromDB;Trusted_Connection=True;TrustServerCertificate = True";
        private SqlConnection connection = new SqlConnection(connectionString);

        [HttpGet("{id}")]
        public Proyecto GetDetallesProyecto(string id)
        {
            string query = "SELECT * FROM Proyecto WHERE Titulo = '" + id + "'";
            Proyecto proyecto = new Proyecto();
            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch
            {
                return proyecto;
            }

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    proyecto = new Proyecto(reader.GetValue(0).ToString(), reader.GetValue(1).ToString(),
                        reader.GetValue(2).ToString(), reader.GetValue(3).ToString(), reader.GetValue(4).ToString(),
                        reader.GetValue(5).ToString(), reader.GetValue(6).ToString(), reader.GetValue(7).ToString(), reader.GetValue(8).ToString());
                }
            }

            connection.Close();

            return proyecto;
        }

        [HttpGet("members/{id}")]
        public List<Integrante> GetIntegrantesProyecto(string id)
        {
            string query = "SELECT * FROM ProyectoUsuarios WHERE TituloProyecto = '" + id + "'";
            Integrante integrante = new Integrante();
            string jsonString = "";
            List<Integrante> membersList = new List<Integrante>();
            List<Integrante> response = new List<Integrante>();
            SqlCommand cmd = new SqlCommand(query, connection);
            SqlDataReader readerMembers;

            try
            {
                connection.Open();
            }
            catch (Exception e){
                return response;
            }

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    integrante = new Integrante(reader.GetValue(1).ToString(), reader.GetValue(2).ToString(),
                        reader.GetValue(3).ToString(), reader.GetValue(4).ToString());

                    membersList.Add(integrante);
                }
            }

            reader.Close();

            for(int i = 0; i < membersList.Count; i++)
            {
                if (membersList[i].Rol.ToUpper().Trim().Contains("MIEMBRO")){
                    query = "SELECT Codigo, Nombre FROM Usuario WHERE Codigo = '" + membersList[i].CodigoMiembro + "'";

                    cmd.CommandText = query;

                    readerMembers = cmd.ExecuteReader();

                    if (readerMembers.HasRows)
                    {
                        while (readerMembers.Read())
                        {
                            integrante = new Integrante(membersList[i].TituloProyecto, readerMembers.GetValue(0).ToString(),
                                readerMembers.GetValue(1).ToString(), membersList[i].Rol);

                            response.Add(integrante);
                        }
                    }

                    readerMembers.Close();
                }
                else if (membersList[i].Rol.ToUpper().Trim().Contains("ASESOR"))
                {
                    integrante = new Integrante(membersList[i].TituloProyecto, null,
                        membersList[i].Nombre, membersList[i].Rol);

                    response.Add(integrante);
                }
            }

            connection.Close();

            return response;
        }

        // GET k8k3dylm/latest
        [HttpGet("latest")]
        public List<Proyecto> GetProyectosRecientes()
        {
            List<Proyecto> stringList = new List<Proyecto>();
            string query = "SELECT TOP 6 Titulo, Descripcion FROM Proyecto ORDER BY FechaRegistro DESC";
            string jsonString = "";

            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch (Exception e)
            {
                return stringList;
            }

            SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Proyecto proyecto = new Proyecto();
                        proyecto.Titulo = reader.GetString(0);
                        proyecto.Descripcion = reader.GetString(1);

                        //jsonString = JsonSerializer.Serialize<Proyecto>(proyecto);
                        stringList.Add(proyecto);
                    }
                }
            /*}
            catch (Exception ex)
            {
                Proyecto proyecto = new Proyecto();
                proyecto.Titulo = "Ha ocurrido un error";

                //jsonString = JsonSerializer.Serialize<Proyecto>(proyecto);
                stringList.Add(proyecto);
            }*/

            connection.Close();

            return stringList;
        }

        // GET k8k3dylm/titles
        [HttpGet("titles")]
        public List<Proyecto> GetTitulos()
        {
            List<Proyecto> titleList = new List<Proyecto>();
            string query = "SELECT Titulo FROM Proyecto";

            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch (Exception e)
            {
                return titleList;
            }

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Proyecto proyecto = new Proyecto();
                    proyecto.Titulo = reader.GetString(0);

                    titleList.Add(proyecto);
                }
            }
            
            connection.Close();

            return titleList;
        }



        // POST k8k3dylm/new
        [HttpPost("new")]
        public string Post([FromBody] Proyecto proyecto)
        {
            if (ExisteProyecto(proyecto))
            {
                return "Ya existe un proyecto con este título";
            }
            else
            {
                string query = "INSERT INTO Proyecto (Titulo, Descripcion, CorreoRegistro, Modulo1, Modulo2, Modulo3, Estado, LinkDiagrama) " +
                    "VALUES ('" + proyecto.Titulo + "', '"+ proyecto.Descripcion + "', '" + proyecto.CorreoRegistro + "', '" +
                     proyecto.Modulo1 + "', '" + proyecto.Modulo2 + "', '" + proyecto.Modulo3 + "', '" + 
                     proyecto.Estado + "', '" + proyecto.LinkDiagrama + "')";

                string returnString = "";
                List<string> addMembersQuery = new List<string>();
                List<string> addUsersQuery = new List<string>();

                SqlCommand cmd = new SqlCommand(query, connection);
                int affectedRows = 0;

                string memberId = "Lider";

                for (int i = 0; i < proyecto.NumeroMiembros; i++)
                {
                    if (!UsuarioController.ExisteUsuarioString(GetPropValue(proyecto, "Codigo" + memberId)))
                    {
                        addUsersQuery.Add("INSERT INTO Usuario (Codigo, Nombre, Correo, Telefono, Carrera, TipoUsuario, Semestre) VALUES ('" +
                    GetPropValue(proyecto, "Codigo" + memberId) + "', '" + GetPropValue(proyecto, "Nombre" + memberId) + "', '" +
                    GetPropValue(proyecto, "Correo" + memberId) + "', '" + GetPropValue(proyecto, "Numero" + memberId) + "', '" +
                    GetPropValue(proyecto, "Carrera" + memberId) + "', '" + "Estudiante" + "', '" + GetPropValue(proyecto, "Semestre" + memberId) + "')");
                    }
                    else
                    {
                        /*addUsersQuery.Add("UPDATE Usuario " +
                    "SET Nombre = '" + GetPropValue(proyecto, "Nombre" + memberId) + "', Correo = '" + GetPropValue(proyecto, "Correo" + memberId) +
                    "', Telefono =  '" + GetPropValue(proyecto, "Numero" + memberId) + "' , Carrera = '" + GetPropValue(proyecto, "Carrera" + memberId) + 
                    "',  Semestre = '" + GetPropValue(proyecto, "Semestre" + memberId) + "', TipoUsuario = 'Estudiante' " +
                    "WHERE Codigo = '" + GetPropValue(proyecto, "Codigo" + memberId) + "'");*/
                        addUsersQuery.Add("UPDATE Usuario " +
                    "SET Semestre = '" + GetPropValue(proyecto, "Semestre" + memberId) + "' " +
                    " WHERE Codigo = '" + GetPropValue(proyecto, "Codigo" + memberId) + "'");
                    }


                    if (!ExisteEstudianteEnProyecto(GetPropValue(proyecto, "Codigo" + memberId), proyecto.Titulo))
                    {
                        addMembersQuery.Add("INSERT INTO ProyectoUsuarios (TituloProyecto, CodigoMiembro, Rol) VALUES ('" +
                            proyecto.Titulo + "', '" + GetPropValue(proyecto, "Codigo" + memberId) + "' , 'Miembro')");
                    }

                    if(i == 0)
                    {
                        memberId = "2";
                    }
                    else if(i == 1)
                    {
                        memberId = "3";
                    }
                }

                try
                {
                    connection.Open();
                }
                catch (Exception e)
                {
                    return "";
                }

                try
                {
                    affectedRows = cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    returnString = e.Message;
                }

                for(int i = 0; i < addUsersQuery.Count; i++)
                {
                    cmd.CommandText = addUsersQuery[i].ToString();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception e)
                    {
                        returnString = e.Message;
                        connection.Close();
                        return returnString;
                    }
                }

                for (int i = 0; i < addMembersQuery.Count; i++)
                {
                    cmd.CommandText = addMembersQuery[i].ToString();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception e)
                    {
                        returnString = e.Message;
                        connection.Close();
                        return returnString;
                    }
                }
                connection.Close();



                if (!ExisteAsesor(proyecto.Asesor)) {
                    cmd.CommandText = "INSERT INTO Asesor (NombreAsesor) VALUES ('" + proyecto.Asesor + "')";
                    connection.Open();
                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception e)
                    {
                        returnString = e.Message;
                        connection.Close();
                        return returnString;
                    }
                    connection.Close();
                }
                if (!ExisteAsesorEnProyecto(proyecto.Asesor, proyecto.Titulo))
                {
                    cmd.CommandText = "INSERT INTO ProyectoUsuarios (TituloProyecto, NombreAsesor, Rol) " +
                        "VALUES ('" + proyecto.Titulo + "', '" + proyecto.Asesor + "', 'Asesor')";

                    connection.Open();
                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception e)
                    {
                        returnString = e.Message;
                        connection.Close();
                        return returnString;
                    }
                    connection.Close();
                }

                if(proyecto.Asesor2 != null)
                {
                    if (!ExisteAsesor(proyecto.Asesor2))
                    {
                        cmd.CommandText = "INSERT INTO Asesor (NombreAsesor) VALUES ('" + proyecto.Asesor2 + "')";

                        connection.Open();
                        try
                        {
                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            returnString = e.Message;
                            connection.Close();
                            return returnString;
                        }
                        connection.Close();
                    }
                    if (!ExisteAsesorEnProyecto(proyecto.Asesor2, proyecto.Titulo))
                    {
                        cmd.CommandText = "INSERT INTO ProyectoUsuarios (TituloProyecto, NombreAsesor, Rol) " +
                            "VALUES ('" + proyecto.Titulo + "', '" + proyecto.Asesor2 + "', 'Asesor')";

                        connection.Open();
                        try
                        {
                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            returnString = e.Message;
                            connection.Close();
                            return returnString;
                        }

                        connection.Close();
                    }
                }


                connection.Close();

                if (affectedRows > 0)
                    returnString = "Proyecto agregado con éxito";
                else if (returnString.Contains("PRIMARY KEY"))
                    returnString = "Ya existe un proyecto con este código";
                else
                    returnString = "Ha ocurrido un error";

                return returnString;
            }
        }

        // PUT k8k3dylm/status
        [HttpPut("status")]
        public string Put([FromBody] Proyecto proyecto)
        {
            string returnString = "";

            if (ExisteProyecto(proyecto))
            {
                string query = "UPDATE Proyecto SET Estado = '" + proyecto.Estado + 
                    "' WHERE Titulo = '" + proyecto.Titulo + "'";

                SqlCommand cmd = new SqlCommand(query, connection);
                int affectedRows = 0;

                try
                {
                    connection.Open();
                }
                catch
                {
                    returnString = "ERROR";
                    return returnString;
                }

                try
                {
                    affectedRows = cmd.ExecuteNonQuery();

                    if(affectedRows > 0)
                    {
                        returnString = "SUCCESS";
                    }
                    else
                    {
                        returnString = "ERROR";
                    }
                }
                catch
                {
                    returnString = "ERROR";
                    return returnString;
                }
            }
            else
            {
                returnString = "ERROR";
            }

            return returnString;
        }

        // DELETE api/<ProyectoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public bool ExisteProyecto(Proyecto proyecto)
        {
            bool response = false;
            string query = "SELECT * FROM Proyecto WHERE Titulo = '" + proyecto.Titulo + "'";


            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch (Exception e)
            {
                return true;
            }

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();


            if (reader.HasRows)
                response = true;

            connection.Close();

            return response;
        }

        public bool ExisteAsesor(string nombreAsesor)
        {
            bool response = false;
            string query = "SELECT * FROM Asesor WHERE NombreAsesor = '" + nombreAsesor + "'";


            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch (Exception e)
            {
                return true;
            }

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();


            if (reader.HasRows)
                response = true;

            connection.Close();

            return response;
        }

        public bool ExisteEstudianteEnProyecto(string codigoMiembro, string tituloProyecto)
        {
            bool response = false;
            string query = "SELECT * FROM ProyectoUsuarios WHERE CodigoMiembro = '" + codigoMiembro + "' " +
                "AND TituloProyecto = '" + tituloProyecto + "'";


            SqlCommand cmd = new SqlCommand(query, connection);

            connection.Open();

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();


            if (reader.HasRows)
                response = true;

            connection.Close();

            return response;
        }
        public bool ExisteAsesorEnProyecto(string nombreAsesor, string tituloProyecto)
        {
            bool response = false;
            string query = "SELECT * FROM ProyectoUsuarios WHERE NombreAsesor = '" + nombreAsesor + "' " +
                "AND TituloProyecto = '" + tituloProyecto + "'";


            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();
            }
            catch (Exception e)
            {
                return true;
            }

            cmd.ExecuteNonQuery();

            SqlDataReader reader = cmd.ExecuteReader();


            if (reader.HasRows)
                response = true;

            connection.Close();

            return response;
        }

        public static string GetPropValue(Proyecto obj, string propName)
        {
            return obj.GetType().GetProperty(propName).GetValue(obj, null).ToString();
        }
    }
}
