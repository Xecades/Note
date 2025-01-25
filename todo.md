## 近期

 - ToC 层级关系看起来很怪
 - ToC：默认折叠，hover 或滚动到目标位置展开（？）

 - 添加 backtotop 按钮
 - 完成深色模式
 - 完成小屏模式
 - 提供行内左中右布局
 - 提供文字颜色组件
 - 侧边栏（左右），允许折叠 / 滚动
 - 添加从 note 主页回到总主页的按钮

## 长期

 - 搓一个 counter
 - 重新设计 logo
 - 图片懒加载用 ThumbHash / BlurHash（考虑改成一个 API）
 - 搓一个评论系统（考虑使用 Serverless）
 - Status 页面（如果有了后端）
 - CDN

## Index Comp

 - 加上 tag？（例如“课程笔记”）
 - 考虑不同 category 对应不同颜色？

## Bug

 - `\n\n\n---\n` 会被 MarkdownItAnchor 误处理成标题

## 当前

 - Code block 添加标题、复制按钮
 - Dark Mode code block prism css error（目前是在 twikoo 中设置 theme 为 none）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important？）（放 rightbar？或者不要也可以）
 - MDCShorthand 前加 MDCBlock，shorthand 会渲染失败
 - 支持 Markdown 内部 style 标签
 - AnimateHeight 嵌套的时候，第一次点击内部的 fold 会不反应（推测是 AnimateHeight 库的问题，手搓一个？）
 - Table 加上滚动条（横向）
 - Note 404 页面加上一些自定义组件
 - 搜索改成 token 级别的
 - 手机上 “Typst 渲染” 点 “源码” 点不动
 - fold、tab 等支持搜索
 - block code meta 参数的处理（转义、引号）
 - 搜索支持上下键选择，回车跳转
 - 在合适的地方加上版权声明

以及代码中 @todo 项

## 暂时不重要的 TODO

 - KaTeX 中文字体，手机上不显示
 - 添加 HTML `<meta>` 那一堆属性 
 - Typst 添加中文字体的支持
 - 代码块换行
 - Command + P 打印样式
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 搜索功能保留 LaTeX 源码（？）
 - Safari 上那一堆 favicon 的显示
 - Safari 控制台字体问题
 - 标点挤压，需要中英文排版系统
 - 搜索数据库中空格的处理（要不直接删掉？）
 - 加一些彩蛋（例如 https://www.kirilv.com/canvas-confetti/）
