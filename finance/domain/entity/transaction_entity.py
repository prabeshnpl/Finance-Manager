from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from finance.domain.entity.account_entity import AccountEntity

@dataclass
class UserEntity:
    id: int
    first_name: str = ''
    last_name: str = ''

@dataclass
class TransactionEntity:
    id: int
    organization_id: int | None = None
    account: Optional[AccountEntity] = None 
    to_account: Optional[AccountEntity] = None 
    category: Optional[dict] = None 
    created_by: Optional[UserEntity] = None 
    initiated_by: Optional[UserEntity] = None 
    amount: float = 0 
    remaining_balance: float = 0 
    transaction_type: str = ''
    occurred_at: Optional[datetime] = None
    description: str = ''
    created_at: Optional[datetime] = None
