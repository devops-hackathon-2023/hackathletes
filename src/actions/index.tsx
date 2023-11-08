import {SasItem} from "@/constants/types";

export const toggleItemInArray = (array: SasItem[], item: SasItem) => {
    const itemIndex = array.findIndex(({moduleName}) =>  moduleName === item.moduleName)
    if (itemIndex !== -1) {
        array.splice(itemIndex, 1);
    } else {
        array.push(item);
    }
}