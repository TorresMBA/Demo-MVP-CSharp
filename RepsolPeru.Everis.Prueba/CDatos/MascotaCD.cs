using RepsolPeru.Everis.Prueba.CEntidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepsolPeru.Everis.Prueba.CDatos
{
    public class MascotaCD
    {
        public IList<MascotaCE> ListadoMascotas(string dsn)
        {
            IList<MascotaCE> listadoMascotas = null;
            String consulta = "SELECT EmployeeID, FirstName, TitleOfCourtesy FROM Employees";

            try
            {
                using (SqlConnection con = new SqlConnection(dsn))
                {
                    SqlCommand cmd = new SqlCommand(consulta, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        MascotaCE oMascota = null;
                        listadoMascotas = new List<MascotaCE>();
                        while (reader.Read())
                        {
                            oMascota = new MascotaCE();
                            oMascota.id = Convert.ToInt32(reader["EmployeeID"]);
                            oMascota.nombre = reader["FirstName"].ToString();
                            oMascota.raza = reader["TitleOfCourtesy"].ToString();
                            listadoMascotas.Add(oMascota);
                        }
                    }
                    reader.Close();
                    con.Close();
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }

            return listadoMascotas;
        }

        public int GuardarMascota(string dsn, MascotaCE mascotaCE)
        {
            int idResponse = -1;
            string sql = "INSERT INTO Employees(LastName, FirstName, TitleOfCourtesy) VALUES('Test', @Nombre, @Raza)";

            try
            {
                using (SqlConnection con = new SqlConnection(dsn))
                {
                    SqlCommand cmd = new SqlCommand(sql, con);
                    cmd.Parameters.Add("@Nombre", SqlDbType.VarChar).SqlValue = mascotaCE.nombre;
                    cmd.Parameters.Add("@Raza", SqlDbType.VarChar).SqlValue = mascotaCE.raza;
                    
                    con.Open();

                    if (cmd.ExecuteNonQuery() == 1)
                    {
                        idResponse = 1;
                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return idResponse;
        }
        
        public MascotaCE BuscarMascota(string dsn, int idMascota)
        {
            MascotaCE listadoMascotas = null;
            string consulta = "SELECT EmployeeID, FirstName, TitleOfCourtesy FROM Employees WHERE EmployeeID = @ID";

            try
            {
                using (SqlConnection con = new SqlConnection(dsn))
                {
                    SqlCommand cmd = new SqlCommand(consulta, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        MascotaCE oMascota = null;
                        listadoMascotas = new MascotaCE();
                        while (reader.Read())
                        {
                            oMascota = new MascotaCE();
                            oMascota.id = Convert.ToInt32(reader["EmployeeID"]);
                            oMascota.nombre = reader["FirstName"].ToString();
                            oMascota.raza = reader["TitleOfCourtesy"].ToString();
                        }
                    }
                    reader.Close();
                    con.Close();
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }

            return listadoMascotas;
        }

        public int ActualizarMascota(string dsn, int idMascota, MascotaCE mascotaCE)
        {
            int idResponse = -1;
            string sql = "UPDATE Employees SET FirstName = @Nombre, TitleOfCourtesy = @Raza WHERE EmployeeID = @Id";

            try
            {
                using (SqlConnection con = new SqlConnection(dsn))
                {
                    SqlCommand cmd = new SqlCommand(sql, con);
                    cmd.Parameters.Add("@Id", SqlDbType.Int).SqlValue = idMascota;
                    cmd.Parameters.Add("@Nombre", SqlDbType.VarChar).SqlValue = mascotaCE.nombre;
                    cmd.Parameters.Add("@Raza", SqlDbType.VarChar).SqlValue = mascotaCE.raza;

                    con.Open();

                    if (cmd.ExecuteNonQuery() > 1) {
                        idResponse = 1;
                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return idResponse;
        }

        public bool EliminarMascota(string dsn, int idMascota)
        {
            bool idResponse = false;
            string sql = "DELETE FROM Employees WHERE EmployeeID = @Id";

            try
            {
                using (SqlConnection con = new SqlConnection(dsn))
                {
                    SqlCommand cmd = new SqlCommand(sql, con);
                    cmd.Parameters.Add("@Id", SqlDbType.Int).SqlValue = idMascota;

                    con.Open();

                    if (cmd.ExecuteNonQuery() > 1)
                    {
                        idResponse = true;
                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return idResponse;
        }
     }
}
