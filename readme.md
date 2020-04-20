# Color Sudoku game

We would like to build in JS a color Sudoku game.

# Initial development - 20th of April 2020

We have successfully implemented a BASIC form of the game.
Its done with one simple html page and 2 js files:

-   HTML:
    We've added one simple div container where our sudoku board is
    We've styled this as a flex container of 100% width and 800px height
    When the page finished loading (body - on load) - we call a JS function startGame that displays the board and allows to play
-   CSS:
    Is all inside the same initial html file

-   JS
    The colorSudokuGame.js contains our main game functionality, namely 2 functions:
    -   startGame(hiddenBoxes = 4, containerId = "container")
        is a function that does everything -> it displays a grid of color sudoku boxes (9x9) with some hiddenBoxes count (by default there are 4)
