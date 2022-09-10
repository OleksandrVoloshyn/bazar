import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {brandActions, categoryActions, productActions} from "../../redux";
import {UpdateProductImage} from "../UpdateProductImage/UpdateProductImage";
import {IProductDetails} from "../../interfaces";
import css from './ProductForm.module.css'
import {productValidator} from "../../validators";
import {InputError} from "../InputError/InputError";

interface IProps {
    idForUpdate?: string,
}

const ProductForm: FC<IProps> = ({idForUpdate}) => {
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<IProductDetails>({
        resolver: joiResolver(productValidator),
        mode: "onTouched"
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        brandReducer: {brands}, categoryReducer: {categories}, productReducer: {chosenProduct}
    } = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(brandActions.getBrands())
        dispatch(categoryActions.getCategories())
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
        console.log(product)
        if (chosenProduct) {
            product['id'] = idForUpdate
            await dispatch(productActions.updateProduct(product))
            navigate('/account/my_products')
        } else {
            await dispatch(productActions.createProduct({product}))
        }
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={css.input_line}><label>Title: </label><input {...register('title')}/></div>
                {errors.title?.message && <InputError errorMsg={errors.title.message}/>}
                <div className={css.input_line}><label>Description: </label><textarea {...register('description')}/>
                </div>
                {errors.description?.message && <InputError errorMsg={errors.description.message}/>}
                <div className={css.input_line}><label>Price: </label><input type="number" {...register('price')}/>
                </div>
                {errors.price?.message && <InputError errorMsg={errors.price.message}/>}
                <div className={css.input_line}><label>Color: </label><input {...register('color')}/></div>
                {errors.color?.message && <InputError errorMsg={errors.color.message}/>}

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
                {errors.size?.message && <InputError errorMsg={errors.size.message}/>}

                <div className={css.input_line}>
                    <label>Gender: </label>
                    <select {...register('gender')}>
                        <option value="Male">Man</option>
                        <option value="Female">Woman</option>
                    </select>
                </div>
                {errors.gender?.message && <InputError errorMsg={errors.gender.message}/>}

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