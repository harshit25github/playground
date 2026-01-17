// Example 1: create a single element and render it
// const heading = React.createElement('h1', { className: 'heading' }, 'Hello, React!');
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(heading);

/*
Goal: create this structure with React.createElement (without JSX):
<div class="parent">
  <div class="child">
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
</div>
*/

// React.createElement(type, props, children) returns a React element (a JS object).
// `className` is used instead of `class` because `class` is a reserved keyword in JS.
const headingTitle = React.createElement('h1', { key: 'title' }, 'Title');
const paragraph = React.createElement('p', { key: 'paragraph' }, 'Paragraph');

// When children are an array, keys help React track sibling elements.
// Keys must be unique among siblings (same level), not globally.
const childDiv = React.createElement('div', { className: 'child' }, [headingTitle, paragraph]);

// This is the same idea, just inline to show you can nest createElement calls.
const childDiv2 = React.createElement(
    'div',
    { className: 'child' },
    [
        React.createElement('h1', { key: 'title' }, 'Title2'),
        React.createElement('p', { key: 'paragraph' }, 'Paragraph2'),
    ]
);

const parentDiv = React.createElement('div', { className: 'parent' }, [childDiv, childDiv2]);

// This style is verbose and hard to read, which is why JSX is preferred.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parentDiv);

/*
Curious interview-style Q&A with reasoning:
Q: What does React.createElement return?
A: A React element (plain object) describing what the UI should look like.
Reasoning: React elements are lightweight descriptions, not real DOM nodes.

Q: Why use ReactDOM.createRoot in React 18?
A: It enables the new root API and concurrent features; it's the recommended entry.
Reasoning: the legacy render API is deprecated and lacks new scheduling features.

Q: What happens if document.getElementById('root') returns null?
A: createRoot throws because it needs a real DOM node to mount into.
Reasoning: React must attach to a concrete element to manage its children.

Q: Why is `className` used instead of `class`?
A: `class` is a reserved keyword in JS; React maps `className` to the HTML class attribute.
Reasoning: JSX is JavaScript, so prop names follow JS rules.

Q: Why do we pass keys when children are in an array?
A: Keys help React efficiently match and update siblings during reconciliation.
Reasoning: stable keys preserve element identity between renders, reducing rework.

Q: Do keys need to be unique across the whole app?
A: No, only within the same sibling list.
Reasoning: reconciliation only compares siblings at the same tree level.

Q: What is the difference between JSX and React.createElement?
A: JSX compiles to React.createElement calls; it's just more readable syntax.
Reasoning: JSX is a syntax sugar layer, not a runtime feature.

Q: Does React modify the DOM directly every render?
A: React builds a virtual tree and updates only the necessary DOM parts.
Reasoning: diffing reduces DOM operations, which are relatively expensive.
*/
