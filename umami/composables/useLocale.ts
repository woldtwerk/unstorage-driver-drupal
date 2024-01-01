export function useLocale(code: string) {
  const state = useState('locale', () => 'en')
  if (code)
    state.value = code
  const { locale } = useI18n()
  state.value = locale.value
  return state
}
