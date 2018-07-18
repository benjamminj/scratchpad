import React from 'react'
import { InsertionSort } from '../components'
import Layout from '../components/layout'
import { shuffle } from '../utils'
import range from 'ramda/src/range'

const Page = () => (
  <Layout>
    <InsertionSort items={shuffle(range(1, 11))} />
  </Layout>
)

export default Page
