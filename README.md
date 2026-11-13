<img src="./.github/banner.svg" alt="poms-lookup" width="100%">

<p align="center">Pick media from POMS in a popup and hand them to your CMS.</p>

Lookup one or more media objects in POMS. Designed to be integrated in your CMS.

## What it does

- **Searches POMS.** Editors search media by text, newest first, optionally within a POMS profile.
- **Takes its settings from the URL.** Your CMS can preset the media types, broadcasters, profile and the maximum number of items to select.
- **Hands the selection to your CMS.** The chosen items, each with its MID, title, date, type and AV type, are posted as a message to the window that opened the lookup.

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

## Contributing

Working on this repo? [AGENTS.md](./AGENTS.md) has the setup, conventions and checks.
