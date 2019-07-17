import * as React from 'react';
import { Omit } from 'utility-types';

import Input, { IInputProps, IInputClearEvent } from '../../input';
import { FormField, IFormFieldProps, IFormFieldChildProps } from '../Field';

export interface IFormInputFieldProps
  extends Omit<IFormFieldProps<string>, 'children'> {
  props?: Omit<IInputProps, 'value' | 'name' | 'defaultValue'>;
}

function renderInput(
  childProps: IFormFieldChildProps<string>,
  props: IFormInputFieldProps
) {
  const onChange = React.useCallback(
    (
      e:
        | IInputClearEvent
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      childProps.onChange(e.target.value);
    },
    [childProps.onChange]
  );
  return <Input {...props.props} {...childProps} onChange={onChange} />;
}

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps
> = props => {
  return (
    <FormField {...props}>
      {childProps => renderInput(childProps, props)}
    </FormField>
  );
};
