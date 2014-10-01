# Brick Website

This repo contains the source for the [Brick website][]. The website has a
build process that relies on [gulp][].

[Brick website]: https://mozbrick.github.io/
[gulp]: http://gulpjs.com/

## Working on the website

You can run the website locally using node and gulp.
[Install node on your system](http://nodejs.org/download/) then install gulp
globally:

    npm install -g gulp

Then checkout your fork of this git repo (replace `$YOUR_USERNAME` with your
GitHub username):

    git clone git@github.com:$YOUR_USERNAME/mozbrick.github.io.git

Finally, run `npm install` from inside the repo, then run `gulp` to spin up
a local copy of the site. Open `http://localhost:3001/` to see the site. To
run the server on a different port, just set the `PORT` environment variable.
