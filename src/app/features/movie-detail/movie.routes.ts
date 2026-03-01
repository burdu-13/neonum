import { Routes } from '@angular/router';
import { MovieDetailerContainer } from './container/movie-detailer-container';

export const MOVIE_ROUTES: Routes = [
    {
        path: '',
        component: MovieDetailerContainer,
        title: 'Neonum | Media Tetails',
    },
];
