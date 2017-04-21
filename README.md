# redux-constants-builder
Small package to reduce the boilerplate when writing redux constants.

The reason I wrote this thing is the size of Redux boilerplate that needs to be written at every project setup. There are similar libraries but I didn't like them so I wrote this one.
## Installation
TODO: Describe the installation process
## Usage
``` js
import ConstantBuilder, { suffixes } from 'redux-constant-builder'

const constants = ConstantBuilder.buildDeep(
  'auth',
  ['reset', 'login', 'refresh'],
  [null, suffixes.api, suffixes.api]
)
```
Results in:
``` js
{
  RESET: 'auth-reset',
  LOGIN: {
    TRY: 'auth-login-try',
    SUCCESS: 'auth-login-success',
    FAIL: 'auth-login-fail'
  },
  REFRESH: {
    TRY: 'auth-refresh-try',
    SUCCESS: 'auth-refresh-success',
    FAIL: 'auth-refresh-fail'
  }
}
```
And if you replace `buildDeep` with `buildFlat` you get:
``` js
{
  AUTH_RESET_TOKENS: 'auth-reset',
  AUTH_LOGIN_TRY: 'auth-login-try',
  AUTH_LOGIN_SUCCESS: 'auth-login-success',
  AUTH_LOGIN_FAIL: 'auth-login-fail',
  AUTH_REFRESH_TRY: 'auth-refresh-try',
  AUTH_REFRESH_SUCCESS: 'auth-refresh-success',
  AUTH_REFRESH_FAIL: 'auth-refresh-fail'
}
```
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## History
TODO: Write history
## Credits
TODO: Write credits
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