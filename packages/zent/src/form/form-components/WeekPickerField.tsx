import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormField } from '../Field';

export interface IFormWeekPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IWeekPickerProps, 'value'>
  > {}

export const FormWeekPickerField: React.FunctionComponent<
  IFormWeekPickerFieldProps & IFormFieldModelProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IWeekPickerProps
  >(props, [], noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <WeekPicker {...props.props} {...childProps} />
    </FormField>
  );
};
