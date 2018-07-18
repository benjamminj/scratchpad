import { BubbleSort } from '../components'
import range from 'ramda/src/range'
import React from 'react'
import Layout from '../components/layout'
import { shuffle } from '../utils'

const Page = () => {
  return (
    <Layout>
      <BubbleSort items={shuffle(range(1, 11))} />
    </Layout>
  )
}

export default Page
