import { useCallback, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
/**
 * Usage Guideline:
 * useRefreshOnFocus(refetch)
 * refetch param from tanStack Query
 * @param refetch
 */
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch]),
  )
}
