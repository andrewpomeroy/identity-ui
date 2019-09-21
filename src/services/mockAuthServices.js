const _validateUsername = query => ['apomeroy', 'jbunker', 'bodell'].find(x => x === query);
const _validatePassword = query => query === 'password';

export const validateUsername = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (_validateUsername(query)) {
        resolve({"errors":null,"isSuccess":true,"isError":false})
      }
      else resolve({"errors": ["The account you entered does not exist."],"isSuccess":false,"isError":true});
    }, 1000)
  });
}

export const authenticate = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (_validateUsername(query.username) && _validatePassword(query.password)) {
        resolve({"errors":null,"isSuccess":true,"isError":false})        
      }
      else resolve({"errors": ["The password you entered is incorrect. Please try again."],"isSuccess":false,"isError":true});
    }, 1000)
  })
}