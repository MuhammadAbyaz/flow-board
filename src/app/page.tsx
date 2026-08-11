import Link from "next/link"

export default function Home() {
  const features = [
    {
      title: "Multiple Views",
      description: "Track tasks across board, list, and timeline views to find the perfect perspective for your workflow.",
    },
    {
      title: "Lightweight Automation",
      description: "Create custom workflows and auto-move tasks to keep your projects organized without the overhead.",
    },
    {
      title: "Manager Rollups",
      description: "Real-time rollup dashboards for cross-team project health and visibility across your organization.",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-4 py-20 md:py-32">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            FlowBoard
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            The lightweight alternative to heavyweight enterprise tools
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Built for small-to-mid-size teams (10-200 people) to reduce status-update overhead and provide real-time project visibility.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/(auth)/signup">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Link>
            <Link href="/(auth)/login">
              <button className="px-8 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose FlowBoard?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
