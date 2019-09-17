import { useMemo, useReducer } from 'react';
import * as Events from 'eventemitter3';
import {
  IForm,
  ValidateOption,
  $FieldSetValue,
  useForm as superUseForm,
  FormStrategy,
  FormBuilder,
  BasicModel,
} from 'formulr';
import { BasicBuilder } from 'formulr/esm/builders/basic';

export interface IFormEventMap {
  submit: React.SyntheticEvent | undefined;
  'submit-start': void;
  'submit-stop': void;
}

export type IFormAction =
  | {
      type: 'SUBMIT_START';
    }
  | {
      type: 'SUBMIT_STOP';
    };

export interface IFormState {
  submitting: boolean;
}

const initialState: IFormState = {
  submitting: false,
};

function formReducer(state: IFormState, action: IFormAction): IFormState {
  switch (action.type) {
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_STOP':
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}

export interface IFormEvents {
  emit<Type extends keyof IFormEventMap>(
    name: Type,
    arg: IFormEventMap[Type]
  ): void;
  on<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  off<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  once<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  removeAllListeners<Type extends keyof IFormEventMap>(name: Type): void;
}

export class ZentForm<T extends Record<string, BasicModel<unknown>>>
  implements IForm<T> {
  events: IFormEvents = new Events();

  /** @internal */
  constructor(
    readonly inner: IForm<T>,
    /** @internal */
    public state: IFormState,
    /** @internal */
    private dispatch: (action: IFormAction) => void
  ) {}

  get isSubmitting() {
    return this.state.submitting;
  }

  get ctx() {
    return this.inner.ctx;
  }

  get model() {
    return this.inner.model;
  }

  /**
   * ```jsx
   *  <button onClick={form.submit}>submit</button>
   * ```
   */
  submit = (e?: React.SyntheticEvent) => {
    this.events.emit('submit', e);
  };

  validate(option: ValidateOption = ValidateOption.Default): Promise<any> {
    return this.inner.model.validate(option);
  }

  isValid() {
    return this.inner.model.valid();
  }

  isValidating() {
    return this.inner.model.isValidating$.getValue();
  }

  getValue() {
    return this.inner.model.getRawValue();
  }

  initialize(value: $FieldSetValue<T>) {
    this.inner.model.initialize(value);
  }

  patchValue(value: $FieldSetValue<T>) {
    this.inner.model.patchValue(value);
  }

  resetValue() {
    this.inner.model.reset();
  }

  submitStart() {
    this.dispatch({
      type: 'SUBMIT_START',
    });
  }

  submitStop() {
    this.dispatch({
      type: 'SUBMIT_STOP',
    });
  }
}

export function useForm<
  T extends Record<string, BasicBuilder<unknown, BasicModel<unknown>>>
>(arg: FormStrategy.View | FormBuilder<T>) {
  const inner = superUseForm(arg);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const form = useMemo(() => new ZentForm(inner, state, dispatch), [inner]);
  form.state = state;
  return form;
}
