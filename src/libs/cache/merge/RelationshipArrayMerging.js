export default function relationshipArrayMerging() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args, readField, mergeObjects }) {
      const noteToIndex = Object.create(null)
      const merged = args.nextToken ? existing.items.slice(0) : []

      if (args.nextToken) {
        existing.items.forEach((noteItem, index) => {
          noteToIndex[readField('note', noteItem)] = index
        })
      }

      incoming.items.forEach((noteItem) => {
        const note = readField('note', noteItem)
        const index = noteToIndex[note]
        if (index) {
          merged[index] = mergeObjects(merged[index], noteItem)
        } else {
          noteToIndex[name] = merged.length
          merged.push(noteItem)
        }
      })

      return { ...existing, ...incoming, items: merged }
    },
  }
}
