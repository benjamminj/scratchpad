import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { NumberItem } from './NumberItem'

export class MergeSort extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  initialState = {
    items: [this.props.items],
    action: 'init',
    component: [this.props.items].map((item, i) => (
      <pre key={i}>{JSON.stringify(item)}</pre>
    )),
  }

  state = this.initialState

  start = () => {
    this.interval = window.setInterval(this.reduceState, 500)
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
      case 'init':
        return this.setState({ action: 'divide' })
      case 'divide':
        return this.setState(this.divide)
      case 'stitch':
        this.setState(this.stitchArrays);
        return this.state
      case 'end':
        this.stop();
        return this.state;
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

  // marks the `switch point` where we stop dividing the array & start sorting it
  toggleSort = state => ({})
  divide = state => {
    const { items, component } = state

    if (items.length === this.props.items.length) {
      return {
        ...state,
        action: 'stitch',
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

    const nextComponent = (
      <>
        {component}

        <pre>{JSON.stringify(nextItems)}</pre>
      </>
    )

    return {
      ...state,
      action: 'divide',
      component: nextComponent,
      items: nextItems,
    }
  }

  stitchArrays = state => {
    const { items, component } = state

    // by the time we're flipping this on, we can expect an array of arrays
    // take each array, & join it with the one next to it.
    const nextItems = items.reduce((acc, item, i) => {
      if (i % 2 === 0 && items[i + 1]) {
        const current = items[i];
        const next = items[i + 1];

        const joinIndex = next.findIndex(n => n < current[0])

        next.splice(joinIndex, 0, ...current)

        acc.push(next)
      }

      return acc;
    }, [])

    console.log(nextItems)

    this.setState({
      action: 'end',
      items: nextItems
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>

        {this.state.component}
      </div>
    )
  }
}
