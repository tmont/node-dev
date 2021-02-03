const tap = require('tap');

const cli = require('../lib/cli.js');

tap.test('notify is enabled by default', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', 'test']);

  t.is(notify, true);
  t.done();
});

tap.test('--no-notify', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', '--no-notify', 'test']);

  t.is(notify, false);
  t.done();
});

tap.test('--notify=false', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', '--notify=false', 'test']);

  t.is(notify, false);
  t.done();
});

tap.test('--notify', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', '--notify', 'test']);

  t.is(notify, true);
  t.done();
});

tap.test('--notify=true', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', '--notify=true', 'test']);

  t.is(notify, true);
  t.done();
});

tap.test('notify can be disabled by .node-dev.json', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', 'test/fixture/server.js']);

  t.is(notify, false);
  t.done();
});

tap.test('cli overrides .node-dev.json from false to true', t => {
  const { opts: { notify } } = cli(['node', 'bin/node-dev', '--notify=true', 'test/fixture/server.js']);

  t.is(notify, true);
  t.done();
});

tap.test('-r ts-node/register --inspect test/fixture/server.js', t => {
  const argv = 'node bin/node-dev -r ts-node/register --inspect test/fixture/server.js'.split(' ');
  const { nodeArgs } = cli(argv);
  t.deepEqual(nodeArgs, ['-r', 'ts-node/register', '--inspect']);
  t.done();
});

tap.test('--inspect -r ts-node/register test/fixture/server.js', t => {
  const argv = 'node bin/node-dev --inspect -r ts-node/register test/fixture/server.js'.split(' ');
  const { nodeArgs } = cli(argv);
  t.deepEqual(nodeArgs, ['--inspect', '-r', 'ts-node/register']);
  t.done();
});

tap.test('--expose_gc gc.js foo', t => {
  const argv = 'node bin/node-dev --expose_gc test/fixture/gc.js test/fixture/foo'.split(' ');
  const { nodeArgs } = cli(argv);
  t.deepEqual(nodeArgs, ['--expose_gc']);
  t.done();
});

tap.test('--require=coffeescript/register test/fixture/server.coffee', t => {
  const argv = 'node bin/node-dev --require=coffeescript/register test/fixture/server.coffee'.split(' ');
  const { nodeArgs } = cli(argv);
  t.deepEqual(nodeArgs, ['--require=coffeescript/register']);
  t.done();
});

tap.test('-r coffeescript/register -r ts-node/register test/fixture/server.coffee', t => {
  const argv = 'node bin/node-dev -r coffeescript/register -r ts-node/register test/fixture/server.coffee'.split(' ');
  const { nodeArgs } = cli(argv);
  t.deepEqual(nodeArgs, ['-r', 'coffeescript/register', '-r', 'ts-node/register']);
  t.done();
});

tap.test('log_uncaught is enabled by default', t => {
  const { opts: { log_uncaught: logUncaught } } = cli(['node', 'bin/node-dev', 'test']);

  t.is(logUncaught, true);
  t.done();
});

tap.test('--no-log_uncaught', t => {
  const { opts: { log_uncaught: logUncaught } } = cli(['node', 'bin/node-dev', '--no-log_uncaught', 'test']);

  t.is(logUncaught, false);
  t.done();
});

tap.test('--log_uncaught=false', t => {
  const { opts: { log_uncaught: logUncaught } } = cli(['node', 'bin/node-dev', '--log_uncaught=false', 'test']);

  t.is(logUncaught, false);
  t.done();
});

tap.test('--log_uncaught', t => {
  const { opts: { log_uncaught: logUncaught } } = cli(['node', 'bin/node-dev', '--log_uncaught', 'test']);

  t.is(logUncaught, true);
  t.done();
});

tap.test('--log_uncaught=true', t => {
  const { opts: { log_uncaught: logUncaught } } = cli(['node', 'bin/node-dev', '--log_uncaught=true', 'test']);

  t.is(logUncaught, true);
  t.done();
});

tap.test('debounce is 0 by default', t => {
  const { opts: { debounce } } = cli(['node', 'bin/node-dev', 'test']);

  t.is(debounce, 0);
  t.done();
});

tap.test('--debounce=1000', t => {
  const { opts: { debounce } } = cli(['node', 'bin/node-dev', '--debounce=1000', 'test']);

  t.is(debounce, 1000);
  t.done();
});