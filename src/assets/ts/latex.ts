import katex from "katex";
import type { KatexOptions } from "katex";

const _render = (options: KatexOptions) => (raw: string) => {
    try {
        return katex.renderToString(raw, options);
    } catch (error) {
        console.error(error);
        return `<span style="color: red">${raw}</span>`;
    }
};

const config: KatexOptions = {
    throwOnError: true,
    macros: { "\\ketbra": "\\mathinner{|{#1}\\rangle\\!\\langle{#2}|}" },
};

const render_inline = _render({ displayMode: false, ...config });
const render_block = _render({ displayMode: true, ...config });
const render = (raw: string, opts: KatexOptions) => _render(opts)(raw);

export { render, render_inline, render_block };
