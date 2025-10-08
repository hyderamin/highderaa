import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Target, Lightbulb, User } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-balance mb-4">About DB Delay Predictor</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Learn about our mission and the person behind this project
            </p>
          </div>

          {/* Motivation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Motivation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Train delays are a common frustration for millions of Deutsche Bahn passengers every day. Missing
                connections, being late for important meetings, or simply not knowing when to leave home creates
                unnecessary stress in our daily lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We built this delay predictor to empower travelers with accurate, data-driven insights about potential
                delays before they happen. By leveraging machine learning algorithms trained on historical Deutsche Bahn
                data, weather patterns, and real-time network conditions, we aim to make train travel more predictable
                and less stressful.
              </p>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Our Vision</p>
                  <p className="text-sm text-muted-foreground">
                    A world where every train passenger can plan their journey with confidence, knowing exactly what to
                    expect from their Deutsche Bahn experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Founder Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                About the Founder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Hyder</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I love building stuff. With deep experience in startups and a passion for solving real problems, I
                      saw train delays as a universal pain point that affects millions of Deutsche Bahn passengers every
                      day. So I decided to build something about it.
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    I don't come from a data analytics background, but that's never stopped me from tackling challenges
                    head-on. This project is for everyone who's ever been frustrated by unpredictable train delays. If
                    it's a problem worth solving, it's worth building.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://www.linkedin.com/in/syed-hyder-amin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn Profile
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="mailto:hyderamin7@gmail.com">
                        <Mail className="h-4 w-4 mr-2" />
                        hyderamin7@gmail.com
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Get in Touch
              </CardTitle>
              <CardDescription>Have questions, suggestions, or feedback? We'd love to hear from you!</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us what's on your mind..." rows={5} />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 DB Delay Predictor. Built with ❤️ for better train journeys.</p>
        </div>
      </footer>
    </div>
  )
}
