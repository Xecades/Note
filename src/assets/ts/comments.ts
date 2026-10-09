interface Twikoo {
    init(options: { envId: string; el: HTMLElement; path: string }): Promise<void>;
}
let pending: Promise<Twikoo> | undefined;
/** Load the library once; each keyed article initializes its own DOM target. */
export function loadComments(): Promise<Twikoo> {
    return (pending ??= new Promise<Twikoo>((resolve, reject) => {
        const existing = (window as unknown as { twikoo?: Twikoo }).twikoo;
        if (typeof existing?.init === "function") return resolve(existing);
        const script = document.createElement("script");
        script.src =
            "https://registry.npmmirror.com/twikoo/1.6.41/files/dist/twikoo.all.min.js";
        script.onload = () => {
            const twikoo = (window as unknown as { twikoo?: Twikoo }).twikoo;
            if (typeof twikoo?.init === "function") resolve(twikoo);
            else {
                pending = undefined;
                script.remove();
                reject(new Error("Twikoo did not initialize"));
            }
        };
        script.onerror = () => {
            pending = undefined;
            script.remove();
            reject(new Error("Twikoo script failed to load"));
        };
        document.head.append(script);
    }));
}
