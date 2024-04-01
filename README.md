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


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# timeit

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Time a snippet.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->





<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->



<!-- Package usage examples. -->



<!-- Section for describing a command-line interface. -->



<section class="cli">



<section class="installation">

## Installation

To use as a general utility, install the CLI package globally

```bash
npm install -g @stdlib/utils-timeit-cli
```

</section>
<!-- CLI usage documentation. -->


<section class="usage">

## Usage

```text
Usage: timeit [options] [<code>]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --iterations iter     Number of iterations.
         --repeats repeats     Number of repeats. Default: 3.
         --before setup        Setup code.
         --after cleanup       Cleanup code.
         --async               Time asynchronous code.
         --format fmt          Output format: pretty, csv, json. Default: pretty.
```

</section>

<!-- /.usage -->

<!-- CLI usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   When the output format is `csv`, the output consists of **only** raw timing results.
-   If not explicitly provided `--iterations`, the implementation tries successive powers of `10` until the total time is at least `0.1` seconds.

</section>

<!-- /.notes -->

<!-- CLI usage examples. -->

<section class="examples">

## Examples

```bash
$ timeit "$(cat ./examples/code.txt)" --before "$(cat ./examples/before.txt)" --iterations 1000000

iterations: 1000000
repeats: 3
iterations/s: 7261975.851461222
elapsed time: 0.13770357 sec
lower bound: 0.13770357 usec/iteration
```

To output results as JSON,

```bash
$ timeit "$(cat ./examples/code.txt)" --before "$(cat ./examples/before.txt)" --iterations 1000000 --format json
{"iterations":1000000,"repeats":3,"min":[0,132431806],"elapsed":0.132431806,"rate":7551056.1261997735,"times":[[0,142115140],[0,132431806],[0,134808376]]}
```

To output results as comma-separated values ([CSV][csv]),

```bash
$ timeit "$(cat ./examples/code.txt)" --before "$(cat ./examples/before.txt)" --iterations 1000000 --format csv
seconds,nanoseconds
0,139365407
0,138033545
0,135175834
```

To use as part of a pipeline,

```bash
$ cat ./examples/code.txt | timeit --before "$(cat ./examples/before.txt)" --iterations 1000000

iterations: 1000000
repeats: 3
iterations/s: 7433536.674260073
elapsed time: 0.134525468 sec
lower bound: 0.134525468 usec/iteration
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

* * *

<section class="references">

## References

-   Chen, Jiahao, and Jarrett Revels. 2016. "Robust benchmarking in noisy environments." _CoRR_ abs/1608.04295 (August). <http://arxiv.org/abs/1608.04295>.

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

## See Also

-   <span class="package-name">[`@stdlib/utils-timeit`][@stdlib/utils-timeit]</span><span class="delimiter">: </span><span class="description">time a snippet.</span>


</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/utils-timeit-cli.svg
[npm-url]: https://npmjs.org/package/@stdlib/utils-timeit-cli

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
[deno-readme]: https://github.com/stdlib-js/utils-timeit/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/utils-timeit/tree/umd
[umd-readme]: https://github.com/stdlib-js/utils-timeit/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/utils-timeit/tree/esm
[esm-readme]: https://github.com/stdlib-js/utils-timeit/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/utils-timeit/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-timeit/main/LICENSE

[strict-mode]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

[csv]: https://tools.ietf.org/html/rfc4180

[zalgo]: http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony

</section>

<!-- /.links -->
