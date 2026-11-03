# ViviBon Pipeline · 爆款模板工业化数据与智能引擎

> **工程定位**：ViviBon Cover 的专属离线数据挖掘、心智模型评分、提示词逆向工程与质量门禁管道（Python 独立子工程）。
> 与边缘微服务 (`worker/`) 及前端展示源 (`public/`) 保持严格物理隔离，专注于高转化多模态资产沉淀与数据反哺飞轮。

---

## 一、 目录拓扑与架构说明

```
pipeline/
├── data/                                  # 📊 结构化数据资产中心
│   ├── raw/                               # 原始抓取数据与缓存
│   └── viral_pet_assets.json              # 标准化 24 组高转化爆款特征资产库
│
├── src/                                   # 🛠️ 生产模块源码
│   ├── collectors/                        # 官方合规数据采集器 (Civitai, HF 等)
│   │   └── civitai.py
│   ├── models/                            # 数据契约与强类型 Schema
│   │   └── schema.py
│   ├── scorers/                           # 阶段二：5 维心智模型评分与立项引擎
│   └── builder.py                         # 资产库组装构建入口
│
├── tests/                                 # 🧪 质量门禁与契约测试
│   └── test_dataset.py
│
├── requirements.txt                       # Python 环境依赖
└── README.md                              # 本说明书
```

---

## 二、 常用执行指令

```bash
# 1. 运行 Civitai 合规官方 API 采集器测试
python pipeline/src/collectors/civitai.py

# 2. 构建并生成最新的结构化爆款资产库
python pipeline/src/builder.py

# 3. 执行资产质量门禁全量校验 (100% 通过方可进入下一阶段)
python pipeline/tests/test_dataset.py
```
