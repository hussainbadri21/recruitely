export interface CandidateData {
    candidate_id: number;
    candidate_name: string;
    email: string;
    phone: string;
    skills: {
        react: number;
        node: number;
    };
    expected_salary: number;
    current_status: number;
}


const getScore = (experience: number) => {
    if (experience < 1) {
        return 1
    }
    else if (experience <= 2) {
        return 2
    }
    return 3
}

const validateForm = (data: CandidateData) => {
    if (data.candidate_name == null || data.candidate_name == "") {
        return Response.json({ message: "Please enter candidate's name" }, { status: 400 })
    }
    if (data.email == null || data.email == "") {
        return Response.json({ message: "Please enter candidate's email" }, { status: 400 })
    }
    if (data.phone == null || data.phone == "" || data.phone.includes('undefined')) {
        return Response.json({ message: "Please enter candidate's phone number" }, { status: 400 })
    }
    if (data.skills.react == null) {
        data.skills.react = 0
    }
    if (data.skills.node == null) {
        data.skills.node = 0
    }
    if (data.expected_salary == null || isNaN(data.expected_salary)) {
        return Response.json({ message: "Please enter candidate's expected salary" }, { status: 400 })
    }
    if (data.current_status == null || isNaN(data.current_status) || data.current_status < 0 || data.current_status > 4) {
        return Response.json({ message: "Please select correct value for candidate's status" }, { status: 400 })
    }
    return true
}

const getCurrentStatus = (status: number) => {
    switch (status) {
        case 0:
            return "Contacted"
        case 1:
            return "Interview Scheduled"
        case 2:
            return "Offer Extended"
        case 3:
            return "Hired"
        case 4:
            return "Rejected"
        default:
            return "Contacted"
    }
}

export { getScore, validateForm, getCurrentStatus }