export default function useSearch() {
  const results = ref([])
  const search = ref('')

  watch(search, async (value) => {
    if (!value)
      results.value = []
    results.value = await searchContent(value, {})
  })

  return {
    results,
    search,
  }
}
