export default function stripTags(content: string): string {
    return content.replace(/(<([^>]+)>)/gi, '');
}
