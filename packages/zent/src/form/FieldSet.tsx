import * as React from 'react';
import {
  IFormFieldModelDrivenProps,
  IRenderError,
  defaultRenderError,
} from './shared';
import { FieldSetModel } from '.';
import { IValidator, useFieldSet, FormProvider, useValue$ } from 'formulr';
import { useScrollAnchor } from './scroll';

export interface IFieldSetProps<T extends object> {
  scrollAnchorRef?: React.RefObject<Element>;
  scrollerRef?: React.RefObject<HTMLElement>;
  validators?: Array<IValidator<T>>;
  children?: React.ReactNode;
  renderError?: IRenderError<T>;
}

export function FieldSet<T extends object>(
  props: IFieldSetProps<T> &
    IFormFieldModelDrivenProps<T> & { model: FieldSetModel<T> }
) {
  const [ctx, model] = useFieldSet(
    (props as any).name || (props as any).model,
    props.validators
  );
  const {
    scrollAnchorRef,
    scrollerRef,
    renderError = defaultRenderError,
  } = props;
  useScrollAnchor(model, scrollAnchorRef, scrollerRef);
  useValue$(model.error$, model.error$.getValue());
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error)}
    </FormProvider>
  );
}
