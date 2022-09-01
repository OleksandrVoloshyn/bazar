import {FC, useEffect} from "react"
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";
import {CategoriesControl} from "../../../components";

const ValuesPage: FC = () => {
    const {brands} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm();


    useEffect(() => {
        dispatch(productActions.getBrands())
    }, [dispatch])

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
            <CategoriesControl/>
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

export {ValuesPage};