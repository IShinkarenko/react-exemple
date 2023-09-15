export default function companiesArrayMerging() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args, readField, mergeObjects }) {
      const companyToIndex = Object.create(null)
      const merged = args.nextToken ? existing.items.slice(0) : []

      if (args.nextToken) {
        existing.items.forEach((companyItem, index) => {
          companyToIndex[readField('companyName', companyItem)] = index
        })
      }

      incoming.items.forEach((companyItem) => {
        const note = readField('companyName', companyItem)
        const index = companyToIndex[note]

        if (index) {
          merged[index] = mergeObjects(merged[index], companyItem)
        } else {
          companyToIndex[name] = merged.length
          merged.push(companyItem)
        }
      })

      return { ...existing, ...incoming, items: merged }
    },
  }
}
