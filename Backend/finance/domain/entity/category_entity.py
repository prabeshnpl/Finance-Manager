from datetime import datetime
from dataclasses import dataclass
from typing import Optional
from organization.domain.entity.organization_entity import OrganizationEntity

@dataclass
class CategoryEntity:
    id: int
    organization: Optional[int] = None
    name: str = ""
    category_type: str = ""
    color: str = ""
    created_at: Optional[datetime] = None 

@dataclass
class CategoryBreakdownEntity(CategoryEntity):
    id: int    
    organization: Optional[int] = None
    name: str = ""
    category_type: str = ""
    color: str = ""
    created_at: Optional[datetime] = None 
    total: float = 0 

