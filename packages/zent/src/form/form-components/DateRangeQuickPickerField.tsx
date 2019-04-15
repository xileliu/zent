import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  // DateRangeQuickPickerChangeCallback,
  // DateRangeQuickPickerPresetValue,
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
    IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IDateRangeQuickPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  const {
    className,
    style,
    label,
    renderError = defaultRenderError,
    required,
    helpDesc,
    notice,
    props: otherProps,
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={className}
      style={style}
      label={label}
      required={required}
      invalid={!!error}
    >
      <DateRangeQuickPicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
