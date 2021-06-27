import React from 'react';

const Footer = ({remaining,total}) => {
    return (
       <p>
           {remaining} / {total} left
       </p>
    );
};

export default Footer;
