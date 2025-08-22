import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Statistics from "@/components/Statistics"
import TrustSignals from "@/components/TrustSignals"
import Education from "@/components/Education"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full bg-inherit">
      <div className="w-full">
        <Hero />
        <Features />
        <Statistics />
        <TrustSignals />
        <Education />
        <Footer/>
      </div>
    </main>
  )
}

