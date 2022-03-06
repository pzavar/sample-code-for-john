//this is a resusable method to filter unnecessary data from category
export const filterCategory = (data) => {
    let temp = [], obj = {}
    for (const item of data) {
        obj = {
            id: item.id,
            image: item.image ? item.image.src : item.image,
            name: item.name.replace("&amp;",""),
            parent: item.parent
        }
        temp.push(obj)
    }
    return temp
}

