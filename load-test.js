import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Duration of the test
};

export default function () {
    const response = http.get('https://workflowautomation.onrender.com/calculate?price=10&quantity=2'); // My Render API endpoint
    check(response, {
        'status is 200': (r) => r.status === 200,
        'response contains total': (r) => {
            try {
              const body = JSON.parse(r.body);
              return body.hasOwnProperty('total');
            } catch (e) {
              console.log('Failed to parse response:', r.body);
              return false;
            }
          }
    });

    sleep(1); // Sleep for 1 second between requests
}
// This script uses k6 to perform load testing on the API endpoint. It simulates 10 virtual users making requests for 30 seconds.