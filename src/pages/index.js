import React from 'react'
import { Link } from 'gatsby'
import { css } from 'emotion'
import { jsComponent as Hello } from '../components/Hello.bs'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <Hello />
    <ul
      className={css`
        list-style-type: none;
        padding: 0;
      `}
    >
      <li>
        <Link to="/bubble-sort/">bubble sort</Link>
      </li>
      <li>
        <Link to="/insertion-sort/">insertion sort</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
