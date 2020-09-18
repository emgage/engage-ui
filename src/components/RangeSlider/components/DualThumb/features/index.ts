import { createContext } from 'react';

export interface FeaturesConfig {
  [key: string]: boolean;
}

export interface Features {
  newDesignLanguage: boolean;
  [key: string]: boolean;
}

export const FeaturesContext = createContext<Features | undefined>(undefined);
