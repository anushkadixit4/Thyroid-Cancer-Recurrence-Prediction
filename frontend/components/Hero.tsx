import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 animate-fade-in">
                AI-Powered Thyroid Cancer Recurrence Prediction
              </h1>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 animate-slide-up">
                Empowering oncologists with cutting-edge AI to predict and prevent thyroid cancer recurrence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-slide-up">
             <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link> 
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/banner-image.jpg"
              alt="AI-powered medical analysis"
              width={900}
              height={900}
              className="rounded-xl object-cover shadow-2xl animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

