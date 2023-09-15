import EmptyIcon from '@mui/icons-material/Remove'

export const generateLocation = (row) => {
  const locationParams = (({ city, postalCode, stateOrProvince }) => ({
    city,
    postalCode,
    stateOrProvince,
  }))(row)

  const location = Object.values(locationParams)
    .filter((param) => param)
    .join(', ')

  return location || <EmptyIcon />
}

export const getTypesValue = (definitions = [], types) => {
  const typesValues = definitions.filter(({ id }) => (types ?? []).includes(id)).map(({ name }) => name)

  return typesValues.length > 1 ? `${typesValues[0]}, ...` : typesValues.join()
}
