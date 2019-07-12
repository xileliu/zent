import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormColorPickerFieldProps
  extends IFormComponentCommonProps<string, Omit<IColorPickerProps, 'color'>> {}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps & IFormFieldModelProps<string>
> = props => {
  const [{ value, ...passedProps }, { error }, ref] = useField<
    string,
    string,
    IColorPickerProps
  >(props, '', noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <ColorPicker {...props.props} {...passedProps} color={value} />
    </FormField>
  );
};
