export interface Ville {
    id?: number;
    nom: string;
    code: string;
    codeDepartement: string;
    siren: string;
    codeEpci: string;
    codeRegion: string;
    codesPostaux: string[];
    population: number;
}

// Interface pour l'API
export interface VilleAPI {
    nom: string;
    code: string;
    codeDepartement: string;
    siren: string;
    codeEpci: string;
    codeRegion: string;
    codesPostaux: string[];
    population: number;
}