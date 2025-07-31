import { useMemo } from "react"
import MenuItem from "./components/MenuItem"
import { useMenus } from "./hooks/useMenus"
import { useGetServicesQuery } from "@/store/api/serviceApi"

const Index = () => {
    const { menus } = useMenus()
    const { data: servicesData } = useGetServicesQuery()
    
    // Merge menu data with service tariffs
    const menusWithTariffs = useMemo(() => {
        if (!servicesData?.data) return menus
        
        const serviceMap = new Map(
            servicesData.data.map(service => [service.service_code, service])
        )
        
        return menus.map(menu => ({
            ...menu,
            tariff: serviceMap.get(menu.service_code || '')?.service_tariff || 0
        }))
    }, [menus, servicesData])
    

    
  return (
    <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Layanan Kami</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-4">
            {menusWithTariffs.map((menu) => (
                <MenuItem 
                    key={menu.id} 
                    menu={menu}
                />
            ))}
        </div>
    </div>
  )
}

export default Index