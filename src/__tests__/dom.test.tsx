import * as React from "react";
import render, { act } from '../index'
import { getByTestId } from 'react-testing-library'
import { useState } from "react"
import userEvent from 'user-event'


const testHook = function(text) {
  const [state, setState] = useState({ text })
  return {
    text: state.text,
    update(text) {
      setState({text})
    }
  }
}

describe("state test", () => {

  beforeEach(() => {
    jest.resetModules()
  })

  it('should render component to hook component when set \'render\' option', () => {
    const { container } = render(
      () => testHook('hello'),
      {
        render({ hook }) {
          const { text, update } = hook
          return (
            <div>
              <span data-testid="text">{text}</span>
              <button data-testid="button" onClick={() => update('world')}>update</button>
            </div>
          )
        }
      }
    )
    const text = getByTestId(container, 'text')
    expect(text.textContent).toEqual('hello')
  })

  it('should change state when click update button', () => {
    const newText = 'world'
    const { container } = render(
      () => testHook('hello'),
      {
        render({ hook }) {
          const { text, update } = hook
          return (
            <div>
              <span data-testid="text">{text}</span>
              <button data-testid="button" onClick={() => update(newText)}>update</button>
            </div>
          )
        }
      }
    )
    const text = getByTestId(container, 'text')
    expect(text.textContent).toEqual('hello')
    act(() => {
      userEvent.click(getByTestId(container, 'button'))
    })
    expect(text.textContent).toEqual(newText)
  })

  it('should rerender component to hook component when set `render` option in rerender method', () => {
    const { container, rerender } = render(
      () => testHook('hello'),
    )
    rerender({
      render({ hook }) {
        const { text } = hook
        return (
          <div>
            <span data-testid="text">{text}</span>
          </div>
        )
      }
    })
    const text = getByTestId(container, 'text')
    expect(text.textContent).toEqual('hello')
  })

  it('should render new component when rerender set new \'render\' option', () => {
    const { container, rerender } = render(
      () => testHook('hello'),
      {
        render({ hook }) {
          const { text } = hook
          return (
            <div>
              <span data-testid="text">{text}</span>
            </div>
          )
        }
      }
    )
    rerender({
      render({ hook }) {
        const { text } = hook
        return (
          <div>
            <span data-testid="text">{text} world</span>
          </div>
        )
      }
    })
    const text = getByTestId(container, 'text')
    expect(text.textContent).toEqual('hello world')
  })
})
