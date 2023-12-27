function setItem(key, value) {
  localStorage.setItem(key, value);
  return "done";
}

function getItem(key) {
  let state = localStorage.getItem(key);
  if (key === "isAuth") {
    state = state === "true" ? true : false;
  }
  return state;
}

function clearItem(key) {
  localStorage.removeItem(key);
}

const storeCtrl = { setItem, clearItem, getItem };

export default storeCtrl;
