const fs = require('fs');


module.exports = (FILE, validator) => {
  const writeJSON = (data)=> {
    return new Promise((resolve, reject)=> {
      fs.writeFile(FILE, JSON.stringify(data, null, 2), (err)=> {
        if(err){
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  };

  const readJSON = ()=> {
    return new Promise((resolve, reject)=> {
      fs.readFile(FILE, (err, data)=> {
        if(data){
          try {
            resolve(JSON.parse(data.toString()));
          }
          catch(ex){
            reject(ex);
          }
        }
        else {
          reject(err);
        }
      });
    });
  };

  const destroy = (id)=> {
    return findAll()
      .then( items => {
        return writeJSON(items.filter(item => item.id !== id*1));
      });
  };

  const create = (item)=> {
    return findAll()
      .then( items => {
        const error = validator(item, items);
        if(error){
          throw ({ message: error });
        }
        const maxId = items.reduce((acc, items)=> {
          if(items.id > acc){
            acc = items.id;
          }
          return acc;
        }, 0);
        item.id = maxId + 1;
        items.push(item);
        return writeJSON(items);
      })
      .then(()=> {
        return item;
      });

  };
  const findAll = ()=> {
    return readJSON();
  };
  return {
    findAll,
    create,
    destroy
  };
};
