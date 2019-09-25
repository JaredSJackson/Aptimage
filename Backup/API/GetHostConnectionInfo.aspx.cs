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

public partial class GetHostConnectionInfo: System.Web.UI.Page
{

	public struct GetHostConnectionInfoRequest
	{
		public string VerificationCode;
	}

	public struct GetHostConnectionInfoResponse
	{
		public string error;
		public string HostSDP;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		GetHostConnectionInfoResponse res = new GetHostConnectionInfoResponse();
		GetHostConnectionInfoRequest req;
		res.error = "false";

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
			
			string sql = String.Format("select HostSDP from ConnectionInfo where VerificationCode='{0}'", req.VerificationCode);
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			if( reader.Read() )
			{
				res.HostSDP = Convert.ToString(reader["HostSDP"]);
			}
			reader.Close();
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

	GetHostConnectionInfoRequest GetRequestInfo()
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
		GetHostConnectionInfoRequest req = JsonConvert.DeserializeObject<GetHostConnectionInfoRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(GetHostConnectionInfoResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}