import React from 'react';

function ContactUs() {
  const email = 'focusflow244@gmail.com';
  const subject = 'Feedback';

  const mailtoLink = `mailto:${email}?subject=${subject}`;

  return (
    <a href={mailtoLink} style={{color:'cyan'}}>here</a>
  );
}

export default ContactUs;