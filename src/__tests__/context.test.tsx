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

  it('should get provider value when render parent component', () => {
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

})
