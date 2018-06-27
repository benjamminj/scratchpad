import { BubbleSort } from '../components/BubbleSort';
import range from 'ramda/src/range';
import clone from 'ramda/src/clone';
import React from 'react';

const shuffle = arr => {
  const copy = clone(arr);

  for (let i = copy.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);

    const temp = copy[j];
    copy[j] = copy[i];
    copy[i] = temp;
  }
  return copy;
};

class Page extends React.Component {
  static async getInitialProps() {
    console.log(range)
    return { items: shuffle(range(1, 10)) };
  }

  render() {
    return (
      <div>
        <BubbleSort items={this.props.items} />
      </div>
    );
  }
}

export default Page;
