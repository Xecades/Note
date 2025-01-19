export const assertType = <T>(value: any): T => value as unknown as T;

/** rightbar status. */
export enum RIGHTBAR_STATUS {
    /** To display */
    SHOW,

    /** To hide */
    HIDE,
}

/** leftbar status. */
export enum LEFTBAR_STATUS {
    /**
     * Use hover status to determine whether to display.
     *
     * @note This is the default status. Whether to show the leftbar is
     *       determined by mouse events.
     */
    HOVER_TO_SHOW = "HOVER_TO_SHOW",

    /**
     * Only show the search button.
     *
     * @note This status means the category list and the detailed
     *       article list will **NEVER** be shown.
     */
    ONLY_SEARCH_BUTTON = "ONLY_SEARCH_BUTTON",

    /**
     * Show the search button and the category list.
     */
    SHOW_SEARCH_AND_CATEGORY = "SHOW_SEARCH_AND_CATEGORY",
}
