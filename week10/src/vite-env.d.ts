/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string;
  readonly VITE_MOVIE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
