import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../hook";
import {productActions} from "../../redux";
import {useForm} from "react-hook-form";

const ProductForm: FC = () => {
    const {brands, categories} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        dispatch(productActions.getBrands())
        dispatch(productActions.getCategories())
    }, [dispatch])
    const submit = (product: any) => {
        console.log(product)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>Title: <input type="text" {...register('title')}/></label></div>
                <div><label>Description: <textarea maxLength={1000} {...register('description')}/></label></div>
                <div><label>Price: <input type="number" {...register('price', {valueAsNumber: true})}/></label></div>
                <div><label>Color: <input type="text" {...register('color')}/></label></div>

                <div><label>Size:
                    <select {...register('size')}>
                        <option></option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </label></div>

                <div>
                    <label>Gender:
                        <select {...register('gender')}>
                            <option></option>
                            <option value="Male">Man</option>
                            <option value="Female">Woman</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>Brand:
                        <select {...register('brand')}>
                            <option></option>
                            {/* @ts-ignore*/}
                            {brands && brands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}
                        </select>
                    </label>
                </div>

                <div>
                    <label>Category:
                        <select {...register('category')}>
                            <option></option>
                            {/* @ts-ignore*/}
                            {categories && categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                        </select>
                    </label>
                </div>
                <div><label>Images: <input type="file" multiple={true} {...register('images')}/></label></div>
                <button>Create</button>
            </form>
        </div>
    );
};

export {ProductForm};