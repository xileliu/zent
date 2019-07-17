import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormField } from '../Field';

export type IFormWeekPickerFieldProps = IFormComponentProps<
  DatePickers.RangeValue,
  Omit<IWeekPickerProps, 'value'>
>;

export const FormWeekPickerField: React.FunctionComponent<
  IFormWeekPickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue || dateRangeDefaultValueFactory}
    >
      {childProps => <WeekPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
