# Bullsh*t Chess
Chess, but you can do anything you want!
This website serves as the central repository for the ridiculous things people
have done in this game and as a source for the "formal" rules where needed.

## Features
- [x] Database of "Bullsh*ts": custom pieces and special events (Currently a
  single JSON file...).
- [x] Menu to create and publish your own Bullsh*ts.
- [x] Admin menu to modify and delete existing Bullsh*ts.
- [ ] Screen to draw a random hand of pre-existing Bullsh*ts if you want to
  limit yourself in a game.
- [ ] Actual explanation of the game.
- [ ] Formalisation of the set of rules and restrictions we have found to make a
  relatively fair and balanced system.
- [ ] Guide to creating (good) bullsh*ts.

## Hosting
This project is currently unfinished and not currently hosted anywhere.
If you wish to host this project for yourself: 
1. Download this repo: `git clone https://github.com/droshux/bschess.git`.
2. Compile the lib files: ` cd lib/; npm run build; cd .. `.
3. Start up the backend: `cd backend/; bun run start &; cd ..`.
4. Start up the frontend: `cd frontend/; npm run dev &; cd ..`.
5. The website is now hosted on `localhost:5173`.

This will be changed in the future and when it is I will be officially hosting
the site.
