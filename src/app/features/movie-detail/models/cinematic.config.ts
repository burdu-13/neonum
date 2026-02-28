export interface HeroDisplayModel {
    title: string;
    tagline: string;
    posterPath: string;
    backdropPath: string;
    rating: number;
    metadata: { text: string }[];
    genres: { id: number; name: string }[];
}
