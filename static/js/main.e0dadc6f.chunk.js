(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),i=n(9),a=n.n(i),s=n(3),o=n(4),u="STORE_DIFFICULTY",l="START_GAME",f="FLAG_SQUARE",d="CLEAR_SQUARE",j="RESTART_GAME",m="SUBMIT_SCORE",b="SAVE_FETCHED_SCORES",h=n(12),O=function(e){return e.reduce((function(e,t){return[].concat(Object(h.a)(e),Object(h.a)(t))}),[])},p=function(e){var t=function(e){var t;switch(e){case"Easy":t=10;break;case"Medium":t=20;break;case"Hard":t=30}for(var n=[],r=0;r<t;r++){for(var c=[],i=0;i<t;i++)c.push({clear:!1,mine:!1,flag:!1,adjacent:0});n.push(c)}return n}(e);return t=function(e){for(var t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++)if(!e[t][n].mine)for(var r=t-1;r<=t+1;r++)for(var c=n-1;c<=n+1;c++)r<=-1||r>=e.length||c<=-1||c>=e[t].length||e[r][c].mine&&(e[t][n].adjacent=e[t][n].adjacent+1);return e}(t=function(e,t){var n;switch(e){case"Easy":n=15;break;case"Medium":n=60;break;case"Hard":n=135}for(;O(t).filter((function(e){return!0===e.mine})).length<n;){var r=Math.floor(Math.random()*t.length),c=Math.floor(Math.random()*t.length);t[r][c].mine=!0}return t}(e,t)),{type:l,startGame:!0,board:t}},v=function(e){return{type:b,scores:e}},w=function(e){return{type:m,name:e}},x=n(0),y=Object(s.b)((function(e){return{difficulty:e.minesweeper.difficulty}}),(function(e){return{storeDifficulty:function(t){e(function(e){return{type:u,difficulty:e}}(t))},startGame:function(t){e(p(t))}}}))((function(e){var t=function(t){e.storeDifficulty(t.target.value)};return Object(x.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.startGame(e.difficulty)},children:[Object(x.jsx)("h2",{children:"Choose Difficulty"}),Object(x.jsxs)("div",{children:[Object(x.jsx)("input",{type:"radio",name:"difficulty",id:"Easy",value:"Easy",defaultChecked:"Easy"===e.difficulty,onChange:t,"data-testid":"easy-difficulty"}),Object(x.jsx)("label",{htmlFor:"Easy",children:"Easy"}),Object(x.jsx)("input",{type:"radio",name:"difficulty",id:"Medium",value:"Medium",defaultChecked:"Medium"===e.difficulty,onChange:t,"data-testid":"medium-difficulty"}),Object(x.jsx)("label",{htmlFor:"Medium",children:"Medium"}),Object(x.jsx)("input",{type:"radio",name:"difficulty",id:"Hard",value:"Hard",defaultChecked:"Hard"===e.difficulty,onChange:t}),Object(x.jsx)("label",{htmlFor:"Hard",children:"Hard"}),Object(x.jsx)("div",{children:Object(x.jsx)("button",{type:"submit",children:"Start"})})]})]})})),g=n(7),E=Object(s.b)((function(e){return{board:e.minesweeper.board,gameOver:e.minesweeper.gameOver,winner:e.minesweeper.winner,time:e.minesweeper.time,winTime:e.minesweeper.winTime}}),(function(e){return{flagSquare:function(t,n){e(function(e,t){return{type:f,row:e,col:t}}(t,n))},clearSquare:function(t,n){e(function(e,t){return{type:d,row:e,col:t}}(t,n))}}}))((function(e){var t=Object(r.useState)(0),n=Object(g.a)(t,2),c=n[0],i=n[1],a=setInterval((function(){return i(Math.floor((Date.now()-e.time)/1e3))}),1e3);return Object(r.useEffect)((function(){return function(){i(0),clearInterval(a)}}),[]),Object(x.jsxs)("div",{className:"Gameboard",children:[Object(x.jsx)("p",{className:"timer",children:e.gameOver?e.winTime:c}),Object(x.jsx)("div",{children:e.board.map((function(t,n){return Object(x.jsx)("div",{className:"row",children:t.map((function(t,r){return Object(x.jsxs)("div",{"data-row":n,"data-column":r,"data-testid":"square","data-cypress":(t.mine,null),className:"square",onContextMenu:function(t){return function(t,n,r){t.preventDefault(),e.flagSquare(n,r)}(t,n,r)},onClick:function(){return function(t,n){e.gameOver||e.clearSquare(t,n)}(n,r)},children:[t.mine&&e.gameOver&&!e.winner?Object(x.jsx)("p",{className:"mine",children:"\ud83d\udca3"}):null,t.adjacent>0&&t.clear?Object(x.jsx)("p",{children:t.adjacent}):null,t.flag||e.gameOver&&e.winner&&t.mine?Object(x.jsx)("div",{className:"flag",children:Object(x.jsx)("p",{children:"\ud83c\udfc1"})}):null,t.clear?null:Object(x.jsx)("p",{className:e.gameOver?"unclear-no-hover":"unclear"})]},"".concat(n,"-").concat(r))}))},n)}))})]})})),S=Object(s.b)((function(e){return{gameOver:e.minesweeper.gameOver,winner:e.minesweeper.winner,winTime:e.minesweeper.winTime,scores:e.minesweeper.scores,isFetched:e.minesweeper.isFetched,difficulty:e.minesweeper.difficulty}}),(function(e){return{restartGame:function(){e({type:j})},postScore:function(t,n,r,c){e(function(e,t,n){return function(r){fetch("https://minesweeper-237c5-default-rtdb.firebaseio.com/scores/".concat(n,".json"),{method:"PATCH",body:JSON.stringify(Object(o.a)({},e,t))}).then((function(e){return e.json()})).then((function(t){console.log(t),r(w(e))}))}}(t,n,r))},fetchScores:function(){e((function(e){return fetch("https://minesweeper-237c5-default-rtdb.firebaseio.com/scores.json").then((function(e){return e.json()})).then((function(t){e(v(t))})).catch((function(e){}))}))}}}))((function(e){var t=Object(r.useState)(9999999),n=Object(g.a)(t,2),c=n[0],i=n[1];Object(r.useEffect)((function(){e.isFetched||e.fetchScores(),e.scores[e.difficulty].length<10?i(9999999):i(e.scores[e.difficulty][9])}),[]);var a=Object(r.useState)(""),s=Object(g.a)(a,2),o=s[0],u=s[1];return Object(x.jsxs)("div",{className:"EndScreen",children:[e.winner?Object(x.jsx)("h1",{children:"You Win"}):Object(x.jsx)("h1",{children:"You Lose"}),e.winner?Object(x.jsxs)("h2",{className:"win-time",children:["Time: ",e.winTime,"s"]}):null,e.isFetched?Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:"Easy"}),Object(x.jsx)("ol",{children:e.scores.Easy.map((function(e,t){return Object(x.jsxs)("li",{children:[Object(x.jsx)("p",{children:e.name})," ",Object(x.jsx)("p",{children:e.score})]},"Easy-"+t)}))})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:"Medium"}),Object(x.jsx)("ol",{children:e.scores.Medium.map((function(e,t){return Object(x.jsxs)("li",{children:[Object(x.jsx)("p",{children:e.name})," ",Object(x.jsx)("p",{children:e.score})]},"Medium-"+t)}))})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:"Hard"}),Object(x.jsx)("ol",{children:e.scores.Hard.map((function(e,t){return Object(x.jsxs)("li",{children:[Object(x.jsx)("p",{children:e.name})," ",Object(x.jsx)("p",{children:e.score})]},"Hard-"+t)}))})]})]}):null,e.winner&&e.winTime<c?Object(x.jsxs)("form",{onSubmit:function(t){return function(t){t.preventDefault(),e.winTime<c&&e.postScore(o,e.winTime,e.difficulty)}(t)},children:[Object(x.jsx)("label",{htmlFor:"name",children:"Enter Name"}),Object(x.jsx)("input",{id:"name",type:"text",value:o,onChange:function(e){u(e.target.value)}}),Object(x.jsx)("button",{type:"submit","aria-label":"submit score",children:"Submit Score"})]}):null,Object(x.jsx)("button",{className:"restart-button",onClick:e.restartGame,"aria-label":"restart game",children:"Restart"})]})})),M=(n(27),n(28),Object(s.b)((function(e){return{startGame:e.minesweeper.startGame,gameOver:e.minesweeper.gameOver}}),{})((function(e){return Object(x.jsxs)("div",{className:"App",children:[e.startGame?null:Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:"Minesweeper"}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"Left click a square to mark a clear space"}),Object(x.jsx)("p",{children:"Right click a square to flag a mine"})]}),Object(x.jsx)(y,{})]}),e.startGame?Object(x.jsx)(E,{}):null,e.gameOver?Object(x.jsx)(S,{}):null]})}))),T=n(8),C=n(14),G=n(15),N=n(2),_=function(e){for(var t=[],n=0;n<e.length;n++){for(var r=[],c=0;c<e[n].length;c++)r.push(Object(N.a)({},e[n][c]));t.push(r)}return t},k=function e(t,n,r){for(var c=n-1;c<=n+1;c++)for(var i=r-1;i<=r+1;i++)c<=-1||c>=t.length||i<=-1||i>=t[c].length||t[c][i].clear||(t[c][i].clear=!0,0===t[c][i].adjacent&&e(t,c,i))},F=function(e,t,n){return k(e,t,n),e},D={difficulty:"Easy",startGame:!1,board:[],gameOver:!1,winner:!1,time:0,winTime:null,scores:{Easy:[],Medium:[],Hard:[]},isFetched:!1},H=function(e,t){return Object(N.a)(Object(N.a)({},e),{},{difficulty:t.difficulty})},R=function(e,t){return Object(N.a)(Object(N.a)({},e),{},{startGame:t.startGame,board:t.board,time:Date.now()})},A=function(e,t){var n=_(e.board);return n[t.row][t.col].clear||(n[t.row][t.col].flag?n[t.row][t.col].flag=!1:n[t.row][t.col].flag=!0),Object(N.a)(Object(N.a)({},e),{},{board:n})},q=function(e,t){var n=_(e.board);n[t.row][t.col].clear=!0,n[t.row][t.col].flag=!1;var r,c=e.gameOver,i=e.winner;if(n[t.row][t.col].mine){c=!0,i=!1;for(var a=0;a<n.length;a++)for(var s=0;s<n[a].length;s++)n[a][s].mine&&(n[a][s].clear=!0)}else 0===n[t.row][t.col].adjacent&&(n=F(n,t.row,t.col));return 0===O(n).filter((function(e){return!e.clear&&!e.mine})).length&&(c=!0,i=!0,r=Math.floor((Date.now()-e.time)/1e3)),Object(N.a)(Object(N.a)({},e),{},{board:n,gameOver:c,winner:i,winTime:r})},I=function(e,t){return Object(N.a)(Object(N.a)({},e),{},{gameOver:!1,startGame:!1,board:[],winner:!1})},L=function(e,t){var n,r=[],c=Object(G.a)(e.scores[e.difficulty]);try{for(c.s();!(n=c.n()).done;){var i=n.value;r.push(Object(N.a)({},i))}}catch(a){c.e(a)}finally{c.f()}return r.push({name:t.name,score:e.winTime}),r.sort((function(e,t){return e.score-t.score})),r=r.slice(0,10),Object(N.a)(Object(N.a)({},e),{},{scores:Object(N.a)(Object(N.a)({},e.scores),{},Object(o.a)({},e.difficulty,r))})},U=function(e,t){var n={};for(var r in t.scores){var c=[];for(var i in t.scores[r])c.push({name:i,score:t.scores[r][i]});c.sort((function(e,t){return e.score-t.score})),c=c.slice(0,10),n[r]=c}return Object(N.a)(Object(N.a)({},e),{},{scores:n,isFetched:!0})},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return H(e,t);case l:return R(e,t);case f:return A(e,t);case d:return q(e,t);case j:return I(e);case m:return L(e,t);case b:return U(e,t);default:return e}},Y=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||T.c,B=Object(T.b)({minesweeper:J}),P=Object(T.d)(B,Y(Object(T.a)(C.a)));a.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(s.a,{store:P,children:Object(x.jsx)(M,{})})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.e0dadc6f.chunk.js.map