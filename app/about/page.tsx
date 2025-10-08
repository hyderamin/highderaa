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
              Train delays cause more than missed connections. They cause missed moments. DB Delay Predictor helps you
              plan ahead by showing how likely your train is to be late, based on real data from Deutsche Bahn.
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
                For millions of travelers, uncertainty is the hardest part of taking the train. You leave early, rush to
                the station, and still end up waiting. We built this project to give travelers back control through data
                that makes planning easier and travel calmer.
              </p>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Our Vision</p>
                  <p className="text-sm text-muted-foreground">
                    A world where every passenger knows what to expect before they travel. Because predictability should
                    be part of every journey.
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
                      Hi, I'm Hyder. I love building things that solve real problems. After countless delayed trains and
                      missed meetings, I decided to build something that helps others avoid the same frustration. This
                      project is for anyone who has ever been left waiting on a platform, wondering when the next train
                      will really arrive.
                    </p>
                  </div>
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
          <p>Built with real Deutsche Bahn data. Designed to help you plan smarter and travel calmer.</p>
        </div>
      </footer>
    </div>
  )
}
