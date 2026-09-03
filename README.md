# MGM-tour-UV

Accompaniment to digital tour of the Mineralogical Geological Museum of the TU Delft Science Centre.

Website to load [Universal Viewer](https://github.com/UniversalViewer/universalviewer/tree/dev) with a specific configuration.

## Usage

Load using following query parameters:

```text
/?config=<configuration>&manifest=<manifest_url>
```

- Configurations available (found in `./configs/):
    - Mobile
        - manifest: `mob_man`
        - collection: `mob_col`
    - General
        - manifest: `gen_man`
        - collection: `gen_col`

## Local installation

```sh
npm install
npm run dev
```


