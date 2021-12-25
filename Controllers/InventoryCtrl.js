const Inventorys = require('../models/InventorytModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} 

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const InventoryCtrl = {
    getBooks: async(req, res) =>{
        try {
            const features = new APIfeatures(Inventorys.find(), req.query)
            .filtering().sorting().paginating()

            const inventory = await features.query

            res.json({
                status: 'success',
                result: inventory.length,
                inventory: inventory
            })
            if(inventory.length===0)
            {
                return res.status(400).json({msg: "book is out of stock"})
            }
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBook: async(req, res) =>{
        try {
            const {book_id, book_title, book_price, book_description,images,storename} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const inventory = await Inventorys.findOne({book_id})
            if(inventory)
                return res.status(400).json({msg: "This book already exists."})

            const newBook = new Inventorys({
                book_id, book_title, book_price, book_description,images,storename
            })

            await newBook.save()
            res.json({msg: "Created a Book"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBook: async(req, res) =>{
        try {
            await Inventorys.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBook: async(req, res) =>{
        try {
            const {book_title, book_price, book_description,images,storename} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Inventorys.findOneAndUpdate({_id: req.params.id}, {
                 book_title, book_price, book_description,images,storename
            })

            res.json({msg: "Updated a Book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = InventoryCtrl