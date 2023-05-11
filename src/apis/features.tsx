export const postFeature = (body: any) => {
  return fetch(
    `https://b-2.i-bitz.world/core/api/features/1.0-beta/collections/6459e61183f092de1effb22d/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key":
          "Ce1AhEu3msqiXoZZIdEqOOXq6OhmGsfbZZ7PwzK49gaphevgvSGpNm20wPsZWMHp",
      },
      body: JSON.stringify(body),
    }
  )
    .then(async (response) => {
      try {
        return response.status === 401
          ? { status: response.status, result: null }
          : { status: response.status, result: await response.json() };
      } catch (error) {
        return { status: response.status };
      }
    })
    .then((result) => {
      return result;
    })
    .catch((error: TypeError) => {
      return error;
    });
};
