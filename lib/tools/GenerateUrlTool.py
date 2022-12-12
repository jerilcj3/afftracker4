import cherrypy
from sqlalchemy.exc import SQLAlchemyError
from models.token import Token as ModelToken

""" 
# How to call this tool
import lib.tools.GenerateUrlTool

# pass the campaignid to the tool
def index(self):
        url = cherrypy.tools.GenerateUrlTool.generate_url(
            campaignid="fff268dc-5107-b486-76c8-836d29eae528"
        )
        print(url)

# Return result sample
# It result a URL like this
http://localhost:8080?campaignid=fff268dc-5107-b486-76c8-836d29eae528&campaign={campaign}&city={city}&state={state}

"""


class GenerateUrlTool(cherrypy.Tool):
    def __init__(self):
        cherrypy.Tool.__init__(self, "before_handler", callable=self.generate_url)

    @property
    def db(self):
        return cherrypy.request.db

    def generate_url(self, campaignid):
        try:
            # Query the database for the parameters to include in the URL
            results = (
                self.db.query(
                    ModelToken.param_name,
                    ModelToken.param_value,
                )
                .filter(ModelToken.campaignID == campaignid)
                .all()
            )
        except SQLAlchemyError as error:
            print(error)
            return {"error": "Error querying database"}

        # Initialize the result string
        result = "http://localhost:8080?campaignid=" + campaignid + "&"

        for i, param in enumerate(results):
            result += param["param_name"] + "=" + param["param_value"]
            if i < len(results) - 1:
                result += "&"

        return result


cherrypy.tools.GenerateUrlTool = GenerateUrlTool()
