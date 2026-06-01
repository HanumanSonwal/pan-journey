// race-test.js

import axios from "axios";

const payload = {
    "fullName": "Bhiwadi, Tijara, Rajasthan, India",
    "id": "350157",
  CheckInDate: "06/10/2026",
  CheckOutDate: "06/11/2026",
  RoomCount: 1,
};

async function run() {

  const requests = [];

  for (let i = 0; i < 20; i++) {

    requests.push(
      axios.post(
        "http://localhost:8000/api/v1/Hotels/search",
        payload
      )
    );
  }

  await Promise.all(requests);

  console.log("✅ ALL REQUESTS DONE");
}

run();