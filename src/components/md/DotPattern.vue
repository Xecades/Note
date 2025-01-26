<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { VNodeRef } from "vue";

const GAP = 16;
const cvs: VNodeRef = ref(null);

let cursor = { x: 0, y: 0 };

class Paricle {
    private angle = 0;
    private length = 0;

    constructor(
        private cx: number,
        private cy: number,
        private ctx: CanvasRenderingContext2D
    ) {}

    draw() {
        const { cx, cy } = this;

        if (this.length >= (1 / 1.5) * Math.SQRT2) {
            const dx = Math.cos(this.angle) * this.length;
            const dy = Math.sin(this.angle) * this.length;

            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy);
            this.ctx.lineTo(cx + dx, cy + dy);
            this.ctx.lineWidth = 1.5;
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = "#383838";
            this.ctx.stroke();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    update() {
        const dx = cursor.x - this.cx;
        const dy = cursor.y - this.cy;

        const angle = Math.atan2(dy, dx) + (90 * Math.PI) / 360;

        // Rayleigh distribution
        const r = Math.sqrt(dx * dx + dy * dy);
        const nr = r / 100; // Normalized r
        const a = 0.5; // Standard deviation
        const length = ((5 * nr) / (a * a)) * Math.exp((-nr * nr) / 2 / a / a);

        this.angle = angle;
        this.length = length;
    }
}

const getCtx = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    return ctx;
};

const particles: Paricle[] = [];
let render: () => void;

onUnmounted(() => {
    document.onmousemove = null;
    render = () => {};
});

onMounted(() => {
    const el: HTMLCanvasElement = cvs.value;
    const width = el.clientWidth;
    const height = el.clientHeight;
    const ctx = getCtx(el);

    for (let x = 0; x < width; x += GAP)
        for (let y = 0; y < height; y += GAP)
            particles.push(new Paricle(x, y, ctx));

    document.onmousemove = (e) => {
        const { clientX, clientY } = e;
        const { left, top } = el.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        cursor = { x, y };
    };

    (render = () => {
        ctx.clearRect(0, 0, width, height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(render);
    })();
});
</script>

<template>
    <div class="dot-pattern">
        <div class="content">
            <slot />
        </div>
        <canvas class="pattern" ref="cvs" />
    </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

#test
    border: 1px solid cyan;

.dot-pattern
    dual(--dot-padding-y, 7rem, 5rem);
    scheme(--invert, 0, 1);

    width: 100%;
    position: relative;
    padding: var(--dot-padding-y) 0;
    margin: -1rem 0;

    .content
        text-align: center;

    .pattern
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 20%;
        filter: invert(var(--invert));
        mask-image: radial-gradient(white, transparent 90%);
</style>
