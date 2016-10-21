// Node Libraries
const fs = require('fs');

// External Dependencies
const sass = require('node-sass');
const bf = require('browserify');
const min = require('harp-minify');

// Configure browserify and babel
const b = bf().transform('babelify', { presets: ['es2015'] });

// Read utf8 contents of a file
const f = path => fs.readFileSync(path, 'utf8');

// Transforms sass file into css string
const css = new Promise((resolve, reject) => {
  resolve(sass.renderSync({
    data: f('./src/index.scss'),
  }).css.toString());
});

// Transforms es6 file into es5 string
const js = new Promise((resolve, reject) => {
  b.add('./src/index.js').bundle((err, x) => {
    if(err) reject(err);
    else resolve(x.toString());
  });
});

// Inject transformed code into dist file
Promise.all([js, css]).then(files => {
  fs.writeFileSync('./index.html', f('./index.html')
    .replace(/<style>(.+)?<\/style>/, `<style>${min.css(files[1])}</style>`)
    .replace(/<script>(.+)?<\/script>/, `<script>${min.js(files[0])}</script>`)
  , 'utf8');
}).catch(e => console.log(e));
