import cherrypy
import sqlalchemy
from sqlalchemy import Column, UniqueConstraint, Index
from sqlalchemy.types import Integer, String, Boolean

from models.model import ORBase

__all__ = ["User"]


class User(ORBase):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    value = Column(String)
