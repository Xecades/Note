import is_mobile from "is-mobile";

/**
 * Check whether the current window width is less than the given width.
 *
 * @param width - The width to compare with
 * @returns Whether the current window width is less than the given width
 */
export const isWidthLessThan = (width: number) => window.innerWidth < width;

/**
 * Check whether the current window width is *small*.
 *
 * @note *Small* means screen width less than 768px.\
 *       This **shouldn't** be used to check whether
 *       the current device is mobile or not.
 *
 * @returns Whether the current device is *small* or not
 */
export const isSmallScreen = () => isWidthLessThan(768);

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
export const isMobile = () => is_mobile({ tablet: true });

export const sleep = (ms: number) =>
    new Promise<void>((res) => setTimeout(res, ms));

/**
 * Navigate to the element with the given ID.
 *
 * @param id - ID of the element to navigate to
 * @param smooth - Whether to scroll smoothly or not
 * @param pushState - Whether to push state to history or not
 */
export const navigate = (
    id: string,
    smooth: boolean = true,
    pushState: boolean = true
) => {
    const OFFSET = 4 * 16;
    let el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;

        window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
        if (pushState) history.pushState(history.state, "", `#${id}`);
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
export const RIGHTBAR_THRESHOLD: number = 880;

/** The threshold screen width required for leftbar to switch style. */
export const LEFTBAR_THRESHOLD: number = 880;
