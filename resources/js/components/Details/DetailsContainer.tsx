import React from 'react';
import { boxStyles } from '../../utils';
import { BackButton, DetailsTitle, LinkList } from './';

type DetailsContainerProps = {
    title: string;
    isLoading: boolean;
    links: string[];
    resource: 'people' | 'movies';
    children: React.ReactNode;
};

export const DetailsContainer: React.FC<DetailsContainerProps> = ({ title, isLoading, links, children, resource }) => {
    return (
        <div className={`mx-auto min-h-[400px] max-w-3xl text-sm ${boxStyles}`}>
            <DetailsTitle title={title} isLoading={isLoading} />
            <div className="my-6 flex min-h-[280px] flex-row gap-6">
                <div className="flex-1">
                    <h2 className="text-md font-bold text-[var(--text-style-3)]">{resource === 'people' ? 'Opening Crawl' : 'Details'}</h2>
                    <div className="mt-2 mb-1 h-[0.5px] w-full bg-[var(--pinkish-grey)]"></div>
                    {children}
                </div>
                <div className="flex-1">
                    <h2 className="text-md font-bold text-[var(--text-style-3)]">{resource === 'people' ? 'Characters' : 'Movies'}</h2>
                    <div className="mt-2 mb-1 h-[0.5px] w-full bg-[var(--pinkish-grey)]"></div>
                    <LinkList links={links} resource={resource} />
                </div>
            </div>
            <BackButton />
        </div>
    );
};
