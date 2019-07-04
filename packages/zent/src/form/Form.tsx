import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import {
  FormProvider,
  useField,
  useFieldArray,
  useFieldSet,
  field,
  set,
  array,
  form,
} from 'formulr';
import memorize from '../utils/memorize-one';
import { FormContext, IFormChild, IZentFormContext } from './context';
import { ZentForm, useForm } from './ZentForm';
import scroll from '../utils/scroll';

function makeContext(
  disabled: boolean,
  children: IFormChild[]
): IZentFormContext {
  return {
    disabled,
    children,
  };
}

export interface IFormProps<T extends object = any>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'dangerouslySetInnerHTML'
  > {
  type: 'horizontal' | 'vertical';
  form: ZentForm<T>;
  disabled?: boolean;
  scrollToError?: boolean;
  onSubmit?: (form: ZentForm<T>, e?: React.SyntheticEvent) => void;
  onSubmitFail?: (e: unknown) => void;
  onSubmitSuccess?: () => void;
}

export class Form<T extends object = any> extends React.Component<
  IFormProps<T>
> {
  static displayName = 'ZentForm';

  static useForm = useForm;
  static useField = useField;
  static useFieldArray = useFieldArray;
  static useFieldSet = useFieldSet;
  static field = field;
  static set = set;
  static array = array;
  static form = form;

  formRef = React.createRef<HTMLFormElement>();

  private readonly children: IFormChild[] = [];
  private getContext = memorize(makeContext);

  private onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.form.submit(e);
  };

  private submit(e?: React.SyntheticEvent) {
    const {
      onSubmit,
      form,
      onSubmitFail,
      onSubmitSuccess,
      scrollToError,
    } = this.props;
    if (!onSubmit) {
      return;
    }
    form.validate();
    if (!form.isValid()) {
      this.scrollToFirstError();
      return;
    }
    Promise.resolve(onSubmit(form, e))
      .then(
        () => {
          onSubmitSuccess && onSubmitSuccess();
        },
        error => {
          onSubmitFail && onSubmitFail(error);
          if (scrollToError) {
            this.scrollToFirstError();
          }
        }
      )
      .then(() => {
        form.submitStop();
      });
  }

  scrollToFirstError() {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      const el = child.getDOMNode();
      if (!el) {
        continue;
      }
      const elementBound = el.getBoundingClientRect();
      const y = elementBound.top + window.pageYOffset;
      const x = elementBound.left + window.pageXOffset;
      scroll(document.body, x, y);
    }
  }

  private submitListener = (e?: React.SyntheticEvent) => {
    this.submit(e);
  };

  private listenEvents() {
    const { form } = this.props;
    form.events.on('submit', this.submitListener);
  }

  private removeEventListeners() {
    const { form } = this.props;
    form.events.off('submit', this.submitListener);
  }

  componentDidMount() {
    this.listenEvents();
  }

  componentDidUpdate(prevProps: IFormProps<T>) {
    if (prevProps.form !== this.props.form) {
      this.removeEventListeners();
      this.listenEvents();
    }
  }

  componentWillMount() {
    this.removeEventListeners();
  }

  render() {
    const {
      children,
      type = 'vertical',
      className,
      form,
      onSubmit,
      disabled = false,
      scrollToError,
      ...props
    } = this.props;
    const ctx = this.getContext(disabled, this.children);
    return (
      <FormContext.Provider value={ctx}>
        <FormProvider value={form.ctx}>
          <form
            ref={this.formRef}
            {...props}
            className={cx(
              'zent-form',
              {
                'zent-form-vertical': type === 'vertical',
                'zent-form-horizontal': type === 'horizontal',
              },
              className
            )}
            onSubmit={this.onSubmit}
          >
            {children}
          </form>
        </FormProvider>
      </FormContext.Provider>
    );
  }
}

// export const Form: React.ForwardRefExoticComponent<
//   IFormProps & React.RefAttributes<HTMLFormElement>
// > &
//   IFormApi = React.forwardRef<HTMLFormElement, IFormProps>(
//   (
//     {
//       children,
//       className,
//       form,
//       type = 'vertical',
//       onSubmit,
//       disabled = false,
//       ...props
//     },
//     ref
//   ) => {
//     const ctx: IZentFormContext = React.useMemo(
//       () => ({
//         disabled,
//         children: form.children,
//       }),
//       [disabled, form.children]
//     );
//     React.useEffect(() => {
//       const $ = form.submit$.subscribe(() => {

//         form.validate();
//         if (form.isValid()) {

//         }
//       })
//       return $.unsubscribe.bind($);
//     }, [form.submit$]);
//     return (
//       <FormContext.Provider value={ctx}>
//         <FormProvider value={form.ctx}>
//           <form
//             ref={ref}
//             {...props}
//             className={cx(
//               'zent-form',
//               {
//                 'zent-form-vertical': type === 'vertical',
//                 'zent-form-horizontal': type === 'horizontal',
//               },
//               className
//             )}
//             onSubmit={onSubmit}
//           >
//             {children}
//           </form>
//         </FormProvider>
//       </FormContext.Provider>
//     );
//   }
// ) as any;
