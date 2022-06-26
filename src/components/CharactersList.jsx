import { useEffect, useState } from 'react'
import Character from './Character';
//traigo los datos apenas cargo la app y use un use effect
// los traigo usando un fetch
//Asigno una const que guarde los datos del api y despues en el Return lo renderizo

function NavPage(props){
    return(
        <header className='d-flex justify-content-between align-items-center'>
            <p>Page: {props.page}</p>
           {/*<button className='i-flex btn btn-primary btn-sm' onClick={() => props.setPage(props.page - 1)}>Page: {props.page - 1 }</button>*/ } 
            <button className='btn btn-primary btn-sm' onClick={() => props.setPage(props.page + 1)}>Page: {props.page + 1}</button>
        </header>
    )
}

function CharactersList() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true);
    const [page,setPage] = useState(1)
    useEffect(() => {
        console.log('cargo');
        //Format de llamar al fetch de manera async

        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setLoading(false);
            setCharacters(data.results);
        }
        fetchData();
    },[page]);
    
    return <div className='container bg-grey'>
        <NavPage page={page} setPage={setPage}/>
        {
            loading ? <h1>Loading...</h1> : (<div className='row'>
            {characters.map((character) => {
                return (
                    <div className='col-md-4 ' key={character.id}>
                        <Character character={character} />
                    </div>
                );
            })}
        </div>)
        }
        <NavPage page={page} setPage={setPage}/>
    </div>;

}

export default CharactersList;