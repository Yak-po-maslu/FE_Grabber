export const formatDate = (date: string, isShort: boolean = false) => {
  const datetime = new Date(date)

  if (isShort)
    return datetime.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

  return datetime.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
