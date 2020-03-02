# FreightHub Test App

## Notes

- To start the App it is recommended to use `npm run dev` - as it will start both json server (on port 3000) and the app on port 5000
- I have not done any jest tests due to the time pressure as well - although can submit those at request
- I used CRA to save time, although can make a webpack version
- There are multitude of possible project file structures as well as state management solutions, for this example I chose a simple url state - as all parameters fit quite nicely into url - although I can easily rewrite (use) into an immutable redux one
- Advantages of the url state for this type of app are obvious - you can pass around links of specific queries to colleagues and clients to get precise picture of the needed data
- My goal was to be as simple and short as possible maintaining reasonable minimum number of files for such a small project as well as keeping size of those component files to no more then 200 lines to bolster maintainability
- another point of interest is the entire layout is done manually - no bootstrap or other UI libs (which significantly save time though) - this is probably why the whole UI does not look top notch
- no translations no google analytics also - can be added ar req.

## App UI flow

### User can:
- use search box to find any data (including IDs)
- use sorting in each column (second click on an active sorting icon will remove sorting)
- use paging which will be maintained across various sortings
- navigate to detail
- navigate from detail to the list

## Structure

```
/build - build folder (this folder is in .gitignore, so it is not part of this repository)
/docs - initial docs for the task (readme and criteria)
/public - app template
/server - backend part of app (json-server)
/src - frontend part of app
|_ /api - I like my apis be at the top (using simple fetch here)
|_ /components - common components
|_ /layout - layout (page) common components used to constuct a shell
|_ /pages - app pages, routing logic and sub components
|_ /services - rest api services and interfaces
|_ /strings - absent here but will be used to store i18n content and string interfaces; it is using react context api.
|_ /theme - styled components theme
.env.local - development env variables; production env variables are set manually on deployment server
...
```

## Technology

- react
- typescript
- styled-components
- ...

## Scripts

- `dev` - will run json-server and the app in parallel
- `start` - will run production version
- `build` - will create production bundle
- `clean` - will remove build folder
- `lint` - will run css and js linters
- `test` - will run all test (which are missing)

## Production deployment

- not done
