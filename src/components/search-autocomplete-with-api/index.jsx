import {useEffect, useState} from "react";

const SearchAutocompleteWithApi = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

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

    console.log(users, loading, error);

    return (
        <div className={"search-autocomplete-container"}>
            <input
                name="search-users"
                type="text"
                placeholder="Search Users here..."
            />
        </div>
    );
}

export default SearchAutocompleteWithApi;