#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import cherrypy
import tempfile
import src.controller.root, src.controller.create, src.controller.campaigns, src.controller.url
from src.models.model import ORBase
from cp_sqlalchemy import SQLAlchemyTool, SQLAlchemyPlugin
import cherrypy_cors


class Server(object):
    def __init__(self):
        self._set_basic_config()
        self._setup()
        self._add_app()

    def _set_basic_config(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.conf_path = os.path.join(self.base_dir, "conf")
        log_dir = os.path.join(self.base_dir, "logs")
        if not os.path.exists(log_dir):
            os.mkdir(log_dir)
        session_dir = os.path.join(tempfile.gettempdir(), "sessions")
        if not os.path.exists(session_dir):
            os.mkdir(session_dir)

    def _setup(self):

        cherrypy_cors.install()
        # Update the global settings for the HTTP server and engine
        cherrypy.config.update(os.path.join(self.conf_path, "server.conf"))

    def _add_app(self):
        cherrypy.tree.mount(
            src.controller.root.Root(),
            "/api/",
            os.path.join(self.conf_path, "app.conf"),
        )
        cherrypy.tree.mount(
            src.controller.create.Create(),
            "/api/create",
            os.path.join(self.conf_path, "app.conf"),
        )

        cherrypy.tree.mount(
            src.controller.campaigns.Campaigns(),
            "/api/campaigns",
            os.path.join(self.conf_path, "app.conf"),
        )

        cherrypy.tree.mount(
            src.controller.url.Url(),
            "/api/url",
            os.path.join(self.conf_path, "app.conf"),
        )

    def run(self):
        engine = cherrypy.engine
        cherrypy.tools.db = SQLAlchemyTool()

        sqlalchemy_plugin = SQLAlchemyPlugin(
            engine, ORBase, "postgresql://postgres@localhost:5432/postgres", echo=True
        )

        if hasattr(engine, "signal_handler"):
            engine.signal_handler.subscribe()

        if hasattr(engine, "console_control_handler"):
            engine.console_control_handler.subscribe()

        sqlalchemy_plugin.subscribe()
        sqlalchemy_plugin.create()

        engine.start()
        engine.block()


if __name__ == "__main__":
    Server().run()
