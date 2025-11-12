import { Linkedin, Mail, GraduationCap, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Iridescent Analytics
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Founded by students, driven by curiosity, committed to democratizing financial knowledge
          </p>
        </div>

        <div className="mb-16 bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Iridescent Analytics was born from a simple observation: world-class financial research and quantitative
              tools shouldn't be locked behind institutional paywalls or expensive terminal subscriptions. As high school
              students passionate about finance, computer science, and mathematics, we experienced firsthand the barriers
              that prevent aspiring analysts and researchers from accessing professional-grade resources.
            </p>
            <p>
              We believe that the next generation of financial innovators is already here—working on side projects,
              exploring market dynamics, and building their analytical skills. But too often, they hit walls: expensive
              data subscriptions, complex software licenses, and a lack of accessible educational materials that bridge
              theory and practice.
            </p>
            <p>
              Iridescent Analytics is our answer to that challenge. We combine rigorous research methodologies with
              accessible technology, offering everything from equity analysis and econometric studies to interactive
              quantitative tools—all free and open to everyone. Our mission is to empower students, independent researchers,
              and curious minds to explore financial markets with the same caliber of resources used by professionals.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 overflow-hidden hover:border-teal-500/50 transition-all">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-8 border-b border-teal-300">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-gray-900 text-3xl font-bold mb-4">
                  AB
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Ayan Bhardwaj</h3>
                <div className="text-teal-500 font-semibold mb-4">Co-Founder & Chief Technology Officer</div>
                <div className="flex items-center space-x-2 text-gray-700 text-sm mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Rising Senior at Melissa High School</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>Computer Science & Applied Mathematics</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Passionate about leveraging cutting-edge technology to solve complex financial problems, Ayan combines
                  his deep understanding of mathematics and computer science to develop innovative quantitative models.
                  His expertise spans from quantum computing applications in finance to developing sophisticated machine
                  learning algorithms for market prediction.
                </p>
                <div className="mb-4">
                  <h4 className="text-gray-900 font-semibold mb-2">Key Interests:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Quantitative Finance', 'Quantum Computing', 'Machine Learning', 'Algorithmic Trading'].map((interest) => (
                      <span key={interest} className="bg-teal-1000/10 text-teal-500 px-3 py-1 rounded-full text-sm border border-teal-500/30">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/ayan-bhardwaj-579048281/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-900 px-4 py-2 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 overflow-hidden hover:border-emerald-500/50 transition-all">
              <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 p-8 border-b border-teal-300">
                <img
                  src="/EthanIAphoto copy.jpg"
                  alt="Ethan Lin"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-teal-300"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Ethan Lin</h3>
                <div className="text-emerald-400 font-semibold mb-4">Co-Founder & Chief Financial Officer</div>
                <div className="flex items-center space-x-2 text-gray-700 text-sm mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Rising Senior at Garland High School</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>Finance & Economics</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  With a passion for teaching and empowering others, Ethan leverages his understanding of financial markets and investment strategies to make complex concepts accessible. At Iridescent Analytics, he creates financial models and analysis tools designed to educate and guide fellow investors.
                </p>
                <div className="mb-4">
                  <h4 className="text-gray-900 font-semibold mb-2">Key Interests:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Business Analysis', 'Financial Consulting', 'Financial Modeling', 'Market Analysis'].map((interest) => (
                      <span key={interest} className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/30">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/ethan-lin-324b23312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-900 px-4 py-2 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-100/50 rounded-lg p-6 border border-teal-500/30">
              <h3 className="text-xl font-bold text-teal-500 mb-3">Accessibility</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Professional-grade financial tools and research should be available to everyone, not just those
                with institutional access or expensive subscriptions.
              </p>
            </div>

            <div className="bg-teal-100/50 rounded-lg p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Rigor</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Every analysis, model, and tool we create adheres to academic and industry standards. We prioritize
                methodological soundness and intellectual honesty.
              </p>
            </div>

            <div className="bg-teal-100/50 rounded-lg p-6 border border-emerald-500/30">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">Innovation</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We continuously explore cutting-edge techniques in machine learning, quantitative finance, and
                data science to push the boundaries of what's possible.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-700/30 p-8 text-center">
          <Mail className="w-12 h-12 text-teal-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Get in Touch</h3>
          <p className="text-gray-700 mb-6">
            Interested in collaborating, have feedback, or want to learn more about our work?
          </p>
          <p className="text-gray-600 text-sm">
            We're always open to connecting with fellow students, researchers, and finance enthusiasts.
            Reach out to us via LinkedIn to start a conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
