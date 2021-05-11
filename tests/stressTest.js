import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration:'30s',
};

// get reviews
export default function() {
  http.get('http://localhost:3001/reviews?product_id=17069');
  sleep(1);
};

// get reviews meta data
// export default function() {
//   http.get('http://localhost:3001/reviews/meta?product_id=17069');
//   sleep(1);
// };