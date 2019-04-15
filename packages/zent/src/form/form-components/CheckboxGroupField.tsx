import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormCheckboxGroupFieldProps<T>
  extends IFormComponentCommonProps<T[], Omit<ICheckboxGroupProps, 'value'>> {
  children?: React.ReactNode;
}

export function FormCheckboxGroupField<T>(
  props: IFormCheckboxGroupFieldProps<T> & IFormFieldCommonProps<T[]>
) {
  const [childProps, { error }, ref] = useField<T[], T[], ICheckboxGroupProps>(
    props,
    [],
    noopMapEventToValue
  );
  const {
    className,
    style,
    label,
    renderError = defaultRenderError,
    required,
    helpDesc,
    notice,
    props: otherProps,
    children,
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={className}
      style={style}
      label={label}
      required={required}
      invalid={!!error}
    >
      <CheckboxGroup {...otherProps} {...childProps}>
        {children}
      </CheckboxGroup>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
}
