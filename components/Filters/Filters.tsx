import { ReactNode } from 'react';
import classNames from '../../helpers/classNames';

type Props = {
    values: { value: string; count: number }[];
    onSelect(value: string | undefined): void;
    selectedValue?: string;
};
export default function Filters({
    values,
    selectedValue,
    onSelect,
}: Props): ReactNode {
    return (
        <>
            {values.map((value) => (
                <button
                    type="button"
                    onClick={() =>
                        onSelect(
                            selectedValue === value.value
                                ? undefined
                                : value.value
                        )
                    }
                    className={classNames(
                        'px-4 py-2 m-2 rounded border-primary border',
                        selectedValue === value.value
                            ? 'bg-primary text-white dark:text-black dark:bg-dark-primary'
                            : 'text-primary dark:border-dark-primary dark:text-dark-primary'
                    )}
                    key={value.value}
                >
                    {value.value} ({value.count})
                </button>
            ))}
        </>
    );
}
