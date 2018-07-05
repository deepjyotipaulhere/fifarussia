import Vue from 'nativescript-vue';
import Vuex from 'vuex';

const Sqlite = require("nativescript-sqlite");

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
      database: null,
      data: []
  },
  mutations: {
    init(state, data) {
        state.database = data.database;
    },
    load(state, data) {
        state.data = [];
        for(var i = 0; i < data.data.length; i++) {
            state.data.push({
                desc: data.data[i][0]
            });
        }
    },
    save(state, data) {
        state.data.push({
            desc: data.data.desc
        });
    }, 
    clear(state){
      state.data=[];
    }
   },
   actions: {
      init(context) {
          (new Sqlite("my.db")).then(db => {
              db.execSQL("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, desc TEXT)").then(id => {
                  context.commit("init", { database: db });
              }, error => {
                  console.log("CREATE TABLE ERROR", error);
              });
          }, error => {
              console.log("OPEN DB ERROR", error);
          });
          //query(context)
      },
      insert(context, data) {
        if (data.desc!="")
        {
          context.state.database.execSQL("INSERT INTO todo (desc) VALUES (?)", [data.desc]).then(id => {
              context.commit("save", { data: data });
          }, error => {
              console.log("INSERT ERROR", error);
          });
        }
      },
      query(context) {
          context.state.database.all("SELECT desc FROM todo", []).then(result => {
              context.commit("load", { data: result });
          }, error => {
              console.log("SELECT ERROR", error);
          });
      },
      delete(context){
        context.state.database.all("delete from todo", []).then(result => {
            context.commit("clear", { data: result });
        }, error => {
            console.log("SELECT ERROR", error);
        });
      }
  }
});

Vue.prototype.$store = store;

module.exports = store;
store.dispatch("init");
//store.dispatch("query");