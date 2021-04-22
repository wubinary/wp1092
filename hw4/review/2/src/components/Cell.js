import React from 'react'
/**
 * Cell represents the atomic element of a table
 */
export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.value,
    }
    this.display = this.determineDisplay(
      { x: props.x, y: props.y },
      props.value
    )
    this.timer = 0
    this.delay = 200
    this.prevent = false
  }
  /**
   * Add listener to the `unselectAll` event used to broadcast the
   * unselect all event
   */
  componentDidMount() {
    window.document.addEventListener('unselectAll',
      this.handleUnselectAll)
  }
  /**
   * Before updating, execute the formula on the Cell value to
   * calculate the `display` value. Especially useful when a
   * redraw is pushed upon this cell when editing another cell
   * that this might depend upon
   */
  componentWillUpdate() {
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, this.state.value)
  }
  /**
   * Remove the `unselectAll` event listener added in
   * `componentDidMount()`
   */
  componentWillUnmount() {
    window.document.removeEventListener('unselectAll',
      this.handleUnselectAll)
  }
  /**
   * When a Cell value changes, re-determine the display value
   * by calling the formula calculation
   */
  onChange = (e) => {
    this.setState({ value: e.target.value })
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, e.target.value)
  }
  /**
   * Handle pressing a key when the Cell is an input element
   */
  onKeyPressOnInput = (e) => {
    if (e.key === 'Enter') {
      this.hasNewValue(e.target.value)
    }
  }
  /**
   * Handle pressing a key when the Cell is a span element,
   * not yet in editing mode
   */
  onKeyPressOnSpan = () => {
    if (!this.state.editing) {
      this.setState({ editing: true })
    }
  }
  /**
   * Handle moving away from a cell, stores the new value
   */
  onBlur = (e) => {
    this.hasNewValue(e.target.value)
  }
  /**
   * Used by `componentDid(Un)Mount`, handles the `unselectAll`
   * event response
   */
  handleUnselectAll = () => {
    if (this.state.selected || this.state.editing) {
      this.setState({ selected: false, editing: false })
    }
    //this.props.onClickedPosition(this.props.x, this.props.y)
  }
  /**
   * Called by the `onBlur` or `onKeyPressOnInput` event handlers,
   * it escalates the value changed event, and restore the editing
   * state to `false`.
   */
  hasNewValue = (value) => {
    this.props.onChangedValue(
      {
        x: this.props.x,
        y: this.props.y,
      },
      value,
    )
    this.setState({ editing: false })
  }
  /**
   * Emits the `unselectAll` event, used to tell all the other
   * cells to unselect
   */
  emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event('unselectAll')
    window.document.dispatchEvent(unselectAllEvent)
  }
  /**
   * Handle clicking a Cell.
   */
  clicked = () => {
    // Prevent click and double click to conflict
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        // Unselect all the other cells and set the current
        // Cell state to `selected`
        this.emitUnselectAllEvent()
        this.setState({ selected: true })
      }
      this.prevent = false
    }, this.delay)
  }
  /**
   * Handle doubleclicking a Cell.
   */
  doubleClicked = () => {
    // Prevent click and double click to conflict
    clearTimeout(this.timer)
    this.prevent = true
    // Unselect all the other cells and set the current
    // Cell state to `selected` & `editing`
    this.emitUnselectAllEvent()
    this.setState({ editing: true, selected: true })
    this.props.onClickedPosition(this.props.x, this.props.y)
    
  }
  determineDisplay = ({ x, y }, value) => {
    return value
  }
  /**
   * Calculates a cell's CSS values
   */
  calculateCss = () => {
    const css = {
      width: '40px',
      padding: '4px',
      margin: '0',
      height: '20px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '5px',
      lineHeight: '4px',
      overflow: 'hidden',
      fontFamily: 'Calibri, \'Segoe UI\', Thonburi, Arial, Verdana, sans-serif',
    }
    if (this.props.x === 0 || this.props.y === 0) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }
    return css
  }
  render() {
    const css = this.calculateCss()
    // column 0
    if (this.props.x === 0) {
      return (
        <span style={css}>
          {this.props.y}
        </span>
      )
    }
    // row 0
    if (this.props.y === 0) {
      const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
      return (
        <span
          onKeyPress={this.onKeyPressOnSpan}
          style={css}
          role="presentation">
          {alpha[this.props.x]}
        </span>
      )
    }
    if (this.state.selected) {
      css.backgroundColor = '#f0f0f0';
      css.outlineColor = 'lightblue'
      css.outlineStyle = 'dotted'
    }
    if (this.state.editing) {
      return (
        <input
          style={css}
          type="text"
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPressOnInput}
          value={this.state.value}
          onChange={this.onChange}
          autoFocus
        />
      )
    }
    return (
      <span
        onClick={e => this.clicked(e)}
        onDoubleClick={e => this.doubleClicked(e)}
        style={css}
        role="presentation"
      >
        {this.display}
      </span>
    )
  }
}