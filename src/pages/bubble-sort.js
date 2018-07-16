import { BubbleSort } from '../components/BubbleSort';
import range from 'ramda/src/range';
import clone from 'ramda/src/clone';
import React from 'react';
import Layout from '../components/layout';

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
  state = {
    items: shuffle(range(1, 11))
  }

  render() {
    return (
      <Layout>
        <BubbleSort items={this.state.items} />
      </Layout>
    );
  }
}

export default Page;
