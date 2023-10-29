import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import { ReactElement } from 'react';

type Props = {
    children: string;
    headingOffset?: number;
};

function offsetHeading(
    domNode: DOMNode,
    offset: number
): undefined | ReactElement {
    if (domNode instanceof Element && /^h[1-9]$/.test(domNode.name)) {
        const headingNumber = parseInt(domNode.name.substring(1));
        const Heading = ('h' + (headingNumber + offset)) as 'h1';

        return (
            <Heading {...domNode.attribs}>
                {domToReact(
                    domNode.children
                        .filter((n) => n.type !== 'cdata')
                        .map((n) => n as DOMNode)
                )}
            </Heading>
        );
    }

    return undefined;
}

export default function WYSIWYG({ children, headingOffset }: Props) {
    const Content = parse(children, {
        replace(domNode) {
            return offsetHeading(domNode, headingOffset ?? 0);
        },
    });

    return <div className="wysiwyg">{Content}</div>;
}
