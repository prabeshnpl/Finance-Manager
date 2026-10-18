from typing import Optional
from user.domain.entity.user_entity import CustomUserEntity
from dataclasses import dataclass

@dataclass
class TokenEntity:
    access : str
    user : Optional[CustomUserEntity]
    
