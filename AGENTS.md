# poms-lookup

A React app that searches media in POMS through the NPO API and posts the selected items to the window that opened it. CMSes open it in a popup, so its README is written for the people who integrate it.

## Ways to hurt yourself

1. **An origin the NPO API does not allow.** `HOST` is used as the origin in NPO API requests, so set it to an allowed host and add that host to your `/etc/hosts` file. Otherwise every search fails.

## Running locally

Assuming you have [NVM](https://github.com/creationix/nvm) installed:

1. Clone the repository.
2. Run `nvm use` to switch to the right Node version.
3. Run `npm install` to install the dependencies.
4. Set the environment variables below.
5. Run `npm start` to start the local development build.

To use the NPO API, create a `.env` file in the project root (it is gitignored):

```bash
HOST=<your-hostname>
REACT_APP_NPO_API_KEY=<your-key>
REACT_APP_NPO_API_SECRET=<your-secret>
```

`REACT_APP_NPO_API_KEY` and `REACT_APP_NPO_API_SECRET` are the credentials that sign the NPO API requests.

## Done means green

A change is done when this passes:

```bash
CI=true npm test && npm run build
```

`npm test` runs [JavaScript Standard Style](http://standardjs.com/) and then the Jest tests; without `CI=true` Jest stays in watch mode. `npm run lint-fix` fixes most style errors. There is no CI.

## Documentation

Most changes need no documentation; agents can read the code.

- The README is for CMS integrators: keep its URL parameters and the message format current when you change them.
- A reason that belongs to one spot in the code goes in a short comment there.

## How it works

The app reads the `types`, `broadcasters`, `profile` and `limit` parameters from its own URL. Each search posts a query to the NPO API's `/media` endpoint through Axios, signed by `npo-api-interceptor`, and keeps the MID, title, date, type and AV type of each result. When the editor chooses the selection, the app posts `{ items }` to `window.opener` with target origin `*`, which is why the receiving page must check the origin. `public/demo/` is the example integration the README links to. The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and is not ejected, so `react-scripts` runs start, build and test, and inlines the `REACT_APP_` variables into the built JavaScript. Its [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) covers common tasks.

## Where code lives

- `src/api/` - the NPO API call and the mapping of a result to an item.
- `src/containers/` - the app and the search form, which hold state.
- `src/components/` - presentational components.
- `src/utils/` - reading the URL parameters.
- `public/demo/` - the example CMS integration.
