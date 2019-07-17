import * as React from 'react';
import { IUseField, useField, Validators, BasicModel } from 'formulr';
import {
  defaultRenderError,
  IFormFieldProps,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  asFormChild,
} from './shared';
import { FormControl } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';

export { IFormFieldChildProps, IFormFieldProps } from './shared';

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
  const propsRef = React.useRef(props);
  propsRef.current = props;
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
  const proxiedProps = React.useMemo(
    () => ({
      ...childProps,
      onChange(value: Value) {
        const prevValue = model.value;
        const nextValue = props.normalize
          ? props.normalize(value, prevValue)
          : value;
        childProps.onChange(nextValue);
      },
    }),
    []
  );
  proxiedProps.value = props.format ? props.format(model.value) : model.value;
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
        {children(proxiedProps)}
        {after}
      </div>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {withoutError ? null : renderError(model.error)}
    </FormControl>
  );
}
