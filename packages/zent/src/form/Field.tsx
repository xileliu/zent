import * as React from 'react';
import {
  unstable_IdlePriority as IdlePriority,
  unstable_scheduleCallback as scheduleCallback,
  unstable_cancelCallback as cancelCallback,
  CallbackNode,
} from 'scheduler';
import { useField, Validators, FieldModel, ValidateOption } from 'formulr';
import {
  defaultRenderError,
  IFormFieldProps,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  asFormChild,
  ValidateOccasion,
} from './shared';
import { FormControl } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';

export { IFormFieldChildProps, IFormFieldProps } from './shared';

function defaultGetValidateOption() {
  return ValidateOption.Default;
}

export function FormField<Value>(props: IFormFieldProps<Value>) {
  let model: FieldModel<Value>;
  if ((props as any).name) {
    const {
      name,
      defaultValue,
      validators = [],
      destroyOnUnmount,
    } = props as IFormFieldViewDrivenProps<Value>;
    if (
      props.required &&
      !validators.some(it => it.$$id === Validators.REQUIRED)
    ) {
      validators.unshift(Validators.required(props.required as string));
    }
    model = useField<Value>(name, defaultValue, validators);
    model.destroyOnUnmount = Boolean(destroyOnUnmount);
  } else {
    model = useField<Value>((props as IFormFieldModelDrivenProps<Value>).model);
  }
  React.useImperativeHandle(props.modelRef, () => model, [model]);
  const propsRef = React.useRef(props);
  propsRef.current = props;
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
    validateOccasion = ValidateOccasion.Default,
    getValidateOption = defaultGetValidateOption,
    normalize,
  } = props;
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  asFormChild(model, anchorRef);
  const taskRef = React.useRef<CallbackNode | null>(null);
  const childProps = React.useMemo(
    () => ({
      value: model.value,
      onChange(value: Value) {
        const prevValue = model.value;
        const nextValue = normalize ? normalize(value, prevValue) : value;
        model.value = nextValue;
        if (model.isCompositing) {
          return;
        }
        if (validateOccasion & ValidateOccasion.Change) {
          if (!taskRef.current) {
            taskRef.current = scheduleCallback(IdlePriority, () => {
              model.validate(getValidateOption('change'));
            });
          } else {
            cancelCallback(taskRef.current);
            taskRef.current = null;
          }
        }
        model._touched = true;
      },
      onCompositionStart() {
        model.isCompositing = true;
      },
      onCompositionEnd() {
        model.isCompositing = false;
      },
      onBlur() {
        if (validateOccasion & ValidateOccasion.Blur) {
          model.validate(getValidateOption('blur'));
        }
      },
      onFocus() {
        model._touched = true;
      },
    }),
    [model, normalize, getValidateOption, validateOccasion]
  );
  React.useEffect(
    () => () => {
      if (taskRef.current) {
        cancelCallback(taskRef.current);
        taskRef.current = null;
      }
    },
    []
  );
  childProps.value = props.format ? props.format(model.value) : model.value;
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
