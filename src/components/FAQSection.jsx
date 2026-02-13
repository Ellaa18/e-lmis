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
    answer: "Training Areas Differentiation",
  },
  {
    question: "-Training Areas Differentiation?",
    answer: "Training Areas Differentiation",
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
