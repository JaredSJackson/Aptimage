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

public partial class TechLogin : System.Web.UI.Page
{

	public struct TechLoginRequest
	{
		public string username, password;
	}
	
	public struct TechInfo
	{
		public string username, password;
	}

	public struct TechLoginResponse
	{
		public string error;
		public TechInfo[] loginFound;
		public bool login;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		TechLoginResponse res = new TechLoginResponse();
		TechLoginRequest req;
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

			// seaches for a specific username and password
			string sql = String.Format("select * from TechInfo where Username='{0}' and Password='{1}'",
				req.username, req.password );
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			List<TechInfo> list = new List<TechInfo>();

			// 
			while( reader.Read() )
			{
				TechInfo ti = new TechInfo();
				ti.username = Convert.ToString( reader["Username"] );
				ti.password = Convert.ToString( reader["Password"] );
				list.Add( ti );
			}
			reader.Close();
			
			// make sure there's exactly one instance of the username and password given
			if(list.ToArray().Length==1)
			{
				res.login=true;
			}
			else
			{
				res.login=false;
			}
			
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

	TechLoginRequest GetRequestInfo()
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
		TechLoginRequest req = JsonConvert.DeserializeObject<TechLoginRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(TechLoginResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}