import React from 'react';
import './courseInfoCrad.css';
import starImage from "../../../public/star.svg"
import linuxImage from "../../../public/image 1linux.svg"

const CourseInfoCrad = () => {
    return (
        <div className="card p-2 card-size shadow rounded-4">
            <div className="row g-1">
                <div className="col-md-4" style={{ width:"40%"}}>
                    <div className="image-container">
                        <img src={linuxImage} className={"image"}/>
                    </div>
                </div>
                <div className="col-md-8 ps-3" style={{ width:"60%"}}>
                    <div className="row mt-3 mb-2">
                        <div className="col">
                            <h2 className="course-title montserrat-font">Linux Fundamentals</h2>
                        </div>
                        <div className="col text-end me-3 ">
                            <h5 className={"course-duration montserrat-font mb-2"}>6 Hours</h5>
                        </div>
                    </div>
                    <p className={"montserrat-font description"}>
                        This module covers the fundamentals required to work comfortably with the Linux operating system
                        and shell.
                    </p>
                    <div className="rating-container">
                        <img src={starImage}/><img src={starImage}/><img src={starImage}/><img src={starImage}/><img src={starImage}/>
                    </div>
                    <div className="powered-container mt-1 mb-2">
                        <p className={"supervised title"}>Supervised by:</p>
                        <p className={"supervised"}>Zaid Slimane</p>
                        <p className={"supervised"}>Software Engenieer At Meta</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseInfoCrad;
