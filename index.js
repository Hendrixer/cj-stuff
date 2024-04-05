// Define a Store class to manage the state of our application
class Store {
  // The constructor initializes the store with default data if provided, otherwise with an empty object
  constructor(defaultData) {
    this.data = defaultData || {}
  }

  // setData allows us to update the store's data by passing a function that receives the current data and returns the updated data
  setData(fn) {
    this.data = fn(this.data)
    // After updating the data, we call renderApp to update the UI with the new state
    renderApp()
  }

  // getData simply returns the current state of the store's data
  getData() {
    return this.data
  }
}

// Create an instance of the Store with initial data for todos and completedTodos
const store = new Store({todos: [], completedTodos: []})

// Select the root element in the HTML where our app will be rendered
const appRoot = document.querySelector('#app')

// renderElement is a helper function to append a child element to a parent element in the DOM
const renderElement = (element, parent) => {
  parent.appendChild(element)
}

// createElement is a helper function to create a new DOM element with a given tag and optional inner HTML
const createElement = (tag, html) => {
  const element = document.createElement(tag)
  if (html) {
    element.innerHTML = html
  }
  return element
}

// ButtonComponent is a functional component that returns a button element
const ButtonComponent = () => {
  const buttonElement = createElement('button', 'add todo')
  return buttonElement
}

// InputComponent is a functional component that returns an input element
const InputComponent = () => {
  const inputElement = createElement('input')
  return inputElement
}

// FormComponent is a functional component that returns a form element with an input and a button
const FormComponent = () => {
  const formElement = createElement('form')
  const input = InputComponent()
  renderElement(input, formElement)
  renderElement(ButtonComponent(), formElement)

  // Add an event listener to handle the form submission
  formElement.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    
    // Update the store's data with the new todo item
    store.setData((currentData) => {
      return {
        ...currentData,
        todos: [
          input.value, // Add the new todo at the beginning of the todos array
          ...currentData.todos, // Spread the existing todos after the new one
        ]
      }
    })
  })

  return formElement
}

// ListItemComponent is a functional component that returns a list item element for a given todo
const ListItemComponent = (todo) => {
  const listItemElement = createElement('li', todo)
  return listItemElement
}

// ListComponent is a functional component that returns an unordered list element containing list items for each todo
const ListComponent = () => {
  const listElement = createElement('ul')
  const todos = store.getData().todos // Get the current todos from the store

  // For each todo, create a list item and append it to the list element
  todos.forEach(todo => {
    const item = ListItemComponent(todo)
    renderElement(item, listElement)
  })
  return listElement
}

// renderApp is a function that clears the app root and renders the form and list components
const renderApp = () => {
  appRoot.innerHTML = '' // Clear the app root
  renderElement(FormComponent(), appRoot) // Render the form component
  renderElement(ListComponent(), appRoot) // Render the list component
}

// Call renderApp to render the initial UI
renderApp()