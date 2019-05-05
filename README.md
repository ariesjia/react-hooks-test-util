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

### hook
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

### test
```javascript
import render, { act } from 'hooks-test-util'

const { container } = render(
  () => testHook('hello')
)
expect(container.hook.text).toEqual('hello')

act(() => {
  container.hook.update('world')
})
expect(container.hook.text).toEqual('world')
```