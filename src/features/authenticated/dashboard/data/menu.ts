export interface MenuInterface {
    id:string,
    label: string,
    image: string,
    background: string,
    service_code?: string,
    tariff?: number
}

export const Menus: MenuInterface[] = [
    {
        id:"PAJAK",
        service_code: "PAJAK",
        label: "Pajak PBB",
        image: "/assets/PBB.png",
        background: "bg-green-50"
    },
    {
        id:"PLN",
        service_code: "PLN",
        label: "Listrik",
        image: "/assets/Listrik.png",
        background: "bg-yellow-50"
    },
    {
        id:"PULSA",
        service_code: "PULSA",
        label: "Pulsa",
        image: "/assets/Pulsa.png",
        background: "bg-gray-50"
    },
    {
        id:"PDAM",
        service_code: "PDAM",
        label: "PDAM",
        image: "/assets/PDAM.png",
        background: "bg-blue-50"
    },
    {
        id:"PGN",
        service_code: "PGN",
        label: "PGN",
        image: "/assets/PGN.png",
        background: "bg-red-50"
    },
    {
        id:"TV",
        service_code: "TV",
        label: "TV Langganan",
        image: "/assets/Televisi.png",
        background: "bg-purple-50"
    },
    {
        id:"MUSIK",
        service_code: "MUSIK",
        label: "Musik",
        image: "/assets/Musik.png",
        background: "bg-pink-50"
    },
    {
        id:"VOUCHER_GAME",
        service_code: "VOUCHER_GAME",
        label: "Voucher Game",
        image: "/assets/Game.png",
        background: "bg-lime-50"
    },
    {
        id:"VOUCHER_MAKANAN",
        service_code: "VOUCHER_MAKANAN",
        label: "Voucher Makanan",
        image: "/assets/Voucher.png",
        background: "bg-teal-50"
    },
    {
        id:"QURBAN",
        service_code: "QURBAN",
        label: "Qurban",
        image: "/assets/Kurban.png",
        background: "bg-neutral-50"
    },
    {
        id:"PAKET_DATA",
        service_code: "PAKET_DATA",
        label: "Paket Data",
        image: "/assets/Data.png",
        background: "bg-sky-50"
    },
    {
        id:"ZAKAT",
        service_code: "ZAKAT",
        label: "Zakat",
        image: "/assets/Zakat.png",
        background: "bg-green-50"
    },
    
]