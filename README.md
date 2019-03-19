# simple-game

**Tech Task:**

Мини-игра.

Дано поле 10х10 квадратов (синие), кнопка "Начать", поле ввода (N - время в миллисекундах) и строка-счет (игрок/компьютер).
После нажатия на кнопку "Начать":
1. Cлучайная ячейка поля (синяя) выделяется цветом (становится желтой).
2. Если игрок успевает кликнуть на выделенную ячейку (желтую) в течении N миллисекунд,
то ячейка становиться зеленой и игроку прибавляется одно очко.
3. Если игрок не успевает кликнуть на ячейку (желтую) в течении этого времени,
то ячейка становиться красной и очко начисляется в пользу компьютера.
4. Если игрок либо компьютер наберет 10 очков, то игра прекращается и игрок должен увидеть сообщение
о результатах игры во всплывающем модальном окне (не использовать для окна стандартный alert),
иначе игра продолжается с первого шага.

**Getting started**

Install node js 10.x
https://nodejs.org

Install angular cli
`npm install -g @angular/cli`

Install modules
`npm i`

Run project 
`ng serve --open`
You will see the game in the default browser


**Content description**

All game business logic located into src/app/common/service/game.service.ts

The module has unit tests src/app/common/service/game.service.spec.ts

To run tests call `npm test` in the root directory

