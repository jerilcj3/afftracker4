import cherrypy
import sqlalchemy
from sqlalchemy import Column, UniqueConstraint, Index
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from models.model import ORBase

__all__ = ["Token"]


class Token(ORBase):
    __tablename__ = "tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campaignID = Column(String)
    param_name = Column(String(255))
    param_value = Column(String(255))
