import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { NumberItem } from './NumberItem'

export class MergeSort extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  initialState = {
    items: this.props.items,
    action: 'init',
    component: null,
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
    const { action } = this.state;
    switch(action) {
      case 'init': 
        return this.setState({ action: 'divide' })
      case 'divide':
      // step 1: divide
          // put a space between each group or render it below?
      
      // keep dividing the array down until we have only arrays of 1 / 2
      // when we're in the sorting stage, swap the arrays based on the first item
      // then create some way to let the parent stage know we're sorted?
      // then progress the stack level back up
      default:
        return this.state;
    }
  }

  setNextComponent = ({ items, depth }) => {
    if (depth === 0 && items.length) {
      // return the tick to fire the next action with increased depth
      return;
    }
    if (items.length === 1 || depth === 0) {
      // will make sure that depth doesn't keep increasing, 
      // it's time to turn around & start sorting!
      this.toggleSort() 
      return;
    }

    // split the array here into head & tail

    return (
      <div>
        {/* render the list here, this counts as the "branch" of the "tree" */}
        {/* recursively render this method again with the first half & the 2nd half, decrementing the "depth" */}
      </div>
    )
  }

  // marks the `switch point` where we stop dividing the array & start sorting it
  toggleSort = state => ({});
  divide = state => {
    const { items } = state

    // create an array w/ sub-arrays?
    // or recursively render the array?
    // `this.state.depth` drilled into component...use it to re-render the next layer down
    // 

    // take the array of items, & reduce into a new array w/ subarrays
    // if any of the subarrays have longer than length 1, split them into 2 subarrays
    // if all the subarrays are length 1, change the action type
  }

  render() {
    return (
      <div>
        <span>{this.state.items}</span>
        {this.state.component}
      </div>
    )
  }
}
