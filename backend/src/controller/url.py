import cherrypy
import cherrypy_cors
import os
import src.lib.tools.GenerateUrlTool

__all__ = ["Url"]

""" This route returns the campaign URL. Call this route like this and pass the campaign ID. It responds with the 
    complete campaign URL appending the tokens created 
    http://localhost:8080/api/url/?campaignID=fff268dc-5107-b486-76c8-836d29eae528

    Response:

    http://localhost:8080/track?campaignid=fff268dc-5107-b486-76c8-836d29eae528&campaign={campaign}&city={city}&state={state}
"""


class Url(object):
    def __init__(self):
        pass

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self, campaignID):
        url = cherrypy.tools.GenerateUrlTool.generate_url(campaignid=campaignID)
        return url
