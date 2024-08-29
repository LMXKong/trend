const rollup = require('rollup');
const _path = require('path');
const fs = require('fs');
const less = require('rollup-plugin-less');
const root = _path.resolve(__dirname, '../');
const modulepath = `${root}/src/components/`;

const dirs = [`${root}/es/lib`, `${root}/es/components`];
const modules = {};

const lessParam = {
  output: function(csscode, sourcepath) {
    sourcepath = sourcepath.replace(`${root}/src/components/`, '');
    const paths = sourcepath.split('/');
    const modulekey = paths[0];
    const module = modules[modulekey];
    const filename = paths[paths.length - 1];
    mkdirsync(`${dirs[1]}/${sourcepath.replace(filename, '')}`);
    sourcepath = sourcepath.replace('.less', '.css');
    const path = `${dirs[1]}/${sourcepath}`;
    console.log(`write css [${path}]`);
    fs.writeFileSync(path, csscode);
    module.css.push(sourcepath.replace(modulekey, '.'));
    return `${dirs[0]}/${sourcepath}`;
  }
}
function mkdirsync(path) {
  if (!fs.existsSync(path)) {
    mkdirsync(_path.resolve(path, '../'));
    fs.mkdirSync(path);
  }
  return true;
}

dirs.forEach(path => mkdirsync(path));

const inputfile = `${root}/inputfile.js`;
const paths = fs.readdirSync(modulepath);
paths.filter((path) => fs.statSync(`${modulepath}${path}`).isDirectory())
  .forEach(name => {
    const modulename = name.replace(/\b[a-z]/, function(s){ return s.toUpperCase() });
    const path = `${dirs[1]}/${name}`;
    mkdirsync(path);
    modules[name] = {
      import: `import { ${modulename} } from '../../lib';\nexport default ${modulename};`,
      modulename,
      filename: name,
      css: [],
      path
    };
  });


fs.writeFileSync(inputfile, Object.keys(modules).map(key => {
  const module = modules[key];
  return `export { default as ${module.modulename} } from './src/components/${key}'`;
}).join('\n'));

const config = require('./rollup.config.js');
config.input = inputfile;
config.plugins.push(less(lessParam));
(
  async function() {
    const bundle = await rollup.rollup(config);
    const { code, map } = await bundle.generate( config.output );
    await bundle.write(config.output);
    const indexContent = [];
    Object.values(modules).forEach((module) => {
      fs.writeFileSync(`${module.path}/index.tsx`, `${module.css.map((css) => `import '${css}'`).join('\n')}\n${module.import}`);
      indexContent.push(`export { default as ${module.modulename} } from './components/${module.filename}'`);
    });
    indexContent.push('import \'./css.less\'');
    fs.writeFileSync(`${root}/es/index.tsx`, indexContent.join('\n'));
    fs.writeFileSync(`${root}/es/css.less`, '@import \'~antd/dist/antd.css\';');
  }
)();

