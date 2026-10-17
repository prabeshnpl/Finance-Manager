from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class AccountEntity:
    id: int
    organization: Optional[int] = None
    balance:float = 0
    is_active: bool = True
    name: str = ''
    account_type: str = ''
    is_active: bool = False
    created_at: Optional[datetime] = None 
    
