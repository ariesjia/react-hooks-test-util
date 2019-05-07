import * as React from "react"
import { act, render } from 'react-testing-library'

function HookComponent({ hook, updateHook}) {
  updateHook(hook())
  return null
}


interface IOption {
  parent?: React.ComponentType
}

export default (hook: () => any, option: IOption = {}) => {
  let currentHook

  const updateHook = function(val) {
    currentHook = val
  }

  const getComponent = function () {

    const ParentComponent = option.parent ? option.parent : React.Fragment

    function Component() {
      return (
        <ParentComponent>
          <HookComponent hook={hook} updateHook={updateHook} />
        </ParentComponent>
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

export {
  act,
  render as renderComponent,
}