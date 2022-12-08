import cherrypy
import sqlalchemy
from sqlalchemy import Column, UniqueConstraint, Index
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid


from models.model import ORBase

__all__ = ["Campaign"]


class Campaign(ORBase):
    __tablename__ = "campaigns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    node = Column(String)
    parent = Column(String)
    node_type = Column(String)
    url = Column(String)
    weight = Column(Integer)
