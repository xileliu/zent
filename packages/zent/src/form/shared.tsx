import * as React from 'react';
import {
  FieldModel,
  IValidator,
  IMaybeError,
  BasicModel,
  ValidateOption,
} from 'formulr';
import { useRef, ReactNode, RefObject } from 'react';
import { Omit } from 'utility-types';
import { FormError } from './Error';
import { IFormControlProps } from './Control';
import { useFormContext, IFormChild } from './context';
import { DatePickers } from '../datetimepicker/common/types';

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

// prettier-ignore
export enum ValidateOccasion {
  Change    =     0b0001,
  Blur      =     0b0010,
  Default   =     Change | Blur,
}

export interface IFormFieldPropsBase<Value>
  extends Omit<IFormControlProps, 'required' | 'invalid'> {
  renderError?: IRenderError<Value>;
  helpDesc?: React.ReactNode;
  notice?: React.ReactNode;
  withoutError?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  required?: boolean | string;
  validateOccasion?: ValidateOccasion;
  normalize?: (value: Value, prevValue: Value) => Value;
  format?: (value: Value) => Value;
  getValidateOption?: (source: string) => ValidateOption;
  modelRef?: React.RefObject<FieldModel<Value>>;
}

export type IFormFieldProps<Value> = IFormFieldPropsBase<Value> &
  IFormFieldModelProps<Value> & {
    children(props: IFormFieldChildProps<Value>): React.ReactNode;
  };

export type IFormComponentProps<Value, Props> = IFormFieldPropsBase<Value> & {
  props?: Props;
} & IFormFieldModelProps<Value>;

export function dateDefaultValueFactory(): DatePickers.Value {
  return new Date();
}

export function dateRangeDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export function defaultRenderError<T>(error: IMaybeError<T>) {
  if (error === null) {
    return null;
  }
  return <FormError>{error.message}</FormError>;
}

export function asFormChild<Value>(
  model: BasicModel<Value>,
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
