import { useState, SyntheticEvent, ReactNode } from 'react';
import type { ISelectBaseOptions } from '../../components/selectBase/SelectBase';

export interface IValidator {
  validate: (value: string) => boolean;
  message: string;
}

export interface IFormItemConfig {
  name: string;
  value: string;
  label: string;
  render: RenderFormItemMethod;
  placeholder?: string;
  required?: boolean;
  requiredErrorMessage?: string;
  validationError?: string;
  valid?: boolean;
  disabled?: boolean;
  options?: ISelectBaseOptions[];
  validation?: IValidator[];
  touched?: boolean;
  update?: UpdateFormItemMethod;
}

export interface IFormConfig {
  [key: string]: IFormItemConfig;
}

export interface IFormValues {
  [key: string]: string;
}

type RenderFormItemMethod = (formItemConfig: IFormItemConfig, callback: (event: SyntheticEvent) => void) => ReactNode;

type UpdateFormItemMethod = (formConfig: IFormConfig, value: string) => IFormConfig;

interface IValidationResult {
  valid: boolean;
  validationError: string;
}

export type Form = { [key: string]: { render: () => ReactNode } };

const getValidationResult = (valid: boolean, validationError: string = ''): IValidationResult => ({
  valid,
  validationError,
});

const validate = (value: string, formConfigField: IFormItemConfig): IValidationResult => {
  if (formConfigField.disabled) {
    return getValidationResult(true);
  }

  if (!formConfigField.required && !value.length) {
    return getValidationResult(true);
  }

  if (formConfigField.required && !value.length) {
    return getValidationResult(false, formConfigField.requiredErrorMessage || 'Field required');
  }

  const failedValidator = (formConfigField.validation || []).find((validator) => !validator.validate(value));

  if (failedValidator) {
    return getValidationResult(false, failedValidator.message);
  }

  return getValidationResult(true);
};

export default function useForm(
  formFields: IFormConfig,
): [Form, () => IFormValues, () => boolean, (formConfig: any) => void] {
  const [formConfig, setFormConfig] = useState(formFields);
  const handleInputEvent = (event: SyntheticEvent): void => {
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
    const update: UpdateFormItemMethod = formConfig[name].update || ((formConfig: IFormConfig) => formConfig);
    const { valid, validationError }: IValidationResult = validate(value, formConfig[name]);

    setFormConfig(
      update(
        {
          ...formConfig,
          [name]: {
            ...formConfig[name],
            value,
            valid,
            validationError,
            touched: true,
          },
        },
        value,
      ),
    );
  };

  const form: Form = Object.keys(formConfig).reduce((result: Form, formItemKey: string) => {
    const formItemConfig: IFormItemConfig = formConfig[formItemKey];

    return {
      ...result,
      [formItemKey]: {
        render() {
          return formItemConfig.render(formItemConfig, handleInputEvent);
        },
      },
    };
  }, {} as Form);

  const getValues = (): IFormValues => {
    return Object.values(formConfig).reduce(
      (result: IFormValues, next: IFormItemConfig) =>
        ({
          ...result,
          ...(next.value.trim() ? { [next.name]: next.value.trim() } : null),
        } as IFormValues),
      {} as IFormValues,
    );
  };

  const validateForm = (): boolean => {
    const { updatedFormConfig, isFormValid }: { updatedFormConfig: IFormConfig; isFormValid: boolean } = Object.keys(
      formConfig,
    ).reduce(
      (result: { updatedFormConfig: IFormConfig; isFormValid: boolean }, nextKey: string) => {
        const { valid, validationError } = validate(formConfig[nextKey].value, formConfig[nextKey]);

        return {
          updatedFormConfig: {
            ...result.updatedFormConfig,
            [nextKey]: {
              ...formConfig[nextKey],
              valid,
              validationError,
              touched: true,
            },
          },
          isFormValid: result.isFormValid && valid,
        };
      },
      { updatedFormConfig: {}, isFormValid: true } as {
        updatedFormConfig: IFormConfig;
        isFormValid: boolean;
      },
    );

    setFormConfig(updatedFormConfig);

    return isFormValid;
  };

  const reset = (formConfig: any) => setFormConfig(formConfig);

  return [form, getValues, validateForm, reset];
}
