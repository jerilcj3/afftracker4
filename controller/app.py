import cherrypy
import cherrypy_cors
import jinja2
import os
from models.user import User

__all__ = ["App"]

"""
  Storing the tree recieved in the database
  
  1. Create a Materialized View which has results of the below query
  2. The below query is a recursive SQL Query => https://www.youtube.com/watch?v=7hZYh9qXxe4

  with recursive main_tree as 
   (select id, node, parent, 1 as lvl
    from main where parent = 'jose'
    union
    select E.id, E.node, E.parent, H.lvl+1 as lvl
    from main_tree H 
    join main E on H.node = E.parent    
   )
select * from main_tree;   

"""


class App(object):
    def __init__(self):
        wrdir = os.path.realpath(os.getcwd())
        os.chdir(wrdir)
        self.build_dir = os.path.abspath(os.path.join(wrdir, "./build"))

    @property
    def db(self):
        return cherrypy.request.db

    @cherrypy.expose
    @cherrypy.tools.json_in()
    def index(self):
        if cherrypy.request.method == "OPTIONS":
            """This is a request that browser sends in CORS prior to sending a real request
            so set up extra headers for a pre-flight OPTIONS request as shown below.
            So the below line is mandatory
            """
            cherrypy_cors.preflight(allowed_methods=["GET", "POST"])

        if cherrypy.request.method == "GET":
            """self.db.add(User(value="jeril"))
            self.db.commit()
            raise cherrypy.HTTPRedirect("/")"""

            return open(os.path.abspath(os.path.join(self.build_dir, "index.html")))

        """ Tree from the frontend is passed here """
        if cherrypy.request.method == "POST":
            data = cherrypy.request.json
            print(data)
            """ for node in data["TreeDataValues"]:
                print(node) """

            return "Hello World!"
