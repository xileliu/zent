import * as React from 'react';
import { Omit } from 'utility-types';
import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormDatePickerField
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IDatePickerProps, 'value'>
  > {}

export const FormDatePickerField: React.FunctionComponent<
  IFormDatePickerField & IFormFieldModelProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IDatePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <DatePicker {...props.props} {...childProps} />
    </FormField>
  );
};
