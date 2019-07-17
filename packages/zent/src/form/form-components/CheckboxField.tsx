import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { IFormFieldModelProps } from '../shared';
import { FormField, IFormFieldProps, IFormFieldChildProps } from '../Field';

export interface IFormCheckboxFieldProps
  extends Omit<IFormFieldProps<boolean>, 'children'> {
  props: Omit<ICheckboxProps, 'checked'>;
}

function renderCheckbox(
  childProps: IFormFieldChildProps<boolean>,
  props: IFormCheckboxFieldProps & IFormFieldModelProps<boolean>
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

export const FormCheckboxField = (
  props: IFormCheckboxFieldProps & IFormFieldModelProps<boolean>
) => {
  return (
    <FormField {...props}>
      {childProps => renderCheckbox(childProps, props)}
    </FormField>
  );
};
