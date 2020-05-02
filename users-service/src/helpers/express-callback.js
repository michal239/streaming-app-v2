export default function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query
    };

    controller(httpRequest)
      .then(httpResponse => {
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(e => res.status(500).send({ error: 'An unknown error occurred.' }))
  }
}