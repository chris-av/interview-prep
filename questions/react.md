# Questions for React

### What is React?
React is a library developed by Meta (formerly Facebook) to allow frontend developers to write frontend code that responds (or "reacts") to changes in state. This library popularized the use of jsx (or Javascript XML), which allows developers to write pseudo-html that can embed Javascript values, code blocks, etc.

One the reasons of React's enduring popularity is its ability to make very modular components. This means that many pieces of frontend code can be "abstracted", so that they can be defined once and reused in different parts of the codebase. For example, one could define a general "Layout" component that defines the every possible behavior for how its children should be arranged.

### How do you use React?

React is a libary, meaning it can be used in many different ways. The simplest way to use React is to import the library directly from a CDN. However, the industry standard is to use a popular "framework" or some other opinionated architecture that comes with a build step out of the box. Some popular methods include: 

* **not deprecated** Create React App (CRA): formerly a command line program that bootstraps an entire React project templates straight from the command line. Previously, one would run `npx create-react-app` to bootstrap a project. 
* Vite: seen as a successor to CRA, it similarly bootstraps an entire React project. Running `vite create app` will start a command line process that asks you which template to use and offer configuration options. 

### What is a reusable component?
A reusable component in React is a component that has been abstracted so that it can be used in any part of the code. For instance, you may have a component, `Button` defined in a `Button.jsx` file that can be imported anywhere else and used in different contexts. This ensures consistent behaviors and layouts across the application.

### What is the difference between a class and functional component?

A class component is a component defined by using the class syntax. During React's early history, class components were the only means of managing state and executing code during various portions of the component life cycle. A functional component is a later, simpler pattern that allows developers to define components using regular function syntax: these functional components can execute code during the mounting/unmounting process through the use of hooks. 

An example of a class component (generally no longer recommended per the Meta team) : 

```js
class TodoList {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            currentTodo: "",
        };

        this.addTodo = this.addTodo.bind(this);
    }

    handleChange(event) {
        this.setState({ currentTodo: event.target.value, });
    }

    handleSubmit(event) {
        event.preventDefault();
        const currTodo = this.state.currentTodo;
        const todos_cp = this.state.todos;
        currTodos.push(currTodo);
        this.setState({ currentTodo: "", todos: todos_cp });
    }

    // one component life cycle method
    componentDidMount() {
        // execute code when the component mounts ... 
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="add-todo" 
                        placeholder="Add Todo"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Add</button>
                </form>
                <div>
                    {todos.map(todo => <div>{todo}</div>)}
                </div>
            </div>
        );
    }

}
```

And this is the functional component equivalent


```js
import { useState, useEffect } from 'react';
const TodoList = (props) => {
    const [todos, setTodos] = useState([]);
    const [currTodo, setCurrTodo] = useState("");
    const handleChange = (event) => {
        setCurrTodo(event.target.value);
    }

    // functional components way of accessing component lifecycle method
    useEffect(() => {
        // this executes whenever what is listed in the dependency array changes
        // NOTE: this works as you expect with *primitive* values
        // however, with functions and arrays, useEffect will only check if the *reference* to that object in memory changed
        return () => {} // this is a cleanup function: it will run whenever the component UN-mounts
    }, [currTodo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodos(prev => {
            const todos_cp = prev;
            return [...prev, todos_cp];
        });
    }

    return (
        <div>
            <h1>Todos</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    name="add-todo" 
                    placeholder="Add Todo"
                    onChange={handleChange}
                />
                <button type="submit">Add</button>
            </form>
            <div>
                {todos.map(todo => <div>{todo}</div>)}
            </div>
        </div>
    );
}

```

### What is a higher order component?
A higher order component (HOC) is a component that takes a component as its argument and returns component. It is a pure function with (hopefully) no side-effects. 

You would use a higher order component to replicate a specific portion of your application's logic, where you would need to know ahead of time a component and the behavior that is supposed to go along with it. Much like how a `Button` component, which takes in props and returns jsx and handles the rest, a HOC takes in a component, returns another component and handles the rest.

### What is the difference between state and props?

