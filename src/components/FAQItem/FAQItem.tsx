import React from 'react'
import { TFAQItem } from '../../types/FAQItemType'
import IconPlus from '../../assets/icons/plus-icon.svg?react'
import IconMinus from '../../assets/icons/minus-icon.svg?react'

import './FAQItem.css'

interface FAQItemProps extends TFAQItem {
  key: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, id, key }) => {
  return (
    <div className="accordion w-full border border-b-grey-200 py-8 last:border-none" key={key}>
      <details name="faq" className="accordion__details group items-center">
        <summary className="flex cursor-pointer list-none items-center justify-between text-grey-200 marker:hidden">
          <span role="term" aria-details={id} className="mb-2 text-b2 text-grey-950">
            {question}
          </span>
          <IconPlus className="text-grey-200 group-open:hidden" />
          <IconMinus className="hidden text-grey-200 group-open:inline" />
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
