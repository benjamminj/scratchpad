import React from 'react'
import { MergeSort } from '../components'
import Layout from '../components/layout'
import { shuffle } from '../utils'
import range from 'ramda/src/range'

const Page = () => (
  <Layout>
    <MergeSort items={shuffle(range(1, 11))} />
  </Layout>
)

export default Page
