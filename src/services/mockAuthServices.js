export const validateUsername = (query) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['apomeroy', 'jbunker', 'bodell'].find(x => x === query)) {
        resolve({"errors":null,"isSuccess":true,"isError":false})
      }
      else resolve({"errors": ["Bad username"],"isSuccess":false,"isError":true});
    }, 1000)
  });
  return promise;
}
