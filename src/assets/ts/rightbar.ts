import { RIGHTBAR_THRESHOLD } from "./utils";
import { RIGHTBAR_STATUS } from "./types";

import type { HeadingData } from "vite-plugin-vue-xecades-note";
import type { Ref } from "vue";

/** Header type used for ref rendering */
export type SerialHeader = HeadingData & {
    width: string;
    indent: string;
    opacity: string;
    index: number;
};
export type CascadeHeader = SerialHeader & { children: SerialHeader[] };

const width_preset = ["50px", "40px", "30px", "20px", "13px"];
const indent_preset = ["0rem", "1.3rem", "1.7rem", "2.3rem", "2.8rem"];
const opacity_preset = ["1", "0.8", "0.7", "0.7", "0.7"];

/**
 * Determine rightbar status (i.e. whether to display or not).
 *
 * @note Only when the screen width is less than `RIGHTBAR_THRESHOLD`,
 *       will the rightbar be hidden.
 */
export const get_rightbar_status = (width = window.innerWidth): RIGHTBAR_STATUS =>
    width < RIGHTBAR_THRESHOLD ? RIGHTBAR_STATUS.HIDE : RIGHTBAR_STATUS.SHOW;

/**
 * Append width and indent properties to TOC data.
 *
 * @param toc - Raw TOC data imported from json
 * @returns Normalized TOC data
 */
export const serial_toc = (toc: HeadingData[]): SerialHeader[] => {
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
    private frame = 0;
    private observer?: ResizeObserver;
    private targets: Element[] = [];
    constructor(private store: Ref<number>) {}

    private update = () => {
        this.frame = 0;
        let current = -1;
        for (let i = 0; i < this.targets.length; i++) {
            const element = this.targets[i];
            if (!element.getClientRects().length || element.closest("[hidden], [inert]"))
                continue;
            if (current === -1 || element.getBoundingClientRect().top <= 80) current = i;
            else break;
        }
        this.store.value = current;
    };
    private schedule = () => {
        if (!this.frame) this.frame = requestAnimationFrame(this.update);
    };
    refresh() {
        this.targets = Array.from(document.querySelectorAll(".heading"));
        this.schedule();
    }
    start() {
        window.addEventListener("scroll", this.schedule, { passive: true });
        window.addEventListener("resize", this.schedule);
        this.observer = new ResizeObserver(this.schedule);
        this.observer.observe(document.body);
        this.refresh();
    }
    stop() {
        window.removeEventListener("scroll", this.schedule);
        window.removeEventListener("resize", this.schedule);
        this.observer?.disconnect();
        cancelAnimationFrame(this.frame);
    }
}
