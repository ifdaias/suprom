using System.Text.Json.Serialization;


namespace SUPROM_RESTfulAPI.Models
{
    public class Integrante
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TituloProyecto { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CodigoMiembro { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Nombre { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Rol { get; set; }

        public Integrante()
        {

        }

        public Integrante(string? tituloProyecto, string? codigoMiembro, string? nombre, string? rol)
        {
            this.TituloProyecto = tituloProyecto;
            this.CodigoMiembro = codigoMiembro;
            this.Nombre = nombre;
            this.Rol = rol;
        }
    }
}
