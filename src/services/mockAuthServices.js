const _validateUsername = query => ['apomeroy', 'jbunker', 'bodell'].find(x => x === query);
const _validatePassword = query => query === 'password';

export const validateUsername = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (_validateUsername(query)) {
        resolve({"errors":null,"isSuccess":true,"isError":false})
      }
      else resolve({"errors": ["Bad username"],"isSuccess":false,"isError":true});
    }, 1000)
  });
}
