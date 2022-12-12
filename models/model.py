from sqlalchemy.ext.declarative import declarative_base
import sqlalchemy
from sqlalchemy import Column, UniqueConstraint, Index
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid

__all__ = ["ORBase", "Campaign", "Token"]

ORBase = declarative_base()


class Campaign(ORBase):
    __tablename__ = "campaigns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campaignID = Column(String)
    node = Column(String)
    parent = Column(String)
    node_type = Column(String)
    url = Column(String)
    weight = Column(Integer)


class Token(ORBase):
    __tablename__ = "tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campaignID = Column(String)
    param_name = Column(String(255))
    param_value = Column(String(255))
