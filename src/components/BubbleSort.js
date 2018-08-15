import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clone from 'ramda/src/clone'
import { css } from 'emotion'
import { NumberItem } from './NumberItem'

export class BubbleSort extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  initialState = {
    items: this.props.items,
    swap: true,
    index: 0,
    action: 'init',
    currentTick: 'init',
  }

  state = this.initialState

  swapItems = (firstIndex, secondIndex, items=this.state.items) => {
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
    console.log('reduce')
    switch(action) {
      case 'init':
        return this.setState({ action: 'next' })
      case 'compareNextItem':
        return this.setState(this.compareNextItem)
      case 'end':
      default:
        return;
    }
  }

  compareNextItem = state => {
    const {items, index, swap} = state;

    const isLast = index === items.length - 1;

    if (isLast) {
      return swap ? {
        ...state,
        swap: false,
        index: 0,
      } : {
        ...state,
        action: 'end'
      }
    }

    const next = items[index + 1]
    const needsSwap = items[index] > items[next]
    console.log(needsSwap)

    return {
      ...state,
      swap: swap || needsSwap,
      index: index + 1,
      items: needsSwap ? this.swapItems(index, next, items) : items
    }
  }

  // TODO -- deprecate in favor of reduceState
  nextTick = () => {
    const { currentTick, items, index, swap } = this.state

    switch (currentTick) {
      case 'init': {
        return this.setState(state => ({ currentTick: 'compare' }))
      }
      case 'compare': {
        if (index + 1 === items.length) {
          return this.setState(state => ({
            ...state,
            currentTick: swap === true ? 'compare' : 'end',
            index: 0,
            swap: false,
          }))
        }

        const shouldSwap = items[index] > items[index + 1]

        if (shouldSwap) {
          return this.setState(state => ({
            ...state,
            currentTick: 'swap',
            swap: true,
          }))
        }

        return this.setState(state => ({ ...state, currentTick: 'noswap' }))
      }
      case 'swap': {
        return this.setState(state => ({
          ...state,
          currentTick: 'next',
          items: this.swapItems(index, index + 1),
        }))
      }
      case 'noswap':
        return this.setState(state => ({
          ...state,
          currentTick: 'next',
        }))
      case 'next':
        return this.setState(state => ({
          ...state,
          currentTick: 'compare',
          index: state.index + 1,
        }))
      case 'end':
      default:
        break
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
        
        <button onClick={this.start} disabled={state.currentTick === 'end'}>
          {state.action === 'end' ? 'done 🎉' : 'start'}
        </button>

        <button
          onClick={this.stop}
          disabled={!this.interval || state.action === 'end'}
        >
          pause
        </button>

        <button onClick={this.reset} disabled={state.action === 'init'}>
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
