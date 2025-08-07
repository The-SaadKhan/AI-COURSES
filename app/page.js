import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { BookOpen, Zap, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">AI CourseGen</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignInButton>
              <Button>Start Free Trial</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/workspace">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Generate AI-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Courses
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create comprehensive, engaging courses in minutes with the power of AI. 
            From course structure to detailed content, we handle it all so you can focus on teaching.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton>
                <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/workspace">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
            
            {/* This button will trigger login when clicked */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  View Demo
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                View Demo
              </Button>
            </SignedIn>
          </div>

          {/* Free Trial Benefits - Always visible */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Create 3 courses free
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Hero Image - Always visible */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border">
            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Course Generation Demo</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -left-6 bg-blue-100 rounded-full p-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-purple-100 rounded-full p-4">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Features Section - Always visible */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create amazing courses
            </h2>
            <p className="text-xl text-gray-600">
              Powerful AI tools designed to make course creation effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI-Generated Content</h3>
              <p className="text-gray-600">
                Create comprehensive course content including chapters, topics, and detailed explanations with just a few clicks.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Learning</h3>
              <p className="text-gray-600">
                Track progress, mark chapters complete, and provide an engaging learning experience for your students.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Easy Management</h3>
              <p className="text-gray-600">
                Organize your courses, manage enrollments, and monitor student progress all from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Always visible */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Create your first course in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe Your Course</h3>
              <p className="text-gray-600">
                Tell us about your course topic, difficulty level, and target audience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Generates Content</h3>
              <p className="text-gray-600">
                Our AI creates structured chapters, detailed content, and learning materials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Publish & Share</h3>
              <p className="text-gray-600">
                Review, customize if needed, and start teaching your course immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to create your first AI-powered course?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who are already using AI to create amazing learning experiences
          </p>
          
          <SignedOut>
            <SignInButton>
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Free Trial - No Credit Card Required <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/workspace">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Create Your Course <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-semibold">AI CourseGen</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI CourseGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
