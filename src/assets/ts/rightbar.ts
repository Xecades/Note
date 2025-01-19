import { isWidthLessThan, RIGHTBAR_THRESHOLD } from "./utils";
import { RIGHTBAR_STATUS } from "./types";

import type { MarkdownHeaderJsx } from "vite-plugin-vue-xecades-note";
import type { Ref } from "vue";

/** Header type used for ref rendering */
export type HeaderRef = MarkdownHeaderJsx & {
    readonly width: string;
    readonly indent: string;
    readonly opacity: string;
};

const width_preset: string[] = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset: string[] = ["0rem", "1rem", "1.7rem", "2.3rem", "2.8rem"];
const opacity_preset: string[] = ["1", "0.6", "0.6", "0.6", "0.6"];

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
export const normalize_toc = (toc: MarkdownHeaderJsx[]): HeaderRef[] => {
    const levels: number[] = toc.map((item) => item.level);

    const maxLevel: number = Math.max(...levels);
    const minLevel: number = Math.min(...levels);

    return toc.map((item) => ({
        ...item,
        width: width_preset[4 + item.level - maxLevel],
        indent: indent_preset[item.level - minLevel],
        opacity: opacity_preset[item.level - minLevel],
    }));
};

/**
 * Navigate to the element with the given ID.
 *
 * @param id - ID of the element to navigate to
 * @param offset - Offset from the top of the element, default to -4rem
 */
export const navigate = (id: string, offset: number = -4 * 16) => {
    let el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
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
