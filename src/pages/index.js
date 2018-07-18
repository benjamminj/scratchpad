import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <Link to="/bubble-sort/">bubble sort</Link>
    <Link to="/insertion-sort/">insertion sort</Link>
  </Layout>
)

export default IndexPage
