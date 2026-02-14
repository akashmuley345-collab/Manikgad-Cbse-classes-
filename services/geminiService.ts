
import { GoogleGenAI } from "@google/genai";
import { Student } from "../types";

// Fixed: Initialize Gemini API client correctly with direct environment variable access as per guidelines
// Explicitly cast to string to resolve potential 'unknown' or 'undefined' type issues in strict environments
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeStudentPerformance = async (student: Student) => {
  const prompt = `Analyze the academic performance of the following student:
  Name: ${student.name}
  Grade: ${student.grade}
  Attendance: ${student.attendance}%
  GPA: ${student.gpa}
  Status: ${student.status}
  
  Provide a professional summary with:
  1. Strengths
  2. Areas for improvement
  3. Actionable recommendation for the student
  4. A predicted trend for the next semester.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI analysis. Please check your network or API key.";
  }
};

export const generateSchoolReport = async (students: Student[]) => {
  const summary = students.map(s => `${s.name} (${s.grade}): GPA ${s.gpa}, Attendance ${s.attendance}%`).join('\n');
  const prompt = `Based on the following student performance data, provide a brief administrative overview report for the school principal:
  
  ${summary}
  
  Please highlight:
  - Overall school health
  - Any specific grades or groups that need attention
  - Strategic goals for next month.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "Unable to generate executive report.";
  }
};
