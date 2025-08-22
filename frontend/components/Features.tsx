import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, TrendingUp, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    title: "Advanced AI Analysis",
    description: "Utilizes state-of-the-art machine learning algorithms for accurate predictions.",
    icon: Microscope,
  },
  {
    title: "Real-time Risk Assessment",
    description: "Provides instant risk scores based on patient data and historical patterns.",
    icon: TrendingUp,
  },
  {
    title: "HIPAA Compliant",
    description: "Ensures patient data security and privacy with robust encryption.",
    icon: ShieldCheck,
  },
  {
    title: "Seamless Integration",
    description: "Easily integrates with existing hospital management systems.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-blue-600">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

