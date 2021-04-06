(this.webpackJsonpown2=this.webpackJsonpown2||[]).push([[0],{14:function(t,e,o){"use strict";o.r(e);var a=o(1),n=o.n(a),s=o(8),l=o.n(s),r=o(6),i=o(2),c=o(3),u=o(5),d=o(4),p=o(0),h=function(t){var e=t.text;return Object(p.jsx)("header",{className:"todo-app__header",children:Object(p.jsx)("h1",{className:"todo-app__title",children:e})})},f=function(t){Object(u.a)(o,t);var e=Object(d.a)(o);function o(t){var a;return Object(i.a)(this,o),(a=e.call(this,t)).setTotal=function(t,e){a.setState((function(o){return{todoTotal:t,Total:e}}))},a.getTodoTotal=function(){return a.state.todoTotal},a.getTotal=function(){return a.state.Total},a.setShowMode=function(t){a.setState((function(e){return{showMode:t}}))},a.setCompleteTotal=function(t){a.setState((function(e){return{completeTotal:t}}))},a.getCompleteTotal=function(){return a.state.completeTotal},a.setClear=function(t){a.setState((function(e){return{clear:t}}))},a.getClear=function(){return a.state.clear},a.state={todoTotal:0,Total:0,completeTotal:0,showMode:"all",clear:0},a}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"todo-app__root",id:"root",children:[Object(p.jsx)(h,{text:"todos"}),Object(p.jsx)(m,{setTotal:this.setTotal,setCompleteTotal:this.setCompleteTotal,showMode:this.state.showMode,setClear:this.setClear,getClear:this.getClear}),Object(p.jsx)(j,{getTodoTotal:this.getTodoTotal,getTotal:this.getTotal,getCompleteTotal:this.getCompleteTotal,setShowMode:this.setShowMode,setClear:this.setClear})]})}}]),o}(a.Component),j=function(t){Object(u.a)(o,t);var e=Object(d.a)(o);function o(){var t;Object(i.a)(this,o);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(t=e.call.apply(e,[this].concat(n))).show=function(){return 0===t.props.getTotal()?{display:"none"}:{}},t.completedButtonShow=function(){return t.props.getCompleteTotal()>0?{}:{display:"none"}},t}return Object(c.a)(o,[{key:"render",value:function(){var t=this;return Object(p.jsxs)("footer",{className:"todo-app__footer",id:"todo-footer",style:this.show(),children:[Object(p.jsxs)("div",{className:"todo-app__total",children:[this.props.getTodoTotal()," left"]}),Object(p.jsxs)("ul",{className:"todo-app__view-buttons",children:[Object(p.jsx)("button",{onClick:function(){t.props.setShowMode("all")},children:"All"}),Object(p.jsx)("button",{onClick:function(){t.props.setShowMode("active")},children:"Active"}),Object(p.jsx)("button",{onClick:function(){t.props.setShowMode("completed")},children:"Completed"})]}),Object(p.jsx)("div",{className:"todo-app__clean",children:Object(p.jsx)("button",{style:this.completedButtonShow(),onClick:function(){t.props.setClear(1)},children:"Clear Completed"})})]})}}]),o}(n.a.Component),b=function t(e,o){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};Object(i.a)(this,t),this.id=e,this.text=o,this.status=a,this.checkStyle=n,this.checkLabelStyle=s},m=function(t){Object(u.a)(o,t);var e=Object(d.a)(o);function o(t){var a;return Object(i.a)(this,o),(a=e.call(this,t)).clearCompleted=function(){if(1===a.props.getClear()){for(var t=[],e=0;e<a.state.list.length;e++)0===a.state.list[e].status&&t.push(a.state.list[e]);a.setState((function(e){return{list:t}})),a.props.setClear(0)}},a.updateTotal=function(){for(var t=0,e=0,o=0;o<a.state.list.length;o++)0===a.state.list[o].status&&e++,t++;a.props.setTotal(e,t)},a.updateCompleteTotal=function(){for(var t=0,e=0;e<a.state.list.length;e++)1===a.state.list[e].status&&t++;a.props.setCompleteTotal(t)},a.addTodo=function(t){a.setState((function(e){return{id_count:e.id_count+1,list:[new b(a.state.id_count,t)].concat(Object(r.a)(e.list))}}))},a.updateTodo=function(t,e){for(var o=Object(r.a)(a.state.list),n=0;n<o.length;n++)if(o[n].id===t){o[n]=e;break}a.setState((function(t){return{list:o}}))},a.delTodo=function(t){for(var e=Object(r.a)(a.state.list),o=0;o<e.length;o++)if(e[o].id===t){var n=o;break}e.splice(n,1),a.setState((function(t){return{list:e}}))},a.getList=function(){return a.state.list},a.state={id_count:0,list:[]},a}return Object(c.a)(o,[{key:"componentDidMount",value:function(){setInterval(this.clearCompleted,500),setInterval(this.updateTotal,500),setInterval(this.updateCompleteTotal,500)}},{key:"render",value:function(){return Object(p.jsxs)("section",{className:"todo-app__main",children:[Object(p.jsx)(O,{addTodo:this.addTodo}),Object(p.jsx)(v,{getList:this.getList,updateTodo:this.updateTodo,delTodo:this.delTodo,showMode:this.props.showMode})]})}}]),o}(a.Component),v=function(t){Object(u.a)(o,t);var e=Object(d.a)(o);function o(){var t;Object(i.a)(this,o);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(t=e.call.apply(e,[this].concat(n))).itemOnclick=function(e){for(var o,a,n,s,l=t.props.getList(),r=0;r<l.length;r++)if(l[r].id===e){var i=l[r];break}0===i.status?(o=i.text,a=1,n={"text-decoration":"line-through",opacity:.5},s={background:"green"}):(o=i.text,a=0,n={},s={});var c=new b(e,o,a,n,s);t.props.updateTodo(e,c)},t.render_rows=function(){for(var e=[],o=Object(r.a)(t.props.getList()),a=0;a<o.length;a++)("all"===t.props.showMode||"active"===t.props.showMode&&0===o[a].status||"completed"===t.props.showMode&&1===o[a].status)&&e.push(o[a]);return e.map((function(e){return Object(p.jsxs)("li",{className:"todo-app__item",style:e.checkStyle,children:[Object(p.jsx)("div",{className:"todo-app__checkbox",onClick:function(){t.itemOnclick(e.id)},children:Object(p.jsx)("label",{id:e.id,style:e.checkLabelStyle})}),Object(p.jsx)("h1",{className:"todo-app__item-detail",children:e.text}),Object(p.jsx)("img",{src:"./img/x.png",className:"todo-app__item-x",onClick:function(){t.props.delTodo(e.id)}})]},e.id)}))},t}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsx)("ul",{className:"todo-app__list",id:"todo-list",children:this.render_rows()})}}]),o}(n.a.Component),O=function(t){Object(u.a)(o,t);var e=Object(d.a)(o);function o(t){var a;return Object(i.a)(this,o),(a=e.call(this,t)).handleChange=function(t){a.setState((function(e){return{value:t.target.value}}))},a.keyPress=function(t){if(13===t.keyCode){var e=a.state.value.trim();""!==e&&a.props.addTodo(e),a.setState((function(t){return{value:""}}))}},a.state={value:""},a}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsx)("input",{type:"text",className:"todo-app__input",value:this.state.value,onChange:this.handleChange,onKeyDown:this.keyPress})}}]),o}(n.a.Component),T=f;l.a.render(Object(p.jsx)(T,{className:"todo-app__root"}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.27b46fda.chunk.js.map