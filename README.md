# POMS Lookup

Lookup one or more media objects in POMS. Designed to be integrated in your CMS.

## CMS Integration

An example integration is available at: https://pomslookup.eo.nl/demo/

It boils down to:

1. Add an event listener for the `message` event (see [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#The_dispatched_event)).
2. After a user action (e.g. user clicks a button), open the POMS Lookup in a popup window.
3. After the user selects one or more items and clicks the "Choose selection" button, a message will be posted to your window. The items will be available as an array on the `data` property of the message event.

In the `message` event handler you should check if the origin of the message is the POMS Lookup page, to prevent security issues. You can also close the popup window there, if desired.

### Filtering

It is possible to add some filters to the POMS Lookup URL, in order to set these as default filters in POMS Lookup. For example, in some situations you want to lookup seasons, in other situations you want to lookup broadcasts and clips.

Currently supported filters:

- `types`: Types to match
- `broadcasters`: Broadcasters to match

For example: `CLIP`s and `BROADCAST`s from the `EO`:

```
https://pomslookup.eo.nl/?types=CLIP&types=BROADCAST&broadcasters=EO
```

### Profile

It is possible to use a profile by adding the `profile` parameter to the POMS Lookup URL. Please note that the existence of the profile is not validated. For example, to specify the `eo` profile, use this URL to POMS Lookup:

```
https://pomslookup.eo.nl/?profile=eo
```

You can use both a profile and filtering, if desired.

### Limit

It is possible to limit the number of items that can be selected. For example, if you only expect one item from the POMS Lookup or if you expect a maximum of five items from the POMS Lookup. You can specify the limit by adding the `limit` parameter to the POMS Lookup URL:

```
https://pomslookup.eo.nl/?limit=1
```

## Development

Assuming you have [NVM](https://github.com/creationix/nvm) and [Yarn](https://yarnpkg.com/lang/en/) installed:

1. Clone the repository.
2. Run `nvm use` to switch to the right Node version.
3. Run `yarn install` to install the dependencies.
4. Set the right environment variables (see below).
4. Run `yarn start` to start the local development build.

In order to use the NPO API, you need to set a number of environment variables. The easiest way is to create a `.env` file in the project root, containing:

```bash
HOST=<your-hostname>
REACT_APP_NPO_API_KEY=<your-key>
REACT_APP_NPO_API_SECRET=<your-secret>
```

The `HOST` is used as the origin in NPO API requests, so be sure to set it to an allowed host. Don't forget to add this host to your `/etc/hosts` file.

The `REACT_APP_NPO_API_KEY` and `REACT_APP_NPO_API_SECRET` should be set to the credentials to use to sign the NPO API request.

## User Guide

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Information on how to perform common tasks can be found in the most recent version of the User Guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
