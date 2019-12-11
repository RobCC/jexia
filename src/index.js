import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { jexiaClient, dataOperations } from "jexia-sdk-js/browser";

const dataModule = dataOperations();

window.dataModule = dataModule;

const initJexia = async () => {
  const init = await jexiaClient().init({
    projectID: "2a2260ad-ab6a-41ab-969d-bb0c55c2a0fa",
    key: "882ad4c3-be01-46c4-a872-7d24e57de0da",
    secret: "DXYIVHJq2Ha2jxJqLwSTuUYrRll0qIRQ1BtujJUudXuSnIEhikg/geNp7i/HhQIFYlQkWhp9Z8TEpflQINTdKw==",
  }, dataModule);

  console.log(init);

  const postsDataset = dataModule.dataset("movies");
  const selectQuery = postsDataset.select();
  let posts;

  try {
    posts = await selectQuery.execute();
  } catch (e) {
    console.log(e)
  }

  console.log(posts);

};

window.init = initJexia;


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
