# react-save-refs

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/react-save-refs/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/react-save-refs.svg?style=flat)](https://www.npmjs.com/package/react-save-refs) [![CircleCI Status](https://circleci.com/gh/Macil/react-save-refs.svg?style=shield)](https://circleci.com/gh/Macil/react-save-refs) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/react-save-refs.svg)](https://greenkeeper.io/)

This is a small utility function to make it easy for React components to deal
with refs on dynamically created elements.

**This package is deprecated in favor of [react-multi-ref](https://github.com/Macil/react-multi-ref). Its API is better and avoids the need for a WeakMap internally.**

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
as [Babel's polyfill](https://babeljs.io/docs/en/babel-polyfill/) is required
to support older browsers that don't implement these.

## Types

Both [TypeScript](https://www.typescriptlang.org/) and
[Flow](https://flowtype.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
