import { SyntheticEvent, ReactNode } from 'react';
import InputBase from '../components/inputBase/InputBase';
import SelectBase from '../components/selectBase/SelectBase';
import type { IValidator, IFormItemConfig, IFormConfig } from '../hooks/useForm/useForm';
import { validateDateStringFormat, validateDateString, isDateInThePast } from '../utils/validators/validators';

enum UserType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const inputDateFormat: string = 'YYYY-MM-DD';

const dateValidators: IValidator[] = [
  {
    validate: validateDateStringFormat,
    message: `Invalid date format, should be ${inputDateFormat}`,
  },
  {
    validate: validateDateString,
    message: `This date does not exist`,
  },
];

const renderInputBase = (
  formItemConfig: IFormItemConfig,
  handleInputEvent: (event: SyntheticEvent) => void,
): ReactNode => (
  <InputBase
    key={formItemConfig.name}
    name={formItemConfig.name}
    label={formItemConfig.label}
    value={formItemConfig.value}
    required={formItemConfig.required}
    validationError={formItemConfig.validationError}
    onChange={handleInputEvent}
    valid={formItemConfig.valid}
    disabled={formItemConfig.disabled}
    placeholder={formItemConfig.placeholder}
    onBlur={handleInputEvent}
  />
);

const renderSelect = (
  formItemConfig: IFormItemConfig,
  handleInputEvent: (event: SyntheticEvent) => void,
): ReactNode => (
  <SelectBase
    key={formItemConfig.name}
    name={formItemConfig.name}
    label={formItemConfig.label}
    value={formItemConfig.value}
    onChange={handleInputEvent}
    options={formItemConfig.options || []}
  />
);

const firstname: IFormItemConfig = {
  name: 'firstname',
  label: 'First Name',
  value: '',
  required: true,
  requiredErrorMessage: 'Please, provide your firstname',
  render: renderInputBase,
};

const lastname: IFormItemConfig = {
  name: 'lastname',
  label: 'Last Name',
  value: '',
  required: true,
  requiredErrorMessage: 'Please, provide your lastname',
  render: renderInputBase,
};

const birthday: IFormItemConfig = {
  name: 'birthday',
  label: 'Birthday',
  value: '',
  placeholder: inputDateFormat,
  render: renderInputBase,
  validation: dateValidators,
};

const userType: IFormItemConfig = {
  name: 'userType',
  label: 'User Type',
  value: UserType.ACTIVE,
  render: renderSelect,
  options: [
    {
      value: UserType.ACTIVE,
      label: 'Active',
    },
    {
      value: UserType.INACTIVE,
      label: 'Inactive',
    },
  ],
  update: (formConfig: IFormConfig, value: string): IFormConfig => {
    return {
      ...formConfig,
      userInactivityDate: {
        ...formConfig.userInactivityDate,
        disabled: value === UserType.ACTIVE,
        valid: true,
        validationError: '',
        required: value === UserType.INACTIVE,
        value: '',
      },
    };
  },
};

const userInactivityDate: IFormItemConfig = {
  name: 'userInactivityDate',
  label: 'User Inactivity Date',
  value: '',
  placeholder: inputDateFormat,
  required: false,
  disabled: userType.value === 'active',
  requiredErrorMessage: 'Please, provide inactivity date',
  render: renderInputBase,
  validation: [
    ...dateValidators,
    {
      validate: isDateInThePast,
      message: 'Inactivity date should be in the past',
    },
  ],
};

const formConfig: IFormConfig = {
  firstname,
  lastname,
  birthday,
  userType,
  userInactivityDate,
};

export default formConfig;
