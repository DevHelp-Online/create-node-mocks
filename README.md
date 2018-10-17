# Create Node Window|Document|Global Mocks

> Useful for Angular Universal projects or any JS applications doing SSR where window|document|global objects may be used in Node. 

With createNodeMocks() you'll be able to automatically mock & stub out common global (browser-only) APIs such as `window | document | navigator` (and others), and easily inject any additional mocks you need! 

## Installation

Install & save the library to your package.json:

```bash
$ npm i -S @devhelponline/create-node-mocks
```

---

## Useage

Within your main Node file (regardless of framework)

```typescript
import { createNodeMocks } from '@devhelponline/create-node-mocks';
import { readFileSync } from 'fs';
import { join } from 'path';

// Grab your index.html Template for us to create a Domino wrapper around
// In this case, we're grabbing it for an Angular-CLI 6+ project
const template = readFileSync(join(DIST_FOLDER, 'ANGULAR_CLI_PROJECT_NAME', 'index.html')).toString();

createNodeMocks(template);
```

Voila, common window|document errors will gone. 
Make sure to always wrap these around a test to determine whether this is a Server 
environment, and ignore them.

### Add custom Window or (Node) Global mocks

```typescript
import { createNodeMocks, IMock } from './node-mocks';
import { readFileSync } from 'fs';
import { join } from 'path';

const template = readFileSync(join(DIST_FOLDER, 'ANGULAR_CLI_PROJECT_NAME', 'index.html')).toString();

const noop = () => {};

// Window Mocks
const additionalWindowMocks: IMock = {
  alert: () => {},
  someWindowObject: {}
};

// Node Global Mocks
// In this example we want to add a few jQuery mocks
const nodeGlobalMocks: IMock = {
  jQuery: () => {
    return {
      addClass: noop,
      removeClass: noop,
      remove: noop,
      click: noop,
      html: noop
    };
  }
};

createNodeMocks(template, additionalWindowMocks, nodeGlobalMocks);
```

---

# How to Contribute?

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
npm run build
```

To lint all `*.ts` files:

```bash
npm run lint
```

## License

MIT © [Mark Pieszak | DevHelp Online](mailto:hello@devhelp.online)

Twitter: [@MarkPieszak](https://twitter.com/MarkPieszak)

----

# DevHelp.Online - Angular & ASP.NET - Consulting | Training | Development

Check out **[www.DevHelp.Online](http://DevHelp.Online)** for more info! Twitter [@DevHelpOnline](https://twitter.com/DevHelpOnline)

Contact us at <hello@devhelp.online>, and let's talk about your projects needs.

<p align="center">
    <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/768119/images/4272479/Screen_Shot_2017-10-27_at_6.58.34_PM.png" alt="DevHelp.Online - Angular ASPNET JavaScript Consulting Development and Training">
</p>
