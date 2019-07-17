import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import { FormField } from '../Field';

export type IFormTimePickerField = IFormComponentProps<
  DatePickers.Value,
  Omit<ITimePickerProps, 'value'>
>;

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue || dateDefaultValueFactory}
    >
      {childProps => <TimePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
