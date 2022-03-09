const meow = require("meow");
const meowHelper = require('./lib/cli-meow-help');

const flags = {
  ad: {
    type: "boolean",
    default: true,
    desc: "Print the ad info"
  },
  'no-ad': {
    type: "boolean",
    default: false,
    desc: "Don't print the ad info"
  },
  bio: {
    type: "boolean",
    default: true,
    desc: "Print the bio info"
  },
  'no-bio': {
    type: "boolean",
    default: false,
    desc: "Don't print the bio info"
  },
  social: {
    type: "boolean",
    default: true,
    desc: "Print the social info"
  },
  'no-social': {
    type: "boolean",
    default: false,
    desc: "Don't print the social info"
  },
  clear: {
    type: "boolean",
    default: true,
    alias: "c",
    desc: "Clears the console"
  },
  'no-clear': {
    type: "boolean",
    default: false,
    desc: "Don't clears the console"
  },
  debug: {
    type: "boolean",
    default: false,
    alias: "d",
    desc: "Print the debugger info"
  },
  'no-debug': {
    type: "boolean",
    default: false,
    desc: "Dont't print the debugger info"
  },
  minimal: {
    type: "boolean",
    default: false,
    alias: 'm',
    desc: "Print the minimal info"
  },
  posts: {
    type: "boolean",
    default: false,
    alias: 'p',
    desc: "Print last 10 posts from liuyunyun.xyz"
  },
  stats: {
    type: "boolean",
    default: false,
    alias: 's',
    desc: "Print stats from github"
  },
  version: {
    type: "boolean",
    default: false,
    alias: "v",
    desc: "Print the version info"
  },
};

const commands = {
  help: {
    desc: 'Print the help info'
  }
};

const helpText = meowHelper({
  name: 'npx node-yun',
  flags,
  commands,
  defaults: false,
  desc: "CLI Options Docs",
  header: 'This is Header...',
  footer: "This is Footer..."
});

const options = {
  inferType: true,
  hardRejection: false,
  description: false,
  flags
};

module.exports = meow(helpText, options);
