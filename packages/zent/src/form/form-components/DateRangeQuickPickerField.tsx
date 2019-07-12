import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  // DateRangeQuickPickerChangeCallback,
  // DateRangeQuickPickerPresetValue,
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormDateRangeQuickPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IDateRangeQuickPickerProps, 'value'>
  > {}

// interface IFormDateRangeQuickPickerWrapState {
//   chosenDays?: DateRangeQuickPickerPresetValue;
// }

// class DateRangeQuickPickerWrap extends Component<
//   IFormDateRangeQuickPickerWrapProps,
//   IFormDateRangeQuickPickerWrapState
// > {
//   state: IFormDateRangeQuickPickerWrapState = {};

//   render() {
//     const { dateFormat } = this.props;
//     const { chosenDays } = this.state;
//     const passableProps: any = omit(this.props, unknownProps, ['dateFormat']);
//     return (
//       <DateRangeQuickPicker
//         {...passableProps}
//         format={dateFormat}
//         chooseDays={chosenDays}
//         onChange={this.onChange}
//       />
//     );
//   }

//   onChange = (value, chosenDays) => {
//     this.setState({
//       chosenDays,
//     });
//     this.props.onChange(value);
//   };
// =======
function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangeQuickPickerField: React.FunctionComponent<
  IFormDateRangeQuickPickerFieldProps &
    IFormFieldModelProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IDateRangeQuickPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <DateRangeQuickPicker {...props.props} {...childProps} />
    </FormField>
  );
};
