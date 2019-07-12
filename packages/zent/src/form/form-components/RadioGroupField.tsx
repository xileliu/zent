import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import {
  useField,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormRadioGroupFieldProps<T>
  extends IFormComponentCommonProps<T, Omit<IRadioGroupProps, 'value'>> {
  children?: React.ReactNode;
}

function mapRadioEvent(e: IRadioEvent) {
  return e.target.value;
}

export function FormRadioGroupField<T>(
  props: IFormRadioGroupFieldProps<T> & IFormFieldModelProps<T>
) {
  const [childProps, { error }, ref] = useField(props, '', mapRadioEvent);
  return (
    <FormField ref={ref} {...props} error={error}>
      <RadioGroup {...props.props} {...childProps}>
        {props.children}
      </RadioGroup>
    </FormField>
  );
}
