# 导入pymilvus中的连接和工具包
from pymilvus import connections, utility

# 定义测试数据库连接的函数，包含主机host、端口port、数据库名db_name，设置默认值
def test_connection(
    host: str = "127.0.0.1", port: str = "19530", db_name: str = "default"
) -> bool:
    try:
        # 建立到Milvus的连接
        connections.connect("default", host=host, port=port, timeout=10, db_name=db_name)

        # 打印当前连接到的数据库名称
        print(f"当前连接到的数据库为: {db_name}")

        # 获取所有集合名并打印
        collections = utility.list_collections()
        print(f"数据库 '{db_name}' 下的集合有:", collections)

        # 连接成功提示
        print("连接成功：已成功连接到 Milvus 服务器")
        return True
    except Exception as exc:
        # 捕获连接失败异常并打印
        print(f"连接失败：无法连接到 Milvus 服务器的数据库 '{db_name}' ->", exc)
        return False
    finally:
        # 断开连接
        connections.disconnect("default")
        print("已关闭与 Milvus 服务器的连接")

# 主程序入口：调用连接测试
if __name__ == "__main__":
    if not test_connection():
        # 如果连接失败则程序退出
        raise SystemExit(1)