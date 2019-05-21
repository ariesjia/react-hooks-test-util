import * as React from "react";
import render, { act, cleanup } from '../index'
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
    cleanup()
  })

  it('should render component to hook component when set \'render\' option', () => {
    const { container, getByTestId } = render(
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
    const text = getByTestId('text')
    expect(text.textContent).toEqual('hello')
  })

  it('should change state when click update button', () => {
    const newText = 'world'
    const { container, getByTestId } = render(
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
    const text = getByTestId('text')
    expect(text.textContent).toEqual('hello')
    act(() => {
      userEvent.click(getByTestId('button'))
    })
    expect(text.textContent).toEqual(newText)
  })

  it('should unmount render component when excute \'unmount\' methopd', () => {
    const { container, unmount } = render(
      () => testHook('hello'),
      {
        render({ hook }) {
          const { text, update } = hook
          return (
            <div>
              <span className="text">{text}</span>
              <button data-testid="button" onClick={() => update('world')}>update</button>
            </div>
          )
        }
      }
    )
    unmount()
    const text = container.querySelector('.class')
    expect(text).toEqual(null)
  })

  it('should rerender component to hook component when set `render` option in rerender method', () => {
    const { container, rerender, getByTestId } = render(
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
    const text = getByTestId('text')
    expect(text.textContent).toEqual('hello')
  })

  it('should render new component when rerender set new \'render\' option', () => {
    const { container, rerender, getByTestId } = render(
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
    const text = getByTestId('text')
    expect(text.textContent).toEqual('hello world')
  })
})
