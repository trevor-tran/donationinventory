import renderer from 'react-test-renderer';
import UserInputForm from './UserInputForm';

describe("UserInputForm Page", () => {

  it("verifies against its snapshot", () => {
    const tree = renderer
      .create(<UserInputForm />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})