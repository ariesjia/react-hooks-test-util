# hooks-test-util
> make hooks easier to test

## Install
```bash
// use yarn
yarn add hooks-test-util
// use npm
npm install hooks-test-util
```

## Demo

### useState Test 

hook

```javascript
const textHook = function(text) {
  const [state, setState] = useState({ text })
  return {
    text: state.text,
    update(text) {
      setState({text})
    }
  }
}
```

test file
```javascript
import render, { act } from 'hooks-test-util'

it('should get current hook value', () => {
  const { container } = render(
    () => textHook('hello')
  )
  expect(container.hook.text).toEqual('hello')
  
  act(() => {
    container.hook.update('world')
  })
  expect(container.hook.text).toEqual('world')
})
```

### useContext Test 
hook

```javascript
const ThemeContext = React.createContext({
  color: 'red'
})

const testHook = function() {
  const value = useContext(ThemeContext)
  return value
}
```

test file
```jsx harmony
import render, { act } from 'hooks-test-util'

it('should get current context value when provider override value', () => {
    const newTheme = {color: 'blue'}
    
    const { container } = render(
      () => testHook()
    , {
        parent: function(props) {
          return (
            <ThemeContext.Provider value={newTheme}>
              {props.children}
            </ThemeContext.Provider>
          )
        }
    })
    
    expect(container.hook).toEqual(newTheme)
  })
```

demo:  
https://github.com/ariesjia/hooks-test-util/blob/master/src/__tests__/context.test.tsx

### useEffect Test 

demo:  
https://github.com/ariesjia/hooks-test-util/blob/master/src/__tests__/effort.test.tsx

### test with dom
test file


```jsx harmony
import render, { act } from '../index'
import { getByTestId } from 'react-testing-library'
it('should render state value on dome', () => {
  const { container } = render(
    () => textHook('hello'),
    {
      render({ hook }) {
        const { text, update } = hook
        return (
          <div>
            <span data-testid="text">{text}</span>
          </div>
        )
      }
    }
  )
  const text = getByTestId(container, 'text')
  expect(text.textContent).toEqual('hello')
})
```