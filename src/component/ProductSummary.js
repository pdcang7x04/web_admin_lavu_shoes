import React, { useEffect, useState } from 'react'
import { getAllBrand } from '../API/API_Brand'
import { getCategory } from '../API/API_Category'

const ProductSummary = () => {
    const [suppliers, setsuppliers] = useState(0)
    const [categories, setcategories] = useState(0)

    const numberOfSuppliers = async () => {
        getAllBrand()
        .then((data) => {
            setsuppliers(data.length)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const numberofCategories = async () => {
        getCategory()
        .then((data) => {
            setcategories(data.length)
        })
    }

    useEffect(() => {
      numberOfSuppliers()
      numberofCategories()
    }, [])
    
  return (
    <div>
        <div>
           <h4>Số lượng nhà cung cấp: {suppliers}</h4> 
        </div>
        <div>
            <h4>Số lượng danh mục: {categories}</h4>
        </div>
    </div>
  )
}

export default ProductSummary

