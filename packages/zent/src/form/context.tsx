import { createContext, useContext } from 'react';

export interface IFormChild {
  isValid(): boolean;
  scrollTo(): void;
}

export interface IZentFormContext {
  children: IFormChild[];
  scrollerRef?: React.RefObject<HTMLElement>;
}

export const FormContext = createContext<IZentFormContext | null>(null);

FormContext.displayName = 'ZentFormContext';

export function useFormContext(): IZentFormContext {
  const ctx = useContext(FormContext);
  if (ctx === null) {
    throw new Error('Component must be used under Form');
  }
  return ctx;
}
