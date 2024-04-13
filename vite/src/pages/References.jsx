import React, { useEffect } from 'react';

const References = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function (event) {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      displayRatings(data);
    };

    function displayRatings(ratings) {
      document.getElementById('robynOverallRating').textContent = ratings['Robyn York'] + '/5';
      document.getElementById('caitlinOverallRating').textContent = ratings['Caitlin York'] + '/5';
      document.getElementById('rachelOverallRating').textContent = ratings['Rachel Carnahan'] + '/5';
    }

    function leaveReview(walkerName) {
      var review = prompt("Leave a review out of 5 for " + walkerName + ":");

      if (review !== null && !isNaN(review)) {
        review = parseInt(review);

        if (review >= 1 && review <= 5) {
          const reviewData = { walker: walkerName, review: review };
          socket.send(JSON.stringify(reviewData));
        } else {
          alert("Please enter a number between 1 and 5.");
        }
      } else {
        alert("Invalid input. Please enter a number between 1 and 5.");
      }
    }
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Robyn York<span id="robynRating"></span>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Rating: <span id="robynOverallRating">5/5</span></strong> Meet Robyn, the passionate founder of Walking Robyn<sup>®</sup>. She has owned many pets herself and loves being outside. She enjoys furry cuddles and getting to know your pets! Her commitment to providing top-notch service is matched only by her dedication to ensuring every furry friend feels cherished and cared for.
            </div>
            <button onClick={() => leaveReview('Robyn York')}>Leave Review</button>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Caitlin York<span id="caitlinRating"></span>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Rating: <span id="caitlinOverallRating">4/5</span></strong> Caitlin is a dedicated dog walker, providing personalized care and attention to every furry friend. Her reliability and affectionate approach bring joy to pets and owners alike.
            </div>
            <button onClick={() => leaveReview('Caitlin York')}>Leave Review</button>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Rachel Carnahan<span id="rachelRating"></span>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Rating: <span id="rachelOverallRating">4.5/5</span></strong> Rachel is a seasoned dog walker, known for her expertise in handling pets of all sizes and temperaments. With her compassionate nature and commitment to ensuring every dog's happiness, she quickly becomes a beloved figure in her community.
            </div>
            <button onClick={() => leaveReview('Rachel Carnahan')}>Leave Review</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default References;
