"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Groq from "groq-sdk"

const steps = [
  { title: "Personal Information", fields: ["Age", "Gender"] },
  { title: "Medical History", fields: ["Smoking", "Hx Smoking", "Hx Radiothreapy"] },
  { title: "Thyroid Condition", fields: ["Thyroid Function", "Physical Examination", "Adenopathy"] },
  { title: "Diagnosis", fields: ["Pathology", "Focality", "Risk"] },
  { title: "Staging", fields: ["T", "N", "M", "Stage"] },
  { title: "Treatment Response", fields: ["Response"] },
]

const fieldOptions = {
  Gender: ["F", "M"],
  Smoking: ["No", "Yes"],
  "Hx Smoking": ["No", "Yes"],
  "Hx Radiothreapy": ["No", "Yes"],
  "Thyroid Function": [
    "Euthyroid",
    "Clinical Hyperthyroidism",
    "Subclinical Hypothyroidism",
    "Clinical Hypothyroidism",
    "Subclinical Hyperthyroidism",
  ],
  "Physical Examination": [
    "Single nodular goiter-right",
    "Diffuse goiter",
    "Multinodular goiter",
    "Single nodular goiter-left",
    "Normal",
  ],
  Adenopathy: ["No", "Bilateral", "Right", "Left", "Extensive", "Posterior"],
  Pathology: ["Papillary", "Micropapillary", "Follicular", "Hurthel cell"],
  Focality: ["Uni-Focal", "Multi-Focal"],
  Risk: ["Low", "High", "Intermediate"],
  T: ["T1b", "T4b", "T1a", "T3a", "T2", "T3b", "T4a"],
  N: ["N0", "N1b", "N1a"],
  M: ["M0", "M1"],
  Stage: ["I", "IVA", "II", "IVB", "III"],
  Response: ["Excellent", "Structural Incomplete", "Biochemical Incomplete", "Indeterminate"],
}

const PredictionModal = forwardRef(({ onSubmit, onClose }, ref) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(true) // Initialize as open

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFinalSubmit = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Make sure all required fields are filled
      const requiredFields = steps.flatMap(step => step.fields)
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
      }
      
      // Make sure Age is a number
      const dataToSend = {
        ...formData,
        Age: formData.Age ? parseInt(formData.Age, 10) : 0
      }

      // Log context for debugging
      console.log("Sending patient data:", dataToSend);

      // Step 1: Get prediction from local API
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `API responded with status: ${response.status}`
        )
      }
      
      const result = await response.json()
      console.log("Prediction result:", result)
      
      // Step 2: Use Groq SDK instead of direct API call
      // Check if the Groq API key is available
      if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
        console.warn("NEXT_PUBLIC_GROQ_API_KEY is not defined")
        return
      }
      
      try {
        const groq = new Groq({ 
          apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
          dangerouslyAllowBrowser: true // Add this flag to allow browser usage
        });
        
        // Create a more professional, doctor-like prompt
        const medicalPrompt = `
As a thyroid specialist physician with expertise in thyroid cancer management, please provide a concise, professional medical evaluation and personalized recommendations for the following patient.

Include:
1. A brief assessment of their thyroid cancer recurrence risk (${result.recurrence_prediction ? "High" : "Low"} - ${(result.recurrence_probability * 100).toFixed(2)}%)
2. Specific lifestyle modifications and dietary recommendations
3. Potential follow-up testing schedule
4. Key warning signs they should monitor

Patient Information:
${JSON.stringify(dataToSend, null, 2)}

Important: Format your response in a conversational, friendly tone, as if speaking directly to the patient. Avoid using markdown formatting symbols like asterisks or hashtags. Break your response into short, clear paragraphs that would work well in a chat interface.
`;

        console.log("Sending prompt to Groq:", medicalPrompt);
        
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: medicalPrompt
            }
          ],
          model: "llama3-70b-8192",
        })
        
        const aiResponse = chatCompletion.choices[0]?.message?.content || ""
        console.log("Groq AI response:", aiResponse);
        
        // Call onSubmit with both results if provided
        if (onSubmit) {
          onSubmit({
            predictionResult: result,
            groqResponse: aiResponse,
          })
        }
        
        // Close the modal after successful submission
        setIsOpen(false)
      } catch (groqError) {
        console.error("Groq API error:", groqError)
        throw new Error("Unable to generate recommendations. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setError(error.message || "An error occurred while processing your request")
    } finally {
      setIsLoading(false)
    }
  }

  const renderField = (field) => {
    if (fieldOptions[field]) {
      if (fieldOptions[field].length === 2 && fieldOptions[field].every((option) => ["Yes", "No"].includes(option))) {
        return (
          <RadioGroup 
            value={formData[field] || ""} 
            onValueChange={(value) => handleInputChange(field, value)} 
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id={`${field}-yes`} />
              <Label htmlFor={`${field}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id={`${field}-no`} />
              <Label htmlFor={`${field}-no`}>No</Label>
            </div>
          </RadioGroup>
        )
      } else {
        return (
          <Select 
            value={formData[field] || ""} 
            onValueChange={(value) => handleInputChange(field, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field}`} />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions[field].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
    } else {
      return <Input 
        type={field === "Age" ? "number" : "text"} 
        value={formData[field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)} 
      />
    }
  }

  const handleNext = () => {
    // Check if all fields in the current step are filled
    const currentFields = steps[currentStep].fields
    const missingFields = currentFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(", ")}`)
      return
    }
    
    setError(null)
    
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // On the last step, trigger the submission
      handleFinalSubmit()
    }
  }

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (!open && onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thyroid Cancer Assessment</DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 p-4 mb-4 rounded border border-red-200 text-red-800">
            <h3 className="font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
            {steps[currentStep].fields.map((field) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field} className="block mb-2">
                  {field}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)} disabled={isLoading}>
                Previous
              </Button>
            )}
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              {isLoading ? "Processing..." : currentStep < steps.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

PredictionModal.displayName = "PredictionModal";

export default PredictionModal;