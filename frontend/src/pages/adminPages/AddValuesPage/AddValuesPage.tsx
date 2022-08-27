import {FC, useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {productActions} from "../../../redux";
import {useForm} from "react-hook-form";

const AddValuesPage: FC = () => {
    const {categories, brands} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const [categoryValue, setCategoryValue] = useState<string>('');
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        dispatch(productActions.getCategories())
        dispatch(productActions.getBrands())
    }, [dispatch])

    const addNewCategory = () => {
        dispatch(productActions.createCategory(categoryValue))
    }
    const removeCategory = (id: string) => {
        dispatch(productActions.removeCategory(id))
    }

    const brandSubmit = (newBrand: any) => {
        if (newBrand.image[0]) {
            newBrand.image = newBrand.image[0]
        }
        dispatch(productActions.createBrand(newBrand))
    }
    const removeBrand = (id: string) => {
        dispatch(productActions.removeBrand(id))
    }

    return (
        <div>
            <div>
                <div><label>New Category: <input type="text" onChange={(e) => setCategoryValue(e.target.value)}
                                                 value={categoryValue}/></label>
                    <button onClick={addNewCategory} disabled={!categoryValue}>add</button>
                </div>
                {categories.map(category => <div key={category.id}>{category.title}
                    <span onClick={() => removeCategory(category.id)}>X</span></div>)}
            </div>
            <hr/>
            <div>
                {brands.map(brand => <div key={brand.id}>{brand.name}
                    <span onClick={() => removeBrand(brand.id)}>X</span></div>)}
                <form onSubmit={handleSubmit(brandSubmit)}>
                    <div><label>Brand Name: <input type="text" {...register('name')}/></label></div>
                    <div><label>Description: <input type="text"{...register('description')}/></label></div>
                    <div><label>Image: <input type="file" {...register('image')}/></label></div>
                    {/*todo not filelist find usual file send*/}
                    <button>create</button>
                </form>
            </div>
        </div>
    );
};

export {AddValuesPage};