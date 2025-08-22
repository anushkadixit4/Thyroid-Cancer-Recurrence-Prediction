// services/qroq-api.js

/**
 * Service for interacting with the Qroq API
 */

const QROQ_API_BASE_URL = 'https://api.qroq.ai/v1';

/**
 * Get recommendations based on patient data and prediction results
 * 
 * @param {Object} patientData - Form data with patient information
 * @param {Object} predictionResults - Results from the prediction model
 * @param {Array} requestedRecommendations - Types of recommendations requested
 * @returns {Promise<Object>} - Recommendations data
 */
export async function getRecommendations(patientData, predictionResults, requestedRecommendations = ["prescription", "dietPlan", "followUpSchedule", "lifestyleModifications"]) {
  try {
    const response = await fetch(`${QROQ_API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_QROQ_API_KEY}`
      },
      body: JSON.stringify({
        patientData,
        predictionResults,
        requestedRecommendations
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

/**
 * Generate a detailed medical report based on patient data and recommendations
 * 
 * @param {Object} patientData - Form data with patient information
 * @param {Object} predictionResults - Results from the prediction model
 * @param {Object} recommendations - Recommendation data
 * @returns {Promise<Object>} - Generated report data
 */
export async function generateMedicalReport(patientData, predictionResults, recommendations) {
  try {
    const response = await fetch(`${QROQ_API_BASE_URL}/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_QROQ_API_KEY}`
      },
      body: JSON.stringify({
        patientData,
        predictionResults,
        recommendations
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate medical report');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating medical report:', error);
    throw error;
  }
}

/**
 * Handle fallback in case Qroq API is unavailable
 * 
 * @param {Object} patientData - Form data with patient information
 * @param {Object} predictionResults - Results from the prediction model
 * @returns {Object} - Basic fallback recommendations
 */
export function getFallbackRecommendations(patientData, predictionResults) {
  // Determine risk level
  const recurrenceProbability = predictionResults?.recurrenceProbability || 0;
  const riskLevel = recurrenceProbability < 0.3 ? "Low" : 
                    recurrenceProbability < 0.7 ? "Moderate" : "High";

  // Generate basic fallback recommendations based on risk level
  return {
    prescription: {
      medications: [
        {
          name: "Levothyroxine",
          dosage: "Based on patient weight and TSH levels",
          frequency: "Once daily on empty stomach",
          duration: "Ongoing",
          notes: "Take 30-60 minutes before breakfast"
        }
      ],
      specialInstructions: "Regular monitoring of thyroid function tests is essential. Adjust dosage based on results."
    },
    dietPlan: {
      generalGuidelines: "Maintain a balanced diet rich in essential nutrients. Iodine intake should be moderate.",
      recommendedFoods: [
        "Lean proteins (fish, chicken, tofu)",
        "Fresh fruits and vegetables",
        "Whole grains",
        "Healthy fats (olive oil, avocados, nuts)"
      ],
      foodsToAvoid: [
        "Excessive iodine sources if on radioactive iodine therapy",
        "Highly processed foods",
        "Excessive alcohol"
      ],
      mealSchedule: "Regular meals at consistent times. Small, frequent meals if experiencing gastric issues."
    },
    followUpSchedule: {
      appointments: [
        {
          type: "Endocrinology Follow-up",
          timeframe: riskLevel === "High" ? "Every 3 months" : "Every 6 months",
          purpose: "Monitor thyroid function and medication efficacy"
        },
        {
          type: "Oncology Follow-up",
          timeframe: riskLevel === "High" ? "Every 3-4 months" : "Every 6 months",
          purpose: "Assess for recurrence and manage cancer-related concerns"
        }
      ],
      tests: [
        {
          name: "Thyroid Function Tests (TSH, T3, T4)",
          frequency: "Every 3-6 months"
        },
        {
          name: "Thyroglobulin Level",
          frequency: "Every 6-12 months"
        },
        {
          name: "Neck Ultrasound",
          frequency: riskLevel === "High" ? "Every 6 months" : "Annually"
        }
      ]
    },
    lifestyleModifications: {
      recommendations: [
        {
          category: "Physical Activity",
          description: "Moderate exercise for 30 minutes, 5 days a week. Include both cardiovascular and strength training.",
          benefits: "Improves energy levels, reduces fatigue, and supports overall health"
        },
        {
          category: "Stress Management",
          description: "Practice regular stress reduction techniques such as meditation, deep breathing, or yoga.",
          benefits: "Helps manage anxiety related to diagnosis and supports immune function"
        },
        {
          category: "Sleep Hygiene",
          description: "Aim for 7-8 hours of quality sleep. Maintain consistent sleep schedule.",
          benefits: "Supports healing and hormone regulation"
        }
      ]
    }
  };
}