
export interface IMock {
  [key: string]: any;
}

/*
 * Window | Document | Global mocking
 */

export function createNodeMocks (
  template: string,
  additionalWindowMocks: IMock = {},
  globalNodeMocks: IMock = {}
) {
  if (!template && typeof template !== 'string') {
    console.error(`
      A template of your index.html file must be provided
      IE:
        import { createNodeMocks } from 
        const template = readFileSync(join(DIST_FOLDER, 'Your_CLI_Project_Name', 'index.html')).toString();
        createNodeMocks(template);
    `);
    return;
  }
  const domino = require('domino');
  const win = domino.createWindow(template);
  const noop = () => {};

  win.scrollTo = noop;
  win.screen = {};
  win.alert = noop;

  Object.keys(additionalWindowMocks).forEach(key => {
    console.log(additionalWindowMocks[key]);
    win[key] = additionalWindowMocks[key];
  });

  global['window'] = win;
  global['document'] = win.document;
  global['navigator'] = {};
  global['CSS'] = null;
  global['Prism'] = null;
  global['HTMLElement'] = null;

  Object.keys(globalNodeMocks).forEach(key => {
    console.log(globalNodeMocks[key]);
    global[key] = globalNodeMocks[key];
  });

  Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
}