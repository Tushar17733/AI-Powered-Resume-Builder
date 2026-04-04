import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from '../context/AuthContext';

const REVIEWS_PER_PAGE = 3;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [openFaq, setOpenFaq] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);

  const testimonials = useMemo(
    () => [
      {
        name: 'Aarav Mehta',
        role: 'Software Engineer',
        avatar: 'https://i.pravatar.cc/128?img=12',
        quote:
          'The templates look premium and the AI suggestions helped me turn messy experience into strong bullet points. I landed 3 interviews in a week.',
      },
      {
        name: 'Riya Sharma',
        role: 'Marketing Associate',
        avatar: 'https://i.pravatar.cc/128?img=45',
        quote:
          'Super clean UI. I built a resume in under 10 minutes and the preview looked exactly like a professional designer made it.',
      },
      {
        name: 'Kabir Singh',
        role: 'Final-year Student',
        avatar: 'https://i.pravatar.cc/128?img=33',
        quote:
          'The step-by-step builder made it easy to structure my first CV. The export was crisp and ATS-friendly.',
      },
      {
        name: 'Neha Kapoor',
        role: 'Product Designer',
        avatar: 'https://i.pravatar.cc/128?img=5',
        quote:
          'I love how the preview matches the final output. Tweaking layout and typography without breaking ATS rules was a huge win.',
      },
      {
        name: 'Vikram Desai',
        role: 'Data Analyst',
        avatar: 'https://i.pravatar.cc/128?img=68',
        quote:
          'Exported in minutes and my recruiter said the resume was easy to scan. The AI bullet rewriter saved me hours of editing.',
      },
      {
        name: 'Ananya Iyer',
        role: 'Career Switcher (Finance → PM)',
        avatar: 'https://i.pravatar.cc/128?img=9',
        quote:
          'The guided sections helped me reframe transferable skills. I finally had a resume that told a coherent story for a new industry.',
      },
      {
        name: 'Rohan Patel',
        role: 'Recent Graduate',
        avatar: 'https://i.pravatar.cc/128?img=15',
        quote:
          'Simple, fast, and no clutter. I made three tailored versions for different roles and kept them all in one place.',
      },
      {
        name: 'Priya Nair',
        role: 'HR Business Partner',
        avatar: 'https://i.pravatar.cc/128?img=32',
        quote:
          'I recommend this to candidates I coach—the structure is what recruiters expect, and the content reads confident, not generic.',
      },
    ],
    []
  );

  const reviewPageCount = Math.ceil(testimonials.length / REVIEWS_PER_PAGE);
  const visibleReviews = testimonials.slice(
    reviewPage * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  const faqs = useMemo(
    () => [
      {
        q: 'Is ResumeXpert ATS-friendly?',
        a: 'Yes. Our templates use clean structure, consistent headings, and readable typography so applicant tracking systems can parse your content reliably.',
      },
      {
        q: 'Can I edit an existing resume later?',
        a: 'Absolutely. Your previous resumes appear under “My Resumes” and you can edit, preview, and delete them anytime.',
      },
      {
        q: 'Do you store my data securely?',
        a: 'We store only what’s needed to build your resumes and use authenticated APIs to keep your data private to your account.',
      },
      {
        q: 'Can I create multiple versions for different jobs?',
        a: 'Yes. Create as many resumes as you want and tailor each one for different roles—then quickly preview and share.',
      },
    ],
    []
  );

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950" />
      <div className="relative container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-sm sm:text-base font-semibold tracking-wide text-blue-700 dark:text-blue-300 lg:text-xl ">
              Fast. Easy. Effective.
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              ResumeXpert. The Best CV Maker Online.
            </h1>
            <h2 className="mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl lg:text-2xl">
              ResumeXpert helps you present your work life,
              personality, and skills on a CV that stands out.
            </h2>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/resume/new"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 transition-colors"
              >
                Create new CV
              </Link>           
              
            </div>

            <h2 className="mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 ">
              {user?.name ? `Welcome back, ${user.name}.` : 'Welcome back.'}
            </h2>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-200/60 via-indigo-200/40 to-pink-200/50 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-pink-500/10 blur-2xl rounded-3xl" />
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src={`${process.env.PUBLIC_URL}/images/dashboard-resume-sample.png`}
                alt="Professional resume sample: two-column layout with profile, skills, and experience"
                className="w-full h-[600px] rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
<br />
<br />
<br />
      {/* Features */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 max-w-6xl">
          <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur shadow-sm p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300">FEATURES</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Everything you need to build a job-winning resume
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                  Clean templates, smart suggestions, and a smooth builder that helps you move fast—without sacrificing quality.
                </p>
              </div>
              <Link
                to="/resume/new"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition-colors"
              >
                Start building
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'AI-powered writing',
                  desc: 'Generate summaries and bullet points that sound professional and impactful.',
                },
                {
                  title: 'ATS-friendly templates',
                  desc: 'Layouts optimized for readability and parsing by hiring systems.',
                },
                {
                  title: 'One-click editing',
                  desc: 'Update any section instantly and keep multiple versions for different jobs.',
                },
                {
                  title: 'Preview & export ready',
                  desc: 'Pixel-perfect preview so your resume looks great before you share it.',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  </div>
                  <p className="mt-4 font-bold text-gray-900 dark:text-white">{f.title}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
<br />
<br />
      {/* Steps */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-wider text-indigo-700 dark:text-indigo-300">HOW IT WORKS</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Build a resume in 3 simple steps
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl">
                A guided flow that keeps you focused—from first draft to final preview.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  {
                    n: '01',
                    title: 'Pick a template',
                    desc: 'Choose a modern, clean layout designed for recruiters and ATS scanners.',
                  },
                  {
                    n: '02',
                    title: 'Fill your details',
                    desc: 'Add experience, education, and skills. Use AI to refine your content.',
                  },
                  {
                    n: '03',
                    title: 'Preview & share',
                    desc: 'Review your resume and export-ready preview. Save multiple versions for each job.',
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur p-5 flex gap-4"
                  >
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center">
                      <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-200">{s.n}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{s.title}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/resume/new"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 transition-colors"
                >
                  Create new CV
                </Link>
                <Link
                  to="/my-resumes"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300/60 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900 text-gray-900 dark:text-white font-semibold px-6 py-3 transition-colors"
                >
                  Go to My Resumes
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-indigo-200/40 via-blue-200/30 to-emerald-200/30 dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-emerald-500/10 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur shadow-sm p-6 sm:p-8">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Pro tip</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Tailor your resume for each job by duplicating a previous resume, then updating the summary and the top 3 bullets in your latest role.
                </p>
                <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-5">
                  <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 w-11/12" />
                  <div className="mt-2 h-2 rounded bg-gray-200/85 dark:bg-gray-800/85 w-9/12" />
                  <div className="mt-2 h-2 rounded bg-gray-200/75 dark:bg-gray-800/75 w-10/12" />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                      <div className="h-2 rounded bg-blue-200/70 dark:bg-blue-500/15 w-10/12" />
                      <div className="mt-2 h-2 rounded bg-blue-200/50 dark:bg-blue-500/10 w-7/12" />
                    </div>
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                      <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 w-9/12" />
                      <div className="mt-2 h-2 rounded bg-gray-200/80 dark:bg-gray-800/80 w-10/12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<br />
<br />
      {/* Testimonials */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-300">REVIEWS</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Loved by job seekers
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                Real outcomes from people who needed a resume that looks great and reads even better.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:pb-0.5">
              <button
                type="button"
                onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                disabled={reviewPage === 0}
                aria-label="Previous reviews"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-40 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setReviewPage((p) => Math.min(reviewPageCount - 1, p + 1))}
                disabled={reviewPage >= reviewPageCount - 1}
                aria-label="Next reviews"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-40 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleReviews.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur p-6"
              >
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={`${t.name} profile`}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-emerald-100 dark:ring-emerald-900/40 border border-gray-200/80 dark:border-gray-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{t.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
<br />
<br />
      {/* FAQ */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 pb-14 sm:pb-20 max-w-6xl">
          <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur shadow-sm p-6 sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-gray-700 dark:text-gray-300">FAQ</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
              Quick answers to common questions about building, saving, and improving your resumes.
            </p>

            <div className="mt-8 divide-y divide-gray-100 dark:divide-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-5 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold text-gray-900 dark:text-white">{item.q}</p>
                      <span className="shrink-0 h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-3xl">{item.a}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Footer — multi-column layout inspired by leading resume-builder sites */}
      <footer className="relative border-t border-gray-100 dark:border-gray-800 bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-950/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">ResumeXpert</p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-sm leading-relaxed">
                Create ATS-friendly resumes with AI-assisted writing, polished templates, and instant preview—so you can apply with confidence.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-blue-600 hover:border-blue-300 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-sky-500 hover:border-sky-300 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-blue-600 hover:border-blue-300 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
              </div>
             
            </div>

            <div className="lg:col-span-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Product</p>
              <div className="mt-4 space-y-2.5 text-sm">
                <Link className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" to="/resume/new">
                  Resume Builder
                </Link>
                <Link className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" to="/my-resumes">
                  My Resumes
                </Link>
                <Link className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" to="/dashboard">
                  Dashboard
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Resources</p>
              <div className="mt-4 space-y-2.5 text-sm">
                <span className="block text-gray-600 dark:text-gray-400">Resume examples</span>
                <span className="block text-gray-600 dark:text-gray-400">Cover letter tips</span>
                <span className="block text-gray-600 dark:text-gray-400">Interview prep</span>
                <span className="block text-gray-600 dark:text-gray-400">Career blog</span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Company</p>
              <div className="mt-4 space-y-2.5 text-sm">
                <span className="block text-gray-600 dark:text-gray-400">About us</span>
                <span className="block text-gray-600 dark:text-gray-400">Contact</span>
                <span className="block text-gray-600 dark:text-gray-400">Careers</span>
                <span className="block text-gray-600 dark:text-gray-400">Press</span>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Stay in the loop</p>
              <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                Get resume tips and product updates. No spam.
              </p>
              <form
                className="mt-4 flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-4 py-2.5 text-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                <span>© {new Date().getFullYear()} ResumeXpert</span>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
                  Accessibility
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  Secure connection
                </span>
                <span>English (US)</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-500 max-w-3xl leading-relaxed">
              ResumeXpert is an independent product. Names and logos of third-party services are trademarks of their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;