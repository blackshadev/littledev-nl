import { State } from "~/types/blog"

export default function getState(env: string): State[] {
    switch (env) {
        case 'development': return [State.Published, State.Draft];
        default: return [State.Published];
    }
}