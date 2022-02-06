import renderer from 'react-test-renderer';
import SelectBase from './SelectBase';

const props = {
  name: 'name',
  label: 'label',
  value: 'value',
  options: [
    {
      value: 'option1',
      label: 'label1',
    },
    {
      value: 'option2',
      label: 'label2',
    },
  ],
};

test('renders properly for only-required props passed', () => {
  const component = renderer.create(<SelectBase {...props} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test(`calls 'onChange' callback passed as parameter`, () => {
  const onChange = jest.fn();
  const root = renderer.create(<SelectBase {...props} onChange={onChange} />).root;
  const select = root.findByType('select');

  select.props.onChange({ name: 'change' });

  expect(onChange).toHaveBeenCalledWith({ name: 'change' });
});
