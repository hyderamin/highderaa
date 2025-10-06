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
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">Never Miss Your Connection Again</h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8">
              Get accurate delay predictions for Deutsche Bahn trains using advanced machine learning algorithms
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Train className="h-5 w-5 text-primary" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Accurate Predictions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>ML-Powered</span>
              </div>
            </div>
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
          <p>&copy; 2024 DB Delay Predictor. Built with ❤️ for better train journeys.</p>
        </div>
      </footer>
    </div>
  )
}
