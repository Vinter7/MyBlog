# React

[React Docs](https://beta.reactjs.org/)

---

## Quick Start

- Installation `npx create-react-app my-app`
- JSX & components
  - the function that return markup is a react component
  - component names must always start with a capital letter
  - don't return multiple JSX tags `<>...</>`
- Styles `className='class'`
- Data `{js value}`
- Conditional rendering
  - `if(is) let c = <Component />`
  - `return (<>{c}</>)`
  - `{is ? (<Component1 />) : (<Component1 />)}`
  - `{is && <Component />}`
- Rendering lists
  - `const list = items.map(item=><li>{item}</li>)`
  - `return (<ul>{list}</ul>)`
- events
  - `function fun(){}`
  - `return (<button onClick={fun}>ok</button>)`
- useState
  - `import { useState } from 'react'`
  - `const [state,setState] = useState(initial)`
  - state is same as `let state = initial`
  - `setState(value)` to update the value of state
- Hooks
  - Functions starting with *use* are called Hooks
  - only call Hooks at the top level of components
- Sharing data between components
  - parent
    - `const [count, setCount] = useState(0)`
    - `function fun(){setCount(count + 1)}`
    - `<MyButton count={count} onClick={fun} />`
  - son
    - `function MyButton({ count, onClick }){}`
    - `return (<button onClick={onClick}>{count}</>)`



