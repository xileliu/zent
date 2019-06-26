import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

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
  return renderField(
    props,
    error,
    ref,
    <CheckboxGroup {...props.props} {...childProps}>
      {props.children}
    </CheckboxGroup>
  );
}
