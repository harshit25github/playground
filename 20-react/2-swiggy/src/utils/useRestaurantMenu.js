import { useEffect, useState } from "react"

export const useRestaurantMenu = (restaurantId)=>{
    console.log('restaurantId',restaurantId)
    const [restaurantMenu,setRestaurantMenu] = useState(null)
    const [restaurantInfo,setRestaurantInfo] = useState(null)
    async function fetchRestaurantMenu(){
        const response = await fetch(`https://namastedev.com/api/v1/listRestaurantMenu/${restaurantId}`)
        const json = await response.json()
        const infoCard = json?.data?.cards?.find(
        (card) => card?.card?.card?.info
      );
      const info = infoCard?.card?.card?.info || null;
      setRestaurantInfo(info);

      const groupedCard = json?.data?.cards?.find((card) => card?.groupedCard);
      const regularCards =
        groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      const items = regularCards
        .flatMap((card) => card?.card?.card?.itemCards || [])
        .map((item) => item?.card?.info)
        .filter(Boolean);
      setRestaurantMenu(items);
    } 
  
    useEffect(()=>{
        fetchRestaurantMenu()
    },[])
    return {restaurantMenu,restaurantInfo}
}