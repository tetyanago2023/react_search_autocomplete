import {useEffect, useState} from "react";
import Suggestions from "./suggestions";

const SearchAutocompleteWithApi = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchParam(query);
        if (e.target.value.length > 1) {
            const filteredData =
                users && users.length
                    ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
                    : [];
            setFilteredUsers(filteredData);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }
    function handleClick(e){
        setShowSuggestions(false)
        setSearchParam(e.target.innerText)
        setFilteredUsers([])
    }

    const fetchListOfUsers = async () => {
        try {
            setLoading(true);

            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();

            if (data && data.users && data.users.length) {
                setUsers(data.users.map((userItem) => userItem.firstName));
                setLoading(false);
                setError(null);
            }
            } catch (error) {
              setLoading(false);
              console.log(error);
              setError(error);
            }
    }

    useEffect(() => {
        fetchListOfUsers();
    }, []);

    console.log(users, filteredUsers, loading, error);

    return (
        <div className={"search-autocomplete-container"}>
            <input
                name="search-users"
                type="text"
                placeholder="Search Users here..."
                value={searchParam}
                onChange={handleChange}
            />

            {showSuggestions && <Suggestions handleClick={handleClick} data={filteredUsers} />}
        </div>
    );
}

export default SearchAutocompleteWithApi;