import renderer from 'react-test-renderer';
import App from './App';

describe("App Page", () => {

  it("verifies against its snapshot", () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})