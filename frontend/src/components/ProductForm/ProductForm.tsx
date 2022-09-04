import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {UpdateProductImage} from "../UpdateProductImage/UpdateProductImage";
import {IProductDetails} from "../../interfaces";
import css from './ProductForm.module.css'
import {useNavigate} from "react-router-dom";

interface IProps {
    idForUpdate?: string,
}

// todo validate
const ProductForm: FC<IProps> = ({idForUpdate}) => {
    const {brands, categories, chosenProduct} = useAppSelector(({productReducer}) => productReducer);
    const {register, handleSubmit, setValue, reset} = useForm<IProductDetails>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getBrands())
        dispatch(productActions.getCategories())
        idForUpdate ? dispatch(productActions.getProductById({pk: idForUpdate})) : reset()

        return () => {
            dispatch(productActions.removeChosenProductFromState())
        }
    }, [idForUpdate])

    const setFormForUpdate = () => {
        if (chosenProduct) {
            setValue('title', chosenProduct.title)
            setValue('description', chosenProduct.description)
            setValue('price', chosenProduct.price)
            setValue('color', chosenProduct.color)
            setValue('size', chosenProduct.size)
            setValue('gender', chosenProduct.gender)
            chosenProduct.brand ? setValue('brand.id', chosenProduct.brand.id) : setValue('brand.id', '')
            chosenProduct.category ? setValue('category.id', chosenProduct.category.id) : setValue('category.id', '')
        }
    }

    idForUpdate && setFormForUpdate()

    const submit: SubmitHandler<Partial<IProductDetails>> = async (product) => {
        if (chosenProduct) {
            product['id'] = idForUpdate
            await dispatch(productActions.updateProduct(product))
            navigate('/account/my_products')
        } else {
            dispatch(productActions.createProduct({product}))
        }
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={css.input_line}><label>Title: </label><input {...register('title')}/></div>
                <div className={css.input_line}><label>Description: </label><textarea {...register('description')}/>
                </div>
                <div className={css.input_line}><label>Price: </label><input type="number" {...register('price')}/>
                </div>
                <div className={css.input_line}><label>Color: </label><input {...register('color')}/></div>

                <div className={css.input_line}>
                    <label>Size: </label>
                    <select {...register('size')}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>

                <div className={css.input_line}>
                    <label>Gender: </label>
                    <select {...register('gender')}>
                        <option value="Male">Man</option>
                        <option value="Female">Woman</option>
                    </select>
                </div>

                <div className={css.input_line}>
                    <label>Brand: </label>
                    <select {...register('brand.id')}>
                        <option></option>
                        {brands && brands.map(brand => <option key={brand.id}
                                                               value={brand.id}>{brand.name}</option>)}
                    </select>
                </div>

                <div className={css.input_line}>
                    <label>Category: </label>
                    <select {...register('category.id')}>
                        <option></option>
                        {categories && categories.map(category => <option key={category.id}
                                                                          value={category.id}>{category.title}</option>)}
                    </select>
                </div>

                {chosenProduct
                    ? <UpdateProductImage images={chosenProduct.images} productId={chosenProduct.id}/>
                    : <div><label>Images: <input type="file" multiple {...register('images')}/></label></div>}

                <div className={css.btn_div}>
                    <button>{chosenProduct ? 'update' : 'create'}</button>
                </div>
            </form>
        </div>
    );
};

export {ProductForm};