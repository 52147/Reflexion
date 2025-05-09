import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function AboutModal({ isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        {/* Centered modal panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-white">
                  About This Project
                </Dialog.Title>

                <div className="mt-2 text-sm text-gray-300 space-y-4">
                  <p className="text-red-300 font-bold">
                    ⚠️ This is a demo version. The API is currently disabled due
                    to inference cost constraints.
                  </p>

                  <p>
                    <strong>Reflexion</strong> is an early-stage,
                    research-driven initiative that explores the use of
                    generative AI to enhance psychological self-awareness and
                    emotional literacy at scale. It integrates cognitive
                    science, therapeutic principles, and human-centered design
                    to support individuals in navigating stress, internalized
                    beliefs, and systemic influence.
                  </p>

                  <p>
                    This demo showcases one of Reflexion's core modules: an
                    AI-guided emotional reflection tool with two distinct
                    interaction modes:
                    <ul className="list-disc pl-6 mt-1">
                      <li>
                        <strong>General Mode:</strong> Performs baseline
                        sentiment analysis, offers tailored insights, and
                        recommends actionable steps based on linguistic
                        patterns.
                      </li>
                      <li>
                        <strong>Deep Dive Mode:</strong> Facilitates layered
                        psychological inquiry across four dimensions, drawing
                        from theories in cognitive behavioral therapy (CBT),
                        social conditioning, and value system re-alignment.
                      </li>
                    </ul>
                  </p>

                  <p>
                    Each deep reflection session concludes with a{" "}
                    <strong>Final Report</strong> summarizing key emotional
                    markers, perceived stressors, cognitive distortions, and
                    areas for long-term self-improvement.
                  </p>

                  <p className="text-yellow-300 italic">
                    Reflexion is designed to be a socially impactful, scalable
                    framework for augmenting emotional resilience—particularly
                    in contexts where access to traditional mental health
                    services is limited. Future releases will include mood
                    timeline tracking, adaptive prompt logic, and expanded
                    integrations with health and education systems.
                  </p>

                  <div className="mt-4 space-y-2">
                    <p>
                      {" "}
                      <a
                        href="https://www.reflexionai.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Project Landing Page
                      </a>
                    </p>
                    <p>
                      {" "}
                      <a
                        href="https://medium.com/@ainotfound404321"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Technical Overview (Medium Article)
                      </a>
                    </p>
                    <p>
                      {" "}
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeKJnQFfbbqfaaEmm7tOH31qcc4Fj2fG436Afl3vF0EiJmmSA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Feedback & Use Case Questionnaire
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
