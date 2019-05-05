import * as React from "react";
import renderHooks, { act } from '../index'
import { useState } from "react";


const testHook = function(text) {
  const [state, setState] = useState({ text })
  return {
    text: state.text,
    update(text) {
      setState({text})
    }
  }
}

describe("util test", () => {

  beforeEach(() => {
    jest.resetModules()
  })

  it('should get hook value', () => {
    const { container } = renderHooks(
      () => testHook('hello')
    )
    expect(container.hook.text).toEqual('hello')
  })

  it('should get hook value when trigger state change', () => {
    const { container } = renderHooks(
      () => testHook('hello')
    )
    act(() => {
      container.hook.update('world')
    })
    expect(container.hook.text).toEqual('world')
  })

  it('should get initial value when rerender component', () => {
    const { container, rerender } = renderHooks(
      () => testHook('hello')
    )
    act(() => {
      container.hook.update('world')
    })

    rerender()

    expect(container.hook.text).toEqual('hello')
  })

  it('should not get current value when unmount component', () => {
    const { container, unmount } = renderHooks(
      () => testHook('hello')
    )

    console.error = jest.fn()

    unmount()

    act(() => {
      container.hook.update('world')
    })

    expect(container.hook.text).toEqual('hello')
    expect(console.error).toHaveBeenCalled()
  })

})
