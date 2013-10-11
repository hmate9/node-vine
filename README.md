# node-vine

  Vine API for node.js

## About

  The Vine API is undocumented and not publicly available.  However, it has a lot of great content.  I noticed that there are a few python wrappers, so I wanted to create a node.js one.  I also plan to do a few mobile web experiments with the Vine API, so this will come in handy for my next project.  Have fun!

## API

  All of Vine's API calls are authenticated, so you'll need to login first.  You can add VINE_USERNAME and VINE_PASSWORD to your environment variables to hide them from being passed in the clear.

### .login(username, password[, callback(err, response)])

  Only supports e-mail address authentication. Twitter OAuth authentication to come later.

### .timeline([ callback(err, response)])

  Returns a user's timeline

### .popular([ callback(err, response)])

  Returns a list of the most popular Vines

### .promoted([ callback(err, response)])

  Returns a list of promoted Vines

### .tags(query[, callback(err, response)])

  Performs a search for Vines with an associated tag

### .search(query[, callback(err, response)])

  Performs a search for Vine users

### .settings([ callback(err, response)])

  Returns a user's settings

## Notes

  Inspired by [vino](https://github.com/starlock/vino), a python app that displays a wall of popular Vines..

## License

  MIT
