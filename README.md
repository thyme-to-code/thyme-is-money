# Fullstack Collection App

This repo is designed to provide space to code a fullstack app. It contains node modules and folders for databases, routes, api requests, react components, and redux actions and creators. Let's get going!

```
npm install
git checkout -b <branchname>
npm run dev
```

## Notes

A few notes to keep you out of trouble:
- When running knex, run `npm run knex <command>`, e.g. `npm run knex migrate:latest` rather than using `npx`
- When running webpack, run `npm run webpack <extra commands>`, e.g. `npm run webpack`, rather than using `npx`
- This repo is set up for SCSS (aka "sass" style CSS). To avoid getting into a "why is my CSS not working" trap you'll need to make your CSS changes in /client/styles/index.scss and NOT in /server/public/styles.css

## How to start

First, decide what you would like to keep a collection of. This could be a repo for keeping track of movies, books, gifs, cars, rocks, anything you fancy!

**Note:** the aim is to have some simple data. If you think you might need more than one database table, or have lots of details you want to store, how could you simplify the information you're keeping track of? Leave more complex data until later in the project. For example, I want to keep track of books that I want to read, ones that I have read, and ones that I own. To start with though, let's keep track of the books themselves. My data might look like:

|id|title|author|
|---|---|---|
| 1 | Ready Player One | Ernest Cline |
| 2 | Throwing Rocks at the Google Bus | Douglas Rushkoff |

Our first job is getting something showing on the front end from our database. Here's a list of steps in case they are useful. You can build in any order you like though ;)

### Back End

1.  Design a database to store a list of your things (e.g. books)
1.  Build the migrations and seed data
1.  Build an API (back end route) to get the information from your database
1.  Test your API with Insomnia

### Front End

1.  Build a React Component with static html
1.  Build Redux Reducer. Start with a hardcoded initial state, for example:
```js
const initialState = [{ id: 1, title: 'Ready Player One', author: 'Ernest Cline' }]
```
3.  Use `useSelector` to display the redux state you hardcoded in the React Component
1.  Build an API Client in the front end to request the information from your routes
1.  Build Thunk Actions to use the API and get the information
1.  Build Redux Actions to save task data from the thunk
1.  Use `useDispatch` and `useEffect` to dispatch the thunk when your app loads

## Next steps

At this stage we should be able to view our information. Below are suggested next steps, though you might prioritize these in another order.

- Include the ability to add a new record (will need a form in your components)
- Include the ability to remove/delete records
- Include the ability to update records (e.g. for correcting typos)
  - You might have some other information (e.g. unread books vs. read books) that should be included in your database design, but this may require adjusting your database design - start simple!
- Is there any complex data you chose to not include earlier or any way you could expand this dataset?
- Could you add an external API (maybe an inspirational quote in the footer?)
- If you haven't already, CSS!
