"""
Agent Loop 示例

这个脚本演示了 Claude Code 的核心机制 - Agent Loop。
它展示了一个最小化的 Agent 实现，包含：
- 消息管理
- 工具定义
- 工具执行
- 循环控制
"""

import os
import json
from anthropic import Anthropic

# 初始化 Claude 客户端
client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 定义工具
TOOLS = [
    {
        "name": "read_file",
        "description": "读取文件内容",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "文件路径"
                }
            },
            "required": ["path"]
        }
    },
    {
        "name": "write_file",
        "description": "写入文件内容",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "文件路径"
                },
                "content": {
                    "type": "string",
                    "description": "文件内容"
                }
            },
            "required": ["path", "content"]
        }
    },
    {
        "name": "list_files",
        "description": "列出目录中的文件",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "目录路径",
                    "default": "."
                }
            }
        }
    }
]

# 工具处理函数
def read_file(path: str) -> str:
    """读取文件内容"""
    try:
        with open(path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return f"错误: 文件 '{path}' 不存在"
    except Exception as e:
        return f"错误: {str(e)}"

def write_file(path: str, content: str) -> str:
    """写入文件内容"""
    try:
        with open(path, 'w') as f:
            f.write(content)
        return f"成功: 文件 '{path}' 已创建/更新"
    except Exception as e:
        return f"错误: {str(e)}"

def list_files(path: str = ".") -> str:
    """列出目录中的文件"""
    try:
        files = os.listdir(path)
        return "\n".join(files)
    except Exception as e:
        return f"错误: {str(e)}"

# 工具分发器
TOOL_HANDLERS = {
    "read_file": lambda **kwargs: read_file(kwargs["path"]),
    "write_file": lambda **kwargs: write_file(kwargs["path"], kwargs["content"]),
    "list_files": lambda **kwargs: list_files(kwargs.get("path", "."))
}

def execute_tool(tool_name: str, tool_input: dict) -> str:
    """执行工具调用"""
    handler = TOOL_HANDLERS.get(tool_name)
    if handler:
        return handler(**tool_input)
    return f"错误: 未知工具 '{tool_name}'"

def agent_loop(user_query: str, max_iterations: int = 10):
    """
    Agent Loop 核心实现
    
    Args:
        user_query: 用户输入
        max_iterations: 最大迭代次数（安全限制）
    """
    # 初始化消息列表
    messages = [{"role": "user", "content": user_query}]
    
    print(f"\n{'='*50}")
    print(f"用户: {user_query}")
    print(f"{'='*50}\n")
    
    for iteration in range(max_iterations):
        print(f"[迭代 {iteration + 1}]")
        
        # 调用 Claude API
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            tools=TOOLS,
            messages=messages
        )
        
        # 添加助手响应到消息列表
        messages.append({"role": "assistant", "content": response.content})
        
        # 检查是否需要继续循环
        if response.stop_reason != "tool_use":
            print(f"Claude: {response.content[0].text}")
            print(f"\n{'='*50}")
            print("任务完成!")
            print(f"{'='*50}")
            return
        
        # 执行工具调用
        tool_results = []
        for content_block in response.content:
            if content_block.type == "tool_use":
                tool_name = content_block.name
                tool_input = content_block.input
                
                print(f"  调用工具: {tool_name}")
                print(f"  参数: {json.dumps(tool_input, ensure_ascii=False)}")
                
                # 执行工具
                result = execute_tool(tool_name, tool_input)
                
                print(f"  结果: {result[:100]}...")
                
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": content_block.id,
                    "content": result
                })
        
        # 添加工具结果到消息列表
        messages.append({"role": "user", "content": tool_results})
    
    print(f"\n警告: 达到最大迭代次数 ({max_iterations})")

def main():
    """主函数 - 交互式 Agent Loop"""
    print("Agent Loop 示例")
    print("输入 'quit' 退出")
    print("=" * 50)
    
    while True:
        user_input = input("\n你: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'q']:
            print("再见!")
            break
        
        if not user_input:
            continue
        
        agent_loop(user_input)

if __name__ == "__main__":
    main()
