import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  renderField,
} from '../shared';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';

export interface IFormTimePickerField
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<ITimePickerProps, 'value'>
  > {}

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    ITimePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <TimePicker {...props.props} {...childProps} />
  );
};
