import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { RouterLink } from "vue-router";
import { LEFTBAR_STATUS } from "./types";
import {
    isMobile,
    isWidthLessThan,
    LEFTBAR_THRESHOLD,
    SMALL_SCREEN_WIDTH,
} from "./utils";

import type { NavNode } from "vite-plugin-vue-xecades-note";
import type { JSX } from "vue/jsx-runtime";

/**
 * Determine leftbar status.
 */
export const get_leftbar_status = (): LEFTBAR_STATUS => {
    if (isMobile()) {
        return LEFTBAR_STATUS.SHOW_SEARCH_AND_CATEGORY;
    } else {
        return isWidthLessThan(SMALL_SCREEN_WIDTH)
            ? LEFTBAR_STATUS.SHOW_SEARCH_AND_CATEGORY
            : isWidthLessThan(LEFTBAR_THRESHOLD)
            ? LEFTBAR_STATUS.ONLY_SEARCH_BUTTON
            : LEFTBAR_STATUS.HOVER_TO_SHOW;
    }
};

/**
 * Render the leftbar navigation.
 *
 * @param node - The nav node to render
 * @param is_root - Whether the node is the root node. Default is `false`
 * @returns Rendered nav node
 */
export const render_list = (
    node: NavNode,
    is_root: boolean = false
): JSX.Element => {
    let { title, children, link } = node;

    const text_comp: JSX.Element = <span class="text">{title}</span>;
    const icon_comp: JSX.Element = (
        <span class="sign">
            <FontAwesomeIcon class="icon" icon="fa-solid fa-caret-right" />
        </span>
    );
    const title_comp: JSX.Element = (
        <RouterLink to={link} class="title">
            {icon_comp}
            {text_comp}
        </RouterLink>
    );

    // If it is a leaf node, mark and return
    if (children.length === 0) {
        (title_comp.props as any).leaf = true;
        return title_comp;
    }

    let child_comps: JSX.Element[] = children.map((child) => (
        <li class="child">{render_list(child)}</li>
    ));
    let children_comp: JSX.Element = <ul class="children">{child_comps}</ul>;

    // If it is the root node, no need to add a title
    if (is_root) {
        return children_comp;
    }

    return <>{[title_comp, children_comp]}</>;
};
