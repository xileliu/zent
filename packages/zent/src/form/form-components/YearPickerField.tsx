import * as React from 'react';
import { Omit } from 'utility-types';
import {
  dateDefaultValueFactory,
  IFormFieldModelProps,
  IFormComponentProps,
} from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormField } from '../Field';

export type IFormYearPickerFieldProps = IFormComponentProps<
  DatePickers.Value,
  Omit<IYearPickerProps, 'value'>
>;

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps & IFormFieldModelProps<DatePickers.Value>
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue || dateDefaultValueFactory}
    >
      {childProps => <YearPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
