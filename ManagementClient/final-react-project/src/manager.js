import { useCallback } from 'react';
import axios from "axios";

export const useFetchData = (apiUrl, pageSize, currentPage, setCurrentPage, setData, setTotalElements, refData) => {

    //fetchData
    const fetchData = useCallback(async () => {
        let APISearch = `${apiUrl}?size=${pageSize}&page=${currentPage}`;

        refData.forEach(({ ref, paramName }) => {
            if (ref?.current?.value) {
                APISearch += `&${paramName}=${ref.current.value}`;
            }
        });

        return axios
            .get(APISearch)
            .then((res) => {
                console.log("res", res);
                setData(res.data.content);
                setTotalElements(res.data.totalElements); // update total elements
                return res.data.content;
            })
            .catch((err) => console.log(err));

    }, [apiUrl, pageSize, currentPage, setData, setTotalElements, refData]);

    //search form
    const handleSearch = useCallback((e) => {
        e.preventDefault();
        fetchData();
    }, [fetchData]);

    //reset form
    const handleReset = useCallback((e) => {
        e.preventDefault();
        refData.forEach(({ ref }) => { ref.current.value = null });
        fetchData();
    }, [fetchData]);

    //delete
    const handleDelete = useCallback((id) => {
        axios
            .delete(apiUrl + `/${id}`)
            .then(res => {
                console.log('ok');
                fetchData().then(data => {
                    if (data.length === 0 && currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                });
            })
            .catch(err => console.error(err));
    }, [fetchData]);

    return { fetchData, handleSearch, handleReset, handleDelete };
}

