export default function FAQSection() {
  const faqs = [
    {
      question: "What products do you sell?",
      answer: "We sell quality clothes, shoes, and perfumes for both men and women."
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we offer fast and reliable home delivery to your doorstep."
    },
    {
      question: "Can I return an item if it doesn’t fit?",
      answer: "Yes, we have a 7-day return policy for all eligible items."
    },
    {
      question: "How do I track my order?",
      answer: "After placing your order, a tracking link will be sent to your email."
    },
    {
      question: "Do you sell original perfumes?",
      answer: "Absolutely! All our perfumes are 100% original and long-lasting."
    },
  ];

  
  return (
    <div className="w-full bg-white py-8">
      <h3 className="text-center capitalize font-bold font-[Montserrat] text-xl lg:text-2xl tracking-wide text-[#260262]">Frequently Asked Questions</h3>
      <div className="w-[80%] mx-auto mt-6">
        {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-100 rounded-md mb-3 shadow-sm group">
                <summary className="font-semibold cursor-pointer w-full font-[mulish] flex items-center justify-between px-4 py-4">{faq.question} <span className="after:content-['+'] group-open:after:content-['−'] text-lg transition-all duration-300"/></summary>
                <p className=" text-gray-700 font-[mulish] px-4">{faq.answer}</p>
            </details>
        ))}
      </div>
    </div>
  );
}

