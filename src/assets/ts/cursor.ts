/** @todo unused */
import { useDebounceFn } from "@vueuse/core";

const LERP_COEFF = 0.16;

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const lerpCoords = (a: Coord, b: Coord, n: number): Coord => ({
    x: lerp(a.x, b.x, n),
    y: lerp(a.y, b.y, n),
});

type Coord = { x: number; y: number };
enum State {
    NONE = "none",
    DEFAULT = "default",
    POINTER = "pointer",
    TEXT = "text",
}

enum Var {
    TEXT_FONT_SIZE = "--cursor-text-font-size",
    TEXT_COLOR = "--cursor-text-color",
}

class Circle {
    el: HTMLDivElement;
    coeff: number;
    coords: { curr: Coord | null; prev: Coord | null };

    constructor(coeff: number, id: string) {
        this.coeff = coeff;
        this.coords = { curr: null, prev: null };
        this.el = this.createElement(id);
        this.hide();
        this.bindEvents();
        this.startAnimation();
    }

    switch = (state: State) => this.el.setAttribute("data-state", state);
    var = (k: Var, v: string) => this.el.style.setProperty(k, v);

    show = () => this.el.removeAttribute("data-hidden");
    hide = () => this.el.setAttribute("data-hidden", "");
    active = () => this.el.setAttribute("data-active", "");
    inactive = () => this.el.removeAttribute("data-active");

    bindEvents() {
        const on = document.addEventListener.bind(document);

        on("mousemove", (e) => this.mousemove(e));

        on("mouseenter", () => this.show());
        on("mouseleave", () => this.hide());

        on("mousedown", () => this.active());
        on("mouseup", () => this.inactive());
    }

    mousemove(e: MouseEvent) {
        const curr = { x: e.clientX, y: e.clientY };

        // If the cursor is not moved yet,
        // move it to current position instantly
        if (this.coords.curr === null) this.move(curr);
        this.coords.curr = curr;
        this.show();
    }

    startAnimation() {
        if (this.coords.curr && this.coords.prev) {
            this.coords.prev = lerpCoords(
                this.coords.prev,
                this.coords.curr,
                this.coeff
            );
            this.move(this.coords.prev);
        } else {
            this.coords.prev = this.coords.curr;
        }

        requestAnimationFrame(() => this.startAnimation());
    }

    move(coord: Coord) {
        this.el.style["left"] = `${coord.x}px`;
        this.el.style["top"] = `${coord.y}px`;
    }

    createElement(id: string) {
        const el = document.createElement("div");
        el.id = id;
        el.classList.add("__cursor");
        document.body.append(el);
        return el;
    }
}

const isHoveringText = (coord: Coord) => {
    const { x, y } = coord;
    const el = document.elementFromPoint(x, y);
    if (el == null) return false;

    const nodes = el.childNodes;
    const inRange = (r: DOMRect) =>
        x > r.left && x < r.right && y > r.top && y < r.bottom;

    for (const node of Array.from(nodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
            const range = document.createRange();
            range.selectNode(node);
            const rects = range.getClientRects();

            if (Array.from(rects).some(inRange)) return true;
        }
    }
    return false;
};

class Cursor {
    trail = new Circle(LERP_COEFF, "cursor-trail");
    main = new Circle(1, "cursor-main");
    private inspectQueue: Element[] = [document.body];
    private hoverMap = new Map<Element, string>();

    constructor() {
        this.enable();
        this.registerElements();
        this.watchMutation();
        this.bindEvents();
    }

    watchMutation() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((el) => {
                        if (el instanceof Element) {
                            this.inspectQueue.push(el);
                            this.registerElements();
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    registerElements = useDebounceFn(() => {
        this.disable();

        while (this.inspectQueue.length) {
            const root = this.inspectQueue.pop();
            if (!root) continue;

            const els = root.querySelectorAll("*");
            els.forEach((el) => {
                const cursor = getComputedStyle(el).cursor;
                const on = el.addEventListener.bind(el);

                if (!["default", "auto"].includes(cursor)) {
                    on("mouseover", () => this.hoverMap.set(el, cursor));
                    on("mouseout", () => this.hoverMap.delete(el));
                    on("dragend", () => this.trail.inactive());
                    on("dragstart", () => {
                        this.main.hide();
                        this.trail.hide();
                    });
                }
            });
        }

        this.enable();
    }, 400);

    handleMouseMove(event: MouseEvent) {
        const { clientX: x, clientY: y } = event;
        const coord = { x, y };

        const cursors = [...this.hoverMap.values()];
        const has = cursors.includes.bind(cursors);
        const trail = this.trail;
        const main = this.main;

        // console.log(this.hoverMap);

        const hoverEl = document.elementFromPoint(x, y);
        if (hoverEl) {
            const hoverStyles = getComputedStyle(hoverEl);
            main.var(Var.TEXT_FONT_SIZE, hoverStyles.fontSize);
            main.var(Var.TEXT_COLOR, hoverStyles.color);
        }

        if (has("pointer")) {
            //
            main.switch(State.DEFAULT);
            trail.switch(State.POINTER);
            //
        } else if (has("text") || isHoveringText(coord)) {
            //
            main.switch(State.TEXT);
            trail.switch(State.NONE);
            //
        } else {
            //
            main.switch(State.DEFAULT);
            trail.switch(State.DEFAULT);
            //
        }
    }

    bindEvents() {
        const on = document.addEventListener.bind(document);
        on("mousemove", (e) => this.handleMouseMove(e));
    }

    enable = () => document.body.setAttribute("data-cursor-override", "");
    disable = () => document.body.removeAttribute("data-cursor-override");
}

new Cursor();
