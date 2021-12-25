const Store = require('../models/storeModel')

const StoreCtrl = {
    getStore: async(req, res) =>{
        try {
            const Stores = await Store.find()
            res.json(Stores)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createStore: async (req, res) =>{
        try {
            const {name} = req.body;
            const Store = await Store.findOne({name})
            if(Store) return res.status(400).json({msg: "This Store already exists."})

            const newStore = new Store({name})

            await newStore.save()
            res.json({msg: "Created a stores"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = StoreCtrl