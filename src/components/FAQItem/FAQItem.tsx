import React from 'react'
import { TFAQItem } from '../../types/FAQItemType'

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden group-open:inline"
          >
            <path d="M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM17 11V13H7V11H17Z" />
          </svg>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="group-open:hidden"
          >
            <path d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
          </svg>
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
