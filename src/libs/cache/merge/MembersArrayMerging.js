export default function membersArrayMerging() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args, readField, mergeObjects }) {
      const memberToIndex = Object.create(null)
      const merged = args.nextToken ? existing.items.slice(0) : []

      if (args.nextToken) {
        existing.items.forEach((memberItem, index) => {
          memberToIndex[readField('name', memberItem)] = index
        })
      }

      incoming.items.forEach((memberItem) => {
        const member = readField('name', memberItem)
        const index = memberToIndex[member]

        if (index) {
          merged[index] = mergeObjects(merged[index], memberItem)
        } else {
          memberToIndex[name] = merged.length
          merged.push(memberItem)
        }
      })

      return { ...existing, ...incoming, items: merged }
    },
  }
}
