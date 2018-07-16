import React, { Component } from 'react'
import clone from 'ramda/src/clone'
import { css } from 'emotion'
import { fontMono } from '../styles/variables'

const Item = ({ item, isCurrent }) => (
  <li
    className={css`
      text-decoration: ${isCurrent ? 'underline' : 'none'};
      list-style-type: none;
      padding: 0.5rem;
      font-family: ${fontMono};
    `}
  >
    {item}
  </li>
)

export class BubbleSort extends Component {
  initialState = {
    items: this.props.items,
    swap: true,
    index: 0,
    currentTick: 'init',
  }

  state = this.initialState

  swapItems = (firstIndex, secondIndex) => {
    const copy = clone(this.state.items)

    const temp = copy[firstIndex]
    copy[firstIndex] = copy[secondIndex]
    copy[secondIndex] = temp

    return copy
  }

  start = () => {
    this.interval = window.setInterval(this.nextTick, 50)
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
          {state.currentTick === 'end' ? 'done 🎉' : 'start'}
        </button>

        <button
          onClick={this.stop}
          disabled={!this.interval || state.currentTick === 'end'}
        >
          pause
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
            <Item item={item} isCurrent={state.index === i} key={item} />
          ))}
        </ul>
      </div>
    )
  }
}
