/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var join = require( 'path' ).join;
var tape = require( 'tape' );
var readFileSync = require( '@stdlib/fs-read-file' ).sync;
var replace = require( '@stdlib/string-replace' );
var generate = require( './../lib/sync.js' );


// FIXTURES //

var re = /[\r\n\t ]/g;
var dir = join( __dirname, 'fixtures' );
var expected = readFileSync( join( dir, 'sync.js.txt' ), 'utf8' );
expected = replace( expected, re, '' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof generate, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a code string for timing a snippet', function test( t ) {
	var before;
	var after;
	var code;
	var opts;
	var out;

	before = 'var beep = \'boop\';';
	code = 'console.log( beep );';
	after = 'console.log( beep+\'!\' );';

	opts = {
		'before': before,
		'after': after,
		'iterations': 1000
	};
	out = generate( 0, code, opts );
	out = replace( out, re, '' );

	t.strictEqual( out, expected, 'returns timing code' );
	t.end();
});
