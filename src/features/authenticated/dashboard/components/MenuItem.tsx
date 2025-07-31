import { memo } from 'react'
import type { MenuInterface } from '../data/menu'
import { Link } from '@tanstack/react-router'

interface MenuItemProps {
  menu: MenuInterface
}

const MenuItem = memo(({ menu }: MenuItemProps) => {
  
  return (
    <Link 
      to="/payment"
      search={{ 
        service_code: menu.service_code || '',
        service_name: menu.label,
        tariff: menu.tariff || 0
      }}
      className="flex flex-col items-center cursor-pointer hover:scale-105 w-full transition-transform p-2"
    >
      <div className={`${menu.background} p-2 rounded-lg mb-2`}>
        <img 
          src={menu.image} 
          alt={menu.label}
          className=" aspect-square!"
        />
      </div>
      <span className="text-xs font-semibold text-center">{menu.label}</span>
    </Link>
  )
})

MenuItem.displayName = 'MenuItem'

export default MenuItem