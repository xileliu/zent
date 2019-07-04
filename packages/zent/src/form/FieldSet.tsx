import * as React from 'react';
import {
  IFormFieldModelDrivenProps,
  IRenderError,
  defaultRenderError,
  asFormChild,
} from './shared';
import { FieldSetModel } from '.';
import {
  IValidator,
  useFieldSet,
  FormProvider,
  useValue$,
  BasicModel,
  IMaybeError,
} from 'formulr';

export interface IFieldSetProps<T extends object> {
  scrollAnchorRef?: React.RefObject<Element>;
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
  const { scrollAnchorRef, renderError = defaultRenderError } = props;
  asFormChild(model as BasicModel<unknown>, scrollAnchorRef);
  useValue$(model.error$, model.error$.getValue());
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error as IMaybeError<any>)}
    </FormProvider>
  );
}
