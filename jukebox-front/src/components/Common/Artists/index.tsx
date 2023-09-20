import { ArtistType } from "../../../hooks/Socket.io/types";

export function ArtistsDisplay({ artists, style }: { artists: ArtistType[], style?: { [key: string]: any }}) {
    return (
        <div style={{ overflowX: 'hidden',textOverflow: 'ellipsis', ...style }} className='artists-list'>
            { artists.map((artist, index) =>
                <span style={{whiteSpace: 'nowrap'}} key={artist.name} className='artist'>{ artist.name }{(artists.length > 1 && index < artists.length - 1) ? ', ' : null}</span>
            )}
        </div>
    )
}