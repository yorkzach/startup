import React from 'react';

const AboutUs = () => {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div id="picture" className="picture-box">
        <img width="400px" src="puppy.png" alt="random" />
      </div>

      <p>
        Walking Robyn is your go-to for premier dog care services. With a deep love for our furry friends, we offer personalized walks, playtime, and companionship tailored to your dog's needs. Trust Walking Robyn to keep your pup happy, healthy, and wagging their tail with joy.
      </p>

      <p>
        Our team of experienced and compassionate caregivers understands the unique needs of every dog, tailoring our services to ensure each pup receives personalized attention and care. Whether it's a leisurely stroll through the neighborhood, an energetic play session at the park, or simply some extra cuddle time, we're here to keep tails wagging and hearts happy.
      </p>

      <div id="quote">
        <div>I love walking robyn!!</div>
        <div>- Joe Dirt</div>
      </div>
    </main>
  );
};

export default AboutUs;
