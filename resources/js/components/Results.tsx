import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResponse } from '../types';
import { boxStyles } from '../utils';

interface ResultsProps {
    apiResponse: SearchResponse[] | [];
    loading: boolean;
    error: string | null;
    resource: 'people' | 'movies';
}

const ResultsMessage = ({ text }: { text: string }) => {
    return (
        <span className="flex h-full items-center justify-center pb-16 text-center text-xs font-bold whitespace-pre-line text-[var(--pinkish-grey)]">
            {text}
        </span>
    );
};

export const Results: React.FC<ResultsProps> = ({ apiResponse, loading, error, resource }) => {
    return (
        <div className={`min-h-[400px] w-full max-w-lg text-sm ${boxStyles}`}>
            <Item isHeader={true} />
            {loading && <ResultsMessage text="Searching..." />}
            {error && <div>{error}</div>}
            {!loading && !error && apiResponse?.length === 0 && (
                <ResultsMessage text={`There are zero matches. \r\n Use the form to search for People or Movies.`} />
            )}
            {!loading &&
                !error &&
                apiResponse?.length > 0 &&
                apiResponse.map((item: SearchResponse) => <Item key={item.uid} data={item} resource={resource} />)}
        </div>
    );
};

const Item = (props: { isHeader?: boolean; data?: SearchResponse; resource?: 'people' | 'movies' }) => {
    const navigate = useNavigate();

    const handleSeeDetails = () => {
        if (!props.data) return;

        const item = props.data as SearchResponse;
        const isCharacter = props.resource === 'people';

        if (isCharacter) {
            navigate(`/character/${encodeURIComponent(item.uid)}`);
        } else {
            navigate(`/film/${encodeURIComponent(item.uid)}`);
        }
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <span className={'font-bold text-' + (props.isHeader ? 'xl mb-3' : 'lg')}>{props.isHeader ? 'Results' : props.data?.name}</span>
                {!props.isHeader && (
                    <button
                        onClick={handleSeeDetails}
                        className="my-2.5 w-auto rounded-xl border-solid border-[var(--green-teal)] bg-[var(--green-teal)] px-4 py-1.5 text-sm font-bold text-[#fff]"
                    >
                        SEE DETAILS
                    </button>
                )}
            </div>
            <div className="h-[0.5px] w-full bg-[var(--pinkish-grey)]"></div>
        </>
    );
};
