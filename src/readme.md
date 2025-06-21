cd VIDTUBE
pwd
/Users/harshvardhanchauhan/Library/Mobile Documents/com~apple~CloudDocs/Documents/Documents/Js/Backend /VIDTUBE
npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (vidtube) vidtube
version: (1.0.0) 
description: a project inspired by yt
entry point: (index.js) src/index.js
test command: 
git repository: 
keywords: nodejs , mongoose ,express ,backend
author: Harsh
license: (ISC) 
About to write to /Users/harshvardhanchauhan/Library/Mobile Documents/com~apple~CloudDocs/Documents/Documents/Js/Backend /VIDTUBE/package.json:

{
  "name": "vidtube",
  "version": "1.0.0",
  "description": "a project inspired by yt",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "nodejs",
    "mongoose",
    "express",
    "backend"
  ],
  "author": "Harsh",
  "license": "ISC"
}


Is this OK? (yes) 

harshvardhanchauhan@Harshs-MacBook-Air VIDTUBE % npm i --save-dev nodemon prettier

added 30 packages, and audited 31 packages in 3s

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
harshvardhanchauhan@Harshs-MacBook-Air VIDTUBE % cd src
harshvardhanchauhan@Harshs-MacBook-Air src % pwd
/Users/harshvardhanchauhan/Library/Mobile Documents/com~apple~CloudDocs/Documents/Documents/Js/Backend /VIDTUBE/src
harshvardhanchauhan@Harshs-MacBook-Air src % mkdir controllers db mid
dlewares models routes utils
harshvardhanchauhan@Harshs-MacBook-Air src % touch app.js index.js co
nstants.js .env .env.sample
harshvardhanchauhan@Harshs-MacBook-Air src % touch readme.md
harshvardhanchauhan@Harshs-MacBook-Air src % touch db/index.js
harshvardhanchauhan@Harshs-MacBook-Air src % cd models
harshvardhanchauhan@Harshs-MacBook-Air models % touch commentmodels.js likemodels.js playlistsmodels.js subscriptionsmodels.js tweetmodels
.js usermodels.js videomodels.js
harshvardhanchauhan@Harshs-MacBook-Air models % 

* install express npm i express mongoose
* npm run dev