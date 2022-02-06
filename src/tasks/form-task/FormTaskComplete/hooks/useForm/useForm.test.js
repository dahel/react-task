import renderer from 'react-test-renderer';
import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './useForm';

let formFields;

beforeEach(() => {
  formFields = {
    test_field_1: {
      name: 'test_field_1-name',
      label: '',
      value: '',
      required: true,
      requiredErrorMessage: 'requiredErrorMessage',
      render: jest.fn(() => <div>test_field_1 element</div>),
      validation: [
        {
          validate: () => {},
          message: 'Invalid length',
        },
      ],
    },
    test_field_2: {
      name: 'test_field_2-name',
      label: '',
      value: '',
      render: jest.fn(() => <div>test_field_2 element</div>),
      validation: [
        {
          validate: () => {},
          message: 'Invalid format',
        },
      ],
    },
    test_field_3: {
      name: 'test_field_3-name',
      label: '',
      value: '',
      render: jest.fn(() => <div>test_field_3 element</div>),
      update: () => {},
    },
  };
});

test('generates form entry for every form field', () => {
  const { result } = renderHook(() => useForm(formFields));
  const [form] = result.current;

  expect(form.test_field_1).toBeDefined();
  expect(typeof form.test_field_1.render).toBe('function');

  expect(form.test_field_2).toBeDefined();
  expect(typeof form.test_field_2.render).toBe('function');

  expect(form.test_field_3).toBeDefined();
  expect(typeof form.test_field_3.render).toBe('function');
});

test('properly renders every field item', () => {
  const { result } = renderHook(() => useForm(formFields));
  const [form] = result.current;

  expect(renderer.create(form.test_field_1.render()).toJSON()).toMatchSnapshot();
  expect(renderer.create(form.test_field_2.render()).toJSON()).toMatchSnapshot();
  expect(renderer.create(form.test_field_3.render()).toJSON()).toMatchSnapshot();
});

test(`calls 'update' function of form item config after item's value has change`, () => {
  const updateSpy = jest.fn();
  let cachedOnInputChange;

  formFields.test_field_1.required = true;
  formFields.test_field_1.value = 'asdf';
  formFields.test_field_1.update = updateSpy;
  formFields.test_field_1.render = (config, onInputChange) => {
    cachedOnInputChange = onInputChange;

    return <div>test_field_1 element</div>;
  };

  const { result } = renderHook(() => useForm(formFields));
  const [form] = result.current;

  form.test_field_1.render();

  act(() => {
    cachedOnInputChange({
      target: { value: 'new value', name: 'test_field_1' },
    });
  });

  expect(updateSpy).toHaveBeenCalledWith(expect.any(Object), 'new value');
});

describe('getValues', () => {
  test(`returns properly formatted object`, () => {
    formFields.test_field_1.value = 'one';
    formFields.test_field_2.value = 'two';
    formFields.test_field_3.value = 'three';

    const { result } = renderHook(() => useForm(formFields));
    const [, getValues] = result.current;

    expect(getValues()).toEqual({
      'test_field_1-name': 'one',
      'test_field_2-name': 'two',
      'test_field_3-name': 'three',
    });
  });
});

describe('validateForm', () => {
  test(`calls validate function of every validation config after validateForm is called and none of required fields is empty`, () => {
    const validateSpy1 = jest.fn();
    const validateSpy2 = jest.fn();

    formFields.test_field_1.value = 'asdf';
    formFields.test_field_1.validation[0] = { validate: validateSpy1 };
    formFields.test_field_2.value = 'asdf';
    formFields.test_field_2.validation[0] = { validate: validateSpy2 };

    const { result } = renderHook(() => useForm(formFields));
    const [, , validateForm] = result.current;

    act(() => {
      validateForm();
    });

    expect(validateSpy1).toHaveBeenCalled();
    expect(validateSpy2).toHaveBeenCalled();
  });

  test(`returns true in case all fields are required and have defined values and have no validators`, () => {
    let isFormValid;

    formFields.test_field_1.required = true;
    formFields.test_field_1.value = 'asdf';
    formFields.test_field_1.validation = [];
    formFields.test_field_2.required = true;
    formFields.test_field_2.value = 'asdf';
    formFields.test_field_2.validation = [];

    const { result } = renderHook(() => useForm(formFields));
    const [, , validateForm] = result.current;

    act(() => {
      isFormValid = validateForm();
    });

    expect(isFormValid).toBe(true);
  });

  test(`returns true in case all fields are required and have defined values and their validators returns true`, () => {
    let isFormValid;

    formFields.test_field_1.required = true;
    formFields.test_field_1.value = 'asdf';
    formFields.test_field_1.validation = [{ validate: () => true }];
    formFields.test_field_2.required = true;
    formFields.test_field_2.value = 'asdf';
    formFields.test_field_2.validation = [{ validate: () => true }];

    const { result } = renderHook(() => useForm(formFields));
    const [, , validateForm] = result.current;

    act(() => {
      isFormValid = validateForm();
    });

    expect(isFormValid).toBe(true);
  });

  test(`returns false in case all fields are not required and on of the validator returns false`, () => {
    let isFormValid;

    formFields.test_field_1.required = true;
    formFields.test_field_1.value = 'asdf';
    formFields.test_field_1.validation = [{ validate: () => true }];
    formFields.test_field_2.required = true;
    formFields.test_field_2.value = 'asdf';
    formFields.test_field_2.validation = [{ validate: () => false }];

    const { result } = renderHook(() => useForm(formFields));
    const [, , validateForm] = result.current;

    act(() => {
      isFormValid = validateForm();
    });

    expect(isFormValid).toBe(false);
  });
});
