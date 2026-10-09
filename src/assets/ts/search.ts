import type { FuseResult, RangeTuple } from "fuse.js";
import type { CachedSearchFn, SearchTarget } from "vite-plugin-vue-xecades-note";

/** Search results. */
export type Result = {
    /** Highlight area */
    type?: "title" | "content";

    /** Text before highlight */
    before?: string;

    /** Highlight text */
    mark?: string;

    /** Text after highlight */
    after?: string;
} & SearchTarget;

/** Maximum characters before highlight */
const BEFORE_CNT: number = 10;

let pending: Promise<CachedSearchFn> | undefined;

/**
 * Search and return parsed results.
 *
 * @param query - Search query
 * @returns Parsed search results
 */
export const search = async (query: string): Promise<Result[]> => {
    const range = (i: RangeTuple): number => i[1] - i[0];
    const longest = (indices: readonly RangeTuple[]): RangeTuple =>
        indices.reduce((acc, cur) => (range(cur) > range(acc) ? cur : acc));

    const search_internal = await (pending ??= import("@cache/search")
        .then((module) => module.default)
        .catch((error) => {
            pending = undefined;
            throw error;
        }));

    let searchResults: FuseResult<SearchTarget>[] | Result[] = search_internal(query);
    let results: Result[] = [];

    if (query !== "") {
        for (let res of searchResults as FuseResult<SearchTarget>[]) {
            const match = res.matches?.find((match) => match.indices.length > 0);
            if (!match) {
                results.push(res.item);
                continue;
            }

            // Always highlights the longest match
            let [s, e] = longest(match.indices);

            let type = match.key as "title" | "content";
            let text = match.value as string;

            let before = "",
                mark = "",
                after = "";

            if (type === "content") {
                if (s - BEFORE_CNT > 0) {
                    before = "..." + text.slice(s - BEFORE_CNT, s).trimStart();
                } else {
                    before = text.slice(0, s);
                }

                mark = text.slice(s, e + 1);
                after = text.slice(e + 1, e + 161);
            } else if (type === "title") {
                before = text.slice(0, s);
                mark = text.slice(s, e + 1);
                after = text.slice(e + 1, e + 161);
            }

            results.push({
                ...res.item,
                content: res.item.content.slice(0, 160),
                type,
                before,
                mark,
                after,
            });
        }
    } else {
        // if query is empty, show all posts
        results = (searchResults as Result[]).map((result) => ({
            ...result,
            content: result.content.slice(0, 160),
        }));
    }

    return results;
};
