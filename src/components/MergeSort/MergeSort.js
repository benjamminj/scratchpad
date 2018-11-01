import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { NumberItem } from '../NumberItem'
import clone from 'ramda/src/clone'

const INIT = 'init'
const DIVIDE = 'divide'
const STITCH = 'stitch'
const END = 'end'

export class MergeSort extends Component {
  static propTypes = {
    items: PropTypes.array,
    /** time between operations (in milliseconds) */
    interval: PropTypes.number,
  }

  static defaultProps = {
    items: [],
    interval: 500,
  }

  initialState = {
    items: this.props.items,
    action: INIT,
  }

  state = this.initialState

  start = () => {
    this.interval = window.setInterval(this.reduceState, this.props.interval)
  }

  stop = () => {
    window.clearInterval(this.interval)
  }

  reset = () => {
    this.stop()
    this.setState(this.initialState)
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
  }

  reduceState = () => {
    const { action, items } = this.state

    switch (action) {
      case INIT:
        return this.setState({ action: DIVIDE, items: [items] })
      case DIVIDE:
        return this.setState(this.divide)
      case STITCH:
        this.setState(this.stitchArrays)
        return this.state
      case END:
        this.stop()
        return this.state
      // step 1: divide
      // put a space between each group or render it below?

      // keep dividing the array down until we have only arrays of 1 / 2
      // when we're in the sorting stage, swap the arrays based on the first item
      // then create some way to let the parent stage know we're sorted?
      // then progress the stack level back up
      default:
        return this.state
    }
  }

  divide = state => {
    const { items } = state

    if (items.length === this.props.items.length) {
      return {
        ...state,
        action: STITCH,
      }
    }

    const divideItems = item => {
      // is the item an array?
      // divide it in 2, spread the contents into the new item
      const middle = Math.ceil((item.length - 1) / 2)
      const firstHalf = item.slice(0, middle)
      const lastHalf = item.slice(middle)

      return [firstHalf, lastHalf]
    }

    const nextItems = items.reduce((acc, item) => {
      // stop splitting out the arrays once we have all arrays of single items
      if (item.length === 1) {
        return [...acc, item]
      }

      const middle = Math.ceil((item.length - 1) / 2)
      const firstHalf = item.slice(0, middle)
      const lastHalf = item.slice(middle)

      return [...acc, firstHalf, lastHalf]
    }, [])

    return {
      ...state,
      action: DIVIDE,
      items: nextItems,
    }
  }

  merge = (left, right) => {
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
      const leftValue = left[indexLeft]
      const rightValue = right[indexRight]

      if (leftValue < rightValue) {
        result.push(leftValue)
        indexLeft++
      } else {
        result.push(rightValue)
        indexRight++
      }
    }

    const leftRest = left.slice(indexLeft)
    const rightRest = right.slice(indexRight)

    return [...result, ...leftRest, ...rightRest]
  }

  stitchArrays = state => {
    const { items } = state

    if (items.length === 1) {
      return {
        items: items[0],
        action: END,
      }
    }

    const cloned = clone(items)
    const nextItems = cloned.reduce((acc, group, i) => {
      // Since the merging operation merges 2 items, only operate on every other item.
      if (i % 2 === 0) {
        const left = cloned[i]
        const right = cloned[i + 1] || []
        const merged = this.merge(left, right)
        
        acc.push(merged)
      }

      return acc
    }, [])

    return {
      action: STITCH,
      items: nextItems,
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>

        <pre>{JSON.stringify(this.state.items)}</pre>
      </div>
    )
  }
}