State is the logic associated with a class or functional component, expressed in terms of a value (primitive, object, array, etc.). State can be thought of as a way of documenting the status, or "state", of an application. A very simple example are those light mode / dark mode buttons you see on many websites. Often, these websites will define a state that keeps track of whether a user prefers a light more or dark mode. When the user clicks on the button, the code modifies the state, and this in turn triggers the application to re-render. 

State helps developers define behaviors. In the above example, if the state is expressed in a boolean, perhaps `darkMode = true`, developers can conditionally render their components. So if `darkMode` is true, render colors for dark mode.

Props, on the other hand, are merely values (or properties) passed from one component to another. Occassionally, these props are in fact the state of the parent component. Other times, the properties are merely static values. Below is an example: 

```js
// button.jsx
function Button(props) {
    return (
        <div style={{ color: props.color }}>
            Submit
        </div>
    );
}

// page.jsx
import Button from './button';
function Page() {
    return (
        <div>
            <h1>Hello! Subscribe below</h1>
            <Button 
                color="red"
            />
        </div>
    )
}

```

Or maybe ... we can pass our state as props :

```js
// button.jsx
function Button(props) {
    return (
        <div style={{ color: props.color }}>
            Submit
        </div>
    );
}

// page.jsx
import { useState } from 'react';
import Button from './button';
import ColorPicker from './color-picker' // this is a hypothetical component
function Page() {
    const [color, setColor] = useState("blue"); // the default color
    // state *lives* here in Page
    // pass down color as props to ColorPicker. We also pass in the function that is allowed to mutate that color.
    // if color changes in ColorPicker, that change propogates up to the parent (here)
    // this change in color, in turn, propogates down to Button!
    return (
        <div>
            <h1>Hello! Subscribe below</h1>
            <Button 
                color={color}
            />
            <ColorPicker 
                color={color}
                setColor={setColor}
            />
        </div>
    );
}

```



### When do you use state, context or a full fledged state manager?
There are no hard rules when it comes to state. The best you can do is use best practices that fit best with your architecture. Here are some broad rules that I follow :

* defining state and passing them down to props works best if there is minimal "prop drilling" (meaning passing down state to children, and to the children's children, etc.).
* Context is more than sufficient for accessing state globally. React's Context API came out *after* solutions like Redux came out.
* The Context API is simple and offers everything you need if all you need in a state manager is "define state and modify it".
* State managers become useful if you need:
    * an alternate model for conceptualizing your state: some state managers offer the approach of allowing you to mutate your state directly, others enforce an actions/reducers architecture
    * a developer experience on top of modifying state: so for example, Redux (and accompanying browser extensions) offers the capability for auditing changes in your state over time
    * if your global state becomes incredibly complex, might be useful to adopt state managers which may offer out of the box solutions for handling complexity.

### What are Hooks?
    
Hooks are functions in React that run in response to changes to the state in the application. There are Hooks provided by React, and developers can build their own custom hooks on top of those. 

According to the [React docs](https://react.dev/reference/react), some hooks that are provided out of the box are (listing the common ones) :

* useState: for defining state
* useEffect: for executing code on mount, in response to changes in the values defined in the dependency array, and on unmount
* useContext: a hook for accessing state/values within a context object.
* useLayoutEffect: an identical version of useEffect, but executes before a browser repaints the screen; typically used if you need to run a calculation that will determine a layout
* useMemo: a hook that returns an object, which only changes depending on the callback function provided. Typically used for memo-izing values to prevent unnecessary re-renders (since React will re-render if the memory location of an object/array changes, even if the contents of the object/array remains the same). You can think of it as a hook that let's you customize how/when a value is cached.
* useCallback: same as above. Instead of caching values, you would use this hook to cache a function.

### What is the difference between a controlled and uncontrolled component?
A controlled component is a component whose state and behavior is controlled by the state of a parent component. An uncontrolled component is a component that manages its own state internally, which does not respond to changes in its parent.

### What is an error boundary? How do you create one in React?

An Error Boundary is a React Component that catches an error and renders something in response. Without an error boundary, an error in React will bubble all the way up, and if uncaught, will crash the entire application. With an error boundary, you can catch the error and render something, perhaps an error message, to prevent the application from crashing. 

To implement an error boundary, you must define a Class Component and write a method which detects an error.



