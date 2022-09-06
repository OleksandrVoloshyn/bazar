import {FC, useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {userActions} from "../../redux";
import {PagePagination} from "../PagePagination/PagePagination";


const Users: FC = () => {
    const {users} = useAppSelector(({userReducer}) => userReducer);
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries());

    useEffect(() => {
        queryObj.page && dispatch(userActions.searchUsers({searchValue, page: queryObj.page}))

        return () => {
            dispatch(userActions.resetUsers())
        }
    }, [queryObj.page])

    const search = async () => {
        setQuery('')
        await dispatch(userActions.searchUsers({searchValue, page: '1'}))
    }
    console.log(users?.data)
    return (
        <div>
            <div>
                <label>Looking for users by name surname or email: </label>
                <div>
                    <input type="search" onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
                    <button onClick={search} disabled={!searchValue}>search</button>
                </div>
            </div>

            {users &&
                <div>
                    <PagePagination next={users.next} prev={users.prev} total_pages={users.total_pages}
                                    total_items={users.total_items}/>
                    {users.data.map(candidate => <User key={candidate.id} candidate={candidate}/>)}
                </div>}
        </div>
    );
};

export {Users};