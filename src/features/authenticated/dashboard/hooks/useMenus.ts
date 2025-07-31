import { useMemo } from 'react'
import { Menus, type MenuInterface } from '../data/menu'

export const useMenus = (filter?: (menu: MenuInterface) => boolean) => {
  const memoizedMenus = useMemo(() => {
    if (filter) {
      return Menus.filter(filter)
    }
    return Menus
  }, [filter])

  const getMenuById = useMemo(() => {
    const menuMap = new Map(Menus.map(menu => [menu.id, menu]))
    return (id: string) => menuMap.get(id)
  }, [])

  const getMenuByLabel = useMemo(() => {
    const menuMap = new Map(Menus.map(menu => [menu.label.toLowerCase(), menu]))
    return (label: string) => menuMap.get(label.toLowerCase())
  }, [])

  return {
    menus: memoizedMenus,
    getMenuById,
    getMenuByLabel,
    totalMenus: memoizedMenus.length,
  }
}