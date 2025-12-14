import katex from "katex";
import type { KatexOptions } from "katex";

/**
 * Convert \newcommand to \gdef for compatibility with KaTeX
 * 
 * Example:
 * \newcommand{\foo}[2]{#1 + #2}  -->  \gdef\foo#1#2{#1 + #2}
 * \newcommand{\NN}{\mathbb{N}}   -->  \gdef\NN{\mathbb{N}}
 */
const replaceNewcommandWithGdef = (raw: string): string => {
    let result = '';
    let lastIndex = 0;

    const newcmd_head = /\\newcommand\s*{\\([a-zA-Z]+)}\s*(?:\[(\d+)])?\s*{/g;

    for (const match of raw.matchAll(newcmd_head)) {
        const [, cmd, argc] = match;
        const braceStart = match.index! + match[0].length - 1;

        let depth = 0;
        let i = braceStart;

        while (i < raw.length) {
            if (raw[i] === '{') depth++;
            else if (raw[i] === '}') {
                depth--;
                if (depth === 0) break;
            }
            i++;
        }

        const body = raw.slice(braceStart + 1, i);
        const n = parseInt(argc || '0', 10);
        const params = Array.from({ length: n }, (_, k) => `#${k + 1}`).join('');

        result += raw.slice(lastIndex, match.index);
        result += `\\gdef\\${cmd}${params}{${body}}`;

        lastIndex = i + 1;
    }

    result += raw.slice(lastIndex);
    return result;
};


const _render = (options: KatexOptions) => (raw: string) => {
    raw = replaceNewcommandWithGdef(raw);

    try {
        return katex.renderToString(raw, options);
    } catch (error) {
        console.error(error);
        return `<span style="color: red">${raw}</span>`;
    }
};

const config: KatexOptions = {
    throwOnError: true,
    macros: {},
};

const render_inline = _render({ displayMode: false, ...config });
const render_block = _render({ displayMode: true, ...config });
const render = (raw: string, opts: KatexOptions) => _render(opts)(raw);

export { render, render_inline, render_block };
