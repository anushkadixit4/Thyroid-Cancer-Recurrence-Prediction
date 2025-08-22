"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PredictPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useUser();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Image */}
          <div className="mb-8">
            <Image
              src="/thyroid-1.jpeg"
              alt="Thyroid Awareness Banner"
              width={1200}
              height={400}
              className="w-full max-w-4xl mx-auto rounded-xl shadow-lg object-cover"
              priority
            />
          </div>

          {/* Thyroid Awareness Section */}
          <Card className="mb-8 border border-gray-200 shadow-lg rounded-xl bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex items-center gap-3 pb-6">
              <span className="text-2xl">🦋</span>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Thyroid Awareness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Understanding the Thyroid
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  The thyroid, a small butterfly-shaped gland in the front of your neck, plays a vital role in regulating your body’s energy use. Its hormones influence metabolism, heart rate, body temperature, and more, making it a cornerstone of your overall health.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Common Thyroid Conditions
                </h3>
                <ul className="mt-2 list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Hypothyroidism (Underactive Thyroid):</strong> Slows metabolism, leading to fatigue, weight gain, cold intolerance, depression, and dry skin.
                  </li>
                  <li>
                    <strong>Hyperthyroidism (Overactive Thyroid):</strong> Accelerates metabolism, causing weight loss, anxiety, tremors, heat intolerance, and rapid heartbeat.
                  </li>
                  <li>
                    <strong>Goiter:</strong> An abnormal enlargement of the thyroid gland.
                  </li>
                  <li>
                    <strong>Thyroid Nodules:</strong> Lumps in the thyroid, which may be benign or cancerous.
                  </li>
                  <li>
                    <strong>Thyroid Cancer:</strong> Often symptomless in early stages but treatable with early detection.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Who’s at Risk?
                </h3>
                <ul className="mt-2 list-disc pl-6 text-gray-600 space-y-2">
                  <li>Women (5–8 times more likely than men)</li>
                  <li>Individuals with a family history of thyroid disorders</li>
                  <li>People over the age of 60</li>
                  <li>Those with autoimmune diseases (e.g., Type 1 Diabetes, Rheumatoid Arthritis)</li>
                  <li>Pregnant or postpartum women</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Symptoms to Monitor
                </h3>
                <ul className="mt-2 list-disc pl-6 text-gray-600 space-y-2">
                  <li>Unexplained weight changes</li>
                  <li>Fatigue or irritability</li>
                  <li>Changes in heart rate</li>
                  <li>Hair thinning or loss</li>
                  <li>Swelling in the neck</li>
                  <li>Menstrual irregularities</li>
                  <li>Memory or concentration issues</li>
                </ul>
                <p className="mt-3 text-gray-600">
                  If these symptoms persist, consult a healthcare provider promptly.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Why Early Detection Matters
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Thyroid conditions can develop silently. Regular checkups and tests (like TSH, T3, T4) can detect issues early, preventing serious complications.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Thriving with Thyroid Conditions
                </h3>
                <ul className="mt-2 list-disc pl-6 text-gray-600 space-y-2">
                  <li>Take prescribed medications consistently</li>
                  <li>Maintain a healthy, balanced diet</li>
                  <li>Engage in regular exercise</li>
                  <li>Practice stress management techniques</li>
                  <li>Monitor hormone levels regularly</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  When to Seek Medical Advice
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  If you experience symptoms or have a family history of thyroid disease, consult your doctor. A simple blood test can provide critical insights.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700">
                  Spread Awareness
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Millions live with undiagnosed thyroid conditions. By sharing knowledge, we can encourage others to recognize symptoms and seek timely care. Early diagnosis can be life-saving.
                </p>
                <p className="mt-3 text-lg font-semibold text-blue-600">
                  🟢 Check your neck. Know the signs. Talk to your doctor.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}