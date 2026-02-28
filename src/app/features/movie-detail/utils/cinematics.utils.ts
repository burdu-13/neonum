import { CinematicDetail, TVDetails } from '../../../shared/models/movie.model';

export function isTVShow(asset: CinematicDetail): asset is TVDetails {
    return 'number_of_seasons' in asset;
}
