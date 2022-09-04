import {FC, useEffect} from "react"
import {useSearchParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {BiReset} from 'react-icons/bi'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {brandActions} from "../../redux";
import css from './FilterSideBar.module.css'

const FilterSideBar: FC = () => {
    const {brands} = useAppSelector(({brandReducer}) => brandReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {register, handleSubmit} = useForm();
    const queryObj = Object.fromEntries(query.entries());

    const submit: SubmitHandler<any> = (data) => {
        for (const item in data) {
            data[item] ? (queryObj[item] = data[item]) : delete queryObj[item]
        }
        setQuery(queryObj)
    }
    useEffect(() => {
        dispatch(brandActions.getBrands())
    }, [dispatch])

    return (
        <div className={css.wrap}>
            <form onSubmit={handleSubmit(submit)}>
                <div className={css.input_line}><label>Min price: </label>
                    <input type="number"{...register('price_gt', {valueAsNumber: true})}/>
                </div>
                <div className={css.input_line}><label>Max price: </label>
                    <input type="number" {...register('price_lt', {valueAsNumber: true})}/>
                </div>
                <div className={css.input_line}>
                    <label>Gender: </label>
                    <select {...register('gender')}>
                        <option></option>
                        <option value="Male">Man</option>
                        <option value="Female">Woman</option>
                    </select>
                </div>
                <div className={css.input_line}>
                    <label>Size: </label>
                    <select {...register('size')}>
                        <option></option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className={css.input_line}>
                    <label>Brand: </label>
                    <select {...register('brand')}>
                        <option></option>
                        {brands && brands.map(brand => <option key={brand.id}
                                                               value={brand.name}>{brand.name}</option>)}
                    </select>
                </div>

                <button className={css.find_btn}>Find</button>
                <BiReset onClick={() => setQuery('')} className={css.reset}/>
            </form>
        </div>
    );
};

export {FilterSideBar};