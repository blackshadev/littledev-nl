

export interface IPost   {
    tags: {tag: string}[];
    slug: string;
    title: string;
    date: string;
    description: string;
}
export interface ITag  {
    key: string;
    title: string;
}
export interface IExpandedPost  {
    tags: ITag[];
    slug: string;
    title: string;
    date: string;
    description: string;
}

export enum State {
    Published = 'Published',
    Draft = 'Draft'
};