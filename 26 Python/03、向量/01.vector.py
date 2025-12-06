import math
from typing import Tuple

a = 3.1243
# print(math.hypot(3, 4))
b = f"a:.2f"
print(f"{type(b)}")


# 说明：导入 Optional 用于表示“可能为 None”
from typing import Optional


# 说明：根据用户 ID 返回姓名，若不存在则返回 None
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)


# 说明：Python 3.10+ 可用联合类型语法表示相同含义
def find_user_v2(user_id: int) -> str | None:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)


# 说明：脚本入口，演示如何安全地处理 Optional
if __name__ == "__main__":
    user: Optional[str] = find_user(1)
    if user is not None:
        print(f"Found user: {user}")
    else: 
        print("User not found")
