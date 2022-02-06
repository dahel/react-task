import renderer from 'react-test-renderer';
import Card from './Card';

const props = {
  title: 'title',
};

describe('Card component', () => {
  test('renders properly for only-required props passed', () => {
    const component = renderer.create(<Card {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case 'pending' is true`, () => {
    const component = renderer.create(<Card {...props} pending={true} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders properly in case children components are defined`, () => {
    const component = renderer.create(
      <Card {...props}>
        <div>this is div</div>
      </Card>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
