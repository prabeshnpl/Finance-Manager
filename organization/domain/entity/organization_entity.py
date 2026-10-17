from typing import Optional
from datetime import datetime
from dataclasses import dataclass

@dataclass
class OrganizationEntity:
    id: int
    name: str ='',
    type: str='',
    created_by: Optional['CustomUser'] = None # type: ignore
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
