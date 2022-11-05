export default function classNames(
    ...names: (undefined | false | string)[]
): string {
    return names.filter(Boolean).join(' ');
}
