import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';
import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import { DatePickers } from '../../datetimepicker/common/types';

export interface IFormWeekPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IWeekPickerProps, 'value'>
  > {}

export const FormWeekPickerField: React.FunctionComponent<
  IFormWeekPickerFieldProps & IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IWeekPickerProps
  >(props, [], noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <WeekPicker {...props.props} {...childProps} />
  );
};
