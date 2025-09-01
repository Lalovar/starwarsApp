import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterByUID } from '../hooks';
import { DetailsContainer } from './Details/DetailsContainer';

type DetailsLoadingtextProps = {
    text?: string;
    isLoading: boolean;
};

const DetailsLoadingtext: React.FC<DetailsLoadingtextProps> = ({ text, isLoading }) => {
    if (isLoading) {
        return <p className="[animation:blur-breathe_1.2s_ease-in-out_infinite] text-xs blur-[4px]">{text ?? ''}</p>;
    }

    return <p>{text ?? ''}</p>;
};
export const CharacterDetail: React.FC = () => {
    const { uid } = useParams<{ uid: string }>();

    const { data: character, isLoading } = useCharacterByUID(uid);

    return (
        <DetailsContainer title={character?.name || ''} isLoading={isLoading} links={character?.films || []} resource="movies">
            <div className="text-xs">
                <DetailsLoadingtext isLoading={isLoading} text={`Birth Year: ${character?.birth_year}`} />
                <DetailsLoadingtext isLoading={isLoading} text={`Gender: ${character?.gender}`} />
                <DetailsLoadingtext isLoading={isLoading} text={`Eye Color: ${character?.eye_color}`} />
                <DetailsLoadingtext isLoading={isLoading} text={`Hair Color: ${character?.hair_color}`} />
                <DetailsLoadingtext isLoading={isLoading} text={`Height: ${character?.height}`} />
                <DetailsLoadingtext isLoading={isLoading} text={`Mass: ${character?.mass}`} />
            </div>
        </DetailsContainer>
    );
};
