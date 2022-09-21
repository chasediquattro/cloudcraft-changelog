'use strict';

const e = React.createElement;

class ReactRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: true };
  }

  render() {
    if (this.state.active) {
      return 'Hello World!';
    }

    return e(
      'button',
      { onClick: () => this.setState({ active: !(this.state.active) }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ReactRoot));