# react-save-refs

[![Circle CI](https://circleci.com/gh/AgentME/react-save-refs.svg?style=shield)](https://circleci.com/gh/AgentME/react-save-refs)
[![npm version](https://badge.fury.io/js/react-save-refs.svg)](https://badge.fury.io/js/react-save-refs)

This is a small utility function to make it easy for React components to deal
with refs on dynamically created elements.

The following example code assumes Babel with support for classes, JSX, and
property initializers is in use. You can get that by using the es2015, stage-1,
and react presets together.

```js
import React from 'react';
import saveRefs from 'react-save-refs';

class Foo extends React.Component {
  _items = new Map();

  render() {
    const items = new Array(5).fill(null).map((n, i) =>
      <div key={i}>
        <input type="text" ref={saveRefs(this._items, i)} />
      </div>
    );
    return (
      <div>
        <button onClick={this._onClick}>Alert</button>
        { items }
      </div>
    );
  }

  _onClick = () => {
    let parts = [];
    this._items.forEach(input => {
      parts.push(input.value)
    });
    alert('all inputs: ' + parts.join(', '));
  };
}
```

A reference to each input element is stored as a value in the `_items`
property in the above example.

The first argument to `saveRefs` must be the map to store the reference in, and
the second argument is the key to store the reference under. Subsequent calls
to `saveRefs` with the same arguments will return the same function until the
element is unmounted, so React knows that it doesn't need to call the ref
callback with null and then the element on every re-render.

This relies on Map and WeakMap being available globally. A global polyfill such
as [Babel's polyfill](https://babeljs.io/docs/usage/polyfill/) is required to
support older browsers that don't implement these.

## Types

Full [Flow Type](http://flowtype.org/) declarations for this module are
included! If you're using Flow, then no extra setup is necessary to take
advantage of them.
