'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PdfAnalyzer() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null); // To store the current file for consistency
  const predictionsCache = useRef(new Map()); // Cache to store predictions by filename

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPrediction(null); // Reset prediction when new file is selected
      setProbability(null);
      fileRef.current = selectedFile; // Store the current file
    } else {
      alert('Please upload a valid PDF file.');
      setFile(null);
      fileRef.current = null;
    }
  };

  const analyzePdf = () => {
    if (!file) {
      alert('Please upload a PDF file first.');
      return;
    }

    setIsLoading(true); // Start loading animation

    // Simulate processing delay
    setTimeout(() => {
      // Extract filename and check for 'positive' or 'negative'
      const filename = file.name.toLowerCase();
      let recurrencePrediction = null;
      if (filename.includes('report-positive')) {
        recurrencePrediction = 'Positive';
      } else if (filename.includes('report-negative')) {
        recurrencePrediction = 'Negative';
      } else {
        alert('Filename must contain "report-positive" or "report-negative".');
        setIsLoading(false);
        return;
      }

      // Check cache for existing prediction
      const cacheKey = filename;
      if (predictionsCache.current.has(cacheKey)) {
        const cachedResult = predictionsCache.current.get(cacheKey);
        setPrediction(cachedResult.prediction);
        setProbability(cachedResult.probability);
      } else {
        // Generate probability based on prediction
        let randomProbability;
        if (recurrencePrediction === 'Positive') {
          randomProbability = (Math.random() * 0.50 + 0.50).toFixed(2); // 0.50 to 1.00
        } else {
          randomProbability = (Math.random() * 0.50).toFixed(2); // 0.00 to 0.49
        }

        // Store in cache
        predictionsCache.current.set(cacheKey, {
          prediction: recurrencePrediction,
          probability: randomProbability,
        });

        setPrediction(recurrencePrediction);
        setProbability(randomProbability);
      }

      setIsLoading(false); // Stop loading animation
    }, 2000); // 2-second delay to simulate processing
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <Button onClick={analyzePdf} disabled={!file || isLoading} className="w-full">
            Analyze PDF
          </Button>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          )}
          {prediction && probability && !isLoading && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Prediction Results:</h3>
              <p>
                Recurrence Prediction: <span className={prediction === 'Positive' ? 'text-red-600' : 'text-green-600'}>{prediction}</span>
              </p>
              <p>Probability: {probability}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}