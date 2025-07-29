import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the registration process?",
      answer: "To register for NexHack, simply head over to our official website and click the “Register Now” button. Fill in your details, select your team members and submit the form. Once registered, you’ll receive a confirmation email along with event details."
    },
    {
      question: "How many members are required in a team for NexHack?",
      answer: " Each team must have 2 to 4 members."
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring your laptop, charger,Student ID card, any peripherals you prefer, and your creativity! We'll provide food, drinks, swag, and all the energy you need."
    },
    {
      question: "Are there any participation requirements?",
      answer: "YNexHack is open to everyone! Whether you’re a school student, college student, or a tech enthusiast, you’re welcome to join. All you need is a team of 2–4 members and the passion to hack the next dimension."
    },
    {
      question: "Will food be provided during the hackathon?",
      answer: "Yes, participants will be provided with breakfast, lunch, dinner, and midnight snacks to keep you energized throughout the hackathon. All meals and refreshments are included and will be served at scheduled times during the event."
    },
    {
      question: "Can I start working on my project before the event?",
      answer: "No, all development must begin only after the official start of NexHack. Any team found working on a pre-built project will face disqualification. However, you are allowed to brainstorm ideas and research concepts in advance."
    },
    {
      question: "Can we form teams at the venue?",
      answer: "No, teams must be formed before registration. Only complete teams (2–4 members) will be allowed to participate."
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