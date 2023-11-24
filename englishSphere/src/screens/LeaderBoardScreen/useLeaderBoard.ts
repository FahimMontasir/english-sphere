import { useReducer } from "react"

export type State = {
  gender: string
  country: string
  interests: string
  sortBy: string
  sortOrder: string
  searchTerm: string
  page: number
  limit: number
  modalVisible: boolean
  isSearchError: boolean
}
type Field = keyof State
type Action = { type: "UPDATE_VALUE"; field: Field; value: State[Field] }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

const initialState: State = {
  gender: "",
  country: "",
  interests: "",
  sortBy: "",
  sortOrder: "",
  searchTerm: "",
  page: 1,
  limit: 15,
  modalVisible: false,
  isSearchError: false,
}

export const useLeaderBoard = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Helper function to dispatch updates
  const updateValue = (field: Field, value: State[Field]) => {
    dispatch({ type: "UPDATE_VALUE", field, value })
  }

  return {
    state,
    updateValue,
  }
}
