## 近期

 - typst 生成的 svg，支持文本选中
 - typst 支持中文（让 workflow 先安装字体）
 - 修改 . 的渲染
 - LeftBar 添加折叠（？）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important？）（放 rightbar？或者不要也可以）
 - index comp，hover 范围广一点
 - 字体 cdn
 - 添加 backtotop 按钮

## 灵感

 - index page，"Xecades Notes"特大居中，页面滚动过程中逐渐回到左上角
 - 元胞自动机、陨石雨、Gravity

## 长期

 - 搓一个 counter
 - 重新设计 logo
 - 搓一个评论系统（考虑使用 Serverless）
 - Status 页面（如果有了后端）
 - CDN

## Index Comp

 - 加上 tag？（例如“课程笔记”）
 - 考虑不同 category 对应不同颜色？

## Bug

 - `\n\n\n---\n` 会被 MarkdownItAnchor 误处理成标题
 - 行内第一个 token 为 mdc 时，会渲染失败，当前解决方案是在前面加上 &nbsp;

## 当前

 - Code block 行高亮
 - Code block 添加标题、复制按钮
 - Dark Mode code block prism css error（目前是在 twikoo 中设置 theme 为 none）
 - MDCShorthand 前加 MDCBlock，shorthand 会渲染失败
 - 支持 Markdown 内部 style 标签
 - AnimateHeight 嵌套的时候，第一次点击内部的 fold 会不反应（推测是 AnimateHeight 库的问题，手搓一个？）
 - Table 加上滚动条（横向）
 - 搜索改成 token 级别的
 - fold、tab 等支持搜索
 - block code meta 参数的处理（转义、引号）
 - 搜索支持上下键选择，回车跳转

以及代码中 @todo 项

## 暂时不重要的 TODO

 - 添加 HTML `<meta>` 那一堆属性
 - 代码块换行
 - Command + P 打印样式
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 搜索功能保留 LaTeX 源码（？）
 - Safari 上那一堆 favicon 的显示
 - Safari 控制台字体问题
 - 标点挤压，需要中英文排版系统
 - 搜索数据库中空格的处理（要不直接删掉？）
