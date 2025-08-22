import Image from "next/image"

const partners = [
  { name: "Hospital A", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Medical Institute B", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Research Center C", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Health Organization D", logo: "/placeholder.svg?height=60&width=120" },
]

export default function TrustSignals() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Trusted By
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center animate-fade-in">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 animate-slide-up">
            HIPAA Compliant | ISO 27001 Certified | FDA Approved
          </p>
        </div>
      </div>
    </section>
  )
}

