const product = require('../models/product');
const Product = require('../models/product');

// GET PRODUCT DETAILS
exports.getProduct = async (req, res, next) => {
    const product = await Product.find();
    if (product) {
        res.status(200).json({
            statusCode: 200,
            statusMessage: "OK",
            result: {
                success: "Data Found!"
            },
            data: product
        })
    }
};

// POST FILTER PRODUCT
exports.postFilter = async (req, res, next) => {

    const { brandName, breedType, vegNonVeg, price } = req.body;
    // const brandName = "Himalaya", breedType = "Adult Breed", vegNonVeg = "Non Veg", price = 1;

    const productData = await Product.find();
    const filterArray = {};
    const priceArray = [];
    var filterPrice = 0;

    for (let i = 0; i < productData.length; i++) {
        if (price == 1) {
            filterPrice = priceArray.filter(x => { return x >= 100 && x < 200 });
            priceArray.push(productData[i].price)
        }
        if (price == 2) {
            filterPrice = priceArray.filter(x => { return x >= 200 && x < 300 });
            priceArray.push(productData[i].price)
        }
        if (price == 3) {
            filterPrice = priceArray.filter(x => { return x >= 300 && x < 400 });
            priceArray.push(productData[i].price)
        }
    }

    if (brandName != "")
        filterArray.brandName = brandName;

    if (breedType != "")
        filterArray.breedType = breedType;

    if (vegNonVeg != "")
        filterArray.vegNonVeg = vegNonVeg;

    if (priceArray != "")
        filterArray.price = filterPrice;


    if (filterArray != {}) {
        Product.find(filterArray)
            .then((filterResult) => {
                res.status(200).json({
                    statusCode: 200,
                    statusMessage: "OK",
                    result: {
                        success: "Data Found!"
                    },
                    data: filterResult,
                });
            })
            .catch((error) => {
                res.status(403).json({
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    result: {
                        error: "Error in filter data! : " + error.message
                    }
                })

            });
    }
    // else {
    //     Product.find()
    //         .then((filterResult) => {
    //             res.status(200).json({
    //                 statusCode: 200,
    //                 statusMessage: "OK",
    //                 result: {
    //                     success: "All Data Found!"
    //                 },
    //                 data: filterResult,
    //             });
    //         })
    //         .catch((error) => {
    //             res.status(403).json({
    //                 statusCode: 403,
    //                 statusMessage: "Forbidden",
    //                 result: {
    //                     error: "Error in filter data! : " + error.message
    //                 }
    //             })
    //         });
    // }

};