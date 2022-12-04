import React, { useEffect, useState } from "react";

function Resume({ account }) {
    const [mainAccount, setAccount] = useState(null);
    const [resume, setResumeData] = useState(null);
    useEffect(() => {
        let path = new URLSearchParams(window.location.search);
        if (path.get("account")) {
            setAccount(path.get("account"));
        } else if (account) {
            setAccount(account);
        }
    }, []);

    useEffect(() => {
        setResumeData({
            name: "Nishit Chittora",
            bio: "Ola, I am Nishit Chittora, known with the alias WorldWide on various competitive programming sites. Currently, I'm a Senior Software developer at Hiration Inc. Before that, Project Scientist at Indian Institute of Technology, Delhi. Have knowledge of the Latest and High-End Technologies like Machine Learning, Artificial Intelligence, Deep Learning, NLP, Deep Learning, Neural Networks, Tesseract, OpenCV, Django, Reactjs, ES6. I love to do challenging jobs, creating a smart solution for real-world problems. I want to create and love to learn about new technology and inventions. Selected in ACM-ICPC Amritapur 2015 onsite round(AIR-172).",
            study: [
                {
                    institute_name: "M.B.M Engineering College, Jodhpur",
                    experience_type: "professional experience",
                    title: "Bachelor of Engineering - BE, Computer Science",
                    start_date: "2013",
                    end_date: "2017",
                    description:
                        "Activities and societies: • Head Coordinator of MBM Programming Club",
                },
                {
                    institute_name: "Central Academy School",
                    experience_type: "professional experience",
                    title: "Senior Secondary",
                    start_date: "1998",
                    end_date: "2013",
                    description:
                        "Activities and societies: National and State Taekwondo player",
                },
            ],
            experience: [
                {
                    institute_name: "Hiration Inc.",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "Aug 2018",
                    end_date: "Present",
                    description:
                        "Developed ReactJS Microfrontend architecture using Webpack 5 and reduced load time by 70%. Developed Microservice based architecture for services using Django, JWT, Docker, Celery",
                },
                {
                    institute_name: "Indian Institute of Technology, Delhi",
                    experience_type: "professional experience",
                    title: "Project Scientist",
                    start_date: "Sept 2018",
                    end_date: "Sept 2019",
                    description:
                        "Worked on FE models for personalization and repositioning of the human body model like GHBMC, THUMS, and Child",
                },
                {
                    institute_name: "MyAdvo.in",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "Jul 2017",
                    end_date: "Jun 2018",
                    description:
                        "Developed React Dashboard for Litigation Management Tool and business logic for employee management tool. Developed Real-Time Communication and Notification system using Django Channels, asgi-Redis, and daphne",
                },
            ],
        });
    }, [mainAccount]);

    return (
        <div>
            <h3>{resume?.name}</h3>
            <h6>{resume?.bio}</h6>
            <div style={{ marginTop: "2em" }}>
                <h5>Experience</h5>
                {resume?.experience.map((study) => (
                    <div style={{ marginTop: "1em" }}>
                        <h5>{study?.institute_name}</h5>
                        <h5>{study?.title}</h5>
                        <h6>
                            {study?.start_date} - {study?.end_date}
                        </h6>
                        <h6>{study?.description}</h6>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "2em" }}>
                <h5>Education</h5>
                {resume?.study.map((study) => (
                    <div style={{ marginTop: "1em" }}>
                        <h5>{study?.institute_name}</h5>
                        <h5>{study?.title}</h5>
                        <h6>
                            {study?.start_date} - {study?.end_date}
                        </h6>
                        <h6>{study?.description}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Resume;
