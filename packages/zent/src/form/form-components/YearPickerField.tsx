import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormField } from '../Field';

export interface IFormYearPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IYearPickerProps, 'value'>
  > {}

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps & IFormFieldModelProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IYearPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <YearPicker {...props.props} {...childProps} />
    </FormField>
  );
};
