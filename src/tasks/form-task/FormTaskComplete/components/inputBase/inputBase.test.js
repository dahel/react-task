import renderer from 'react-test-renderer';
import InputBase from './InputBase';

describe('InputBase component', () => {
  const props = {
    name: 'name',
    label: 'label',
    value: 'value',
  };

  test('renders properly for only-required props passed', () => {
    const component = renderer.create(<InputBase {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders properly for given placeholder', () => {
    const component = renderer.create(<InputBase {...props} placeholder="placeholder" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders properly for given type', () => {
    const component = renderer.create(<InputBase {...props} type="number" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case 'disabled' prop is passed`, () => {
    const component = renderer.create(<InputBase {...props} disabled={true} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case 'disabled' prop is passed`, () => {
    const component = renderer.create(<InputBase {...props} disabled={true} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case 'valid' prop is false and 'validationError' prop is defined`, () => {
    const component = renderer.create(<InputBase {...props} valid={false} validationError="bad value" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case 'valid' prop is false and 'validationError' is not defined`, () => {
    const component = renderer.create(<InputBase {...props} valid={false} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`calls 'onChange' callback passed as prop`, () => {
    const onChange = jest.fn();
    const root = renderer.create(<InputBase {...props} onChange={onChange} />).root;
    const input = root.findByType('input');

    input.props.onChange({ name: 'change' });

    expect(onChange).toHaveBeenCalledWith({ name: 'change' });
  });

  test(`calls 'onBlur' callback passed as prop`, () => {
    const onBlur = jest.fn();
    const root = renderer.create(<InputBase {...props} onBlur={onBlur} />).root;
    const input = root.findByType('input');

    input.props.onBlur({ name: 'blur' });

    expect(onBlur).toHaveBeenCalledWith({ name: 'blur' });
  });
});
