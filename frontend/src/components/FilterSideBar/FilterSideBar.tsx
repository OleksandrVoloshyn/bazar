import {FC, useEffect} from "react"
import {useSearchParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";

const FilterSideBar: FC = () => {
    const {brands} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {register, handleSubmit} = useForm();
    const queryObj = Object.fromEntries(query.entries());

    const submit: SubmitHandler<any> = (data: any) => {
        for (const item in data) {
            data[item] ? (queryObj[item] = data[item]) : delete queryObj[item]
        }
        setQuery(queryObj)
    }
    useEffect(() => {
        dispatch(productActions.getBrands())
    }, [dispatch])

    return (
        <div>
            <h2>FilterSideBar</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>Min price:
                    <input type="number" {...register('price_gt', {valueAsNumber: true})}/>
                </label></div>
                <div><label>Max price:
                    <input type="number" {...register('price_lt', {valueAsNumber: true})}/>
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
                    <label>Size:
                        <select {...register('size')}>
                            <option></option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Brand:
                        <select {...register('brand')}>
                            <option></option>
                            {brands && brands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}
                        </select>
                    </label>
                </div>

                <button>Find</button>
            </form>
        </div>
    );
};

export {FilterSideBar};