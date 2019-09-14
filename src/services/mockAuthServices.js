export const validateUsername = (query) => {
  const promise = new Promise((resolve, reject) => {
    console.log(query);
    setTimeout(() => {
      if (['apomeroy', 'jbunker', 'bodell'].find(x => x === query)) {
        console.log('resolving true');
         resolve({data: true});
      }
      else resolve({data: false});
    }, 1000)
  });
  return promise;
}
