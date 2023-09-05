async function fetchData(url, opts, callback) {
  return new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/${url}`, {
      ...opts,
    })
      .then(response => {
        if (!response.ok) { 
          throw response.statusText;
        }

        if (response.status === 204) {
          resolve(true);
        }

        return response.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
      .finally(callback);
  });
}

export default fetchData;