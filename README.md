# Turso reference documentation

Source code for Turso documentation hosted at https://docs.turso.tech.

## Setup

1. Fork this repo
1. Clone the fork
1. `cd turso-docs`
1. `npm i`
1. `npm run start` to start a local dev server at http://localhost:3000

## Steps to contribute

1. Make sure your fork's upstream remote is set

   ```bash
   git remote add upstream git@github.com:chiselstrike/turso-docs.git
   ```

1. Switch to the main branch and sync with upstream

   ```bash
   git checkout main
   git fetch upstream
   git rebase upstream/main
   ```

    Optionally, push your main branch to your origin:

   ```bash
   git push
   ```

1. Create a branch for feature development:

   ```bash
   git checkout -b my-feature
   ```

1. Commit to the feature branch:

   ```bash
   git add .
   git commit
   ```

1. Test your changes locally, and perform a full build to check for errors:

   ```bash
   npm run build
   ```

1. Push the commits to a branch on your origin fork. The first time you commit,
   you should set an upstream branch:

   ```bash
   git push --set-upstream origin my-feature
   ```

1. Create a pull request back to the upstream repo. The target branch must be
   `main` since Vercel uses the commits there to push updates to
   https://docs.turso.tech.


1. If you have corrections to the content, you can amend your commit and force
   push it:

   ```bash
   git add .
   git commit --amend
   git push -f
   ```

   If you have multiple comments, do an interactive rebase to make sure the
   correct commit contains the relevant change.

   After force pushing the branch, Vercel will deploy again and create another
   preview link.

1. After everyone is satisfied with the update, merge the pull request to the
   main branch.

## Authoring conventions

- Prefer to use VSCode with the [Rewrap][rewrap] extension. This repo configures
  Rewrap at 80 columns. While Rewrap automatically wraps text while typing, it
  will not in all cases. Use the ALT-q (or CMD-q on MacOS) to format the
  paragraph of text where the cursor is. *Please do not let lines get longer
  than 80 characters except where necessary.*

- You may wish to use the [Code Spell Checker][cspell] extension with VSCode for
  spell checking. It is already configured for use in this repo with product
  words to ignore for checking.

- We use a formal tech writing style for all technical content. Don't be
  surprised if someone gives you writing style feedback in your pull request!
