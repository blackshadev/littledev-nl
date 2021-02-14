import { State } from "~/types/blog"

export default function getState(prod: boolean): State[] {
    return [State.Published];
    // return prod ? [State.Published] : [State.Published, State.Draft];
}