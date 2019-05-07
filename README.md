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
const testHook = function(text) {
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
    () => testHook('hello')
  )
  expect(container.hook.text).toEqual('hello')
  
  act(() => {
    container.hook.update('world')
  })
  expect(container.hook.text).toEqual('world')
})
```

useContext demo:  
https://github.com/ariesjia/hooks-test-util/blob/master/src/__tests__/context.test.tsx

useEffect demo:  
https://github.com/ariesjia/hooks-test-util/blob/master/src/__tests__/effort.test.tsx