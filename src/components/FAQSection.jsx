import { useState } from "react";
import "../styles/faq.css";

const faqs = [
  {
    question: "-What is the performance of job creation for the fiscal year 2014?",
    answer: `In the first 11 months of the 2014 Ethiopian budget year, it was planned to create 2,949,293 permanent jobs for 2,137,932 people (72%).
    Of the jobs created, 49.7 percent were in rural areas and 50.3 percent in urban areas.`,
    
  },
  {
    question: "-What is Differentiation in Zoning and Training Fields?",
    answer: "Differentiation in the context of zoning and training fields refers to the systematic division of training areas, exercises, or programs based on specific criteria to optimize performance, safety, and development. It’s about customizing the environment, intensity, or focus of training according to the needs, goals, or abilities of individuals or groups",
  },
  {
    question: "-Training Areas Differentiation?",
    answer: "Training areas differentiation refers to the strategic division of training spaces and exercises to suit the specific needs, skills, and roles of athletes or participants. It ensures that training is safe, effective, and targeted, allowing individuals or groups to focus on their development without interference or inefficiency.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="section-title">Frequently Asked Questions (FAQ)</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
