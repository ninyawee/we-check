import axios from "axios";

export const fileUpload = (files: FormData, urlOrigin?: string) => {
  const pathUrl = `https://metaverse.vallarismaps.com/upload`;

  return axios({
    url: pathUrl,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: files,
  })
    .then((rs) => rs)
    .catch((error) => {
      return error;
    });
};
