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

public partial class AddUserCallInfo : System.Web.UI.Page
{

	public struct AddUserCallInfoRequest
	{
		public string problem, solution, category, solved;
		public int problemID, userID, date, time, duration;
	}

	public struct AddUserCallInfoResponse
	{
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		AddUserCallInfoResponse res = new AddUserCallInfoResponse();
		AddUserCallInfoRequest req;
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
			
			string sql = String.Format("insert into UserCallInfo (ProblemID,UserID,Problem,Solution,Category,Date,Time,Duration,Solved) VALUES ({0},{1},'{2}','{3}','{4}',{5},{6},{7},'{8}')",
				req.problemID, req.userID, req.problem, req.solution, req.category, req.date, req.time, req.duration, req.solved );
				
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

	AddUserCallInfoRequest GetRequestInfo()
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
		AddUserCallInfoRequest req = JsonConvert.DeserializeObject<AddUserCallInfoRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(AddUserCallInfoResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}