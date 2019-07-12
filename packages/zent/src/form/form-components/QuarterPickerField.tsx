import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormQuarterPickerFieldProps
  extends IFormComponentCommonProps<
    QuarterPickerValue,
    Omit<IQuarterPickerProps, 'value'>
  > {}

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps & IFormFieldModelProps<QuarterPickerValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    QuarterPickerValue,
    QuarterPickerValue,
    IQuarterPickerProps
  >(props, [], noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <QuarterPicker {...props.props} {...childProps} />
    </FormField>
  );
};
