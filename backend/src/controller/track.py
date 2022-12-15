import cherrypy
import cherrypy_cors
import os

__all__ = ["Track"]

""" 
Todos
1. Extract the campaignID and the param_name and param_value from the URL

"http://localhost:8080/track?campaignid=fff268dc-5107-b486-76c8-836d29eae528&campaign={campaign}&city={city}&state={state}"

2. Insert the values into a table called track like this

s.no  param_name           param_value

1     campaign_id          fff268dc-5107-b486-76c8-836d29eae528
2.    city                 Thrissur
3.    state                Kerala
4.    Impressions          10      (use tools.count_visits)
5.    Unique Impressions   5       (use cherrypy.sessions)           
6.    IP                   172.168.45.67
7.    Maxmind city         Thrissur
8.    Maxmind region       Kerala

"""


class Track(object):
    def __init__(self):
        pass

    @cherrypy.expose
    @cherrypy.tools.json_in()
    def index(self):
        return "display all the campaigns here in tabular format"
