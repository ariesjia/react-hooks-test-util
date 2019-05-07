import * as React from "react";
import render from '../index'
import { useEffect } from "react";


describe("effort test", () => {

  beforeEach(() => {
    jest.resetModules()
  })

  it('should trigger effect when render component', () => {
    const testHook = function(effect) {
      useEffect(effect, []);
    }
    const fn = jest.fn()

    render(
      () => testHook(fn)
    )

    expect(fn).toHaveBeenCalled()
  })

  it('should trigger clean effect when unmount component', () => {
    const testHook = function(effect) {
      useEffect(() => {
        return effect
      }, []);
    }
    const fn = jest.fn()

    const { unmount } = render(
      () => testHook(fn)
    )

    expect(fn).not.toHaveBeenCalled()

    unmount()

    expect(fn).toBeCalledTimes(1)
  })

})
