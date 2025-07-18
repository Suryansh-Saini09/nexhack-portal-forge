import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the registration process?",
      answer: "Registration is completely free! Simply click the 'Register Now' button and fill out the form. We'll send you a confirmation email with all the details you need."
    },
    {
      question: "Do I need a team to participate?",
      answer: "Not at all! You can participate solo, bring your own team (up to 4 members), or join our team formation session on Day 1. We'll help you find the perfect squad."
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring your laptop, charger, any peripherals you prefer, and your creativity! We'll provide food, drinks, swag, and all the energy you need. Don't forget a change of clothes for the full 36-hour experience."
    },
    {
      question: "Are there any participation requirements?",
      answer: "You must be a current college student with a valid student ID. All skill levels are welcome - from complete beginners to coding veterans. The only requirement is enthusiasm to learn and build!"
    },
    {
      question: "What technologies can we use?",
      answer: "Any programming language, framework, or platform is fair game! Whether you're into web development, mobile apps, AI/ML, blockchain, or something completely different - build what excites you."
    },
    {
      question: "How does judging work?",
      answer: "Projects are judged on innovation, technical implementation, presentation, and potential impact. Our panel includes industry experts, professors, and previous hackathon winners."
    },
    {
      question: "Is there food provided?",
      answer: "Absolutely! We'll have meals, snacks, and drinks available throughout the entire event. We cater to various dietary restrictions - just let us know your needs during registration."
    },
    {
      question: "Can I start working on my project before the event?",
      answer: "No pre-existing code is allowed. All work must be done during the 36-hour timeframe. However, you can brainstorm ideas and plan your approach beforehand!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="section-spacing">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            KNOWLEDGE BASE
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers! Check out our most frequently asked questions below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="minecraft-card bg-card border-2 border-border overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/20 transition-colors duration-200"
              >
                <h3 className="font-pixel text-sm text-foreground pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6 border-t border-border">
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-mono text-sm text-muted-foreground">
            Still have questions? Reach out to us at{' '}
            <a href="mailto:hello@nexhack.dev" className="text-primary hover:underline">
              hello@nexhack.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};