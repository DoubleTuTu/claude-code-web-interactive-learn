# Agent Loop 示例

这个示例展示了 Claude Code 的核心机制 - Agent Loop。

## 运行方式

```bash
# 安装依赖
pip install anthropic

# 设置 API Key
export ANTHROPIC_API_KEY=your_api_key_here

# 运行示例
python agent_loop.py
```

## 代码说明

`agent_loop.py` 实现了一个简单的 Agent Loop：

1. 接收用户输入
2. 发送给 Claude API
3. 如果 Claude 请求调用工具，执行工具并返回结果
4. 重复直到 Claude 不再请求工具

## 核心概念

```python
# Agent Loop 的核心逻辑
while True:
    response = call_claude(messages, tools)
    messages.append(response)
    
    if response.stop_reason != "tool_use":
        break  # 任务完成
    
    # 执行工具调用
    for tool_call in response.tool_calls:
        result = execute_tool(tool_call)
        messages.append(result)
```

## 扩展建议

1. 添加更多工具（文件读写、代码执行等）
2. 实现上下文压缩
3. 添加错误处理和重试机制
4. 实现多轮对话记忆
