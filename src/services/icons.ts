import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

export type IconName = 'search' | 'times' | 'angleUp' | 'angleDown'

export const addIconsToLibrary = () => {
  library.add(faSearch, faTimes, faAngleUp, faAngleDown)
}
