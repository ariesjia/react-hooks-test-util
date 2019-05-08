import * as React from "react";
import render from '../index'
import { useContext } from "react";


const ThemeContext = React.createContext({
  color: 'red'
})
const ThemeContextProvider = ThemeContext.Provider

const testHook = function() {
  const value = useContext(ThemeContext)
  return value
}


describe("context test", () => {

  beforeEach(() => {
    jest.resetModules()
  })

  it('should get context value', () => {
    const { container } = render(
      () => testHook()
    )
    expect(container.hook).toEqual({color: 'red'})
  })

  it('should get current context value when provider override value', () => {
    const newTheme = {color: 'blue'}
    const { container } = render(
      () => testHook()
    , {
        parent: function(props) {
          return (
            <ThemeContextProvider value={newTheme}>
              {props.children}
            </ThemeContextProvider>
          )
        }
    })
    expect(container.hook).toEqual(newTheme)
  })

  it('should get provider value when rerender component', () => {
    const newTheme = {color: 'blue'}
    const { container, rerender } = render(
      () => testHook()
    )

    rerender({
      parent: function(props) {
        return (
          <ThemeContextProvider value={newTheme}>
            {props.children}
          </ThemeContextProvider>
        )
      }
    })

    expect(container.hook).toEqual(newTheme)
  })

})
