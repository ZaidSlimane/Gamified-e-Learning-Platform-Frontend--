import React from 'react';
import PropTypes from 'prop-types';
import '@fontsource/inter';

const TestimonialCard = ({Testimonial}) => {
    // Define the styles within the component
    const cardStyle = {
        width: '500px',
        height: '450px',
        backgroundColor: '#353B42',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        marginBottom: '1rem',
    };


    const textStyle = {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    const shadow ={

    }


    return (
        <div className="size shadow1 card-hover" style={{...cardStyle}}>
            <div className="column-gap-0 g-0">
                <div className="d-flex flex-column justify-content-center p-5">
                    <div className="d-flex justify-content-end">
                        <img src="/ci_double-quotes-l.svg" alt="Left SVG" style={{height: '100px'}}/>

                    </div>
                    <div className="star-rating">
                        &#9733; &#9733; &#9733; &#9733; &#9733;
                    </div>
                    <h3 style={{color: 'white'}}>
                        Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit.
                        Elit enim massa etiam neque laoreet lorem sed.
                    </h3>

                    <div className="d-flex flex-column">
                        <p>Zaid Slimane </p>
                        <p>Big Boss Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

TestimonialCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    startColor: PropTypes.string.isRequired,
    endColor: PropTypes.string.isRequired,
};

export default TestimonialCard;