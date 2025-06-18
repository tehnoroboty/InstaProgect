import { Options } from '../../ui/select/SelectBox'

export const PAGE_SIZE_OPTIONS: Options[] = [
  { value: '10', valueTitle: '10' },
  { value: '20', valueTitle: '20' },
  { value: '30', valueTitle: '30' },
  { value: '50', valueTitle: '50' },
  { value: '100', valueTitle: '100' },
]

export const DEFAULT_PAGE_SIZE = Number(PAGE_SIZE_OPTIONS[0].value)
