const { AsyncParallelHook } = require("tapable");
const hook = new AsyncParallelHook(["name", "age"]);
console.time("cost");
hook.tapPromise("1", (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});
hook.tapPromise("2", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
});
hook.tapPromise("3", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
});
hook.promise("zhufeng", 12).then((result) => {
  console.log(result);
  console.timeEnd("cost");
});
