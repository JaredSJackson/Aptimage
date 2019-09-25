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

public partial class techtest : System.Web.UI.Page
{

	public struct techtestRequest
	{
		public string un, pw;
	}
	
	public struct TechInfo
	{
		public string un, pw;
	}

	public struct techtestResponse
	{
		public string error;
		public TechInfo[] loginFound;
		public bool login;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		techtestResponse res = new techtestResponse();
		techtestRequest req;
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

			// seaches for a specific un and pw

			string sql = String.Format("select * from techtest where un='{0}' and pw='{1}'", req.un, req.pw);
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			List<TechInfo> list = new List<TechInfo>();

			// may only need the reader to read the pw bc nothing else matters?
			while( reader.Read() )
			{
//				res.pw = Convert.ToString( reader["Model"] );
//				list.Add( Convert.ToString( reader["Model"] ) );
				TechInfo ti = new TechInfo();
				ti.un = Convert.ToString( reader["un"] );
				ti.pw = Convert.ToString( reader["pw"] );
				// ti.year = Convert.ToInt32( reader["Year"] );
				list.Add( ti );
			}
			reader.Close();
			
			// instead of adding it to a list, compare it to the pw passed in

			// res.loginFound = list.ToArray();
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
		// SendResultInfoAsJson(login);
	}

	techtestRequest GetRequestInfo()
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
		techtestRequest req = JsonConvert.DeserializeObject<techtestRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(techtestResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}