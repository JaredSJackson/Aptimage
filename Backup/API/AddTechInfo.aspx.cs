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

public partial class AddTechInfo : System.Web.UI.Page
{

	public struct AddTechInfoRequest
	{
		public string firstName, lastName, username, password, company, language;
	}

	public struct AddTechInfoResponse
	{
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		AddTechInfoResponse res = new AddTechInfoResponse();
		AddTechInfoRequest req;
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
			
			string sql = String.Format("insert into TechInfo (FirstName,LastName,Username,Password,Company,Language) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}')",
				req.firstName, req.lastName, req.username, req.password, req.company, req.language);
				
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

	AddTechInfoRequest GetRequestInfo()
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
		AddTechInfoRequest req = JsonConvert.DeserializeObject<AddTechInfoRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(AddTechInfoResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}