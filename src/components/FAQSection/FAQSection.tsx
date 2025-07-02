import React from 'react'
import FAQItem from '../FAQItem/FAQItem'
import useFetchFAQItems from '../../api/useFetchFAQItems'

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = ({}) => {
  const { data: FAQItems } = useFetchFAQItems()

  return (
    <section className="mx-auto flex max-w-container flex-col items-center justify-center py-[7.5rem]">
      <h2 className="self-center text-center text-h2">FAQ</h2>
      <div className="w-[70%]">
        {FAQItems && FAQItems.map((item) => <FAQItem {...item} key={item.question} />)}
      </div>
    </section>
  )
}

export default FAQSection
