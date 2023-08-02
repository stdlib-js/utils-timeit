<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# timeit

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Time a snippet.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

```javascript
import timeit from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-timeit@deno/mod.js';
```

#### timeit( code, \[options,] clbk )

Times a snippet.

```javascript
var code = 'var x = Math.pow( Math.random(), 3 );';
code += 'if ( x !== x ) {';
code += 'throw new Error( \'Something went wrong.\' );';
code += '}';

timeit( code, done );

function done( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
    /* e.g., =>
        {
            'iterations': 1000000,
            'repeats': 3,
            'min': [0,135734733],       // [seconds,nanoseconds]
            'elapsed': 0.135734733,     // seconds
            'rate': 7367311.062526641,  // iterations/second
            'times': [                  // raw timing results
                [0,145641393],
                [0,135734733],
                [0,140462721]
            ]
        }
    */
}
```

The function supports the following `options`:

-   **before**: setup code. Default: `""`.
-   **after**: cleanup code. Default: `""`.
-   **iterations**: number of iterations. If `null`, the number of iterations is determined by trying successive powers of `10` until the total time is at least `0.1` seconds. Default: `1e6`.
-   **repeats**: number of repeats. Default: `3`.
-   **asynchronous**: `boolean` indicating whether a snippet is asynchronous. Default: `false`.

To perform any setup or initialization, provide setup code.

```javascript
var setup = 'var randu = require( \'@stdlib/random-base-randu\' );';
setup += 'var pow = require( \'@stdlib/math-base-special-pow\' );';

var code = 'var x = pow( randu(), 3 );';
code += 'if ( x !== x ) {';
code += 'throw new Error( \'Something went wrong.\' );';
code += '}';

var opts = {
    'before': setup
};

timeit( code, opts, done );

function done( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
}
```

To perform any cleanup, provide cleanup code.

```javascript
var setup = 'var randu = require( \'@stdlib/random-base-randu\' );';
setup += 'var hypot = require( \'@stdlib/math-base-special-hypot\' );';

var code = 'var h = hypot( randu()*10, randu()*10 );';
code += 'if ( h < 0 || h > 200 ) {';
code += 'throw new Error( \'Something went wrong.\' );';
code += '}';

var cleanup = 'if ( h !== h ) {';
cleanup += 'throw new Error( \'Something went wrong.\' );';
cleanup += '}';

var opts = {
    'before': setup,
    'after': cleanup
};

timeit( code, opts, done );

function done( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
}
```

To time an asynchronous snippet, set the `asynchronous` option to `true`.

```javascript
var code = 'var x = Math.pow( Math.random(), 3 );';
code += 'if ( x !== x ) {';
code += 'var err = new Error( \'Something went wrong.\' );';
code += 'next( err );';
code += '}';
code += 'process.nextTick( next );';

var opts = {
    'iterations': 1e2,
    'asynchronous': true
};

timeit( code, opts, done );

function done( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
}
```

If `asynchronous` is `true`, the implementation assumes that `before`, `after`, and `code` snippets are **all** asynchronous. Accordingly, these snippets should invoke a `next( [error] )` callback once complete. For example, given the following snippet,

<!-- run-disable -->

<!-- eslint-disable -->

```javascript
setTimeout( done, 0 );

function done( error ) {
    if ( error ) {
        return next( error );
    }
    next();
}
```

the implementation wraps the snippet within a function having the following signature

```javascript
function wrapped( state, next ) {
    setTimeout( done, 0 );

    function done( error ) {
        if ( error ) {
            return next( error );
        }
        next();
    }
}
```

The `state` parameter is simply an empty `{}` which allows the `before`, `after`, and `code` snippets to share state.

```javascript
function before( state, next ) {
    state.counter = 0;
}

function code( state, next ) {
    setTimeout( done, 0 );

    function done( error ) {
        if ( error ) {
            return next( error );
        }
        state.counter += 1;
        next();
    }
}

function after( state, next ) {
    var err;
    if ( state.counter !== state.counter ) {
        err = new Error( 'Something went wrong!' );
        return next( err );
    }
    next();
}
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   Snippets **always** run in [strict mode][strict-mode].
-   **Always** verify results. Doing so prevents the compiler from performing dead code elimination and other optimization techniques, which would render timing results meaningless.
-   Executed code is **not** sandboxed and has access to the global state. You are **strongly** advised **against** timing untrusted code. To time untrusted code, do so in an isolated environment (e.g., a separate process with restricted access to both global state and the host environment).
-   Wrapping asynchronous code **does** add overhead, but, in most cases, the overhead should be negligible compared to the execution cost of the timed snippet.
-   Ensure that, when `asynchronous` is `true`, the main `code` snippet is actually asynchronous. If a snippet releases the [zalgo][zalgo], an error complaining about exceeding the maximum call stack size is highly likely.
-   While many benchmark frameworks calculate various statistics over raw timing results (e.g., mean and standard deviation), do **not** do this. Instead, consider the fastest time an approximate lower bound for how fast an environment can execute a snippet. Slower times are more likely attributable to other processes interfering with timing accuracy rather than attributable to variability in JavaScript's speed. In which case, the minimum time is most likely the only result of interest. When considering all raw timing results, apply common sense rather than statistics.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var join = require( 'path' ).join;
var readFileSync = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/fs-read-file' ).sync;
import timeit from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-timeit@deno/mod.js';

var before = readFileSync( join( __dirname, 'examples', 'before.txt' ), 'utf8' );
var code = readFileSync( join( __dirname, 'examples', 'code.txt' ), 'utf8' );

var opts = {
    'iterations': 1e6,
    'repeats': 5,
    'before': before
};

timeit( code, opts, done );

function done( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
}
```

</section>

<!-- /.examples -->

<!-- Section for describing a command-line interface. -->



<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

* * *

<section class="references">

## References

-   Chen, Jiahao, and Jarrett Revels. 2016. "Robust benchmarking in noisy environments." _CoRR_ abs/1608.04295 (August). <http://arxiv.org/abs/1608.04295>.

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/utils-timeit.svg
[npm-url]: https://npmjs.org/package/@stdlib/utils-timeit

[test-image]: https://github.com/stdlib-js/utils-timeit/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/utils-timeit/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/utils-timeit/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/utils-timeit?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/utils-timeit.svg
[dependencies-url]: https://david-dm.org/stdlib-js/utils-timeit/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[cli-section]: https://github.com/stdlib-js/utils-timeit#cli
[cli-url]: https://github.com/stdlib-js/utils-timeit/tree/cli
[@stdlib/utils-timeit]: https://github.com/stdlib-js/utils-timeit/tree/main

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/utils-timeit/tree/deno
[umd-url]: https://github.com/stdlib-js/utils-timeit/tree/umd
[esm-url]: https://github.com/stdlib-js/utils-timeit/tree/esm
[branches-url]: https://github.com/stdlib-js/utils-timeit/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-timeit/main/LICENSE

[strict-mode]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

[csv]: https://tools.ietf.org/html/rfc4180

[zalgo]: http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony

</section>

<!-- /.links -->
