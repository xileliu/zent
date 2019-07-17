import * as React from 'react';
import { Omit } from 'utility-types';
import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  dateDefaultValueFactory,
  IFormFieldModelProps,
  IFormComponentProps,
  IFormFieldChildProps,
} from '../shared';
import { FormField } from '../Field';

export type IFormDatePickerField = IFormComponentProps<
  DatePickers.Value,
  Omit<IDatePickerProps, 'value'>
>;

function renderDatePicker(
  childProps: IFormFieldChildProps<DatePickers.Value>,
  props: IFormDatePickerField
) {
  return <DatePicker {...props.props} {...childProps} />;
}

export const FormDatePickerField: React.FunctionComponent<
  IFormDatePickerField & IFormFieldModelProps<DatePickers.Value>
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue || dateDefaultValueFactory}
    >
      {childProps => renderDatePicker(childProps, props)}
    </FormField>
  );
};
