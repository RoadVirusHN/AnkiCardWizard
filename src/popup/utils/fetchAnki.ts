interface fetAnkiRequestBody {
  action: string;
  params?: Record<string, unknown>;
}
interface fetchAnkiResponseBody {
  result: unknown;
  error: string | null;
}
interface fetchAnkiReturnType {
  data: fetchAnkiResponseBody | unknown;
  error: Error | null;
}
async function fetchAnki(request: fetAnkiRequestBody): Promise<fetchAnkiReturnType> {
  await fetch('http://127.0.0.1:8765', {
    method: 'POST',
    body: JSON.stringify({ ...request, version: 5 }),
  })
    .then(async (res) => {
      const data: fetchAnkiResponseBody = await res.json();
      return data;
    })
    .catch((err) => {
      throw err;
    });
  return { data: null, error: null };
}
export default fetchAnki;
