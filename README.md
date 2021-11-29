![Node.js CI](https://github.com/Bokanovskii/PolyFreeStuff/actions/workflows/node.js.yml/badge.svg)

<h2>About</h2>
PolyGold is a CSC 307 (Intro to Software Engineering) project that aims to reduce waste on campus at Cal Poly by making the sharing of goods more possible and accessible to students. It's a webapp that allows users to list and contact students about free items. This allows students who are moving out or are no longer in need of certain items to get connected to students who could make use of them, saving the lister from a trip to the dump and creating a more sustainable Cal Poly community by promoting the reusing of goods.

<h2>UI Protoype</h2>
View our full UI protoype <a href="https://www.figma.com/file/dIHkl7bid9EDPGmS3LAC0j/Poly-Free-Stuff?node-id=0%3A1" target="_blank">here</a>

<sub>note: last updated 10/20/21</sub>

<h2>Environment Setup</h2>

```npm install```

```cd backend```>```npm run dev```

```cd frontend```>```npm start```

<h2>Diagrams</h2>

<img src="frontend/public/component-diagram.png"/>

<img src="frontend/public/class-diagram.png"/>

<h2>Code Coverage</h2>

PASS  ./listing.test.js
PASS  ./user.test.js
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   95.38 |       75 |     100 |   95.93 |                   
 backend           |   95.08 |       75 |     100 |   95.65 |                   
  ...g-services.js |   97.26 |    86.36 |     100 |    98.5 | 81                
  user-services.js |   91.83 |    33.33 |     100 |   91.66 | 15-30,50          
 backend/models    |     100 |      100 |     100 |     100 |                   
  listing.js       |     100 |      100 |     100 |     100 |                   
  user.js          |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        2.532 s
