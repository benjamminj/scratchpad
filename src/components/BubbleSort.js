import React, { Component } from 'react'
import clone from 'ramda/src/clone'
import range from 'ramda/src/range'
import { css } from 'emotion'

const Item = ({ item, isCurrent }) => (
  <li
    className={css`
      text-decoration: ${isCurrent ? 'underline' : 'none'};
      list-style-type: none;
      padding: 0.5rem;
      /* font-family: monospace; */
    `}
  >
    {item}
  </li>
)

export class BubbleSort extends Component {
  state = {
    items: this.props.items,
    swap: true,
    index: 0,
    currentTick: 'compare',
  }

  swapItems = (firstIndex, secondIndex) => {
    const copy = clone(this.state.items)

    const temp = copy[firstIndex]
    copy[firstIndex] = copy[secondIndex]
    copy[secondIndex] = temp

    return copy
  }

  start = () => {
    this.interval = window.setInterval(this.nextTick, 250)
  }

  stop = () => {
    window.clearInterval(this.interval)
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
  }

  nextTick = () => {
    const { currentTick, items, index, swap } = this.state

    switch (currentTick) {
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
        console.log('swap!')
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
    const { props, state } = this
    return (
      <div>
        <h1>header</h1>
        <button onClick={this.start} disabled={state.currentTick === 'end'}>
          {state.currentTick === 'end' ? 'yay' : 'next tick'}
        </button>

        <button onClick={this.stop} disabled={!this.interval}>
          stop
        </button>

        <ul>
          {state.items.map((item, i) => (
            <Item item={item} isCurrent={state.index === i} key={item} />
          ))}
        </ul>
        <style jsx>{`
          ul {
            display: flex;
          }
        `}</style>
      </div>
    )
  }
}
