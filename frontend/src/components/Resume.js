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
    });

    useEffect(async () => {
        let resume = await fetch(
            "https://mocki.io/v1/4d509fb6-fa79-42ae-b773-e4ce3741302d"
        );
        setResumeData({
            name: "Nishit Chittora",
            Bio: "",
            study: [
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
            ],
            experience: [
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
                {
                    institute_name: "Google",
                    experience_type: "professional experience",
                    title: "Senior Software Engineer",
                    start_date: "2022-05-06",
                    end_date: "2020-02-01",
                    description: "",
                },
            ],
        });
    }, [mainAccount]);

    return <h2></h2>;
}

export default Resume;
