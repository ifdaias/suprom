using System.Text.Json.Serialization;

namespace SUPROM_RESTfulAPI.Models
{
    public class Comentario
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CodigoAutor { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TituloProyecto { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Texto { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FechaCreacion { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? NombreRolAutor { get; set; }


        public Comentario() { 
        
        }

        public Comentario(string codigoAutor, string tituloproyecto, string texto)
        {
            this.CodigoAutor = codigoAutor;
            this.TituloProyecto = tituloproyecto;
            this.Texto = texto;
        }

        public Comentario(string nombreRolAutor, string tituloproyecto, string texto, string fechaCreacion)
        {
            this.NombreRolAutor = nombreRolAutor;
            this.TituloProyecto = tituloproyecto;
            this.Texto = texto;
            this.FechaCreacion = fechaCreacion;
        }


    }
}
