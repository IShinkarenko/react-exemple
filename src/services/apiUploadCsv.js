export const apiUploadCsv = async (token, url, file, metaData) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(file),
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(token),
      'x-meta-data': JSON.stringify(metaData),
    },
  }).then((response) => response.json())
