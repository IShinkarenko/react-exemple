export default function relationshipsArrayMerging() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args, readField, mergeObjects }) {
      const relationshipToIndex = Object.create(null)
      const merged = args.nextToken ? existing.items.slice(0) : []

      if (args.nextToken) {
        existing.items.forEach((relationshipItem, index) => {
          relationshipToIndex[readField('name', relationshipItem)] = index
        })
      }

      incoming.items.forEach((relationshipItem) => {
        const relationship = readField('name', relationshipItem)
        const index = relationshipToIndex[relationship]

        if (index) {
          merged[index] = mergeObjects(merged[index], relationshipItem)
        } else {
          relationshipToIndex[name] = merged.length
          merged.push(relationshipItem)
        }
      })

      return { ...existing, ...incoming, items: merged }
    },
  }
}
