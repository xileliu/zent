import * as React from 'react';
import {
  IUseField,
  FieldModel,
  useField as superUseField,
  IValidator,
  IMaybeError,
} from 'formulr';
import { useRef, useMemo, ReactNode, RefObject } from 'react';
import { useScrollAnchor } from './scroll';
import { FormError } from './Error';
import { IFormControlProps } from './Control';

export function noopMapEventToValue<T>(e: T) {
  return e;
}

export interface IRenderError<T> {
  (error: IMaybeError<T>): ReactNode;
}

export interface IFormFieldViewDrivenProps<T> {
  name: string;
  defaultValue?: T | (() => T);
  validators?: Array<IValidator<T>>;
}

export interface IFormFieldModelDrivenProps<T> {
  model: FieldModel<T>;
}

export type IFormFieldModelProps<T> =
  | IFormFieldViewDrivenProps<T>
  | IFormFieldModelDrivenProps<T>;

export interface IFormComponentCommonProps<Value, Props>
  extends IFormControlProps {
  renderError?: IRenderError<Value>;
  helpDesc?: ReactNode;
  notice?: ReactNode;
  scrollerRef?: RefObject<HTMLElement>;
  props?: Partial<Props>;
  defaultValue?: Value;
}

export type IFormFieldCommonProps<Value> = IFormFieldModelProps<Value>;

export interface IZentFormChildProps<Value, ChangeEvent> {
  value: Value;
  onChange(e: ChangeEvent): void;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}

export interface IFormFieldSharedProps<Value, Props> {
  props?: Partial<Props>;
  defaultValue: Value | (() => Value);
  name: string;
  model: FieldModel<Value>;
  scrollerRef?: RefObject<HTMLElement>;
  validators?: Array<IValidator<Value>>;
}

export type IZentUseField<Value, Event> = [
  IZentFormChildProps<Value, Event>,
  FieldModel<Value>,
  RefObject<Element | undefined>
];

function mapDefaultValue<Value, Event>(
  props: Partial<IFormFieldSharedProps<Value, Event>>,
  defaultDefaultValue: Value | (() => Value)
): Value {
  const maybeFactory = props.defaultValue || defaultDefaultValue;
  if (typeof maybeFactory === 'function') {
    return (maybeFactory as (() => Value))();
  }
  return maybeFactory;
}

export interface IComponentCommonProps<ChangeEvent> {
  onChange?: (e: ChangeEvent) => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onCompositionStart?: React.CompositionEventHandler;
  onCompositionEnd?: React.CompositionEventHandler;
}

export function useField<
  Value,
  ChangeEvent,
  Props extends IComponentCommonProps<ChangeEvent>
>(
  props: Partial<IFormFieldSharedProps<Value, Props>>,
  defaultDefaultValue: Value | (() => Value),
  mapEventToValue: (e: ChangeEvent) => Value
): IZentUseField<Value, ChangeEvent> {
  let field: IUseField<Value>;
  if (props.name) {
    field = superUseField<Value>(
      props.name,
      mapDefaultValue(props, defaultDefaultValue),
      props.validators
    );
  } else {
    field = superUseField<Value>(props.model as FieldModel<Value>);
  }
  const [childProps, model] = field;
  const propsRef = useRef<Partial<Props>>(props.props || {});
  propsRef.current = props.props || {};
  const anchorRef = useRef<Element>();
  useScrollAnchor(model, anchorRef, props.scrollerRef);
  const proxy = useMemo<IZentFormChildProps<Value, ChangeEvent>>(
    () => ({
      value: childProps.value,
      onChange(e) {
        const value = mapEventToValue(e);
        childProps.onChange(value);
        const { onChange } = propsRef.current;
        onChange && onChange(e);
      },
      onFocus(e) {
        childProps.onFocus(e);
        const { onFocus } = propsRef.current;
        onFocus && onFocus(e);
      },
      onBlur(e) {
        childProps.onBlur(e);
        const { onBlur } = propsRef.current;
        onBlur && onBlur(e);
      },
      onCompositionStart(e) {
        childProps.onCompositionStart(e);
        const { onCompositionStart } = propsRef.current;
        onCompositionStart && onCompositionStart(e);
      },
      onCompositionEnd(e) {
        childProps.onCompositionEnd(e);
        const { onCompositionEnd } = propsRef.current;
        onCompositionEnd && onCompositionEnd(e);
      },
    }),
    [childProps]
  );
  proxy.value = childProps.value;
  return [proxy, model, anchorRef];
}

export function dateDefaultValueFactory() {
  return new Date();
}

export function defaultRenderError<T>(error: IMaybeError<T>) {
  if (error === null) {
    return null;
  }
  return <FormError>{error.message}</FormError>;
}
