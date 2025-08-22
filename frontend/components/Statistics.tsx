import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Accuracy Rate", value: "95%" },
  { title: "Patients Analyzed", value: "100,000+" },
  { title: "Hospitals Using Our Platform", value: "500+" },
  { title: "Lives Impacted", value: "1M+" },
]

export default function Statistics() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-blue-600">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 dark:text-zinc-400">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

