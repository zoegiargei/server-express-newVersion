import { writeFile, readFile, unlink } from 'fs/promises';

class DAO_FS{
    constructor(path){
        this.path = path
        this.elements = []
    };

    async read(){

        const asJson = JSON.parse(await readFile(this.path, 'utf-8'))
        return asJson
    };

    async write(){

        const asStringify = await writeFile(this.path, JSON.stringify(this.elements, null, '\t'))
        return asStringify
    };

    async createElement(element){

        const newElement = new Product(element)

        this.elements = await this.read()

        if(this.elements.some(prod => prod.code === newElement.code)){
                    
            throw new Error("There cannot be two identical CODE")
            
        } else{
            
            this.elements.push(newElement)
            await this.write()
        }

        return newElement

    };

    async findElements( { field, value } = {} ){

        const allElements = await this.read()

        if(!field){
            return allElements
        } else{
            allElements.filter(elem => {
                return elem[field] === value
            })
        }
    };

    async findElementById(id){

        const asJson = await this.read()
        return asJson.find(prod => prod.id === id)
    };
    
    async updateElement(pid, data){
        
        const allProducts = await this.read()
        const index = allProducts.findIndex(prod => prod.id === pid);
        allProducts[index] = {
            ...allProducts[index],
            ...data,
            id: pid
        }
        
        this.elements = allProducts
        await this.write()
    };

    async replaceElement(id, newElement){
        
        this.elements = await this.read()
        const index = this.elements.findIndex(elem => elem.id === id)
        
        if(index === -1){ throw Error("Element not found") }

        this.elements[index] = newElement
        await this.write()
    }

    async deleteElement(pid){

        const allProducts = await this.read()
        const currentLength = allProducts.length
        const newArray = allProducts.filter(prod => prod.id != pid)

        if (newArray.length === currentLength) {
            throw new Error("Product not found")
        }

        this.elements = newArray
        await this.write()
    };

    async reset(){
        return await unlink(this.path)
    }
};

export default DAO_FS;