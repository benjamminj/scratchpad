import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { fontSizeExtraLarge } from '../styles/variables'
import { NumberItem } from './NumberItem'
import clone from 'ramda/src/clone'

export class InsertionSort extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  initialState = {
    items: this.props.items,
    outerIndex: 0,
    innerIndex: 0,
    action: 'init',
  }

  state = this.initialState

  start = () => {
    this.interval = window.setInterval(this.reduceState, 200)
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

  swap = (items, firstIndex, secondIndex) => {
    const copy = clone(items)
    const temp = copy[firstIndex]
    copy[firstIndex] = copy[secondIndex]
    copy[secondIndex] = temp

    return copy
  }

  reduceState = () => {
    const { action } = this.state
    switch (action) {
      case 'init':
        /**
         * Start at 0, which is an already sorted array.
         * Technically this should still follow all the other steps, but for things feeling nice it
         * may be better to just increase the outer counter to 1 & move on with life.
         */
        return this.setState(state => ({ action: 'increaseOuterCounter' }))
      case 'increaseOuterCounter':
        return this.setState(this.increaseOuterCounter)
      case 'decreaseInnerCounter':
        return this.setState(this.decreaseInnerCounter)
      case 'end':
      default:
        return
    }
  }

  /**
   * Increase the outer counter and start an inner loop.
   */
  increaseOuterCounter = state => {
    const { outerIndex, items } = state

    // Placed as a safeguard. Ideally should never come up on this situation
    if (outerIndex === items.length - 1) {
      return {
        ...state,
        action: 'end',
      }
    }

    const next = outerIndex + 1

    return {
      ...state,
      outerIndex: next,
      innerIndex: next,
      action: 'decreaseInnerCounter',
    }
  }

  /**
   * For each step, compare with the item below & swap as necessary
   * will need to keep returning "itself" until the item is actually placed
   * At this point the inner counter is finished, so we will need to reset it & move the outer counter up
   * 
   * When the last inner loop ends, we're done!!! 🎉
   */
  decreaseInnerCounter = state => {
    const { items, innerIndex, outerIndex } = state

    if (innerIndex === 0) {
      return {
        ...state,
        action: outerIndex === items.length - 1 ? 'end' : 'increaseOuterCounter',
      }
    }

    const prev = innerIndex - 1
    const nextItems =
      items[innerIndex] < items[prev]
        ? this.swap(items, innerIndex, prev)
        : items

    return {
      ...state,
      innerIndex: prev,
      items: nextItems,
      action: 'decreaseInnerCounter',
    }
  }

  render() {
    const { state } = this
    return (
      <div>
        <h1
          className={css`
            font-size: ${fontSizeExtraLarge};
          `}
        >
          insertion sort
        </h1>

        <button onClick={this.start} disabled={state.currentTick === 'end'}>
          {state.action === 'end' ? 'done 🎉' : 'start'}
        </button>

        <button onClick={this.reset} disabled={state.currentTick === 'init'}>
          reset
        </button>

        <ul
          className={css`
            margin: 1rem 0;
            padding-left: 0;
            display: flex;
          `}
        >
          {state.items.map((item, i) => (
            <NumberItem
              item={item}
              isPrimaryCounter={state.outerIndex === i}
              isSecondaryCounter={state.innerIndex === i}
              key={item}
            />
          ))}
        </ul>
      </div>
    )
  }
}
