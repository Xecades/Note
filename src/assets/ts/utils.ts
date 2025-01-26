import is_mobile from "is-mobile";

/**
 * Check whether the current window width is less than the given width.
 *
 * @param width - The width to compare with
 * @returns Whether the current window width is less than the given width
 */
export const isWidthLessThan = (width: number): boolean => {
    return window.innerWidth < width;
};

/**
 * Check whether the current window width is *small*.
 *
 * @note *Small* means screen width less than 768px.\
 *       This **shouldn't** be used to check whether
 *       the current device is mobile or not.
 *
 * @returns Whether the current device is *small* or not
 */
export const isSmallScreen = (): boolean => isWidthLessThan(768);

/**
 * Check whether the current device is mobile or not.
 *
 * @note This function uses `is-mobile` package to detect,
 *       which is based on UA string and feature detection.
 *
 * @returns Whether the current device is mobile or not
 *
 * @see https://www.npmjs.com/package/is-mobile
 */
export const isMobile = (): boolean => is_mobile({ tablet: true });

/**
 * Load JS from the given URL.
 *
 * @param src - The source URL of the script to load
 * @returns A promise that resolves when the script is loaded
 */
export const loadJS = (src: string): Promise<unknown> =>
    new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);

        script.onload = resolve;
        script.onerror = reject;
    });

export const sleep = (ms: number) =>
    new Promise<void>((res) => setTimeout(res, ms));

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
        history.pushState(null, "", `#${id}`);
    }
};

export const shuffle = <T>(array: T[]): T[] => {
    let i = array.length;

    while (i !== 0) {
        let rnd = Math.floor(Math.random() * i);
        i--;
        [array[i], array[rnd]] = [array[rnd], array[i]];
    }

    return array;
};

/** The screen width of a small screen. */
export const SMALL_SCREEN_WIDTH: number = 768;

/** The minimum screen width required for rightbar to display. */
export const RIGHTBAR_THRESHOLD: number = 1280;

/** The threshold screen width required for leftbar to switch style. */
export const LEFTBAR_THRESHOLD: number = 1260;
