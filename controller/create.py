import cherrypy
import cherrypy_cors
import os
from models.campaign import Campaign
from models.token import Token

__all__ = ["Create"]

"""
    This route captures the campaign tree created from the frontend and stores the tree in the database.
    This route is called from the file AccordianRoot.tsx in react
"""


class Create(object):
    def __init__(self):
        wrdir = os.path.realpath(os.getcwd())
        os.chdir(wrdir)
        self.build_dir = os.path.abspath(os.path.join(wrdir, "./build"))

    @property
    def db(self):
        return cherrypy.request.db

    # Define a new method to handle querying the database
    def insert_data(self, campaignID, data):
        try:
            with self.db.begin():
                for node in data["TreeDataValues"]:
                    """Insert into the campaigns table"""
                    self.db.add(
                        Campaign(
                            campaignID=campaignID,
                            node=node["node"],
                            parent=node["parent"],
                            node_type=node["type"],
                            url=node["url"],
                            weight=int(node["weight"]),
                        )
                    )
                # Get the list of tokens from the input data
                tokens = data["tokens"]["tokens"]
                print("tokens are:", tokens)
                # Iterate over the tokens and insert them into the database
                for token in tokens:
                    self.db.add(
                        Token(
                            campaignID=campaignID,
                            param_name=token["placeholder"],
                            param_value=token["value"],
                        )
                    )
                # If we reach this point, the inserts were successful, so we commit the transaction
                self.db.commit()
        except:
            # An error occurred, so we roll back the transaction
            self.db.rollback()

            # Log the error message
            # cherrypy.log(str(e), severity=logging.ERROR)

            # Return a 500 error to the client
            cherrypy.response.status = 500
        return

    @cherrypy.expose
    @cherrypy.tools.json_in()
    def index(self):

        if cherrypy.request.method == "OPTIONS":
            """This is a request that browser sends in CORS prior to sending a real request
            so set up extra headers for a pre-flight OPTIONS request as shown below.
            So the below line is mandatory
            """
            cherrypy_cors.preflight(allowed_methods=["POST"])

        if cherrypy.request.method == "GET":
            return open(os.path.abspath(os.path.join(self.build_dir, "index.html")))

        if cherrypy.request.method == "POST":
            campaignID = cherrypy.request.json["campaignID"]
            data = cherrypy.request.json
            # Call the insert_data method to handle inserting data into the database
            success = self.insert_data(campaignID, data)

            # Check if the insert was successful
            if not success:
                # An error occurred, so return a 500 error to the client
                cherrypy.response.status = 500
                return

        return "Inserted"
