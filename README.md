# redux-constants-builder
Small package to reduce the boilerplate when writing redux constants.

The reason I wrote this thing is the size of Redux boilerplate that needs to be written at every project setup. There are similar libraries but I didn't like them so I wrote this one.

I plan to write builders for actions, reducers, selectors and sagas too. Stay tuned.

## Installation
`npm install --save redux-constants-builder`

## Usage
To import this package just use:
``` js
import {
  ConstantsBuilder,
  suffixes
} from 'redux-constants-builder'
```

## API
For now, there are only ConstantsBuilder and suffixes. More on suffixes below.

### `buildFlat(entity, verbs, suffixes, prefix)`
Builds constants from passed arguments and returns them as flat object.
- entity: string
- verbs: string | string[]
- suffixes?: string[][]
- prefix?: boolean

An example without a prefix:
``` js
const api = suffixes.api

const constants = ConstantsBuilder
  .buildFlat(
    'repos',
    ['get', 'post', 'clear'],
    [api, api, null]
  )
```
Results in:
```
{
  GET_TRY: 'repos-get-try',
  GET_SUCCESS: 'repos-get-success',
  GET_FAIL: 'repos-get-fail',
  POST_TRY: 'repos-post-try',
  POST_SUCCESS: 'repos-post-success',
  POST_FAIL: 'repos-post-fail',
  CLEAR: 'repos-clear'
}
```
Or when prefixed:
```
{
  REPOS_GET_TRY: 'repos-get-try',
  REPOS_GET_SUCCESS: 'repos-get-success',
  REPOS_GET_FAIL: 'repos-get-fail',
  REPOS_POST_TRY: 'repos-post-try',
  REPOS_POST_SUCCESS: 'repos-post-success',
  REPOS_POST_FAIL: 'repos-post-fail',
  REPOS_CLEAR: 'repos-clear'
}
```

### `buildDeep(entity, verbs, suffixes, prefix)`
Builds constants from passed arguments and returns them as deep object.
- entity: string
- verbs: string | string[]
- suffixes?: string[][]
- prefix?: boolean

An example without a prefix:
``` js
const api = suffixes.api

const constants = ConstantsBuilder
  .buildDeep(
    'repos',
    ['get', 'post', 'clear'],
    [api, api, null]
  )
```
Results in:
```
{
  GET: {
    TRY: 'repos-get-try',
    SUCCESS: 'repos-get-success',
    FAIL: 'repos-get-fail'
  },
  POST: {
    TRY: 'repos-post-try',
    SUCCESS: 'repos-post-success',
    FAIL: 'repos-post-fail'
  },
  CLEAR: 'repos-clear'
}
```
Or when prefixed:
```
{
  REPOS: {
    GET: {
      TRY: 'repos-get-try',
      SUCCESS: 'repos-get-success',
      FAIL: 'repos-get-fail'
    },
    POST: {
      TRY: 'repos-post-try',
      SUCCESS: 'repos-post-success',
      FAIL: 'repos-post-fail'
    },
    CLEAR: 'repos-clear'
  }
}
```

### Suffixes
Suffixes are just arrays of strings and you can create your own as you please. For example:
``` js
const randomSuffix = ['foo', 'bar', 'baz']

const constants = ConstantsBuilder
  .buildFlat(
    'fruit',
    ['apples', 'oranges'],
    [randomSuffix, null]
  )
```
Results in:
```
{
  APPLES_FOO: 'fruit-apples-foo',
  APPLES_BAR: 'fruit-apples-bar',
  APPLES_BAZ: 'fruit-apples-baz',
  ORANGES: 'fruit-oranges'
}
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT License

Copyright (c) 2017 Stjepan Golemac

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.