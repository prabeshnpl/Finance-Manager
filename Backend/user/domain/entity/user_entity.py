from typing import Optional
from datetime import datetime
from dataclasses import dataclass

@dataclass
class CustomUserEntity:
    id: int
    email: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    contact_number: Optional[str] = None
    profile_picture: Optional['FieldFile'] = None  # type: ignore
    is_deleted: Optional[bool] = False
    is_disabled: Optional[bool] = False
    is_active: Optional[bool] = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    