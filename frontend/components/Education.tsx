import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Film, BookOpen, BarChart2 } from "lucide-react"

const resources = [
  { title: "Understanding Thyroid Cancer Recurrence", type: "Article", icon: FileText },
  { title: "AI in Oncology: A Comprehensive Guide", type: "Whitepaper", icon: BookOpen },
  { title: "Predictive Analytics in Healthcare", type: "Webinar", icon: Film },
  { title: "Case Study: Improving Patient Outcomes", type: "Case Study", icon: BarChart2 },
]

export default function Education() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Educational Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-blue-600">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 dark:text-zinc-400">{resource.type}</p>
                <Button variant="link" className="mt-2 text-blue-600 hover:text-blue-700">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center animate-slide-up">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  )
}

