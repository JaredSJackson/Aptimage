using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;

public partial class GetCarsFromMake : System.Web.UI.Page
{

	public struct GetCarsFromMakeRequest
	{
		public string make;
	}
	
	public struct CarInfo
	{
		public string model;
		public int year;
	}

	public struct GetCarsFromMakeResponse
	{
		public string error;
		public CarInfo[] carsFound;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		GetCarsFromMakeResponse res = new GetCarsFromMakeResponse();
		GetCarsFromMakeRequest req;
		res.error = String.Empty;

		// Need passed in store id and number of requested results.
		// 1. Deserialize the incoming Json.
		try
		{
			req = GetRequestInfo();
		}
		catch(Exception ex)
		{
			res.error = ex.Message.ToString();

			// Return the results as Json.
			SendResultInfoAsJson(res);

			return;
		}

		SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
		try
		{
			connection.Open();
			
			string sql = String.Format("select * from Cars where Make='{0}'", req.make );
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			List<CarInfo> list = new List<CarInfo>();
			while( reader.Read() )
			{
//				res.model = Convert.ToString( reader["Model"] );
//				list.Add( Convert.ToString( reader["Model"] ) );
				CarInfo ci = new CarInfo();
				ci.model = Convert.ToString( reader["Model"] );
				ci.year = Convert.ToInt32( reader["Year"] );
				list.Add( ci );
			}
			reader.Close();
			
			res.carsFound = list.ToArray();
			
		}
		catch(Exception ex)
		{
			res.error = ex.Message.ToString();
		}
		finally
		{
			if( connection.State == ConnectionState.Open )
			{
				connection.Close();
			}
		}
		
		// Return the results as Json.
		SendResultInfoAsJson(res);
	}

	GetCarsFromMakeRequest GetRequestInfo()
	{
		// Get the Json from the POST.
		string strJson = String.Empty;
		HttpContext context = HttpContext.Current;
		context.Request.InputStream.Position = 0;
		using (StreamReader inputStream = new StreamReader(context.Request.InputStream))
		{
			strJson = inputStream.ReadToEnd();
		}

		// Deserialize the Json.
		GetCarsFromMakeRequest req = JsonConvert.DeserializeObject<GetCarsFromMakeRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(GetCarsFromMakeResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}