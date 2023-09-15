export const apiGetFilePreview = async (token, url, image) =>
  fetch(url, {
    method: 'PUT',
    body: image,
    headers: {
      'Content-Type': 'image/jpeg',
      Authorization: JSON.stringify(token),
    },
  }).then((response) => response.json())
