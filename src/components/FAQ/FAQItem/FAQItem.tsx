import React from 'react'
import { TFAQItem } from '../../../types/FAQItemType.ts'
import IconPlus from '../../../assets/icons/plus-icon.svg?react'
import IconMinus from '../../../assets/icons/minus-icon.svg?react'

import './FAQItem.css'

interface FAQItemProps extends TFAQItem {}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, id }) => {
  return (
    <div className="accordion w-full py-8 last:border-none">
      <details className="accordion__details group w-full">
        <summary className="relative flex cursor-pointer list-none items-center justify-between text-grey-200 marker:hidden">
          <span role="term" aria-details={id} className="relative z-10 mb-2 text-b2 text-grey-950">
            {question}
          </span>
          <IconPlus className="text-primary-950 group-open:hidden" />
          <IconMinus className="hidden text-primary-950 group-open:inline" />

          <div className="border-b-text-primary-950 absolute bottom-0 left-0 w-full border-b group-open:hidden" />
        </summary>
      </details>
      <div role="definition" id={id} className="accordion__content">
        <div className="accordion__content-body">
          <p className="text-b3 text-grey-500">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default FAQItem
