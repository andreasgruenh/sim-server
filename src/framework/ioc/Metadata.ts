import DependencyDescriptor from './DependencyDescriptor';
import Identifier from './Identifier';

const METADATA_KEY = 'inject';

export const getDependencyDescriptors: (target: any) => DependencyDescriptor[] =
  (target: any) => Reflect.getMetadata(METADATA_KEY, target) || [];

export const setDependencyDescriptors: (descriptors: DependencyDescriptor[], target: any) => void =
  (descriptors, target) => Reflect.defineMetadata(METADATA_KEY, descriptors, target);
