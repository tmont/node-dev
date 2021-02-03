const fs = require('fs');
const path = require('path');

const resolveMain = require('./resolve-main');

const defaultConfig = {
  clear: false,
  debounce: 0,
  dedupe: false,
  deps: 1,
  extensions: {
    coffee: 'coffeescript/register',
    ls: 'LiveScript',
    ts: 'ts-node/register'
  },
  fork: true,
  graceful_ipc: '',
  ignore: [],
  log_uncaught: true,
  notify: true,
  poll: false,
  respawn: false,
  timestamp: 'HH:MM:ss',
  vm: true
};

function read(dir) {
  const f = path.resolve(dir, '.node-dev.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : {};
}

function getConfig(script, overrides) {
  const main = resolveMain(script);
  const dir = main ? path.dirname(main) : '.';

  return Object.assign(
    defaultConfig,
    read(process.env.HOME || process.env.USERPROFILE),
    read(process.cwd()),
    read(dir),
    overrides || {}
  );
}

module.exports = {
  defaultConfig,
  getConfig
};
