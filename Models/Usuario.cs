using System.Text.Json.Serialization;

namespace SUPROM_RESTfulAPI.Models
{
    public class Usuario
    {

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Codigo { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Nombre { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Contrasena { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Correo { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TipoUsuario { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Telefono { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Carrera { get; set; }

        public Usuario()
        {

        }

        public Usuario(string codigo, string nombre, string contrasena, string correo, string tipoUsuario, string telefono, string carrera)
        {
            this.Codigo = codigo;
            this.Nombre = nombre;
            this.Contrasena = contrasena;
            this.Correo = correo;   
            this.TipoUsuario = tipoUsuario;
            this.Telefono = telefono;
            this.Carrera = carrera;
        }

        public Usuario(Usuario usuario)
        {
            this.Codigo = usuario.Codigo;
            this.Nombre = usuario.Nombre;
            this.Contrasena= usuario.Contrasena;
            this.Correo= usuario.Correo;
            this.TipoUsuario = usuario.TipoUsuario;
            this.Telefono = usuario.Telefono;
            this.Carrera = usuario.Carrera;
        }
    }
}
