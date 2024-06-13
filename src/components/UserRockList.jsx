import { useEffect, useState } from "react"


export const UserRockList = () => {
    const [userRocksState, setUserRockState] = useState([])

    const fetchUserRocksFromAPI = async () => {
        const response = await fetch(`http://localhost:8000/rocks?owner=current`,
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
            })
        const userRocks = await response.json()
        setUserRockState(userRocks)
    }

    const handleDelete = (rockId) => {
        return fetch(`http://localhost:8000/rocks/${rockId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        }).then(() => fetchUserRocksFromAPI())
    }

    useEffect(() => {
        fetchUserRocksFromAPI() 
    },[])

    const displayRocks = () => {
        if (userRocksState && userRocksState.length) {
            return userRocksState.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <p>{rock.name} ({rock.type}) weighs {rock.weight} kg</p>
                <p>In the collection of {rock.user?.first_name} {rock.user?.last_name}</p>
                <div>
                    <button
                        onClick={() => {handleDelete(rock.id)}}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >DELETE
                    </button>
                </div>
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}