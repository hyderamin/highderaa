import { Header } from "@/components/header"
import { DelayPredictionForm } from "@/components/delay-prediction-form"
import { Train, Clock, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">Predict DB delays before you go</h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8">
              Predict Deutsche Bahn train delays before they happen. Plan every journey with confidence, using real data
              and simple insights.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Train className="h-5 w-5 text-primary" />
                <span>Real data</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Smart predictions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Confidence before you board</span>
              </div>
            </div>
            <p className="text-base text-muted-foreground text-pretty max-w-2xl mx-auto">
              Every journey should start with clarity. DB Delay Predictor analyzes past Deutsche Bahn journeys to show
              how likely your train is to run late. No guessing, no surprises, just smarter travel decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Prediction Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <DelayPredictionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with real Deutsche Bahn data. Designed to help you plan smarter and travel calmer.</p>
        </div>
      </footer>
    </div>
  )
}
