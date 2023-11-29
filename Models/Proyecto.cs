using System.Text.Json.Serialization;

namespace SUPROM_RESTfulAPI.Models
{
    public class Proyecto
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Titulo { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Descripcion { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CorreoRegistro { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FechaRegistro { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? NombreLider { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CodigoLider { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CarreraLider { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? NumeroLider { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CorreoLider { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? SemestreLider { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Nombre2 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Codigo2 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Carrera2{ get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Numero2 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Correo2 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Semestre2 { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Nombre3 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Codigo3 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Carrera3 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Numero3 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Correo3 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Semestre3 { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Asesor { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Asesor2 { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Estado { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Modulo1 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Modulo2 { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Modulo3 { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? LinkDiagrama { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? NumeroMiembros { get; set; }

        public Proyecto()
        {

        }

        public Proyecto(string? titulo, string? descripcion, string? correoRegistro, string? nombreLider, string? codigoLider, string? carreraLider, string? numeroLider, string? correoLider, string? semestreLider, string? nombre2, string? codigo2, string? carrera2, string? numero2, string? correo2, string? semestre2, string? nombre3, string? codigo3, string? carrera3, string? numero3, string? correo3, string? semestre3, string? asesor, string? asesor2, string? estado, string? modulo1, string? modulo2, string? modulo3, string? linkDiagrama, int? numeroMiembros)
        {
            Titulo = titulo;
            Descripcion = descripcion;
            CorreoRegistro = correoRegistro;
            NombreLider = nombreLider;
            CodigoLider = codigoLider;
            CarreraLider = carreraLider;
            NumeroLider = numeroLider;
            CorreoLider = correoLider;
            SemestreLider = semestreLider;
            Nombre2 = nombre2;
            Codigo2 = codigo2;
            Carrera2 = carrera2;
            Numero2 = numero2;
            Correo2 = correo2;
            Semestre2 = semestre2;
            Nombre3 = nombre3;
            Codigo3 = codigo3;
            Carrera3 = carrera3;
            Numero3 = numero3;
            Correo3 = correo3;
            Semestre3 = semestre3;
            Asesor = asesor;
            Asesor2 = asesor2;
            Estado = estado;
            Modulo1 = modulo1;
            Modulo2 = modulo2;
            Modulo3 = modulo3;
            LinkDiagrama = linkDiagrama;
            NumeroMiembros = numeroMiembros;
        }

        public Proyecto(string? titulo, string? descripcion, string? correoRegistro, string? modulo1, string? modulo2, string? modulo3, string? estado, string? linkDiagrama, string? fechaRegistro)
        {
            Titulo = titulo;
            Descripcion = descripcion;
            CorreoRegistro = correoRegistro;
            Modulo1 = modulo1;
            Modulo2 = modulo2;
            Modulo3 = modulo3;
            Estado = estado;
            LinkDiagrama = linkDiagrama;
            FechaRegistro = fechaRegistro;
        }

        public Proyecto(Proyecto proyecto){
            Titulo = proyecto.Titulo;
            Descripcion = proyecto.Descripcion;
            CorreoRegistro = proyecto.CorreoRegistro;
            NombreLider = proyecto.NombreLider;
            CodigoLider = proyecto.CodigoLider;
            CarreraLider = proyecto.CarreraLider;
            NumeroLider = proyecto.NumeroLider;
            CorreoLider = proyecto.CorreoLider;
            SemestreLider = proyecto.SemestreLider;
            Nombre2 = proyecto.Nombre2;
            Codigo2 = proyecto.Codigo2;
            Carrera2 = proyecto.Carrera2;
            Numero2 = proyecto.Numero2;
            Correo2 = proyecto.Correo2;
            Semestre2 = proyecto.Semestre2;
            Nombre3 = proyecto.Nombre3;
            Codigo3 = proyecto.Codigo3;
            Carrera3 = proyecto.Carrera3;
            Numero3 = proyecto.Numero3;
            Correo3 = proyecto.Correo3;
            Semestre3 = proyecto.Semestre3;
            Asesor = proyecto.Asesor;
            Asesor2 = proyecto.Asesor2;
            Estado = proyecto.Estado;
            Modulo1 = proyecto.Modulo1;
            Modulo2 = proyecto.Modulo2;
            Modulo3 = proyecto.Modulo3;
            LinkDiagrama = proyecto.LinkDiagrama;
            NumeroMiembros = proyecto.NumeroMiembros;
        }
    }
}
