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

public partial class PostConnectionInfo : System.Web.UI.Page
{

	public struct PostConnectionInfoRequest
	{
		public string HostSDP, RemoteSDP;
		public int VerificationCode;
	}

	public struct PostConnectionInfoResponse
	{
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		PostConnectionInfoResponse res = new PostConnectionInfoResponse();
		PostConnectionInfoRequest req;
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
			
			string sql = String.Format("insert into ConnectionInfo (VerificationCode,HostSDP,RemoteSDP) VALUES ({0},'{1}','{2}')",
				req.VerificationCode, req.HostSDP, req.RemoteSDP );
				
			SqlCommand command = new SqlCommand( sql, connection );
			command.ExecuteNonQuery();
			
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

	PostConnectionInfoRequest GetRequestInfo()
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
		PostConnectionInfoRequest req = JsonConvert.DeserializeObject<PostConnectionInfoRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(PostConnectionInfoResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}