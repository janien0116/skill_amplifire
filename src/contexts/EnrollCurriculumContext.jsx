import React, { createContext, useState } from 'react'

const EnrollCurriculumContext = createContext();

export const EnrollCurriculumContextProvider = ({ children }) => {
    const [showCoursePlan, setShowCoursePlan] = useState(false);
    const [showContainer, setShowContainer] = useState(true);
    const [curriculum, setCurriculum] = useState("");
    const [coursePlanPrice, setCoursePlanPrice] = useState(0);
    const [courseSets, setCourseSets] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    return (
        <EnrollCurriculumContext.Provider value={{ showCoursePlan, setShowCoursePlan, showContainer, setShowContainer, curriculum, setCurriculum, coursePlanPrice, setCoursePlanPrice, courseSets, setCourseSets, isLoading, setIsLoading }}>
            {children}
        </EnrollCurriculumContext.Provider>
    );
}

export default EnrollCurriculumContext