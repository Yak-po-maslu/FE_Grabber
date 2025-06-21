import React from 'react'
import FAQItem from '../FAQItem/FAQItem'
import { FAQItems } from '../../assets/FAQ_items'

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = ({}) => {
  return (
    <section className="max-w-container mx-auto flex flex-col items-center justify-center py-[7.5rem]">
      <h2 className="self-center text-center text-h2">FAQ</h2>
      <div className="w-[70%]">
        {FAQItems.map((item, index) => (
          <FAQItem {...item} />
        ))}
      </div>
    </section>
  )
}

export default FAQSection
