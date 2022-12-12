import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import image from '@rollup/plugin-image';
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';
const html = require('@rollup/plugin-html');

const getHtml = () => {
  const basePath = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '';

  // ------ script to use devstack API endpoint ------
  //   <script>
  //   Razorpay = {
  //     config: {
  //       api: 'https://api-web-tarun-khanna.dev.razorpay.in/',
  //       frame: 'https://api-web-tarun-khanna.dev.razorpay.in/test/checkout.html?branch=test/fpx',
  //     },
  //   };
  // </script>
  // ------ loading animation script ------
  // <script src="https://betacdn.np.razorpay.in/checkout/builds/branch-builds/feat/loadingAnimation/v1/checkout.js"></script>
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
  
      <title>Digital Dukaan</title>
  
      <link rel="icon" href="${basePath}/assets/images/logo.svg" />
      <link rel="stylesheet" href="${basePath}/global.css" />
      <link rel="stylesheet" href="${basePath}/bundle.css" />

      <script defer src="${basePath}/bundle.js"></script>
    
    </head>
  

    <body></body>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    
  </html>
  `;
};

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    html({
      template: getHtml,
    }),
    replace({
      process: JSON.stringify({
        env: {
          isProd: production,
          ...config().parsed,
        },
      }),
    }),
    image(),
    svelte({
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
