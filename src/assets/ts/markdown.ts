import config from "@cache/config";
import { useRouter } from "vue-router";
import { assertType } from "./types";

import type { NavNode, RouteMeta, URL } from "vite-plugin-vue-xecades-note";

/**
 * Locate the target node in the navigation tree recursively.
 *
 * @param target - The target path
 * @returns The target node
 */
export const locate_node = (target: URL): NavNode | undefined => {
    const nodes: NavNode[] = config.nav;

    // If the target is the / page, return a dummy root node.
    if (target === "/") {
        return { title: "", name: "", link: "/", children: nodes };
    }

    const dfs = (nodes: NavNode[]): NavNode | undefined => {
        for (const node of nodes) {
            if (node.link === target) return node;

            const result = dfs(node.children);
            if (result) return result;
        }
    };

    return dfs(nodes);
};

/**
 * Get the route of a link.
 *
 * @param link - The link of the route
 * @returns The route of the link
 */
export const route_of = (link: URL) => {
    const routes = useRouter().getRoutes();
    return routes.find((route) => route.path === link)!;
};

/**
 * Get the metadata of a link.
 *
 * @param link - The link of the route
 * @returns Meta of the link
 */
export const meta_of = (link: URL | NavNode): RouteMeta => {
    if (typeof link === "string")
        return assertType<RouteMeta>(route_of(link).meta);
    return meta_of(link.link as URL);
};

/**
 * Get the leaf index nodes of a navigation tree.
 *
 * @param root - The root node
 * @returns The leaf index nodes
 */
export const leaf_nodes = (root: NavNode): NavNode[] => {
    // If some children are leaf nodes, return the root node
    if (root.children.some((node) => node.children.length === 0)) {
        return [root];
    }

    return root.children.flatMap(leaf_nodes);
};
