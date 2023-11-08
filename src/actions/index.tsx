export const toggleItemInArray = (array: any[], item: any) => {
    const itemIndex = array.findIndex(({name}:any) =>  name === item.name)
    if (itemIndex !== -1) {
        array.splice(itemIndex, 1);
    } else {
        array.push(item);
    }
}