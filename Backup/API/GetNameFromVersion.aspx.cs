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

public partial class GetNameFromVersion : System.Web.UI.Page
{

	public struct GetNameFromVersionRequest
	{
		public string version;
	}
	
	public struct KeyInfo
	{
		public string name;
		public int kID;
	}

	public struct GetNameFromVersionResponse
	{
		public string error;
		public KeyInfo[] keysFound;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		GetNameFromVersionResponse res = new GetNameFromVersionResponse();
		GetNameFromVersionRequest req;
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
			
			string sql = String.Format("select * from PKkeys where version='{0}'", req.version );
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			List<KeyInfo> list = new List<KeyInfo>();
			while( reader.Read() )
			{
//				res.name = Convert.ToString( reader["name"] );
//				list.Add( Convert.ToString( reader["name"] ) );
				KeyInfo ci = new KeyInfo();
				ci.name = Convert.ToString( reader["name"] );
				ci.kID = Convert.ToInt32( reader["kID"] );
				list.Add( ci );
			}
			reader.Close();
			
			res.keysFound = list.ToArray();
			
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

	GetNameFromVersionRequest GetRequestInfo()
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
		GetNameFromVersionRequest req = JsonConvert.DeserializeObject<GetNameFromVersionRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(GetNameFromVersionResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}