import React from 'react';
import './../styles/AboutPage.css';
import user1 from './../assets/user1.jpg';
import user2 from './../assets/user2.jpg';
import user3 from './../assets/user3.jpg';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO',
      bio: 'John is the visionary leader and founder of the company.',
      image: user1
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Jane is the technical genius, responsible for overseeing all technological advancements.',
      image: user2
    },
    {
      name: 'Alice Johnson',
      role: 'Lead Designer',
      bio: 'Alice is the creative brain behind all our stunning designs.',
      image: user3,
    }
  ];

  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p className="about-us-description">
          We are a team of passionate professionals dedicated to making the world a better place through innovation and creativity.
        </p>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <img
                src={member.image}
                alt={member.name}
                className="team-member-image"
              />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

