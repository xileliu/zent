import * as React from 'react';
import { FieldModel, IValidator, IMaybeError, BasicModel } from 'formulr';
import { useRef, ReactNode, RefObject } from 'react';
import { FormError } from './Error';
import { IFormControlProps } from './Control';
import { useFormContext, IFormChild } from './context';

export interface IRenderError<T> {
  (error: IMaybeError<T>): ReactNode;
}

export interface IFormFieldViewDrivenProps<T> {
  name: string;
  defaultValue: T | (() => T);
  validators?: Array<IValidator<T>>;
}

export interface IFormFieldModelDrivenProps<T> {
  model: FieldModel<T>;
}

export type IFormFieldModelProps<T> =
  | IFormFieldViewDrivenProps<T>
  | IFormFieldModelDrivenProps<T>;

export interface IFormFieldPropsBase<Value>
  extends Omit<IFormControlProps, 'required'> {
  renderError?: IRenderError<Value>;
  helpDesc?: React.ReactNode;
  notice?: React.ReactNode;
  withoutError?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  required?: boolean | string;
  children(props: IFormFieldChildProps<Value>): React.ReactNode;
}

export type IFormFieldProps<Value> = IFormFieldPropsBase<Value> &
  IFormFieldModelProps<Value>;

export type IFormComponentProps<Value, Props> = Omit<
  IFormFieldPropsBase<Value>,
  'children'
> & {
  props?: Props;
} & IFormFieldModelProps<Value>;

export function dateDefaultValueFactory() {
  return new Date();
}

export function defaultRenderError<T>(error: IMaybeError<T>) {
  if (error === null) {
    return null;
  }
  return <FormError>{error.message}</FormError>;
}

export function asFormChild(
  model: BasicModel<unknown>,
  scrollAnchorRef?: RefObject<Element | null | undefined>
) {
  const ctx = useFormContext();
  const posRef = useRef(ctx.children.length);
  React.useEffect(() => {
    const formChild: IFormChild = {
      valid() {
        return model.valid();
      },
      getDOMNode() {
        return scrollAnchorRef && scrollAnchorRef.current;
      },
    };
    if (posRef.current < ctx.children.length) {
      ctx.children.splice(posRef.current, 0, formChild);
    } else {
      posRef.current = ctx.children.length;
      ctx.children.push(formChild);
    }
    return () => {
      const pos = ctx.children.indexOf(formChild);
      if (pos !== -1) {
        posRef.current = pos;
        ctx.children.splice(pos, 1);
      }
    };
  }, [model, scrollAnchorRef, ctx]);
}

export interface IFormFieldChildProps<Value> {
  value: Value;
  onChange(e: Value): void;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}
