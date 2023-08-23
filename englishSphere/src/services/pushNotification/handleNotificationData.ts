import { storageEmitter } from "."
import { NotiPayload } from "./types"
import * as storage from "src/utils/storage"

const NOTI_DATA_KEY = "notifications-data"
export interface NotiDisplayData extends NotiPayload {
  unread: boolean
}

const add = (data: NotiDisplayData) => {
  const prevData = storage.load(NOTI_DATA_KEY)

  if (!prevData) {
    storage.save(NOTI_DATA_KEY, [data])
  } else if (Array.isArray(prevData) && prevData.length < 101) {
    storage.save(NOTI_DATA_KEY, [data, ...prevData])
  } else if (Array.isArray(prevData) && prevData.length >= 101) {
    prevData.pop()
    storage.save(NOTI_DATA_KEY, [data, ...prevData])
  }

  storageEmitter.emit("change", "notification")
}

const load = (loadAll?: boolean): NotiDisplayData[] => {
  const notiData = storage.load(NOTI_DATA_KEY) as NotiDisplayData[]
  if (notiData) {
    if (loadAll) {
      return notiData
    } else {
      const truncatedData = notiData.slice(0, 15)
      return truncatedData
    }
  } else {
    return []
  }
}

/**
 * user need to manually click (eg. mark all as read)
 * not required right now
 */
const readAll = () => {
  const notiData = storage.load(NOTI_DATA_KEY) as NotiDisplayData[]
  if (notiData) {
    const modified = notiData.map((d) => (d.unread = false))
    storage.save(NOTI_DATA_KEY, modified)
  }
  storageEmitter.emit("change", "notification")
}

const readOne = (id: string) => {
  const notiData = storage.load(NOTI_DATA_KEY) as NotiDisplayData[]
  if (notiData) {
    const updatedNotiData = notiData.map((item) => {
      if (item.data.id === id) {
        item.unread = false
      }
      return item
    })

    storage.save(NOTI_DATA_KEY, updatedNotiData)
  }
  storageEmitter.emit("change", "notification")
}

const clearAll = () => {
  storage.save(NOTI_DATA_KEY, [])
  storageEmitter.emit("change", "notification")
}
const clearAllOnLogOut = () => {
  storage.save(NOTI_DATA_KEY, [])
}

const getTotalUnread = () => {
  const notiData = storage.load(NOTI_DATA_KEY) as NotiDisplayData[]
  if (notiData) {
    return notiData.filter((i) => i.unread).length
  } else {
    return 0
  }
}

export const HandleNotiData = {
  add,
  load,
  readAll,
  readOne,
  clearAll,
  clearAllOnLogOut,
  getTotalUnread,
}
