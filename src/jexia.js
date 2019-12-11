import { jexiaClient, dataOperations, field } from 'jexia-sdk-js/browser';

const PROJECT_ID = '';
const API_KEY = '';
const SECRET = '';
const dataModule = dataOperations();
let isInit = false;

const initJexia = async () => {
  try {
    await jexiaClient().init({
      projectID: PROJECT_ID,
      key: API_KEY,
      secret: SECRET,
    }, dataModule);

    isInit = true;
  } catch (e) {
    console.log(e);
  }
};

export const get = async datasetName => {
  if (!isInit) {
    await initJexia();
  }

  const dataSet = dataModule.dataset(datasetName);
  const selectQuery = dataSet.select();
  let data: [];

  try {
    data = await selectQuery.execute();
  } catch (e) {
    console.log(e);
  }

  return data;
};

export const insert = async (datasetName, data) => {
  if (!isInit) {
    await initJexia();
  }

  const dataSet = dataModule.dataset(datasetName);
  const insertQuery = dataSet.insert(data);

  try {
    await insertQuery.execute();
  } catch (e) {
    console.log(e);
  }
};

export const remove = async (datasetName, fieldName, value) => {
  if (!isInit) {
    await initJexia();
  }

  const dataSet = dataModule.dataset(datasetName);
  const deleteQuery = dataSet
    .delete()
    .where(field(fieldName).isLike(value));

  try {
    await deleteQuery.execute();
  } catch (e) {
    console.log(e);
  }
};

export default {
  get,
  insert,
  remove,
};
