import { isWidthLessThan, RIGHTBAR_THRESHOLD } from "./utils";
import { RIGHTBAR_STATUS } from "./types";

import type { MarkdownHeaderJsx } from "vite-plugin-vue-xecades-note";
import type { Ref } from "vue";

/** Header type used for ref rendering */
export type SerialHeader = MarkdownHeaderJsx & {
    width: string;
    indent: string;
    opacity: string;
    index: number;
};
export type CascadeHeader = SerialHeader & { children: SerialHeader[] };

const width_preset: string[] = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset: string[] = [
    "0rem",
    "1.3rem",
    "1.7rem",
    "2.3rem",
    "2.8rem",
];
const opacity_preset: string[] = ["1", "0.8", "0.7", "0.7", "0.7"];

/**
 * Determine rightbar status (i.e. whether to display or not).
 *
 * @note Only when the screen width is less than `RIGHTBAR_THRESHOLD`,
 *       will the rightbar be hidden.
 */
export const get_rightbar_status = (): RIGHTBAR_STATUS =>
    isWidthLessThan(RIGHTBAR_THRESHOLD)
        ? RIGHTBAR_STATUS.HIDE
        : RIGHTBAR_STATUS.SHOW;

/**
 * Append width and indent properties to TOC data.
 *
 * @param toc - Raw TOC data imported from json
 * @returns Normalized TOC data
 */
export const serial_toc = (toc: MarkdownHeaderJsx[]): SerialHeader[] => {
    const levels = toc.map((item) => item.level);
    const minLevel = Math.min(...levels);
    const maxLevel = Math.max(...levels);

    return toc.map((item, i) => ({
        ...item,
        width: width_preset[4 + item.level - maxLevel],
        indent: indent_preset[item.level - minLevel],
        opacity: opacity_preset[item.level - minLevel],
        level: item.level - minLevel,
        index: i,
    }));
};

export const cascade_toc = (s_toc: SerialHeader[]): CascadeHeader[] => {
    let res: CascadeHeader[] = [];
    let prev_root = 0;

    for (let i = 1; i < s_toc.length; i++) {
        if (s_toc[i].level === s_toc[prev_root].level) {
            const children = s_toc.slice(prev_root + 1, i);
            res.push({ ...s_toc[prev_root], children });
            prev_root = i;
        }
    }

    if (prev_root < s_toc.length) {
        const children = s_toc.slice(prev_root + 1);
        res.push({ ...s_toc[prev_root], children });
    }

    return res;
};

/**
 * Scroll listener class for rightbar.
 */
export class ScrollListener {
    targets: Element[];
    store: Ref<number | null>;

    /**
     * Constructor.
     *
     * @param in_view - Ref to store the index of the element in view
     */
    constructor(in_view: Ref<number | null>) {
        this.targets = [];
        this.store = in_view;

        window.onscroll = () => {
            for (let i = 0; i < this.targets.length; i++) {
                if (this.in_viewport(this.targets[i])) {
                    this.store.value = i;
                    break;
                }
            }
        };
    }

    /**
     * Add an element to the listener.
     *
     * @param target - The element to add to the listener
     */
    listen(target: Element): void {
        this.targets.push(target);
    }

    /**
     * Clear the listener.
     */
    reset(): void {
        this.targets = [];
        this.store.value = null;
    }

    /**
     * Check whether an element is in viewport.
     *
     * @param el - The element to check
     * @returns Whether the element is in the viewport
     */
    private in_viewport(el: Element): boolean {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const vw = window.innerWidth || document.documentElement.clientWidth;

        const rect: DOMRect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= vh &&
            rect.right <= vw
        );
    }
}
