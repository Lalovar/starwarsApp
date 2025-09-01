import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultipleResources } from '../../hooks';

interface LinkListProps {
    links: string[];
    resource: 'people' | 'movies';
}

export const LinkList: React.FC<LinkListProps> = ({ links, resource }) => {
    const navigate = useNavigate();
    const { items, isLoading } = useMultipleResources(links);

    if (links.length === 0) return null;

    if (isLoading) {
        return (
            <span aria-busy="true" aria-live="polite">
                {links.map((_, idx) => (
                    <React.Fragment key={`placeholder-${idx}`}>
                        <span className="[animation:blur-breathe_1.2s_ease-in-out_infinite] text-[var(--emerald)] blur-[4px] text-xs">
                            {idx % 2 === 0 ? 'Loading...' : 'Loading all the links ...'}
                        </span>
                    </React.Fragment>
                ))}
            </span>
        );
    }

    if (items.length === 0) return null;

    return (
        <span>
            {items.map((item, idx) => (
                <React.Fragment key={item.uid}>
                    <span
                        onClick={() => {
                            if (resource === 'people') {
                                navigate(`/character/${encodeURIComponent(item.uid)}`);
                            } else {
                                navigate(`/film/${encodeURIComponent(item.uid)}`);
                            }
                        }}
                        className="cursor-pointer text-[var(--emerald)] hover:underline text-xs"
                    >
                        {item.value}
                    </span>
                    {idx < items.length - 1 && ', '}
                </React.Fragment>
            ))}
        </span>
    );
};
