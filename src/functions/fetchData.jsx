export default async function fetchData(url, options) {
  const jsonDb = "http://localhost:5000/";

  const path = jsonDb + url;
  const data = await fetch(path, options).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error();
    }
  });

  return data;
}
