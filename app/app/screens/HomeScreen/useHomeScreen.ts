import { useState } from "react"

// this custom hook is only for application logic. DONOT put useStores(), useNavigation() here! rather pass these via props
export const useHomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([
    { thumbnail: "https://i.pravatar.cc/300", id: 1 },
    { thumbnail: "https://i.pravatar.cc/300", id: 2 },
    { thumbnail: "https://i.pravatar.cc/300", id: 3 },
    { thumbnail: "https://i.pravatar.cc/300", id: 4 },
    { thumbnail: "https://i.pravatar.cc/300", id: 5 },
  ])

  const handleRefresh = () => {
    setRefreshing(true)
    setData((prev) => [...prev, { thumbnail: "https://i.pravatar.cc/300", id: prev.at(-1).id + 1 }])
    setRefreshing(false)
  }

  return { data, refreshing, handleRefresh }
}
