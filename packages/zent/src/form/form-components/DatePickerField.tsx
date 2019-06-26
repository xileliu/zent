import * as React from 'react';
import { Omit } from 'utility-types';
import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormDatePickerField
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IDatePickerProps, 'value'>
  > {}

export const FormDatePickerField: React.FunctionComponent<
  IFormDatePickerField & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IDatePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <DatePicker {...props.props} {...childProps} />
  );
};
