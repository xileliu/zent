import * as React from 'react';
import { IUseField, useField, Validators, BasicModel } from 'formulr';
import { Omit } from 'utility-types';
import {
  defaultRenderError,
  IRenderError,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  asFormChild,
} from './shared';
import { FormControl, IFormControlProps } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';

export interface IFormFieldChildProps<Value> {
  value: Value;
  onChange(e: Value): void;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}

export interface IFormFieldProps<Value>
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

export function FormField<Value>(props: IFormFieldProps<Value>) {
  let field: IUseField<Value>;
  if ((props as any).name) {
    const {
      name,
      defaultValue,
      validators = [],
    } = (props as unknown) as IFormFieldViewDrivenProps<Value>;
    if (
      props.required &&
      !validators.some(it => it.$$id === Validators.REQUIRED)
    ) {
      validators.unshift(Validators.required(props.required as string));
    }
    field = useField<Value>(name, defaultValue as any, validators);
  } else {
    field = useField<Value>(
      ((props as unknown) as IFormFieldModelDrivenProps<Value>).model
    );
  }
  const [childProps, model] = field;
  const {
    className,
    style,
    label,
    required,
    before,
    after,
    notice,
    helpDesc,
    withoutError,
    renderError = defaultRenderError,
    children,
  } = props;
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  asFormChild(model as BasicModel<unknown>, anchorRef);
  return (
    <FormControl
      ref={anchorRef}
      className={className}
      style={style}
      label={label}
      required={!!required}
      invalid={!!model.error}
    >
      <div className="zent-form-control-content-inner">
        {before}
        {children(childProps)}
        {after}
      </div>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {withoutError ? null : renderError(model.error)}
    </FormControl>
  );
}
