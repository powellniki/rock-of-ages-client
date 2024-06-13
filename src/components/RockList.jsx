import { useEffect } from "react"


export const RockList = ({ rocks, fetchRocks, showAll }) => {

    useEffect(() => {
        fetchRocks(showAll) 
    },[showAll])

    const handleDelete = (rockId) => {
        return fetch(`http://localhost:8000/rocks/${rockId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        }).then(() => fetchRocks())
    }

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <p>{rock.name} ({rock.type.label}) weighs {rock.weight} kg</p>
                <p>In the collection of {rock.user.first_name} {rock.user.last_name}</p>
                {showAll ? "" : <button onClick={() => {handleDelete(rock.id)}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">DELETE</button>}
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
