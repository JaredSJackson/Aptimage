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

public partial class AddTechRating : System.Web.UI.Page
{

	public struct AddTechRatingRequest
	{
		public string explanation, problemSolved;
		public int ratingID, problemID, techID, rating;
	}

	public struct AddTechRatingResponse
	{
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		AddTechRatingResponse res = new AddTechRatingResponse();
		AddTechRatingRequest req;
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
			
			string sql = String.Format("insert into TechRating (RatingID,ProblemID,TechID,Rating,Explanation,ProblemSolved) VALUES ({0},{1},{2},{3},'{4}','{5}')",
				req.ratingID, req.problemID, req.techID, req.rating, req.explanation, req.problemSolved );
				
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

	AddTechRatingRequest GetRequestInfo()
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
		AddTechRatingRequest req = JsonConvert.DeserializeObject<AddTechRatingRequest>(strJson);

		return (req);
	}

	void SendResultInfoAsJson(AddTechRatingResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}