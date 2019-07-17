import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps } from '../shared';

export type IFormCheckboxGroupFieldProps<T> = IFormComponentProps<
  T[],
  Omit<ICheckboxGroupProps, 'value'>
> & {
  children?: React.ReactNode;
};

function renderCheckboxGroup<T>(
  childProps: IFormFieldChildProps<T[]>,
  props: IFormCheckboxGroupFieldProps<T>
) {
  return (
    <CheckboxGroup {...props.props} {...childProps}>
      {props.children}
    </CheckboxGroup>
  );
}

export function FormCheckboxGroupField<T>(
  props: IFormCheckboxGroupFieldProps<T>
) {
  return (
    <FormField {...props}>
      {childProps => renderCheckboxGroup(childProps, props)}
    </FormField>
  );
}
