# 粤学通 CantoFlow

一个基于 Next.js 的粤语学习与口语转换工具，包含字音练习、词汇卡片和普通话转香港口语功能。

## 功能概览

- `字音实验室`（`/lab`）
  - 六调发音指南
  - 听字选声调挑战
  - 按声调筛选常用字
- `地道口语转换器`（`/speech`）
  - 普通话输入
  - 生成地道粤语口语 + 粤拼（Jyutping）+ 词汇替换说明
  - 支持一键朗读
- `词汇练习`（`/practice`）
  - 随机学习词汇与例句
  - 卡片展开查看例句和释义
- `设置`（`/settings`）
  - 预留设置页（后续可扩展）

## 技术栈

- Next.js 15（App Router）
- React 19 + TypeScript
- Tailwind CSS
- OpenAI / Anthropic SDK（用于口语转换）
- Web Speech API（浏览器朗读）

## 环境要求

- Node.js `20 - 22`（推荐 22 LTS）
- npm

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 创建本地环境变量文件 `.env.local`

```env
# 选择模型提供商：openai 或 anthropic
LLM_PROVIDER=openai

# OpenAI（当 LLM_PROVIDER=openai 时必填）
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o

# Anthropic（当 LLM_PROVIDER=anthropic 时必填）
ANTHROPIC_API_KEY=your_anthropic_api_key
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

3. 启动开发服务

```bash
npm run dev
```

4. 打开浏览器访问

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev      # 本地开发
npm run build    # 生产构建
npm run start    # 启动生产服务
npm run lint     # 代码检查
```

## 目录结构（简）

```text
app/
  api/translate/route.ts   # 口语转换 API
  lab/page.tsx             # 字音实验室
  speech/page.tsx          # 地道口语转换器
  practice/page.tsx        # 词汇练习
components/                # 业务组件
constants/                 # 词库与常量
hooks/                     # 自定义 hooks（含朗读）
```
