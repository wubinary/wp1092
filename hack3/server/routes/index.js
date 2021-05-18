import { GetStations, CalculateDistance } from './station'

const wrap = fn => (...args) => fn(...args).catch(args[2])

// const wrap = function (req, res, next) {
//         if (req.url === '/api/getStations') {
//             GetStations(req, res);
//         }

//         if (req.url === '/api/calculateDistance') {
//             CalculateDistance(req, res);
//         }
//         next();
//     }

function routes(app) {
  // set proper api path and connect the path with wrap(function)
  // coding here ...

  app.get( '/api/getStations', wrap( (req, res, next) => { GetStations(req, res); } ));
  app.get( '/api/calculateDistance', wrap( (req, res, next) => { CalculateDistance(req, res); } ));    
}

export default routes
