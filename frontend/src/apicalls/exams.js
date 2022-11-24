const { default: axiosInstance } = require(".");

export const addExam = async (payload) => {
     try {
        const response = await axiosInstance.post("/api/exams/add",payload)
        return response.data;
     } catch (error) {
        return error.response.data;
     }
};

export const getExams = async () => {
   try {
      const response = await axiosInstance.get("/api/exams/get-exams")
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}

export const getExamsbyId = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/get-exams-id", payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}

export const updateExambyId = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/edit-exam", payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}

export const deleteExambyId = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/delete-exam", payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}

export const addQuestion = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/add-question-exam",payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}


export const editQuestion = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/edit-questions-exam",payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}

export const deleteQuestionByID = async (payload) => {
   try {
      const response = await axiosInstance.post("/api/exams/delete-question-exam",payload)
      return response.data;
   } catch (error) {
      return error.response.data;
   }
}