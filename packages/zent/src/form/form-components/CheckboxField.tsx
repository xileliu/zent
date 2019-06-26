import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import {
  useField,
  IFormComponentCommonProps,
  IFormFieldModelProps,
  renderField,
} from '../shared';

export interface IFormCheckboxFieldProps
  extends IFormComponentCommonProps<boolean, Omit<ICheckboxProps, 'checked'>> {}

function mapCheckboxEventToValue(e: ICheckboxEvent): boolean {
  return e.target.checked;
}

export const FormCheckboxField = (
  props: IFormCheckboxFieldProps & IFormFieldModelProps<boolean>
) => {
  const [{ value, ...passedProps }, { error }, ref] = useField(
    props,
    false,
    mapCheckboxEventToValue
  );
  return renderField(
    props,
    error,
    ref,
    <Checkbox {...props.props} {...passedProps} checked={value} />
  );
};
