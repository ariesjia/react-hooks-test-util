import * as React from "react"
import { act, render } from 'react-testing-library'

function HookComponent({ hook, updateHook}) {
  updateHook(hook())
  return null
}


export default (hook: () => any) => {
  let currentHook

  const updateHook = function(val) {
    currentHook = val
  }

  const getComponent = function () {
    function Component() {
      return (
        <>
          <HookComponent hook={hook} updateHook={updateHook} />
        </>
      );
    }
    return <Component/>
  }

  const { container, rerender, unmount } = render(getComponent())

  return {
    container: Object.defineProperties(container, {
      hook: {
        get() {
          return currentHook
        },
      }
    }),
    rerender() {
      currentHook = null
      rerender(getComponent())
    },
    unmount: unmount,
  }
}

export { act }