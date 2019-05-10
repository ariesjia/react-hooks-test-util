import * as React from "react"
import { act, render } from 'react-testing-library'
import {ReactNode} from "react";

function HookComponent({ hook, updateHook, render}) {
  const current = hook();
  updateHook(current)
  return render ? render({hook: current}) : null
}


interface IOption<T> {
  parent?: React.ComponentType,
  render? ({ hook: T }) : ReactNode,
}

export default function<T>(hook: () => any, option: IOption<T> = {}) {
  let currentHook

  const updateHook = function(val) {
    currentHook = val
  }

  const getComponent = function (options) {
    const ParentComponent = options.parent ? options.parent : React.Fragment
    function Component() {
      return (
        <ParentComponent>
          <HookComponent hook={hook} updateHook={updateHook} render={option.render} />
        </ParentComponent>
      );
    }
    return <Component/>
  }

  const { container, rerender, unmount } = render(getComponent(option))

  return {
    container: Object.defineProperties(container, {
      hook: {
        get() {
          return currentHook
        },
      }
    }),
    rerender(newOption: IOption<T> = {}) {
      currentHook = null
      rerender(getComponent({
        ...option,
        ...newOption,
      }))
    },
    unmount: unmount,
  }
}

export {
  act,
  render as renderComponent,
}