import Identifier from './Identifier';

const METADATA_KEY = 'inject';

export const getIdentifiers: (target: any) => Identifier[] =
  (target: any) => Reflect.getMetadata(METADATA_KEY, target) || [];

export const setIdentifiers: (identifiers: Identifier[], target: any) => void =
  (identifiers, target) => Reflect.defineMetadata(METADATA_KEY, identifiers, target);
