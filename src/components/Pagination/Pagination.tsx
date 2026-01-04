import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex gap-2">
    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
      ←
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={currentPage === i + 1 ? 'font-bold' : ''}
      >
        {i + 1}
      </button>
    ))}
    <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
      →
    </button>
  </div>
)
