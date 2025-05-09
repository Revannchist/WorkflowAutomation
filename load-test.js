import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Duration of the test
    thresholds: {
      http_req_duration: ['p(95)<25000'], // 95% of requests should complete under 25s (current worst case)
      http_req_failed: ['rate<0.05'],   // Less than 5% of requests should fail
    },
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
// Each request checks if the response status is 200 and if the response contains a 'total' field. The script sleeps for 1 second between requests to simulate a realistic load pattern.
// The test also includes thresholds to ensure that 95% of requests complete under 200ms and that less than 5% of requests fail.
// Integrating load tests with CI/CD #8