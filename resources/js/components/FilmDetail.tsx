import React from 'react';
import { useParams } from 'react-router-dom';
import { useFilmByUID } from '../hooks';
import { DetailsContainer } from './Details/DetailsContainer';

export const FilmDetail: React.FC = () => {
    const { uid } = useParams<{ uid: string }>();

    const { data: film, isLoading } = useFilmByUID(uid);

    const loadingText =
        'Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events';

    return (
        <DetailsContainer title={film?.name || ''} isLoading={isLoading} links={film?.characters || []} resource="people">
            {isLoading ? (
                <span className="[animation:blur-breathe_1.2s_ease-in-out_infinite] text-xs whitespace-pre-line blur-[4px]">{loadingText}</span>
            ) : (
                <span className="text-xs whitespace-pre-line">{film?.opening_crawl}</span>
            )}
        </DetailsContainer>
    );
};
