import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import { FormField } from '../Field';

export interface IFormTimePickerField
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<ITimePickerProps, 'value'>
  > {}

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField & IFormFieldModelProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    ITimePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <TimePicker {...props.props} {...childProps} />
    </FormField>
  );
};
