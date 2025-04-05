import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Main.css'

export const MainPage = ({user}) =>  {
  const images = ["/Gpu.jpg", "/Gpu2.jpeg"];
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        useEffect(() => {
          //console.log(user.identities.username.id)
          const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 3000); // Change image every 3 seconds
          return () => clearInterval(interval);
        }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900 sm:px-4">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-black">PeerCloud</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="#features" className="hover:text-black transition">Features</Link>
          <Link to="#how-it-works" className="hover:text-black transition">How It Works</Link>
          <Link to="#use-cases" className="hover:text-black transition">Use Cases</Link>
          <Link to="#pricing" className="hover:text-black transition">Pricing</Link>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="rounded-full w-8 h-8 bg-black text-white flex justify-center items-center font-bold">
            {user.identities.username.id[0].toUpperCase()}
          </div>
          <p className="text-gray-800 font-medium">{user.identities.username.id}</p>
        </div>
      </nav>

        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Decentralized GPU Computing for Everyone</h1>
            <p className="text-xl text-gray-700 mb-8">
          Share and access computing power globally at a fraction of the cost of traditional cloud services.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/dashboard"
            className="py-3 px-8 shadow-md text-white bg-black flex justify-center items-center gap-2 rounded-lg group relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-300 before:ease-out hover:before:h-32 hover:before:w-72"
          >
            <span className="z-10 group-hover:text-black">Get Started</span>
          </Link>
          <Link
            to="#how-it-works"
            className="border py-3 px-8 shadow-md text-zinc-900 bg-white flex justify-center items-center gap-2 rounded-lg group relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-300 before:ease-out hover:before:h-32 hover:before:w-72"
          >
            <span className="z-10 group-hover:text-white">Learn More</span>
          </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative h-64 flex justify-center items-center md:h-96 w-full">
          <img
            src={images[currentImageIndex]}
            alt="Rotating GPU"
            className="absolute inset-0 bg-gradient-to-br from-gray-950 to-gray-600 rounded-xl flex items-center justify-center duration-500 ease-in-out opacity-100 transition-all"
          />
            </div>
          </div>
        </section>
        {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-black">10k+</p>
              <p className="text-gray-700">Active GPUs</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-black">82%</p>
              <p className="text-gray-700">Cost Savings</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-black">50+</p>
              <p className="text-gray-700">Countries</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-black">24/7</p>
              <p className="text-gray-700">Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PeerCloud?</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our decentralized platform revolutionizes how computing resources are shared and utilized.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Up to 80% Cost Reduction</h3>
            <p className="text-gray-700">
              Access computing power at a fraction of what traditional cloud providers charge.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-700">
              End-to-end encryption and sandboxed execution environments keep your data and models safe.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Distribution</h3>
            <p className="text-gray-700">
              Access GPUs from all over the world, reducing latency and increasing availability.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PeerCloud Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects those with idle computing power to those who need it, creating an efficient marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 text-white">1</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Install our client and connect your machine to the PeerCloud network to share or access GPU resources.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 text-white">2</div>
              <h3 className="text-xl font-semibold mb-2">Configure</h3>
              <p className="text-gray-600">
                Set your preferences – whether you're sharing resources or need them for a specific task.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 text-white">3</div>
              <h3 className="text-xl font-semibold mb-2">Compute</h3>
              <p className="text-gray-600">
                Execute your workloads seamlessly across the network or earn by providing computing power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Can Do With PeerCloud</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI training to scientific research, PeerCloud powers a variety of high-compute applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">AI Model Training</h3>
            <p className="text-gray-600 mb-4">
              Train machine learning models at a fraction of the cost of traditional cloud providers. Distribute your workload across multiple GPUs for faster results.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Up to 80% cost savings compared to major cloud providers
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Parallel training across multiple GPUs
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Support for popular ML frameworks
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">3D Rendering</h3>
            <p className="text-gray-600 mb-4">
              Render complex 3D scenes and animations without the need for expensive hardware. Access a global network of GPUs on demand.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Distributed rendering for faster completion
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Compatible with major rendering engines
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Pay only for what you use
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Scientific Computing</h3>
            <p className="text-gray-600 mb-4">
              Run complex simulations and data analyses for research without the need for institutional-grade supercomputers.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Molecular modeling and simulations
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Climate research and weather modeling
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Genomic sequence analysis
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Crypto Mining</h3>
            <p className="text-gray-600 mb-4">
              Optimize mining operations by accessing GPUs during low-demand periods at competitive rates.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dynamic scaling based on profitability
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Pay-as-you-go without long-term commitments
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Support for multiple mining algorithms
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pay only for what you use, or earn by sharing your idle resources. No hidden fees or long-term commitments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Consumer</h3>
              <p className="text-gray-600 mb-6">For those who need computing power</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">$0.05</span>
                <span className="text-gray-600"> / GPU hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to global GPU network
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No minimum commitment
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure execution environment
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pay-as-you-go billing
                </li>
              </ul>
              <Link to="/signup" className="block w-full py-3 bg-black text-center text-white rounded-lg hover:bg-black transition font-medium">
                Start Computing
              </Link>
            </div>
            
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Provider</h3>
              <p className="text-gray-600 mb-6">For those who want to share resources</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">$0.03</span>
                <span className="text-gray-600"> / GPU hour earned</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Monetize idle GPU resources
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set your own availability schedule
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure isolation of workloads
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Monthly payouts
                </li>
              </ul>
              <Link to="/provider" className="block w-full py-3 bg-black text-center text-white rounded-lg hover:bg-black transition font-medium">
                Start Earning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-950 to-gray-700 rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Join the Computing Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Whether you want to access affordable GPU power or earn from your idle resources, PeerCloud makes it simple.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="py-3 px-8 shadow-md text-zinc-900 bg-white flex justify-center items-center gap-2 rounded-lg group relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-300 before:ease-out hover:before:h-32 hover:before:w-72"
            >
              <span className="z-10 group-hover:text-white">Get Started</span>
            </Link>
            <Link
              to="#how-it-works"
              className="py-3 px-8 shadow-md text-zinc-900 bg-white flex justify-center items-center gap-2 rounded-lg group relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-300 before:ease-out hover:before:h-32 hover:before:w-72"
            >
              <span className="z-10 group-hover:text-white">Learn More</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of researchers, developers, and creators who've already made the switch to PeerCloud.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-bold text-xl text-white">JD</div>
              <div className="ml-4">
                <h4 className="font-semibold">Dr. Julia Dawson</h4>
                <p className="text-gray-500">AI Researcher</p>
              </div>
            </div>
            <p className="text-gray-700">
              "PeerCloud reduced our model training costs by over 75% while actually improving performance. It's been a game-changer for our research team."
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-bold text-xl text-white">MR</div>
              <div className="ml-4">
                <h4 className="font-semibold">Marcus Rodriguez</h4>
                <p className="text-gray-500">3D Artist</p>
              </div>
            </div>
            <p className="text-gray-700">
              "I no longer need to invest in expensive hardware upgrades. PeerCloud lets me render complex scenes faster than ever, and I only pay for what I use."
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-bold text-xl text-white">SK</div>
              <div className="ml-4">
                <h4 className="font-semibold">Sarah Kim</h4>
                <p className="text-gray-500">Startup Founder</p>
              </div>
            </div>
            <p className="text-gray-700">
              "Our gaming PCs were sitting idle overnight. Now they generate over $300 per month in passive income through PeerCloud. It's brilliant!"
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">How secure is PeerCloud?</h3>
              <p className="text-gray-700">
                All workloads run in isolated containers with end-to-end encryption. Your data and code never touch the provider's filesystem directly. We implement multiple security layers to ensure complete isolation.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What hardware can I share?</h3>
              <p className="text-gray-700">
                You can share any CUDA-compatible NVIDIA GPU (GTX 1060 or better) or AMD GPU with ROCm support. We also support specialized AI accelerators like Google TPUs and Intel's Gaudi.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How are providers vetted?</h3>
              <p className="text-gray-700">
                All providers go through hardware verification and security checks. We implement a reputation system and providers must complete test workloads before joining the network.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens if a provider goes offline during my job?</h3>
              <p className="text-gray-700">
                Our system automatically detects disconnections and migrates your workload to another available provider, resuming from the latest checkpoint with minimal disruption.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I get paid as a provider?</h3>
              <p className="text-gray-700">
                Payments are processed monthly via cryptocurrency (Bitcoin, Ethereum) or traditional payment methods like PayPal, Stripe, or bank transfer, depending on your location.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I use PeerCloud for enterprise workloads?</h3>
              <p className="text-gray-700">
                Yes! We offer enterprise plans with additional security features, SLAs, dedicated support, and compliance certifications. Contact our sales team for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 text-center shadow-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Stay Updated</h2>
                    <p className="text-gray-600 mb-6">
                        Subscribe to our newsletter for the latest updates, features, and community news.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-grow px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black transition font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
      {/* Footer */}
      <footer className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">PeerCloud</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                                <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Resources</h3>
                            <ul className="space-y-2">
                                <li><Link to="/documentation" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                                <li><Link to="/api" className="text-gray-600 hover:text-gray-900">API</Link></li>
                                <li><Link to="/github" className="text-gray-600 hover:text-gray-900">GitHub</Link></li>
                                <li><Link to="/community" className="text-gray-600 hover:text-gray-900">Community</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                                <li><Link to="/security" className="text-gray-600 hover:text-gray-900">Security</Link></li>
                                <li><Link to="/compliance" className="text-gray-600 hover:text-gray-900">Compliance</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Connect</h3>
                            <ul className="space-y-2">
                                <li><Link to="https://twitter.com/peercloud" className="text-gray-600 hover:text-gray-900">Twitter</Link></li>
                                <li><Link to="https://github.com/peercloud" className="text-gray-600 hover:text-gray-900">GitHub</Link></li>
                                <li><Link to="https://discord.gg/peercloud" className="text-gray-600 hover:text-gray-900">Discord</Link></li>
                                <li><Link to="https://t.me/peercloud" className="text-gray-600 hover:text-gray-900">Telegram</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 mb-4 md:mb-0">© 2025 PeerCloud. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <Link to="/twitter" className="text-gray-500 hover:text-gray-900">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                            <Link to="/github" className="text-gray-500 hover:text-gray-900">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
  );
}
