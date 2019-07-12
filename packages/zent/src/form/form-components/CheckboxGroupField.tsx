import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormCheckboxGroupFieldProps<T>
  extends IFormComponentCommonProps<T[], Omit<ICheckboxGroupProps, 'value'>> {
  children?: React.ReactNode;
}

export function FormCheckboxGroupField<T>(
  props: IFormCheckboxGroupFieldProps<T> & IFormFieldModelProps<T[]>
) {
  const [childProps, { error }, ref] = useField<T[], T[], ICheckboxGroupProps>(
    props,
    [],
    noopMapEventToValue
  );
  return (
    <FormField {...props} ref={ref} error={error}>
      <CheckboxGroup {...props.props} {...childProps}>
        {props.children}
      </CheckboxGroup>
    </FormField>
  );
}
