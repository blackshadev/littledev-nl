import { ITag , IPost, IExpandedPost } from "~/types/blog";

type TagLookup = { [key: string]: ITag};
function makeTagLookup(tags: ITag[]): TagLookup {
    
    const tagsByKey: TagLookup = {};
    for(const tag of tags) {
        tagsByKey[tag.key] = tag;
    }
    return tagsByKey;
}

export function getTagKeysFromPosts(posts: IPost[]): string[] {
    return posts.map(p => p.tags.map(t => t.tag)).flat();
}

export function extendTagsForPosts(posts: IPost[], tags: ITag[]): IExpandedPost[] {
    const lookup = makeTagLookup(tags);    

    const expandedPosts = posts.map((post) => {
        const postTags = post.tags.map(t => lookup[t.tag]).filter(t => !!t);
        return mergeTagsInPost(post, postTags);
    })

    return expandedPosts;
}

export function extendTagsForPost(post: IPost, tags: ITag[]): IExpandedPost {
    const lookup = makeTagLookup(tags);

    const postTags = post.tags.map(t => lookup[t.tag]).filter(t => !!t);
    return mergeTagsInPost(post, postTags);
}

function mergeTagsInPost(post: IPost, postTags: ITag[]): IExpandedPost {
    return Object.assign({}, post, { tags: postTags });
}