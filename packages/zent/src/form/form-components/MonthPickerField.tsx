import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormMonthPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IMonthPickerProps, 'value'>
  > {}

export const FormMonthPickerField: React.FunctionComponent<
  IFormMonthPickerFieldProps & IFormFieldModelProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IMonthPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <MonthPicker {...props.props} {...childProps} />
    </FormField>
  );
};
