import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import DateRangePicker, {
  IDateRangePickerProps,
} from '../../datetimepicker/DateRangePicker';
import { FormField } from '../Field';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';

export type IFormDateRangePickerFieldProps = IFormComponentProps<
  DatePickers.RangeValue,
  Omit<IDateRangePickerProps, 'value'>
>;

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

function renderDateRangePicker(
  childProps: IFormFieldChildProps<DatePickers.RangeValue>,
  props: IFormDateRangePickerFieldProps
) {
  return <DateRangePicker {...props.props} {...childProps} />;
}

export const FormDateRangePickerField: React.FunctionComponent<
  IFormDateRangePickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue || dateDefaultValueFactory}
    >
      {childProps => renderDateRangePicker(childProps, props)}
    </FormField>
  );
};
