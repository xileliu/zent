import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { IFormComponentProps } from '../shared';
import { FormField, IFormFieldChildProps } from '../Field';

export type IFormCheckboxFieldProps = IFormComponentProps<
  boolean,
  Omit<ICheckboxProps, 'checked'>
>;

function renderCheckbox(
  childProps: IFormFieldChildProps<boolean>,
  props: IFormCheckboxFieldProps
) {
  const { value, ...passedProps } = childProps;
  const onChange = React.useCallback(
    (e: ICheckboxEvent) => {
      childProps.onChange(e.target.checked);
    },
    [childProps.onChange]
  );
  return (
    <Checkbox
      {...props.props}
      {...passedProps}
      checked={value}
      onChange={onChange}
    />
  );
}

export const FormCheckboxField = (props: IFormCheckboxFieldProps) => {
  return (
    <FormField {...props} defaultValue={props.defaultValue || false}>
      {childProps => renderCheckbox(childProps, props)}
    </FormField>
  );
};
