import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clone from 'ramda/src/clone'
import { css } from 'emotion'
import { NumberItem } from './NumberItem'

const INIT = 'init';
const END = 'end';
const NEXT = 'next'

export class BubbleSort extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  initialState = {
    items: this.props.items,
    swap: true,
    index: 0,
    action: INIT,
    currentTick: INIT,
  }

  state = this.initialState

  swapItems = (firstIndex, secondIndex, items = this.state.items) => {
    const copy = clone(items)

    const temp = copy[firstIndex]
    copy[firstIndex] = copy[secondIndex]
    copy[secondIndex] = temp

    return copy
  }

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

  reduceState = () => {
    const { action } = this.state

    switch (action) {
      case INIT:
        return this.setState({ action: NEXT })
      case NEXT:
        return this.setState(this.compareNextItem)
      case END: {
        this.stop()
        return
      }
      default:
        return
    }
  }

  compareNextItem = state => {
    const { items, index, swap } = state

    const isLast = index === items.length - 1

    if (isLast) {
      return swap
        ? {
            ...state,
            swap: false,
            index: 0,
          }
        : {
            ...state,
            action: END,
          }
    }

    const next = index + 1
    const needsSwap = items[index] > items[next]

    return {
      ...state,
      swap: swap || needsSwap,
      index: index + 1,
      items: needsSwap ? this.swapItems(index, next, items) : items,
    }
  }

  render() {
    const { state } = this

    return (
      <div>
        <h1
          className={css`
            font-size: 1.5rem;
          `}
        >
          bubble sort
        </h1>

        <button onClick={this.start} disabled={state.currentTick === END}>
          {state.action === END ? 'done 🎉' : 'start'}
        </button>

        <button
          onClick={this.stop}
          disabled={!this.interval || state.action === END}
        >
          pause
        </button>

        <button onClick={this.reset} disabled={state.action === INIT}>
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
            <NumberItem item={item} isCurrent={state.index === i} key={item} />
          ))}
        </ul>
      </div>
    )
  }
}
