import React, { useState } from 'react';
import RootContainer from '../../utils/rootContainerModule.jsx';
import { useParams } from "react-router-dom";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import TextInput from "../../components/textInput/textInput.jsx";

function LeaveReview() {
    const { enrollmentId } = useParams();
    const [reviewContent, setReviewContent] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState('');

    const handleStarChange = (event) => {
        setStars(parseInt(event.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!reviewContent || stars < 1 || stars > 5) {
            setError("Please provide valid review content and star rating between 1 and 5.");
            return;
        }

        const reviewData = {
            review_content: reviewContent,
            stars: stars,
            enrollment: enrollmentId,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            console.log(reviewData)

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            // Optionally handle success, e.g., redirect or clear form
            console.log('Review submitted successfully');
        } catch (error) {
            setError('Failed to submit review');
        }
    };

    return (
        <RootContainer>
            <form onSubmit={handleSubmit} className="mt-5 d-flex flex-column align-items-center pb-4">
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Leave a review:</b></p>
                    <textarea
                        className="grey-bg chapter-content question ps-3 pe-3 pt-2"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Rate your experience:</b></p>
                    <select
                        className="ms-2 grey-bg text-white select-answer ps-2"
                        value={stars}
                        onChange={handleStarChange}
                    >
                        <option value={0}>Select stars</option>
                        {[1, 2, 3, 4, 5].map(star => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </div>
                {error && <p style={{ color: "red", marginLeft: "8px" }}>{error}</p>}
                <div className="mt-5">
                    <PixelatdButton type="submit" className="btn btn-success" text="Submit Review"></PixelatdButton>
                </div>
            </form>
        </RootContainer>
    );
}

export default LeaveReview;
